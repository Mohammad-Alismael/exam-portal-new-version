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
import {SET_ANSWER_KEY} from "../../../store/actions";
import {store} from "../../../index";
function Text({updateQuestionArray}) {
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({ type: SET_ANSWER_KEY, payload: { answerKey: null } });
        updateQuestionArray(store.getState()['AddQuestionReducer'])
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
