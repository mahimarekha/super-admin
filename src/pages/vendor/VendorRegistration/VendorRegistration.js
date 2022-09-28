import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Grid, Card, Box, FormControl, NativeSelect, CardActions, CardContent, Button, Typography, MenuItem, Select, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import PageTitle from "../../../components/PageTitle";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import {useLocation} from "react-router-dom";

import RegistrationForm from "./RegisterForm";
// import Widget from "../../../components/Widget";

// import mock from "../../dashboard/mock";

import CityServices from "../../../services/CityServices";
import LocalityServices from "../../../services/LocalityServices";
import VendorRegistrationServices from "../../../services/VendorRegistrationServices";
import {
  useParams
} from "react-router-dom";
export default function VendorRegistration(props) {


  const [vendor, setVendor] = useState({
    orgName: '',
    fullName:'',
    mobileNumber:'',
    altMobileNumber:'',
    address:'',
    pincode:'',
    geoLocation:'',
    cityId:'',
    localityId:'',
    gst:'',
    pan:'',
    accName:'',
    accNumber:'',
    bankName:'',
    branch:'',
    ifsc:'',
    status:'',
});
  

  const { id } = useParams();

  useEffect(() => {
  
    getByjhnjbjhb();
    return () => {
      setVendor([]);
     
    };
  }, []);



  

  const getByjhnjbjhb = () => {
    VendorRegistrationServices.getByIdVendorRegistration(id).then((res) => {
      setVendor(res);

    }).catch((err) => {
   
    });
  }


  
 

  
 

console.log(vendor)

  return (

    <>
     <RegistrationForm props={props} vendorData={vendor}/>

    </>



  )
}

