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
    }
}));
function NoAnnouncement(props) {
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const user = useSelector((state) => state.UserReducerV2).user;
    const course = useSelector((state) => state.CourseReducer);
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography
                        style={{ color: "black" }}
                        sx={{ ml: 1, flex: 1 ,textTransform: 'capitalize',padding: '0.8rem'}}
                        variant="body1"
                    >
                        {parseInt(user.role_id) !== 3 ? "no announcement from your insinuator":
                            "you have not announced anything yet"}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default NoAnnouncement;
