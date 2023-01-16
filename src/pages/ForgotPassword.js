import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { setForgetPassword } from "../api/services/User";
import withContainer from "../components/withContainer";

function ForgotPassword(props) {
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
            <TextField
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="Email"
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                align="center"
            />
            <Button
                sx={{ mt: 4 }}
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

export default withContainer({ navBarType: 2, title: "Forgot Password?" })(
    ForgotPassword
);
