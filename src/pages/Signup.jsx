import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { SignUpAction } from "../actions/SignUpAction";
import { authStyles } from "../utils/global/useStyles";
import withContainer from "../components/withContainer";

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
            <FormControl fullWidth sx={{ mt: 4,mb: 4 }}>
                <InputLabel id="demo-simple-select-label">User Type</InputLabel>
                <Select

                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="User type"
                    onChange={(e) => setType(e.target.value)}
                >
                    <MenuItem value={1}>Undergraduate</MenuItem>
                    <MenuItem value={2}>Graduate</MenuItem>
                    <MenuItem value={3}>Instructor</MenuItem>
                </Select>
            </FormControl>

            <Button
                onClick={submit}
                variant="contained"
                color="warning"
                type="submit"
                sx={{ mt: 3, mb: 3, width: "45%", ml: "27%" }}
                id={"sign_up"}
                size="large"
            >
                <b>sign up</b>
            </Button>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (data, callback) => dispatch(SignUpAction(data, callback)),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(withContainer({ title: "sign up" })(Signup));
