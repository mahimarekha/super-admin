import React, { useState } from "react";
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
import ActivityService from "./Locality/Service/activityService";
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import { Typography } from "../../components/Wrappers/Wrappers";
import Dot from "../../components/Sidebar/components/Dot";
import BigStat from "./components/BigStat/BigStat";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AddClassService from "./Locality/Service/addClassService";
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#30875b",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
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
export default function Activity() {
    const tableHeaders = [ 'Class Name', 'Activity Name', 'Status','Edit', 'Delete'];
    const classes = useStyles();
    const [activityList, setActivityList] = useState([]);
    const [classNameList, setClassNameList] = useState([]);
    const [addClassList, setAddClassList] = useState([]);
    const [age, setAge] = React.useState('');
    var [error, setError] = useState(null);
    const [activityIdList, setActivityIdList] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [activity, setActivity] = useState({
        
        classId: '',
        startDate: '',
        endDate: '',
        description: '',
        activityName: '',
        status: '',
    });
    const validationSchema = Yup.object().shape({
        classId: Yup.string().required('Class Name is required'),
        startDate: Yup.string().required('Start Date is required'),
        endDate: Yup.string().required('End Date is required'),
        description: Yup.string().required('Description is required'),
        activityName: Yup.string().required('ActivityName is required'),
        status: Yup.string().required('status  is required'),
    });
    useEffect(() => {
        getActivityList();
        getAddClassList();
        return () => {
            setActivityIdList([]);
            setActivityList([]);
            setAddClassList([]);
            // setClassNameList([]);
        }
    }, []);
    const handleOpen = () => {
        setOpen(true);
    };
    const onclick = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const onSubmit = data => {
        console.log(JSON.stringify(data, null, 2));
    };
    const getActivityList = () => {
        ActivityService.getAllActivity().then((res) => {
            setActivityList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getAddClassList = () => {
        AddClassService.getAllAddClass().then((res) => {
            setAddClassList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getClassNameList = (event) => {
        AddClassService.getAddClassNameById({ className: event.target.value }).then((res) => {
          
            setClassNameList(res);

        }).catch((err) => {
            setError(err.message);
        });
    }
    const editActivity = (activity) => {
        
        activity.classId = activity.classId ? activity.classId._id :'';
        setActivity(activity)
        handleOpen()
    }
    const deleteActivity = (activitydelete) => {
        if (activitydelete) {
            ActivityService.deleteActivity(activitydelete).then((res) => {
                getActivityList();
            }).catch((err) => {
            });
        }
    };
   
    const formik = useFormik({
        initialValues: activity,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            const userDetails = JSON.parse(localStorage.getItem("userDetail"));
            values.schooleId = userDetails._id;
            if (activity._id) {
                ActivityService.upadeActivity(values).then((res) => {
                    handleClose();
                    getActivityList();
                    resetForm()
                    alert("Activity Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                ActivityService.creteActivity(values).then((res) => {
                    getActivityList();
                    resetForm();
                    handleClose();
                    alert(" Activity Added Successfully.");
                    // props.history.push('/app/vendor');
                })
                    .catch((err) => {
                        
                        alert(err.response.data.message)
                    })
            }

        },
    });

    return (

        <>
            <PageTitle title="Activity" button={<Button
                variant="contained" onClick={handleOpen}
                size="medium"
                color="secondary" style={{ backgroundColor: '#30875b' }}> Add Activity
            </Button>} />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Widget title="" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table className="mb-0">
                            <TableHead >
                                <TableRow>
                                    {tableHeaders.map(key => (
                                        <StyledTableCell key={key}>{key}</StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {activityList.map((activity) => (
                                    <TableRow key={activity._id}>
                                       
<TableCell className="pl-3 fw-normal" >{activity.classId.className}</TableCell>
                                        <TableCell className="pl-3 fw-normal" >{activity.activityName}</TableCell>
                                       
                                        <TableCell>{activity.status ? 'Active' : 'In Active'}</TableCell>

                                        <TableCell>
                                            <EditIcon style={{ cursor: 'pointer' }} onClick={() => editActivity(activity)} >
                                            </EditIcon >
                                        </TableCell>
                                        <TableCell>
                                            <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteActivity(activity)} />
                                        </TableCell>
        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Widget>
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Activity</DialogTitle>
                <form onSubmit={formik.handleSubmit} >
                    <DialogContent>
                        <FormControl variant="standard" fullWidth="true" >
                            <InputLabel id="demo-simple-select-standard-label">Class Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="className"
                                name="classId"
                                label="className"
                                value={formik.values.classId}
                                onChange={formik.handleChange}                                  
                                error={formik.touched.classId && Boolean(formik.errors.classId)}
                                helperText={formik.touched.classId && formik.errors.classId}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {addClassList.map(({ _id, className }) => (
                                    <MenuItem key={_id} value={_id}>{className}
                                        {/* <Checkbox checked={formik.values.categoryId.indexOf(parent) > -1} /> */}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>

                        <TextField
                            InputProps={{ style: { width: 370 } }}
                            margin="dense"
                            id="activityName"
                            name="activityName"
                            label="Activity Name"
                            type="text"
                            variant="standard"
                            value={formik.values.activityName}
                            onChange={formik.handleChange}
                            error={formik.touched.activityName && Boolean(formik.errors.activityName)}
                            helperText={formik.touched.activityName && formik.errors.activityName}
                        />
                       <form className={classes.container} noValidate>
                                        <TextField InputProps={{ style: { width: 370 } }}
                                            id="startDate"
                                            name="startDate"
                                            label="Date Of Start "
                                            type="date"
                                            defaultValue="2017-05-24"
                                            value={formik.values.startDate}
                                            onChange={formik.handleChange}
                                            error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                            helperText={formik.touched.startDate && formik.errors.startDate}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>

                                    <form className={classes.container} noValidate>
                                        <TextField InputProps={{ style: { width: 370 } }}
                                            id="endDate"
                                            name="endDate"
                                            label="Date Of End "
                                            type="date"
                                            defaultValue="2017-05-24"
                                            value={formik.values.endDate}
                                            onChange={formik.handleChange}
                                            error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                            helperText={formik.touched.endDate && formik.errors.endDate}
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </form>
                        <TextField
                            InputProps={{ style: { width: 370 } }}
                            autoFocus
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            variant="standard"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                       
                        <FormControl variant="standard" fullWidth>
                            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
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


