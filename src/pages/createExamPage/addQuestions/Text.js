import React, {Component, useEffect} from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import withAddQuestion from "./withAddQuestion";
import {useDispatch, useSelector} from "react-redux";
import {SET_ANSWER_KEY, SET_QUESTIONS} from "../../../store/actions";
import {store} from "../../../index";
function Text({updateQuestionArray}) {
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        updateQuestionArray({options: null})
    },[])

    return (
        <Grid xs={12} style={{ marginLeft: 12 }}>
            <TextField
                id="filled-basic"
                label="long answer text"
                fullWidth
                value={'instructor must check answers manually'}
                disabled={true}
                variant="standard"
            />
        </Grid>
    );
}

export default Text;
