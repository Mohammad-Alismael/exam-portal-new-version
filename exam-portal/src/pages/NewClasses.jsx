import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ClassCard from "../Components/ClassCard";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import jwt from 'jwt-decode';
import {connect} from "react-redux";
import Course from '../api/services/Course'
import {toast} from "react-toastify";
import LinearProgress from '@mui/material/LinearProgress';
import * as Actions from "../store/actions";
const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: "10%",
        padding: '1rem',
        backgroundColor: '#1a1a1a',
        height: '91.98vh',
        width: '100vw',
        overflow: 'hidden'
    },
    createClass: {
        height: 250,
        "& button": {
            marginLeft: '50%',
            marginTop: '50%',
            transform: 'translate(-50%,-175%)'
        }
    },
    noClass: {
        marginTop: '50% !important',
        transform: 'translate(0%,-100%)'
    }
}));
function NewClasses(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [roleID,setRoleID] = React.useState(null);
    const [userID,setUserID] = React.useState(null);
    const [courses,setCourses] = React.useState([])
    const [newClassName,setNewClassName] = useState('');;
    const [loading, setLoading] = React.useState(true);
    const course = new Course(props.token['access_token']['accessToken']);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setLoading(true)
        course.createCourse(newClassName, userID).then((res)=>{
            toast(res['message']);
            setLoading(false);
            window.location.reload();
        }).catch((error)=>{
            console.log(error)
        })
        setOpen(false);
    };
    useEffect(()=>{
        const user_data = jwt(props.token['access_token']['accessToken'])
        props.isTokenExpired()
        if (props.token.isExpired) {
            setUserID(user_data['user_id'])
            setRoleID(user_data['role_id'])
            course.fetchCourses()
                .then((res) => {
                    if(res['message'] == null){
                        setCourses(res)
                    }
                    setLoading(false)
                })
        }else {
            toast('user timed out!')
        }
    },[])
    return (
        <>
           <ResponsiveAppBar/>
            { !loading ? <Grid
                container
                  spacing={2} className={classes.root}>
                 {
                     courses.map(({class_name,id},index)=>{
                         return <ClassCard id={id} classname={class_name}/>
                     })
                 }
                 { courses.length == 0 ? <Grid item xs={12} sm={6} md={3}>
                     <Card className={classes.createClass}>
                         <Typography variant={'h5'} align={'center'} className={classes.noClass}>you haven't join any courses yet.</Typography>
                     </Card>
                 </Grid> : null}
                { roleID == 3 ? <Grid item xs={12} sm={6} md={3}>
                    <Card className={classes.createClass}>
                        <Button variant="contained" onClick={handleClickOpen}>New Class</Button>
                    </Card>
                </Grid> : null}
            </Grid> : <LinearProgress /> }

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new class, please enter class name. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        onChange={e => (setNewClassName(e.target.value))}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="new class name"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
const mapStateToProps = state => {
    return {
        token : state.TokenReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        isTokenExpired: () => dispatch({type:Actions.isExpired})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewClasses);