import React from "react";
import {
  Grid, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem, Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import { useForm, Controller } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
// import Table from "../dashboard/components/Table/Table";
import EditIcon from '@material-ui/icons/Edit';

import CityServices from "../../services/CityServices";
import DeleteIcon from '@material-ui/icons/Delete';


export default function Tables() {
  const tableHeaders = ['NAME', 'STATUS', 'EDIT','DELETE'];
  const [age, setAge] = React.useState('');

  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [cityList, setCityList] = useState([]);
  const [cityForm, setCityForm] = useState({
    id:'',
    cityName:'',
    status: '',

  });

  const validationSchema = Yup.object().shape({
    cityName: Yup.string().required('City Name is required'),
    status: Yup.string().required('status is required'),

  });
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    getCityList();
    return () => {
      setCityList([]);

    };
  }, []);

  const handleChange = (event) => {
    setAge(event.target.value);
  };




  const getCityList = () => {
    CityServices.getAllCity().then((res) => {
     
      setCityList(res);

    }).catch((err) => {
      setError(err.message);
    });
  }



  const onSubmit = data => {
    const createObjectCity = {
      cityName: data.cityName,
      status: data.status,
      stateId: ""
    }

    if(cityForm.id){
      createObjectCity.id = cityForm.id;
      CityServices.upadeCity(createObjectCity).then((res) => {
        handleClose();
        getCityList();
        formReset();
      }).catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }else{
      CityServices.creteCity(createObjectCity).then((res) => {
        handleClose();
        getCityList();
        formReset();
      })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }

   
   
    console.log(JSON.stringify(data, null, 2));
  };
  const deleteCity = (city) => {
    if(city){
      CityServices.deleteCity(city).then((res) => {
        getCityList();
      }).catch((err) => {
         
     });
    }
   
  };
  const handleClickOpen = (city) => {
    
    if(city && city._id){
      setCityForm({
        cityName:city.cityName,
        status: city.status,
        id:city._id
      })
    }else{
      formReset();
    }
    setOpen(true);
  };
   
  const handleClose = () => {
    setOpen(false);
  };

  const cityName = (event) => {

    const citySelectData = {
      cityName:event.target.value,
      
      status: cityForm.status,
      id:cityForm.id
    }
    setCityForm(citySelectData)
  
  }


  const selectStatus = (event) => {
  
    const citySelectData = {
      cityName:cityForm.cityName,
      status: event.target.value,
      id:cityForm.id
    }
    setCityForm(citySelectData)
  
  }
  const formReset =()=>{
    const areaSelectData = {
      cityName:'',
      status: '',
      id:''
    }
    setCityForm(areaSelectData)
  }
  const [open, setOpen] = React.useState(false);

 

  

 
  const onclick = () => {
    //  setData(childdata);
    setOpen(true);
  }


  return (
    <>
      <PageTitle title="City"  button={<Button 
        variant="contained" onClick={handleClickOpen}
        size="medium"
        color="secondary"

      >
        Add City
      </Button>} 
    />

      <Grid container spacing={4}>



        <Grid item xs={12}>
          <Widget title="" upperTitle noBodyPadding >


            <Table className="mb-0">
              <TableHead>
                <TableRow>
                  {tableHeaders.map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                


              {cityList.map((city) => (
                  <TableRow key={city._id}>
                    <TableCell className="pl-3 fw-normal" >{city.cityName}</TableCell>
                    <TableCell>

                      {city.status ? 'Active' : 'In Active'}
                    </TableCell>
                    <TableCell>
                      <EditIcon style={{ cursor: 'pointer' }} onClick={() => handleClickOpen(city)} />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteCity(city)} />
                    </TableCell>
                  </TableRow>
                ))}


                 {/* {cityList.map(({ id, cityName, status }) => (
                  <TableRow key={id}>
                    <TableCell className="pl-3 fw-normal" >{cityName}</TableCell>

                    <TableCell>
                      {status ? 'Active' : 'In Active'}
                    </TableCell>
                    <TableCell>
                      <EditIcon onClick={() => handleClickOpen(city)} />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon onClick={() => deleteLocality(city)} />
                    </TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
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
            value={cityForm.cityName}
            variant="standard"
            {...register('cityName')}
            onChange={cityName}
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
              value={cityForm.status}
              label="Status"
              {...register('status')}
              onChange={selectStatus}
              error={errors.status ? true : false}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>In Active</MenuItem>

            </Select>
          </FormControl>


          <div>
            <Typography variant="inherit" color="textSecondary">
              {errors.status?.message}
            </Typography>
          </div>


        







        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} >Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
