import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as Actions from "../../store/actions";
import {connect, useSelector} from "react-redux";
import { Typography } from '@mui/material';

function Text({questionIndex}) {
    const {submissions} = useSelector((state) => state.SubmissionsReducer);

    const handleChange = (e) => {

    }
    return (
        <Grid item xs={12}>
            <TextField
                id="filled-basic"
                label="student's answer"
                fullWidth
                disabled={true}
                defaultValue={submissions[questionIndex]['userAnswer']}
                variant="standard"
            />
        </Grid>
    );
}

export default Text;