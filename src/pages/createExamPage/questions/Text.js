import React, { Component } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import QuestionHeader from "./QuestionHeader";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import withQuestion from "./withQuestion";
function Text() {
    return (
        <Grid xs={12} style={{ marginLeft: 12 }}>
            <TextField
                id="filled-basic"
                label="long answer text"
                fullWidth
                variant="standard"
            />
        </Grid>
    );
}

export default withQuestion(Text);
