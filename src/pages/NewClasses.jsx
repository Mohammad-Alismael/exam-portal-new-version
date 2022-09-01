import ResponsiveAppBar from "../layouts/ResponsiveAppBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import {TextField} from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClassCard from "../components/ClassCard";
import { Button } from '@material-ui/core';
import { Typography } from "@mui/material";
import { connect, useSelector } from "react-redux";
import {Course, getCourses} from "../api/services/Course";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import {Outlet} from "react-router";
import User from "../api/services/User";
import {axiosPrivate, token} from "../api/axios";
import {FETCH_CLASSROOMS} from "../api/services/RouteNames";
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
        height: 190,
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
    const [section, setSection] = useState("");
    const [loading, setLoading] = React.useState(true);
    const course = new Course();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const createClass = () => {
        setLoading(true);
        course
            .createCourse(newClassName,section, user["user_id"])
            .then((res) => {
                toast(res["message"]);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
        setOpen(false);
    }
    const handleClose = () => {
        setOpen(false);

    };
    useEffect(  () => {
        let isMounted = true;
        const controller = new AbortController();

        getCourses(controller).then((data)=>{
            isMounted && setCourses(data['result'])
            isMounted && setLoading(false)
        })

        return ()=>{
            isMounted = false
            controller.abort()
        }
    }, []);
    return (
        <>
            <ResponsiveAppBar />
            {!loading ? (
                <Grid container spacing={2} className={classes.root}>
                    {courses.map(({ class_name, classroom_id,section }, index) => {
                        return <ClassCard
                            key={index}
                            id={classroom_id}
                            classname={class_name}
                            section={section}
                        />;
                    })}
                    {courses?.length === 0 ? (
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
                    {parseInt(user?.role_id) === 3 ? (
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
                    <Grid container spacing={4}>
                        <Grid item xs={6} md={6} xl={6}>
                            <TextField
                                onChange={(e) => setNewClassName(e.target.value)}
                                autoFocus
                                margin="dense"
                                id="class_name"
                                label="new class name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6} md={6} xl={6}>
                            <TextField
                                onChange={(e) => setSection(e.target.value)}
                                autoFocus
                                margin="dense"
                                id="section"
                                label="section"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={createClass}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default NewClasses;
