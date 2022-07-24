import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClassCard from "../components/ClassCard";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import jwt from "jwt-decode";
import { connect, useSelector } from "react-redux";
import Course from "../api/services/Course";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import * as Actions from "../store/actions";
import {isExpired} from "react-jwt";
import User from '../api/services/User'
import {axiosPrivate} from "../api/axios";
const useStyles = makeStyles((theme) => ({
    root: {
        position: "absolute",
        top: "9%",
        padding: "1rem",
        backgroundColor: "#1a1a1a",
        height: "91.98vh",
        width: "100vw",
        overflow: "hidden",
    },
    createClass: {
        height: 185,
        "& button": {
            marginLeft: "50%",
            transform: "translate(-50%,200%)",
        },
    },
    noClass: {
        transform: "translate(0%,100%)",
    },
}));
function NewClasses(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.UserReducerV2).user;
    const [open, setOpen] = React.useState(false);
    const [courses, setCourses] = React.useState([]);
    const [newClassName, setNewClassName] = useState("");
    const [loading, setLoading] = React.useState(true);
    const course = new Course();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setLoading(true);
        course
            .createCourse(newClassName, user["user_id"])
            .then((res) => {
                toast(res["message"]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        setOpen(false);
    };
    useEffect(() => {
        course.fetchCourses().then((res) => {
            if (res != null) {
                setCourses([...res]);
                setLoading(false);
            }
        });
    }, [loading]);
    return (
        <>
            <ResponsiveAppBar />
            {!loading ? (
                <Grid container spacing={2} className={classes.root}>
                    {courses.map(({ class_name, id }, index) => {
                        return <ClassCard key={index} id={id} classname={class_name} />;
                    })}
                    {courses.length == 0 ? (
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.createClass}>
                                <Typography
                                    variant={"h5"}
                                    align={"center"}
                                    className={classes.noClass}
                                >
                                    you haven't join any courses yet.
                                </Typography>
                            </Card>
                        </Grid>
                    ) : null}
                    {user["role_id"] == 3 ? (
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className={classes.createClass}>
                                <Button variant="contained" color="warning" onClick={handleClickOpen}>
                                    New Class
                                </Button>
                            </Card>
                        </Grid>
                    ) : null}
                </Grid>
            ) : (
                <LinearProgress />
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new class, please enter class name. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        onChange={(e) => setNewClassName(e.target.value)}
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
    );
}

export default NewClasses;
