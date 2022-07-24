import React, {useState} from 'react';
import Navbar from "../layouts/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {createTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {toast} from "react-toastify";
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
function ForgotPassword(props) {
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/user/forgot-password',{
            email_id: email
        }).then((res)=> {
            console.log('data from backend',res);
            toast.info(res.data.message)
        }).catch((error)=>{
            toast.info(error.response.data.message)
        })
    }
    return (
        <div>
            <ThemeProvider theme={theme2}>
            <Navbar type={2}/>
            <Grid className={classes.root} item md={12} sm={12} >
                <Paper elevation={10} className={classes.container}>
                    <Typography variant="h3">
                        <b>Forgot password?</b>
                    </Typography>
                    <Divider style={{ margin: '30px 0px 0px' }} />
                        <Grid className={classes.paper} item md={12} sm={12} xs={6}>
                            <form noValidate>
                                <TextField
                                    onChange={e => (setEmail(e.target.value))}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Email"
                                    label="email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    align="center"
                                    />
                            </form>
                            <Button
                                onClick={submit}
                                variant="contained"
                                color="secondary"
                                type="submit"
                                fullWidth
                                className={classes.signUpBtn}
                                size="large"
                            ><b>Submit</b>
                            </Button>
                        </Grid>
                </Paper>
            </Grid>
            </ThemeProvider>
        </div>
    );
}

export default ForgotPassword;