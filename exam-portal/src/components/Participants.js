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
import Box from "@mui/material/Box";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 10,
        height:'5vh',
        width: '50%',
        margin: "5px",
        borderBottom: '1px solid rgba(217, 217, 217, 1)',

    },
    textField: {
        width: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },

}));
function Participants (props) {
    const classes = useStyles();

        return (
            <Box elevation={0} className={classes.paperStyle} sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
                <IconButton sx={{ p: '10px' }}>
                    <AccountCircle color="primary" size="large" />
                </IconButton>
                <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                    {props.username}
                </Typography>
            </Box>

        );

}

Participants.propTypes = {};

export default Participants;