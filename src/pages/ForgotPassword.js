import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    createTheme,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { setForgetPassword } from "../api/services/User";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: "7%",
    },
    container: {
        padding: 30,
        width: "32%",
        margin: "30px auto",
    }
}));

function ForgotPassword(props) {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const submit = (e) => {
        e.preventDefault();
        if (email !== "") {
            setForgetPassword(email)
                .then((res) => {
                    console.log(res);
                    toast.info(res.message);
                })
                .catch((error) => {
                    toast.info(error.message);
                });
        } else {
            toast.info("email text field is empty!");
        }
    };
    return (
        <div>
            <Navbar type={2} />
            <Grid className={classes.root} item md={12} sm={12}>
                <Paper elevation={10} className={classes.container}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                        <b>Forgot password?</b>
                    </Typography>
                    <Divider style={{ margin: "30px 0px 0px" }} />
                    <Grid item md={12} sm={12} xs={6}>
                        <form noValidate>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
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
                            sx={{mt: 6}}
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

export default ForgotPassword;
