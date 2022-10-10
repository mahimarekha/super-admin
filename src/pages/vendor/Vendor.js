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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import { useContext, useEffect, useState } from 'react';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
//import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";
import CityServices from "../../services/CityServices";
import LocalityServices from "../../services/LocalityServices";
import VendorRegistrationServices from "../../services/VendorRegistrationServices";

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Vendor(props) {
  const tableHeaders = ['ORGANIZATION NAME ','FULL NAME', 'MOBILE NUMBER', 'CITY NAME','STATUS', 'EDIT','DELETE'];

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState('');
  const [vendorRegistrationList, setVendorRegistrationList] = useState([]);

  useEffect(() => {
    getVendorRegistrationList();    
    return () => {
      setVendorRegistrationList([])
    };
  }, []);

  // const deleteVendorRegistration = (vendorRegistration) => {
  //   if (vendorRegistration) {
  //     LocalityServices.deleteVendorRegistration(vendorRegistration).then((res) => {
  //       getVendorRegistrationList();
  //     }).catch((err) => {

  //     });
  //   }

  // };
  

  const handleClose = () => {
    setOpen(false);
  };
  const onclick  = () => {
  
  };
  const editVendor=(id)=>{
    props.history.push(`/app/vendorregistration/${id}`);
  }

  const getVendorRegistrationList=()=>{
    VendorRegistrationServices.getAllVendorRegistration().then((res) => {

      setVendorRegistrationList(res);

    }).catch((err) => {
     // setError(err.message);
    });
  }
 
  const deleteVendorRister = (vendordelete) => {
    if (vendordelete) {
        VendorRegistrationServices.deleteVendorRegistration(vendordelete).then((res) => {
          getVendorRegistrationList();
      }).catch((err) => {

      });
    }

  };
  const classes = useStyles();
  var keys = Object.keys(mock.vendor[0]).map(i => i.toUpperCase());
  keys.shift();
  return (
    
    <>
    
       
    
    
     <PageTitle title="Vendor registration" button={<Link to="/app/vendorregistration/create" 
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
                  {tableHeaders.map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
      </TableHead>
      <TableBody>


{vendorRegistrationList.map((vendorRegistration) => (
  <TableRow key={vendorRegistration._id}>
    <TableCell className="pl-3 fw-normal" >{vendorRegistration.orgName}</TableCell>
    <TableCell className="pl-3 fw-normal" >{vendorRegistration.fullName}</TableCell>
    <TableCell className="pl-3 fw-normal" >{vendorRegistration.mobileNumber}</TableCell>   
    <TableCell className="pl-3 fw-normal" >{vendorRegistration.cityId.cityName}</TableCell>
    <TableCell>

      {vendorRegistration.status ? 'Active' : 'In Active'}
    </TableCell>
    <TableCell>
      <EditIcon style={{ cursor: 'pointer' }}  onClick={() => editVendor(vendorRegistration._id)} >
      
      </EditIcon >
    </TableCell>
    <TableCell>
      <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteVendorRister(vendorRegistration)} />
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
         
hf


  </DialogContent>
  <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
  </Dialog>
   
  </>
  )
  }
