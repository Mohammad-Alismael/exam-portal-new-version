import React, { Component, useEffect, useState } from "react";
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
import Divider from "@mui/material/Divider";
import Comment from "../../../components/Comment";
import classNames from "classnames";
import classnames from "classnames";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: "10px",
        margin: "auto auto 0.8rem auto",
    },
    userContainer: {
        width: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        justifyItems: "center",
    },
    icon: {
        marginTop: "0.2rem",
    },
    userInfo: {
        // backgroundColor: 'red',
        display: "inline-flex",
        position: "relative",
    },
    username: {
        color: "black",
        fontSize: "1.2rem",
        margin: 0,
        padding: 0,
    },
    userType: {
        display: "inline-block",
        color: "#818181",
        fontSize: "0.7rem",
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
    },
    uploadPreview: {
        padding: "0.8rem 0",
        maxWidth: "calc(100%)",
    },
    howManyComments: {
        marginTop: '0.62rem',
        marginBottom: 0,
        color: "#818181",
        fontSize: "0.85rem",
        cursor: "pointer",
    },
    commentContainer: {
        marginTop: '0.62rem',
        backgroundColor: "#D9D9D9",
        padding: "0.6rem",
    },
    commentContainerOpen: {
        display: "block",
    },
    commentContainerClose: {
        display: "none",
    },
    addComment: {

    }
}));
function AnnounceComponent(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector((state) => state.CourseReducer);
    const [openCommentContainer, setOpenCommentContainer] = useState(false);
    const handleComments = (e) => {
        e.preventDefault();
        setOpenCommentContainer(!openCommentContainer);
    };
    return (
        <Paper elevation={5} className={classes.paperStyle}>
            <div className={classes.userContainer}>
                <div className={classes.userInfo}>
                    <Avatar
                        className={classes.icon}
                        alt={"m"}
                        src="/static/images/avatar/2.jpg"
                    />
                    <div style={{ marginLeft: "0.8rem" }}>
                        <Typography className={classes.username}>
                            <b>{course.course_info?.instructor?.username}</b>
                        </Typography>
                        <Typography className={classes.userType}>Instructor</Typography>
                    </div>
                </div>
                <Typography
                    style={{ color: "#898989" }}
                    sx={{ mr: 2, mt: 2 }}
                    variant="subtitle2"
                >
                    {moment(props.createdAt).fromNow()}
                </Typography>
            </div>

            {props.file != null ? (
                <Grid item xs={12}>
                    <img className={classes.uploadPreview} src={props.file} alt={"img"} />
                </Grid>
            ) : null}
            <Grid item xs={12}>
                <Typography
                    style={{ color: "black" }}
                    sx={{ ml: 1, mb: 1, flex: 1 }}
                    variant="body1"
                >
                    {props.text}
                </Typography>
            </Grid>
            <Divider />
            <div onClick={handleComments}>
                <p className={classes.howManyComments}>43 comments</p>
            </div>
            <div
                className={classnames(
                    classes.commentContainer,
                    openCommentContainer
                        ? classes.commentContainerOpen
                        : classes.commentContainerClose
                )}
            >
                <Comment text={"how this even possible"} />
                <Comment text={"i don't get this fam?"} />
                <Comment text={"how this even possible"} />
                <Comment text={"i don't get this fam?"} />
                <Comment text={"how this even possible"} />
                <Comment text={"i don't get this fam?"} />
                <Comment text={"how this even possible"} />
                <Comment text={"i don't get this fam?"} />
                <div className={classes.addComment}>

                </div>
            </div>
        </Paper>
    );
}

export default AnnounceComponent;
