import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import Navbar from "../Container/Navbar";
import Box from "@mui/material/Box";
import {loginAction} from "../actions/LoginAcion";
import axios from "axios";
import {toast} from "react-toastify";
import Token from "../store/reducers/Token";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
    paperStyle: {
        padding: 30,
        height: "100%",
        width: '35%',
        margin: "30px auto"
    },
    paper: {
        marginTop: theme.spacing(7),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        maxWidth: '20%',
    },
    form: {
        maxWidth: '320px',
        align: 'center',
    },
    signInBtn: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        fontSize: 17,
        maxWidth: '40%',
        maxHeight: '50px',
        padding: '16px'
    },
    forgotPasswordBox : {
        display: 'flex',
        justifyContent: 'center'
    },
    title: {
        flexGrow: 1,
    },

    container: {
        display: "flex",
        alignItems: "center"
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
            marginTop: -40,
            color: '#161b22'
        },
    },
    palette: {
        primary: {
            main: 'rgb(22,27,34)',
        },
        secondary: {
            main: 'rgb(255,208,94)',
        }
    }
})


function Login(props) {
    const classes = useStyles();
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault()
        if (username !== '' && password !== '') {
            props.setUserData(username, password, (res)=> {
                navigate('/classes')
            })
        }else {
            toast('username or password field is missing!')
        }

    }
    return (
        <div style={{ backgroundColor: '#161b22',height: '100vh'}}>
            <Navbar type={1}/>
            <Grid container xl={12} md={12} sm={12} style={{padding: '7%'}}>
                <Paper elevation={10} className={classes.paperStyle}>
                    <div className={classes.paper}>
                        <ThemeProvider theme={theme2}>
                            <Typography variant="h3">
                                <b>Login</b>
                            </Typography>
                        </ThemeProvider>
                    </div>
                    <Divider style={{ margin: '30px 0px 0px' }} />
                    <div className={classes.paper}>
                        <Grid item md={12} sm={12} xs={6}>
                            <ThemeProvider theme={theme2}>
                                <form className={classes.form} noValidate>
                                    <TextField
                                        onChange={e => (setUsername(e.target.value))}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="Username"
                                        label="Username"
                                        name="Username"
                                        autoComplete="email"
                                        autoFocus
                                        align="center"
                                    />
                                    <TextField
                                        onChange={e => (setPassword(e.target.value))}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                </form>
                            </ThemeProvider>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <ThemeProvider theme={theme2}>
                            <Button
                                onClick={submit}
                                variant="contained"
                                color="secondary"
                                type="submit"
                                fullWidth
                                className={classes.signInBtn}
                                size="large"
                                ><b>Login</b>
                            </Button>
                        </ThemeProvider>
                    </div>
                    <Divider style={{ margin: '0px 0px 20px' }} />
                        <Box className={classes.forgotPasswordBox}>
                            <Link href="#">
                                {"Forgot your password?"}
                            </Link>
                        </Box>
                </Paper>
            </Grid>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        token: state.Token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setUserData : (username,password,callback) => dispatch(loginAction(username,password,callback))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);