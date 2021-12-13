import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from 'moment'
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 20,
        minHeight: '3vh',
        maxHeight: '8vh',
        width: '48%',
        margin: "30px auto",

    },
    textField: {
        width: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        // backgroundColor: "Red",
    },

}));
function AnnouncementComponent(props)  {
    const classes = useStyles();

        return (
            <Paper elevation={3} className={classes.paperStyle}>
                <Grid container>
                    <Grid item xs={10} className={classes.container}>
                        <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                            username
                        </Typography>
                    </Grid>
                    <Grid item xs={2} className={classes.container}>
                        <Typography style={{color:"black",fontSize:'16px'}} sx={{ ml: 1, flex: 1 }} variant="subtitle2" >
                            {moment(props.createdAt).fromNow()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                            <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                                {props.text}
                            </Typography>
                    </Grid>
                </Grid>

            </Paper>
        );

}



export default AnnouncementComponent;