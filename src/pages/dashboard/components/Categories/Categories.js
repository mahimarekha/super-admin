import React from "react";
import { Grid,Button,Typography,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle ,TextField,FormControl,InputLabel,Select,MenuItem} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import InputAdornment from "@material-ui/core/InputAdornment";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
// components
import PageTitle from "../../../../components/PageTitle"
import Widget from "../../../../components/Widget/Widget";
import Table from "../../components/Table/Table";
import EditIcon from '@material-ui/icons/Edit';
// data
import mock from "../../../dashboard/mock";

const datatableData = [
  ["Joe James", "Example Inc.", "Yonkers", "NY"],
  ["John Walsh", "Example Inc.", "Hartford", "CT"],
  ["Bob Herm", "Example Inc.", "Tampa", "FL"],
  ["James Houston", "Example Inc.", "Dallas", "TX"],
  ["Prabhakar Linwood", "Example Inc.", "Hartford", "CT"],
  ["Kaui Ignace", "Example Inc.", "Yonkers", "NY"],
  ["Esperanza Susanne", "Example Inc.", "Hartford", "CT"],
  ["Christian Birgitte", "Example Inc.", "Tampa", "FL"],
  ["Meral Elias", "Example Inc.", "Hartford", "CT"],
  ["Deep Pau", "Example Inc.", "Yonkers", "NY"],
  ["Sebastiana Hani", "Example Inc.", "Dallas", "TX"],
  ["Marciano Oihana", "Example Inc.", "Yonkers", "NY"],
  ["Brigid Ankur", "Example Inc.", "Dallas", "TX"],
  ["Anna Siranush", "Example Inc.", "Yonkers", "NY"],
  ["Avram Sylva", "Example Inc.", "Hartford", "CT"],
  ["Serafima Babatunde", "Example Inc.", "Tampa", "FL"],
  ["Gaston Festus", "Example Inc.", "Tampa", "FL"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Tables() {
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required('Category Name is required'),
     
    });
    const {
      register,
      control,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(validationSchema),
    });
    const onSubmit = data => {
      
      console.log(JSON.stringify(data, null, 2));
    };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const onclick = () => {
   
    setOpen(true);
    }
  
  
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
       <PageTitle title="Categories" button={<Button
      variant="outlined" onClick={handleClose}
      size="medium"
      color="secondary"
    
    >
        Add Food Categories
    </Button>} />
  
      <Grid container spacing={4}>

        {/* <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Name", "Company", "City", "State"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid> */}

        
        <Grid item xs={12}>
          <Widget title="" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={mock.table} onclick={onclick}/>
          </Widget>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Categories</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="Category Name"
            
            variant="standard"
            {...register('categoryName')}
          error={errors.categoryName ? true : false}
          />
           <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.categoryName?.message}
              </Typography>
              </div>
          <FormControl  variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
        
          label="Status"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={true}>Active</MenuItem>
          <MenuItem value={false}>In Active</MenuItem>
        
        </Select>
        </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
