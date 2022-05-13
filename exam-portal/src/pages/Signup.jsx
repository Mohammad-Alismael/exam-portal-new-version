import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import Navbar from "../Container/Navbar";
import {SignUpAction} from "../actions/SignUpAction"

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
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        maxWidth: '320px',
        align: 'center',
    },
    signUpBtn: {
        margin: theme.spacing(3, 0, 2),
        textTransform: 'none',
        fontSize: 17,
        maxWidth: '40%',
        maxHeight: '50px',
        padding: '16px'
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
            main: 'rgb(0,0,0)',
        },
        secondary: {
            main: 'rgb(255,208,94)',
        }
    }
})


function Signup(props) {
    const classes = useStyles();
    const [type, setType] = React.useState('');
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const submit = (e) => {
        if (username != '' && password != '') {
            e.preventDefault()
            const data = {
                username,
                password,
                emailId: email,
                roleId: type
            }
            props.signUp(data,()=>{
                navigate("/");
            })
        }else{
            toast.warn('you cannot leave username or password field empty!')
        }
    }
    return (
        <div>
            <Navbar type={2}/>
            <Grid item md={12} sm={12} style={{ backgroundColor: '#161b22', padding: '7%' }}>
                <Paper elevation={10} className={classes.paperStyle}>
                    <div className={classes.paper}>
                        <ThemeProvider theme={theme2}>
                            <Typography variant="h3">
                                <b>Sign up</b>
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
                                        onChange={e => (setEmail(e.target.value))}
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
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
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="User type"
                                            onChange={(e)=>(setType(e.target.value))}
                                        >
                                            <MenuItem value={1}>instructor</MenuItem>
                                            <MenuItem value={2}>undergraduate</MenuItem>
                                            <MenuItem value={3}>graduate</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </ThemeProvider>
                        </Grid>
                        <ThemeProvider theme={theme2}>
                            <Button
                                onClick={submit}
                                variant="contained"
                                color="secondary"
                                type="submit"
                                fullWidth
                                className={classes.signUpBtn}
                                size="large"
                                ><b>sign up</b>
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
        userV2: state.UserReducerV2
    }
}
const mapDispatchToProps = dispatch => {
    return {
        signUp : (data,callback) => dispatch(SignUpAction(data,callback))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);