import React from "react";
import { Grid,Button, Typography,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle ,TextField,FormControl,InputLabel,Select,MenuItem} from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import InputAdornment from "@material-ui/core/InputAdornment";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";
import EditIcon from '@material-ui/icons/Edit';
// data
import mock from "../dashboard/mock";

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


export default function Tables() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  
  const validationSchema = Yup.object().shape({
    cityName: Yup.string().required('City Name is required'),
    
   
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
  const onclick = () => {
  //  setData(childdata);
  setOpen(true);
  }
 
  
  return (
    <>
       <PageTitle title="City" button={<Button
      variant="outlined" onClick={handleClickOpen}
      size="medium"
      color="secondary"
    
    >
        Add City
    </Button>} />
  
      <Grid container spacing={4}>


        
        <Grid item xs={12}>
          <Widget title="" upperTitle noBodyPadding >
            <Table data={mock.table} onclick={onclick} />
          </Widget>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle  >Add City</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}



        
        

          
        <TextField 
            autoFocus
            margin="dense"
            id="name"
            label="City Name"
            type="city name"
            
            variant="standard"
            {...register('cityName')}
            error={errors.cityName ? true : false}
          />
           <div>
          <Typography variant="inherit" color="textSecondary">
                {errors.cityName?.message}
              </Typography>
              </div>





<FormControl variant="standard" fullWidth>
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
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} >Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
