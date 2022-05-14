import React, {useEffect, useState} from 'react';
import {createTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Navbar from "../Container/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height: '100vh',
        flexGrow: 1,
        backgroundColor: '#1a1a1a',
        padding: '7%'
    },
    container: {
        padding: 30,
        height: '270px',
        width: '32%',
        margin: "30px auto",
    },
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'center',
    },

    signUpBtn: {
        margin: theme.spacing(3, 0, 3),
        textTransform: 'none',
        fontSize: 17,
        maxHeight: '50px',
        padding: '16px',
    },

    border: {
        borderBottom: "2px solid lightgray",
        width: "100%"
    },
}));

const theme2 = createTheme({
    typography: {
        h3: {
            fontSize: 32,
            color: '#161b22',
            textAlign: 'center'
        },
    },
    palette: {
        primary: {
            main: 'rgb(0,0,0)',
        },
        secondary: {
            main: 'rgb(255,208,94)',
        }
    }
})
const ActivateEmail = () => {
    const classes = useStyles();
    const {email_token} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{

        axios.post('http://localhost:8081/user/activate',{
            email_token
        }).then((res)=> {
            console.log('data from backend',res);
            toast.success(res.data.message)
            navigate("/");
        }).catch((error)=>{
            toast.info(error.response.data.message)
        })
    },[])
    return (
        <div>
            <ThemeProvider theme={theme2}>
                <Navbar type={2}/>
                <Grid className={classes.root} item md={12} sm={12} >

                </Grid>
            </ThemeProvider>
        </div>
    );
};

export default ActivateEmail;