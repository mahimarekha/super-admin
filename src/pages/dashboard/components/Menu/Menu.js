import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Grid,Button,Dialog,Typography,DialogActions,DialogContent,DialogContentText,DialogTitle ,TextField,FormControl,InputLabel,Select,MenuItem} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// components
import PageTitle from "../../../../components/PageTitle"
import Widget from "../../../../components/Widget/Widget";
import Table from "../../components/Table/Table";

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

export default function Menu() {
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  
  const validationSchema = Yup.object().shape({
    MenuName: Yup.string().required('Menu Name is required'),
    categoryName: Yup.string().required('category Name is required')
   
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
    debugger
    console.log(JSON.stringify(data, null, 2));
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <>
       <PageTitle title="Menu" button={<Button
      variant="outlined" onClick={handleClickOpen}
      size="medium"
      color="secondary"
    
    >
        Add Food Menu
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
            <Table data={mock.table} onclick={handleClickOpen}/>
          </Widget>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Menu</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Menu Name"
            type="Menu Name"
            
            variant="standard"
            {...register('MenuName')}
            error={errors.MenuName ? true : false}
          />
<div>
          <Typography variant="inherit" color="textSecondary">
                {errors.MenuName?.message}
              </Typography>
              </div>
<FormControl variant="standard" fullWidth >
        <InputLabel id="demo-simple-select-standard-label">Category Name</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
        
          label="Status"
          {...register('categoryName')}
          error={errors.categoryName ? true : false}
          
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>


          <MenuItem value={1}>Category Name 1</MenuItem>
          <MenuItem value={2}>In Category Name 2</MenuItem>
          <MenuItem value={2}>In Category Name 3</MenuItem>
        </Select>
        </FormControl>
        <div>
          <Typography variant="inherit" color="textSecondary">
                {errors.categoryName?.message}
              </Typography>
              </div>
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Category Name"
            type="Category Name"
            fullWidth
            variant="standard"
          /> */}
          <FormControl variant="standard" fullWidth >
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
