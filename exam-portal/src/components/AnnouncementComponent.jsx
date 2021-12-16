import React, {Component, useEffect} from 'react';
import PropTypes from 'prop-types';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import moment from 'moment'
import axios from "axios";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 20,
        minHeight: '3vh',
        maxHeight: '8vh',
        width: '48%',
        margin: "30px auto",

    },
    userContainer : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignSelf: 'center'
    },
    largeIcon: {
        width: 40,
        height: 40,
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
    const [username,setUsername] = React.useState('')
    const getUserInfoById = async (id) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/get-user-by-id', {
                userId: props.user_id
            }).then((data) => {
                resolve(data.data.username)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no user id!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    useEffect(()=>{
        getUserInfoById(props.user_id).then((data)=>{
            setUsername(data)
        })
    },[])
        return (
            <Paper elevation={3} className={classes.paperStyle}>
                <Grid container>
                    <Grid xs={10} className={classes.userContainer}>
                        <AccountCircle className={classes.largeIcon}
                                        size="large" />
                        <Typography style={{color:"black"}} sx={{ ml: 1, flex: 1 }} variant="h6">
                            {username}
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