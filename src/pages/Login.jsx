import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import Box from "@mui/material/Box";
import { loginAction } from "../actions/LoginAcion";
import { toast } from "react-toastify";
import {TextField} from "@material-ui/core";
import Button from "@mui/material/Button";
import {theme} from "../utils/global/useStyles";
import {useLocation} from "react-router";
import {token} from "../api/axios";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        height: "100vh",
        flexGrow: 1,
        padding: "7%",
    },
    paperStyle: {
        padding: 30,
        height: "70vh",
        width: "35%",
        margin: "30px auto",
    },
    paper: {
        marginTop: theme.spacing(7),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    logo: {
        maxWidth: "20%",
    },
    form: {
        maxWidth: "320px",
        align: "center",
    },
    signInBtn: {
        margin: theme.spacing(3, 0, 2),
        textTransform: "none",
        fontSize: 17,
        maxWidth: "40%",
        maxHeight: "50px",
        padding: "16px",
    },
    forgotPasswordBox: {
        display: "flex",
        justifyContent: "center",
    },
    title: {
        flexGrow: 1,
    },

    container: {
        display: "flex",
        alignItems: "center",
    },
    border: {
        borderBottom: "2px solid lightgray",
        width: "100%",
    },
}));

function Login(props) {
    const classes = useStyles(theme);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const {state} = useLocation()
    const navigate = useNavigate()
    const submit = (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            props.setUserData(username, password, (res) => {
                // navigate(state?.path || "/courses");
                navigate("/courses")
            });
        } else {
            toast("username or password field is missing!");
        }
    };
    return (
        <div>
            <Navbar type={1} />
            <Grid item md={12} sm={12} style={{padding: "7%" }}>
                <Paper elevation={10} className={classes.paperStyle}>
                    <div className={classes.paper}>
                        <Typography variant="h3">
                            <b>Login</b>
                        </Typography>
                    </div>
                    <Divider style={{ margin: "30px 0px 0px" }} />
                    <div className={classes.paper}>
                        <Grid item md={12} sm={12} xs={6}>
                            <form className={classes.form} noValidate>
                                <TextField
                                    onChange={(e) => setUsername(e.target.value)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="Username"
                                    label="Username"
                                    name="Username"
                                    autoComplete="email"
                                    autoFocus
                                    align="center"
                                    color="warning"
                                />
                                <TextField
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    color="warning"
                                />
                            </form>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <Button
                            onClick={submit}
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{mb:3,width: '45%'}}
                            size="large"
                        >
                            <b>Login</b>
                        </Button>
                    </div>
                    <Divider style={{ margin: "0px 0px 20px" }} />
                    <Box className={classes.forgotPasswordBox}>
                        <Link href="/forgot-password">{"Forgot your password?"}</Link>
                    </Box>
                </Paper>
            </Grid>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (username, password, callback) =>
            dispatch(loginAction(username, password, callback)),
    };
};
export default connect(null, mapDispatchToProps)(Login);
