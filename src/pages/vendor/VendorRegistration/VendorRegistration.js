import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Grid,Card,Box,FormControl,NativeSelect, CardActions,CardContent,Button,Typography,MenuItem,Select,InputLabel,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle ,TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import PageTitle from "../../../components/PageTitle";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// import Widget from "../../../components/Widget";

// import mock from "../../dashboard/mock";


 
export default function VendorRegistration() {
 
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const validationSchema = Yup.object().shape({
      organizationName: Yup.string().required('Organization Name is required'),
      fullName: Yup.string().required('Full Name is required'),
      mobileNumber: Yup.number().typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10)
      .required('A phone number is required'),
      alternativeMobileNumber: Yup.number().typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10)
      .required('A phone number is required'),
      PINNumber: Yup.number().typeError('Amount must be a number').min(6).required('Account Number is required'),
      
      geoLocation: Yup.string().required('geoLocation is required'),
      city: Yup.string().required('city is required'),
      locality: Yup.string().required('locality is required'),
      GST: Yup.string().required('GST is required'),
      PANNumber: Yup.string().required('PAN Number is required'),
      accountName: Yup.string().required('Account Name is required'),
      accountNumber: Yup.number().typeError('Amount must be a number').min(11).required('Account Number is required')
      ,
      bankName: Yup.string().required('bankName Number is required'),
      branch: Yup.string().required('branch  is required'),
      IFSCCode: Yup.string().required('IFSC Code  is required'),
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
  return (
    
<>
<Card sx={{ maxWidth: 345 }}>
<Box   >
   <div style={{marginLeft: "7%"}}>
    <Grid container  spacing={2} columns={12} >
        <Grid item xs={12}>
        <PageTitle title="Vendor Registration"></PageTitle>
        </Grid>
    
  <Grid item xs={6}>
   <TextField InputProps={{ style: { width: 370 } }} autoFocus margin="dense" id="name" label="Name Of The organization"
    type="Name Of The organization" variant="standard" 
    {...register('organizationName')}
    error={errors.organizationName ? true : false}/>
    <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.organizationName?.message}
              </Typography>
    </div>
    
  </Grid>
  <Grid item xs={6}>
        <TextField
        InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="Full Name "
            type="Name"
            variant="standard"
            {...register('fullName')}
            error={errors.fullName ? true : false}
          />
          <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.fullName?.message}
              </Typography>
    </div>
         
  </Grid>
  
  <Grid item xs={6}>
     <TextField  InputProps={{ style: { width: 370} }}
            autoFocus
            margin="dense"
            id="name"
            label="Mobile Number "
            type="Mobile Number"
            variant="standard"
            {...register('mobileNumber')}
            error={errors.mobileNumber ? true : false}
          />
                 <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.mobileNumber?.message}
              </Typography>
    </div>
  </Grid>
  <Grid item xs={6}>
      <TextField  InputProps={{ style: { width: 370} }}
            autoFocus
            margin="dense"
            id="name"
            label="Alternative Mobile Number "
            type="Alternative Mobile Number "
            variant="standard"
            {...register('alternativeMobileNumber')}
            error={errors.alternativeMobileNumber ? true : false}
          />
            <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.alternativeMobileNumber?.message}
              </Typography>
              </div>
  </Grid>


  
  <Grid item xs={12} style={{  marginTop: '30px'}}>
    <span style={{fontSize: '17px',color: 'rgb(83 109 254'}} >Address:</span>
    </Grid>
    <Grid item xs={6}>
      <TextField  InputProps={{ style: { width: 370} }}
            autoFocus
            margin="dense"
            id="name"
            label="PIN Number "
            type="Number"
            variant="standard"
            {...register('PINNumber')}
            error={errors.PINNumber ? true : false}
          />
            <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.PINNumber?.message}
              </Typography>
              </div>
  </Grid>
  
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="Geo Location "
            type="Geo Location "
            variant="standard"
            {...register('geoLocation')}
            error={errors.geoLocation ? true : false}
          />
          <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.geoLocation?.message}
              </Typography>
              </div>
  </Grid>
 
<Grid item xs={6}>
<div style={{width: 370,marginTop:'18px'}}>
<FormControl variant="standard" fullWidth="true" >
        <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
          {...register('city')}
            error={errors.city ? true : false}
        >
          
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>kochin</MenuItem>
          <MenuItem value={20}>trivendram</MenuItem>
          <MenuItem value={30}>erunakulam</MenuItem>
        </Select>
        </FormControl>
        <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.city?.message}
              </Typography>
              </div>
    </div>
</Grid>
  <Grid item xs={6}>
  <div style={{width: 370,marginTop:'18px'}}>

  <FormControl variant="standard" fullWidth="true" >
        <InputLabel id="demo-simple-select-standard-label">Locality</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={age}
          onChange={handleChange}
          label="Age"
          {...register('locality')}
            error={errors.locality ? true : false}
        >
          
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>kochin</MenuItem>
          <MenuItem value={20}>trivendram</MenuItem>
          <MenuItem value={30}>erunakulam</MenuItem>
        </Select>
        </FormControl>
        </div>
           <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.locality?.message}
              </Typography>
              </div>
  </Grid>
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="GST "
            type="GST "
            variant="standard"
            {...register('GST')}
            error={errors.GST ? true : false}
          />
           <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.GST?.message}
              </Typography>
              </div>
  </Grid>
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="PAN Number "
            type="PAN Number "
            variant="standard"
            {...register('PAN Number')}
            error={errors.PANNumber ? true : false}
          />
            <div>
    <Typography variant="inherit" color="textSecondary">
                {errors.PANNumber?.message}
              </Typography>
              </div>
  </Grid>
  <Grid item xs={12} style={{  marginTop: '30px'}}>
    
    <Grid item xs={12}>
    < sapn style={{fontSize: '17px',color: 'rgb(83 109 254'}}>Bank Account Detailes:
        </sapn>
    </Grid>
  </Grid>
  
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="Account Name "
            type="Account Name"
            variant="standard"
            {...register('accountName')}
            error={errors.accountName ? true : false}
          />
           <div>
          <Typography variant="inherit" color="textSecondary">
                {errors.accountName?.message}
              </Typography>
              </div>
  </Grid>
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="Account Number "
           
            variant="standard"
            {...register('accountNumber')}
            error={errors.accountNumber ? true : false}
          />
           <div>
          <Typography variant="inherit" color="textSecondary">
                {errors.accountNumber?.message}
              </Typography>
              </div>
  </Grid>
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="Bank  Name "
            type="Bank  Name"
            variant="standard"
            {...register('bankName')}
            error={errors.bankName ? true : false}
          />
          <div>
          <Typography variant="inherit" color="textSecondary">
                {errors.bankName?.message}
              </Typography>
              </div>
  </Grid>
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="Branch "
            type="Branch"
            variant="standard"
            {...register('branch')}
            error={errors.branch? true : false}
          />
          <div>
          <Typography variant="inherit" color="textSecondary">
                {errors.branch?.message}
              </Typography>
              </div>
  </Grid>
  <Grid item xs={6}>
      <TextField InputProps={{ style: { width: 370 } }}
            autoFocus
            margin="dense"
            id="name"
            label="IFSC Code "
            type="IFSC Code"
            variant="standard"
            {...register('IFSCCode')}
            error={errors.IFSCCode? true : false}
          />
             <div>
          <Typography variant="inherit" color="textSecondary">
                {errors.IFSCCode?.message}
              </Typography>
              </div>
  </Grid>
  </Grid>
  
  <div style={{textAlign: 'right',margin: '29px'}}>
  <Button style={{backgroundColor: 'rgb(255, 92, 147)',color:'white'}} variant="contained"  onClick={handleSubmit(onSubmit)}>Register</Button>
  </div>
  </div>
    </Box>
    
    </Card>

     </>
    
       

  )
  }

