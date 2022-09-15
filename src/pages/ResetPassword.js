import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import Navbar from "../layouts/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import ForgotPassword from "./ForgotPassword";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPrivate } from "../api/axios";
import {RESET_PASSWORD} from "../api/services/RouteNames";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "7%",
    },
    container: {
        padding: 30,
        width: "32%",
        margin: "30px auto",
    },

    border: {
        borderBottom: "2px solid lightgray",
        width: "100%",
    },
}));

function ResetPassword(props) {
    const classes = useStyles();
    const { reset_token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        axiosPrivate
            .post(RESET_PASSWORD, {
                reset_token,
                new_password: newPassword,
            })
            .then((res) => {
                toast.info(res.data.message);
                navigate("/");
            })
            .catch((error) => {
                toast.warn(error.response.data.message);
            });
    };
    return (
        <div>
            <Navbar type={2} />
            <Grid className={classes.root} item md={12} sm={12}>
                <Paper elevation={10} className={classes.container}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                        <b>Reset password</b>
                    </Typography>
                    <Divider style={{ margin: "30px 0px 0px" }} />
                    <Grid item md={12} sm={12} xs={6}>
                        <form noValidate>
                            <TextField
                                onChange={(e) => setNewPassword(e.target.value)}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                label="new password"
                                name="newPassword"
                                autoComplete="text"
                                autoFocus
                                align="center"
                            />
                        </form>
                        <Button
                            onClick={submit}
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            size="large"
                        >
                            <b>Submit</b>
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
export default ResetPassword;
