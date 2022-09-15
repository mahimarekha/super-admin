import React from "react";
import { Grid,Button,MenuItem,Select,InputLabel,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle ,TextField} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

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
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
//import Table from "../dashboard/components/Table/Table";

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

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Vendor() {
  const [age, setAge] = React.useState('');
  let { path, url } = useRouteMatch();
  
  const handleChange = (event ) => {
    setAge(event.target.value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onclick  = () => {
  
  };
  const classes = useStyles();
  var keys = Object.keys(mock.vendor[0]).map(i => i.toUpperCase());
  keys.shift();
  return (
    
    <>
    
       
    
    
     <PageTitle title="Vendor registration" button={<Link to="/app/vendorregistration" 
      variant="outlined" 
      size="medium"
      color="secondary"
    
    >
        Vendor Registration
    </Link>} />



  
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
           
            <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {mock.vendor.map((result) => (
          <TableRow key={result.id}>
            <TableCell className="pl-3 fw-normal">{result.name}</TableCell>
            <TableCell className="pl-3 fw-normal">{result.contactno}</TableCell>
            <TableCell className="pl-3 fw-normal">{result.emailaddress}</TableCell>
            <TableCell className="pl-3 fw-normal">{result.city}</TableCell>
            <TableCell className="pl-3 fw-normal">{result.status}</TableCell>
            <TableCell className="pl-3 fw-normal">
            <Link to="/app/vendorregistration" 
      variant="outlined" 
      size="medium"
      color="secondary"
    
    >
        <EditIcon/>
    </Link>
            </TableCell>
           
          </TableRow>
        ))}
      </TableBody>
    </Table>
          </Widget>
        </Grid>
      </Grid>
      <Dialog fullWidth="md" open={open} onClose={handleClose}>
      <DialogTitle>New Vendor Redirect</DialogTitle>
        <DialogContent>
         



  </DialogContent>
  <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
  </Dialog>
   
  </>
  )
  }

