import React from 'react';
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
import logo from '../img/logo.png'


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
    logo: {
        maxWidth: '20%',
    },
    form: {
        width: '350px',
        marginTop: theme.spacing(1),
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
            main: 'rgb(255,208,94)',
        }
    }
})


function Signup() {
    const classes = useStyles();

    return (
        <div>



            <AppBar position="fixed" color="white" elevation={0} >
                <Toolbar style={{ marginLeft: '12%', marginRight: '12%', }}>

                    <img src={logo} className={classes.logo} alt="Exam Portal" />

                    <Typography variant="body2" className={classes.title} style={{ color: '#666666' }} align="right">
                        Already have an account? <Link href="/">Login</Link>
                    </Typography>
                </Toolbar>
            </AppBar>




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
                        </Grid>
                        <ThemeProvider theme={theme2}>
                            <Button variant="contained" color="primary" type="submit" fullWidth className={classes.signin} size="large"
                                    style={{ maxWidth: '40%', maxHeight: '50px', margin: '40px 0px 40px', padding: '16px' }}><b>sign up</b>
                            </Button>
                        </ThemeProvider>
                    </div>
                </Paper>
            </Grid>
        </div>
    );
}

export default Signup;