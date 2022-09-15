import React from "react";
import { Grid,Button,Dialog,Typography,DialogActions,DialogContent,DialogContentText,DialogTitle ,TextField,FormControl,InputLabel,Select,MenuItem} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useForm, Controller } from 'react-hook-form';
import MUIDataTable from "mui-datatables";
import InputAdornment from "@material-ui/core/InputAdornment";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip
  } from "@material-ui/core";
  import EditIcon from '@material-ui/icons/Edit';
// components
import PageTitle from "../../../components/PageTitle/PageTitle";
import Widget from "../../../components/Widget/Widget";
// import Table from "../../tables/Tables";

// // data
import mock from "../../dashboard/mock";

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


export default function Locality() {
  const [age, setAge] = React.useState('');
const handleChange = (event) => {
  setAge(event.target.value);
};
const validationSchema = Yup.object().shape({
  cityName: Yup.string().required('City Name is required'),
  area: Yup.string().required('Area is required'),
 
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
  var keys = Object.keys(mock.locality[0]).map(i => i.toUpperCase());
  keys.shift();
  return (
    <>
       <PageTitle title="Area" button={<Button
      variant="outlined" onClick={handleClickOpen}
      size="medium"
      color="secondary"
    
    >
        Add Area
    </Button>} />
  
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Widget title="" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>

          <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {mock.locality.map((result) => (
          <TableRow key={result.id}>
            <TableCell className="pl-3 fw-normal">{result.area}</TableCell>
            <TableCell className="pl-3 fw-normal">{result.city}</TableCell>
            <TableCell className="pl-3 fw-normal">{result.status}</TableCell>
           
            <TableCell className="pl-3 fw-normal">
              <EditIcon onClick={() => handleClickOpen()}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
          </Widget>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Area</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
       


<FormControl variant="standard" fullWidth="true" >
        <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
        
          label="Status"
          {...register('cityName')}
          error={errors.cityName ? true : false}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={true}>chennai</MenuItem>
          <MenuItem value={false}>kochin</MenuItem>
          <MenuItem value={false}>Bangolre</MenuItem>
          <MenuItem value={false}>Hyderabad</MenuItem>
        </Select>
        </FormControl>
        <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.cityName?.message}
              </Typography>
              </div>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Area"
            type="name"
            fullWidth
            variant="standard"
            {...register('area')}
            error={errors.area ? true : false}
          />
           <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.area?.message}
              </Typography>
              </div>
          <FormControl variant="standard" fullWidth="true" >
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
      </Grid>
    
    </>
  );
}
