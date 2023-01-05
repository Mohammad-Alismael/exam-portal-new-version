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
import { RESET_PASSWORD } from "../api/services/RouteNames";
import withContainer from "../components/withContainer";

function ResetPassword(props) {
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
        </div>
    );
}
export default withContainer({ navBarType: 2,title: "Reset Password" })(ResetPassword);
