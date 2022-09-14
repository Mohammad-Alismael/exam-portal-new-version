import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import * as Actions from "../store/actions";
import { connect } from "react-redux";
import Navbar from "../layouts/Navbar";
import { SignUpAction } from "../actions/SignUpAction";
import { theme, authStyles } from "../utils/global/useStyles";

function Signup(props) {
    const classes = authStyles();
    const [type, setType] = React.useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const submit = (e) => {
        if (username != "" && password != "") {
            e.preventDefault();
            const data = {
                username,
                password,
                emailId: email,
                roleId: type,
            };
            props.signUp(data, () => {
                navigate("/");
            });
        } else {
            toast.warn("you cannot leave username or password field empty!");
        }
    };
    return (
        <div>
                <Navbar type={2} />
                <Grid item md={12} sm={12} style={{padding: "7%" }}>
                <Paper elevation={10} className={classes.paperStyle}>
                        <div className={classes.paper}>
                            <Typography variant="h3">
                                <b>Sign up</b>
                            </Typography>
                        </div>
                        <Divider style={{ margin: "30px 0px 0px" }} />
                        <div className={classes.paper}>
                            <Grid item md={12} sm={12} xs={6}>
                                <form className={classes.form} noValidate>
                                    <TextField
                                        onChange={(e) => setUsername(e.target.value)}
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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">
                                            User Type
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="User type"
                                            onChange={(e) => setType(e.target.value)}
                                        >
                                            <MenuItem value={1}>undergraduate</MenuItem>
                                            <MenuItem value={2}>graduate</MenuItem>
                                            <MenuItem value={3}>instructor</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </Grid>

                            <Button
                                onClick={submit}
                                variant="contained"
                                color="warning"
                                type="submit"
                                fullWidth
                                id={'sign_up'}
                                className={classes.signUpBtn}
                                size="large"
                            >
                                <b>sign up</b>
                            </Button>
                        </div>
                    </Paper>
                </Grid>

        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (data, callback) => dispatch(SignUpAction(data, callback)),
    };
};

export default connect(null, mapDispatchToProps)(Signup);
