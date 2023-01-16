import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { TextField } from "@material-ui/core";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClassCard from "./ClassCard";
import { Button } from "@material-ui/core";
import { Fab, FormGroup, Typography } from "@mui/material";
import { connect, useSelector } from "react-redux";
import {
    createCourse,
    enrollToCourse,
    getCourses,
} from "../../api/services/Course";
import { toast } from "react-toastify";
import LinearProgress from "@mui/material/LinearProgress";
import AddIcon from "@mui/icons-material/Add";
import jwt from "jwt-decode";
import { token } from "../../api/axios";
import CryptoJS from "crypto-js";
import Switch from "@mui/material/Switch";
import useClipboard from "react-hook-clipboard";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardMedia from "@mui/material/CardMedia";
import * as PropTypes from "prop-types";
import CreateClassroom from "./CreateClassroom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { CourseContainer } from "../../components/Sidebar/Sidebar.styles";
import ContainerWithHeader from "../../components/ContainerWithHeader/ContainerWithHeader";

const useStyles = makeStyles((theme) => ({
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
    addClassBtn: {
        position: "absolute",
        bottom: "3%",
        right: "2%",
    },
    defaultImgs: {
        width: 290,
        margin: 1,
        cursor: "pointer",
    },
}));

function Courses(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [clipboard, copyToClipboard] = useClipboard();
    const user = useSelector((state) => state.UserReducerV2).user;

    const handleClickOpen = () => {
        setOpen(true);
    };
    const setLoadingProp = (val) => {
        setLoading(val);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        getCourses(controller).then((data) => {
            console.log("courses => ", data)
            isMounted && setCourses(data);
            isMounted && setLoading(false);
        });

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);
    return (
        <>
            <ResponsiveAppBar />
            {!loading ? (
                <>
                    <Sidebar />
                    <CourseContainer>
                        <ContainerWithHeader
                            title={"latest announcements"}
                            children={
                                <p style={{color: '#fff'}}>i will add a component here</p>
                            }
                        />
                        <ContainerWithHeader
                            title={"overview courses"}
                            children={
                                <Grid container spacing={2}>
                                    {courses.map(
                                        (
                                            { class_name, classroom_id, section, instructor_info,img_path },
                                            index
                                        ) => {
                                            return (
                                                <ClassCard
                                                    username={
                                                        parseInt(user?.role_id) === 3
                                                            ? user.username
                                                            : instructor_info["username"]
                                                    }
                                                    key={index}
                                                    courseId={classroom_id}
                                                    id={classroom_id}
                                                    classname={class_name}
                                                    section={section}
                                                    img_path={img_path}
                                                    options={
                                                        user.role_id == 3
                                                            ? ["invitation link"]
                                                            : ["withdraw course"]
                                                    }
                                                    functions={
                                                        user.role_id == 3
                                                            ? [
                                                                function (e) {
                                                                    const user_data = jwt(token);
                                                                    const textBeforeHash = `${classroom_id}:${user_data.username}`;
                                                                    let encrypted = encodeURIComponent(
                                                                        CryptoJS.AES.encrypt(
                                                                            textBeforeHash,
                                                                            process.env.REACT_APP_INVITATION_KEY
                                                                        )
                                                                    ).toString();
                                                                    copyToClipboard(
                                                                        window.location.origin +
                                                                        "/invitation/" +
                                                                        encrypted
                                                                    );
                                                                    toast.info("copied to clipboard");
                                                                },
                                                            ]
                                                            : [
                                                                function (e) {
                                                                    toast.info("withdraw course");
                                                                },
                                                            ]
                                                    }
                                                />
                                            );
                                        }
                                    )}
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
                                </Grid>
                            }
                        />

                        {parseInt(user?.role_id) === 3 ? (
                            <div className={classes.addClassBtn}>
                                <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                                    <AddIcon />
                                </Fab>
                            </div>
                        ) : null}
                    </CourseContainer>
                    <CreateClassroom
                        open={open}
                        loading={loading}
                        setLoadingProp={setLoadingProp}
                        onClose={handleClose}
                        courses={courses}
                        setCourses={setCourses}
                    />
                </>
            ) : (
                <LinearProgress />
            )}
        </>
    );
}

export default Courses;
