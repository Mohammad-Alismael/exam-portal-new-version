import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo from '../img/logo.png'
import {toast } from 'react-toastify';
import axios from "axios";
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: 'blue',
    },
    paperStyle: {
        padding: 30,
        height: '70vh',
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
        // marginTop: theme.spacing(1),
        align: 'center',
    },

    signin: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        fontSize: 17
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
        axios.post('http://localhost:8080/authenticate',{
            username,
            password
        }).then((res)=>{
            props.setUserId(res.data[0]['userId']);
            props.setUsername(username);
            props.setRoleId(res.data[0]['roleId']);
            navigate("/course1");
        }).catch((error)=>{
            if(error.response.status == 400)
                toast.info("incorrect username or password")
            else
                toast.error('error happened!')
        })


    }
    const fetchClassroomId = () => {

    }
    return (
        <div>
            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar style={{ marginLeft: '12%', marginRight: '12%', }}>
                    <img src={logo} className={classes.logo} alt="Exam Portal" />
                    <Typography variant="body2" className={classes.title} style={{ color: '#666666' }} align="right">
                        Don't have an account? <Link href="/signup">Sign up</Link>
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid item md={12} sm={12} style={{ backgroundColor: '#161b22', padding: '7%' }}>
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
                                className={classes.signin}
                                size="large"
                                style={{ maxWidth: '40%', maxHeight: '50px', margin: '40px 0px 40px', padding: '16px' }}><b>Login</b>
                            </Button>
                        </ThemeProvider>
                    </div>
                </Paper>
            </Grid>
        </div>
    );
}
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setUserId: (user_id) => dispatch({type:Actions.SET_USER_ID,
            payload : {user_id}}),
        setUsername: (username) => dispatch({type:Actions.SET_USERNAME,
            payload : {username}}),
        setRoleId: (role_id) => dispatch({type:Actions.SET_ROLE_ID,
            payload : {role_id}}),
        setClassroomId: (classroom_id) => dispatch({type:Actions.SET_CLASSROOM_ID,
            payload: {classroom_id}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);