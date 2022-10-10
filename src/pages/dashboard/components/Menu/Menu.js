import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Grid, Button, Dialog, Checkbox, Typography, FormControlLabel, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";
import ProductServices from "../../../../services/productServices";
import CategoryServices from "../../../../services/CategoryServices";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// components
import PageTitle from "../../../../components/PageTitle"
import { useFormik } from 'formik';
import Widget from "../../../../components/Widget/Widget";
// import Table from "../../components/Table/Table";
import { useContext, useEffect, useState } from 'react';
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// import FormControlLabel from '@material-ui/FormControlLabel';

// data
import mock from "../../../dashboard/mock";
//import Checkbox from '@material-ui/Checkbox';
import InputAdornment from "@material-ui/core/InputAdornment";
const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

export default function Menu() {

  const [image, setImage] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [age, setAge] = React.useState('');
  const [product, setProduct] = useState({
    categoryId: '',
    title: '',
    originalPrice: '',
    price: '',
    discount: '',
    quantity: '',
    description: '',
    status: '',
    icon: ''
  });
  const [open, setOpen] = React.useState(false);
  const tableHeaders = ['Image', 'Category name', 'Title', 'Original price', 'Price', 'Discount', 'Quantity', 'Status', 'Edit', 'Delete'];
  useEffect(() => {
    getCategoryList();
    getProductList()
    return () => {
      setProductList([])
      setCategoryList([])
    };
  }, []);
  const validationSchema = Yup.object().shape({
    categoryId: Yup.string().required('category Name is required'),
    title: Yup.string().required('Menu Name is required'),
    
    originalPrice: Yup.string().required()
    .matches(/^[0-9]+$/, "Must be only digits"),
    price: Yup.string().required()
    .matches(/^[0-9]+$/, "Must be only digits"),
    discount: Yup.string().required()
    .matches(/^[0-9]+$/, "Must be only digits"),
    quantity: Yup.string().required()
    .matches(/^[0-9]+$/, "Must be only digits"),
    description: Yup.string().required('Description is required'),
    status: Yup.string().required('status is required'),
  });
 
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const onSubmit = data => {

    console.log(JSON.stringify(data, null, 2));

  };

  const handleClickOpen = () => {
    setProduct({
      categoryId: '',
      title: '',
      originalPrice: '',
      price: '',
      discount: '',
      quantity: '',
      description: '',
      status: '',
      icon: ''
    })
    setOpen(true);
  };
  const onclick = () => {

    setOpen(true);
  }

  const getCategoryList = () => {
    CategoryServices.getAllCategory().then((res) => {
      
      setCategoryList(res);

    }).catch((err) => {
      // setError(err.message);
    });
  }
  const getProductList = () => {
    ProductServices.getAllProduct().then((res) => {

      setProductList(res.products);

    }).catch((err) => {
      // setError(err.message);
    });
  }
  const deleteProduct = (productdelete) => {

    if (productdelete) {
      ProductServices.deleteProduct(productdelete).then((res) => {
        getProductList();
      }).catch((err) => {

      });
    }

  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();
  const editProduct = (product) => {
    product.categoryId = product.categoryId ? product.categoryId._id : '';
    setProduct(product)
    handleOpen()
  }


  const handleChangeImage = (evt) => {
    console.log("Uploading");
    var reader = new FileReader();
    var file = evt.target.files[0];

    reader.onload = function (upload) {
      console.log(upload.target.result)
      setImage(upload.target.result)
    };
    reader.readAsDataURL(file);
    console.log("Uploaded");
    
  }


  const formik = useFormik({
    initialValues: product,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {

      if (product._id) {

        values.id = product._id;
        if (image && image != "") {


          values.image = image;


        } else {
          values.image = product.image;
        }
        ProductServices.upadeProduct(values).then((res) => {
          handleClose();
          getProductList();
          resetForm()
        }).catch((err) => {

        });
      } else {
        if (image) {
          values.image = image;
        }
        ProductServices.creteProduct(values).then((res) => {
          handleClose();
          getProductList()
          resetForm()
        })
          .catch((err) => {

          })
      }
    }
  })





 









  return (
    <>
      <PageTitle title="Menu" button={<Button
        variant="contained" onClick={handleClickOpen}
        size="medium"
        color="secondary" > Add Food Menu
      </Button>} />
     
      <Grid container spacing={4}>

        <Grid item xs={12}>
          <Widget title="" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>

            <Table className="mb-0">
              <TableHead >
                <TableRow>
                  {tableHeaders.map(key => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                </TableRow>

              </TableHead>
              <TableBody>

                {productList.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="pl-3 fw-normal" >

                      <div> <img src={product.image} alt="car" style={{ 'height': '25px', 'width': '25px' }} /> </div>

                    </TableCell>
                    <TableCell className="pl-3 fw-normal" >{product.categoryId ? product.categoryId.parent : ''}</TableCell>
                    <TableCell className="pl-3 fw-normal" >{product.title}</TableCell>
                    <TableCell className="pl-3 fw-normal" >{product.originalPrice}</TableCell>
                    <TableCell className="pl-3 fw-normal" >{product.price}</TableCell>
                    <TableCell className="pl-3 fw-normal" >{product.discount}</TableCell>
                    <TableCell className="pl-3 fw-normal" >{product.quantity}</TableCell>

                    {/* <TableCell className="pl-3 fw-normal" >{product.status}</TableCell> */}
                    {/* <TableCell className="pl-3 fw-normal" >{product.icon}</TableCell> */}


                    <TableCell>

                      {product.status ? 'Active' : 'In Active'}
                    </TableCell>



                    <TableCell>
                      <EditIcon style={{ cursor: 'pointer' }} onClick={() => editProduct(product)} >

                      </EditIcon >
                    </TableCell>
                    <TableCell>
                      <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteProduct(product)} />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Widget>
        </Grid>
      </Grid>
      <Dialog  open={open} onClose={handleClose}>
        <DialogTitle>Add Menu</DialogTitle>
        <form onSubmit={formik.handleSubmit} >
          <DialogContent style={{maxWidth: 436}}>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
<div style={{width:370}}>
            <FormControl variant="standard" fullWidth="true" >
              
              <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="categoryId"

                name="categoryId"

                label="Category"

                value={formik.values.categoryId}
                onChange={formik.handleChange}
                error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
                helperText={formik.touched.categoryId && formik.errors.categoryId}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {categoryList.map(({ _id, parent }) => (
                  <MenuItem key={_id} value={_id}>{parent}
                    {/* <Checkbox checked={formik.values.categoryId.indexOf(parent) > -1} /> */}

                  </MenuItem>
                ))}
              </Select>
             
            </FormControl>
            </div>

            <TextField
              InputProps={{ style: { width: 370 } }}
              onChange={formik.handleChange}
              margin="dense"
              id="title"
              name="title"
              label="Title "
              type="text"
              variant="standard"
              value={formik.values.title}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <div style={{marginTop:16}} >
              <lable>Image Upload</lable> 
              <div>
              <input style={{marginTop:7}}
                accept="image/*"
                className={classes.input}
                id="raised-button-file"
                multiple
                type="file"
                onChange={handleChangeImage}
              />
</div>
            </div>


            <TextField
              InputProps={{ style: { width: 370 } }}
              
              margin="dense"
              name="originalPrice"
              id="originalPrice"
              label="Original Price"
              type="text"
              variant="standard"
              value={formik.values.originalPrice}
              onChange={formik.handleChange}
              error={formik.touched.originalPrice && Boolean(formik.errors.originalPrice)}
              helperText={formik.touched.originalPrice && formik.errors.originalPrice}
            />

            <TextField
              InputProps={{ style: { width: 370 } }}
              
              margin="dense"
              id="price"
              name="price"
              label=" Price"
              type="text"
              variant="standard"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />

            <TextField
              InputProps={{ style: { width: 370 } }}
              
              margin="dense"
              id="discount"
              name="discount"
              label="Discount"
              type="text"
              variant="standard"
              value={formik.values.discount}
              onChange={formik.handleChange}
              error={formik.touched.discount && Boolean(formik.errors.discount)}
              helperText={formik.touched.discount && formik.errors.discount}
            />
            <TextField
              InputProps={{ style: { width: 370 } }}
              
              margin="dense"
              id="quantity "
              name="quantity"
              label="Quantity"
              type="text"
              variant="standard"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
            <TextField
              InputProps={{ style: { width: 370 } }}
              
              margin="dense"
              name="description"
              id="description"
              label="Description"
              type="text"
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}

            />
       
       <div style={{width:370}}>
            <FormControl variant="standard" fullWidth>
              <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="status"

                label="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                error={formik.touched.status && Boolean(formik.errors.status)}
                helperText={formik.touched.status && formik.errors.status}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>In Active</MenuItem>

              </Select>
            </FormControl>
            </div>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
