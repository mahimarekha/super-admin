import React, { useState, useMemo } from "react";

import countryList from 'react-select-country-list'
import {
    LinearProgress,
    OutlinedInput,
} from "@material-ui/core";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem,
    TableRow, Table,
    TableHead,
    TableBody,
    TableCell
} from "@material-ui/core";
import StudentService from "./Locality/Service/studentService";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

import { Grid, Card, Box, Select, TextField } from "@material-ui/core";
import { useFormik } from 'formik';

import { useContext, useEffect } from 'react';
import { useTheme } from "@material-ui/styles";

import {
    ResponsiveContainer,
    ComposedChart,
    AreaChart,
    LineChart,
    Line,
    Area,
    PieChart,
    Pie,
    Cell,
    YAxis,
    XAxis,
} from "recharts";
import mock from "./mock";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import { withStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
export default function StudentForm() {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [cityList, setCityList] = useState([]);
    const [student, setStudent] = useState({
        studentName: '',
        dob: '',
        selectClass: '',
        parentName: '',
        mobileNumber: '',
        email: '',
        address: '',
        lane: '',
        selectCity: '',
        doa: '',
        allergies: '',
    });
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const validationSchema = Yup.object().shape({
        studentName: Yup.string().required('student name  is required'),
        dob: Yup.string().required('select date of birth'),
        selectClass: Yup.string().required('class name  is required'),
        parentName: Yup.string().required('parent name  is required'),
        mobileNumber: Yup.string().required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        email: Yup.string().required('email is required'),
        address: Yup.string().required('Adress is required'),
        lane: Yup.string(),
        selectCity: Yup.string().required('select city'),
        doa: Yup.string().required('select date of admission'),
        allergies: Yup.string(),
    });
    const formik = useFormik({
        initialValues: student,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails._id;
            StudentService.creteStudent(values).then((res) => {
                alert(" Student Registration Successfully.");
                // props.history.push('/app/vendor');
            })
                .catch((err) => {
                
                    alert(err.response.data.message)
                })
        },
    });

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <Box   >
                    <div style={{ marginLeft: "7%" }}>
                        <form onSubmit={formik.handleSubmit} >
                            <Grid container spacing={2} columns={12} >
                                <Grid item xs={12}>
                                    <PageTitle InputProps={{ style: { color: '#10b680' } }} title=" Student Registration" ></PageTitle>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        id="studentName"
                                        name="studentName"
                                        label="Name Of The Student "
                                        type="text"
                                        variant="standard"
                                        value={formik.values.studentName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.studentName && Boolean(formik.errors.studentName)}
                                        helperText={formik.touched.studentName && formik.errors.studentName}

                                    />

                                </Grid>
                                <Grid item xs={6}>
                                    <form className={classes.container} noValidate>
                                        <TextField InputProps={{ style: { width: 370 } }}
                                            id="dob"
                                            name="dob"
                                            label="Date Of Birth"
                                            type="date"
                                            defaultValue="2017-05-24"
                                            value={formik.values.dob}
                                            onChange={formik.handleChange}
                                            error={formik.touched.dob && Boolean(formik.errors.dob)}
                                            helperText={formik.touched.dob && formik.errors.dob}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>


                                </Grid>

                                <Grid item xs={6}>
                                    <div style={{ width: 370 }}>
                                        <FormControl className={classes.formControl} fullWidth="true"
                                        >
                                            <InputLabel id="demo-simple-select-label">Select Class</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="selectClass"
                                                label="selectClass"
                                                value={formik.values.selectClass}
                                                onChange={formik.handleChange}
                                                error={formik.touched.selectClass && Boolean(formik.errors.selectClass)}
                                                helperText={formik.touched.selectClass && formik.errors.selectClass}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>nursery</MenuItem>
                                                <MenuItem value={2}>PP1</MenuItem>
                                                <MenuItem value={3}>PP2</MenuItem>
                                                <MenuItem value={4}>1St Class</MenuItem>
                                                <MenuItem value={5}>2nd Class</MenuItem>
                                                <MenuItem value={5}>3rd Class</MenuItem>
                                                <MenuItem value={5}>4th Class</MenuItem>
                                                <MenuItem value={5}>5th Class</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        autoFocus
                                        margin="dense"
                                        id="parentName"
                                        name="parentName"
                                        label="Parent Name"
                                        type="text"
                                        variant="standard"
                                        value={formik.values.parentName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.parentName && Boolean(formik.errors.parentName)}
                                        helperText={formik.touched.parentName && formik.errors.parentName}
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        autoFocus
                                        margin="dense"
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        label="Mobile Number"
                                        type="text"
                                        variant="standard"
                                        value={formik.values.mobileNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                                        helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                                    />
                                </Grid>
                                <Grid item xs={6}>

                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        name="email"
                                        label="Email"
                                        type="Email"
                                        variant="standard"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ marginTop: '30px' }}>
                                    <span style={{ fontSize: '17px', color: 'rgb(16 182 128)' }} >Address:</span>
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        margin="dense"
                                        id="address"
                                        name="address"
                                        placeholder="Door/Flat/domicile number "
                                        label="Address "
                                        type="text"
                                        variant="standard"
                                        value={formik.values.address}
                                        onChange={formik.handleChange}
                                        error={formik.touched.address && Boolean(formik.errors.address)}
                                        helperText={formik.touched.address && formik.errors.address}
                                    />



                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ width: 370 }}>
                                        <FormControl className={classes.formControl}
                                            fullWidth="true" >
                                            <InputLabel id="demo-simple-select-label">Select City</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="selectCity"
                                                name="selectCity"
                                                label="selectCity"
                                                onChange={formik.handleChange}
                                                value={formik.values.selectCity}
                                                error={formik.touched.selectCity && Boolean(formik.errors.selectCity)}
                                                helperText={formik.touched.selectCity && formik.errors.selectCity}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={1}>Delhi</MenuItem>
                                                <MenuItem value={2}>Mumbai</MenuItem>
                                                <MenuItem value={3}>Kashmir</MenuItem>
                                                <MenuItem value={4}>Hyderabad</MenuItem>
                                                <MenuItem value={5}>Kochin</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <form className={classes.container} noValidate>
                                        <TextField InputProps={{ style: { width: 370 } }}
                                            id="doa"
                                            name="doa"
                                            label="Date Of Admission "
                                            type="date"
                                            defaultValue="2017-05-24"
                                            value={formik.values.doa}
                                            onChange={formik.handleChange}
                                            error={formik.touched.doa && Boolean(formik.errors.doa)}
                                            helperText={formik.touched.doa && formik.errors.doa}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        InputProps={{ style: { width: 370 } }}
                                        autoFocus
                                        margin="dense"
                                        id="allergies"
                                        name="allergies"
                                        label="Allergies if any"
                                        type="text"
                                        variant="standard"
                                        onChange={formik.handleChange}
                                        value={formik.values.allergies}
                                        error={formik.touched.allergies && Boolean(formik.errors.allergies)}
                                        helperText={formik.touched.allergies && formik.errors.allergies}

                                    />
                                </Grid>
                            </Grid>

                            <div style={{ textAlign: 'right', margin: '29px' }}>
                                <Button style={{ backgroundColor: ' rgb(48 135 91)', color: 'white' }} type="submit" variant="contained">Submit</Button>
                            </div>
                        </form>
                    </div>
                </Box>
            </Card>
        </>
    );
}


