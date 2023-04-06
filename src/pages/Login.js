import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { connect, useDispatch } from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import { loginAction } from "../actions/UserActions";
import { toast } from "react-toastify";
import {CircularProgress, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import { theme } from "../utils/global/useStyles";
import withContainer from "../components/withContainer";

const useStyles = makeStyles((theme) => ({
    forgotPasswordBox: {
        display: "flex",
        justifyContent: "center",
    }
}));

function Login(props) {
    const classes = useStyles(theme);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {state} = useLocation()
    const navigate = useNavigate();
    const submit = (e) => {
        e.preventDefault();
        if (username !== "" && password !== "") {
            setLoading(true)
            dispatch(
                loginAction(username, password, (res) => {
                    navigate(state?.path || "/courses");
                })
            );
            setLoading(false)
        } else {
            toast("username or password field is missing!");
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.target.click();
        }
    };
    return (
        <div>
            <TextField
                onChange={(e) => setUsername(e.target.value)}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="Username"
                label="Username"
                name="username"
                autoComplete="email"
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
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                disabled={isLoading}
                onClick={submit}
                onKeyDown={handleKeyPress}
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mb: 3, width: "45%", ml: "27%" }}
                size="large"
            >
                {isLoading ? <CircularProgress size={24} /> : <b>login</b>}
            </Button>
            <Divider style={{ margin: "0px 0px 20px" }} />

            <Box className={classes.forgotPasswordBox}>
                <Link href="/forgot-password">{"Forgot your password?"}</Link>
            </Box>
        </div>
    );
}

export default withContainer({ navBarType: 1, title: "login" })(Login);
