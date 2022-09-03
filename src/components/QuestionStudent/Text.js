import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {SET_QUESTION_USER_ANSWER} from "../../store/actions";
import {useDispatch} from "react-redux";
function Text() {
    const dispatch = useDispatch();
    const handleChange = (e) => {
        e.preventDefault()
        dispatch({
            type: SET_QUESTION_USER_ANSWER,
            payload: {userAnswer: e.target.value},
        });
    }
    return (
        <Grid xs={12} style={{ marginLeft: 12 }}>
            <TextField
                onChange={handleChange}
                id="filled-basic"
                label="long answer text"
                fullWidth
                variant="standard"
            />
        </Grid>
    );
}

export default Text;
