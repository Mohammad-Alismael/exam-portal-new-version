import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: "10px",
        minHeight: "3vh",
        // maxHeight: '8vh',
        // width: '48%',
        margin: "auto auto 0.8rem auto",
    },
    userContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "start",
        alignSelf: "center",
    },
    largeIcon: {
        width: 40,
        height: 40,
    },
    textField: {
        width: "100%",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        // backgroundColor: "Red",
    },
    uploadPreview: {
        padding: "0.8rem 0",
        maxWidth: "calc(100%)",
        // height: '75%'
    },
}));
function AnnounceComponent(props) {
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector((state) => state.CourseReducer);
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container>
                <Grid xs={10} className={classes.userContainer}>
                    <Avatar alt={"m"} src="/static/images/avatar/2.jpg" />
                    <Typography
                        style={{ color: "black", margin: "0.2rem 1rem" }}
                        variant="h6"
                    >
                        {course.course_info?.instructor?.username}
                    </Typography>
                </Grid>
                <Grid item xs={2} className={classes.container}>
                    <Typography
                        style={{ color: "black" }}
                        sx={{ ml: 1, flex: 1 }}
                        variant="subtitle2"
                    >
                        {moment(props.createdAt).fromNow()}
                    </Typography>
                </Grid>
                {props.file != null ? (
                    <Grid item xs={12}>
                        <img
                            className={classes.uploadPreview}
                            src={props.file}
                            alt={"img"}
                        />
                    </Grid>
                ) : null}
                <Grid item xs={12}>
                    <Typography
                        style={{ color: "black" }}
                        sx={{ ml: 1, flex: 1 }}
                        variant="body1"
                    >
                        {props.text}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default AnnounceComponent;
