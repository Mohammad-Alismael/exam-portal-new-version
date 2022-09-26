import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import PublishIcon from "@mui/icons-material/Publish";
import Avatar from '@mui/material/Avatar'
import Box from "@mui/material/Box";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        height:'5vh',
        width: '50%',
        margin: "5px",
        display: 'flex',
        alignItems: 'center'
    },
}));
function Participants (props) {
    const classes = useStyles();

        return (
            <Box elevation={0} className={classes.paperStyle} sx={{ p: '2px 4px'}}>
                <Avatar alt={props.username} src="/static/images/avatar/2.jpg" />
                <Typography style={{color:"black"}} sx={{ ml: 4, flex: 1 }} variant="h6">
                    {props.username}
                </Typography>
            </Box>

        );

}

Participants.propTypes = {};

export default Participants;