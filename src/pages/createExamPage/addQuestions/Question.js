import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import {Paper} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";
import Truth from "./Truth";
import {useDispatch, useSelector} from "react-redux";
import Mcq from "./Mcq";
import Text from "./Text";
import CheckBoxComp from "./CheckBoxComp";
import Matching from "./Matching";
import { v4 as uuidv4 } from 'uuid';

import {SET_QUESTION_TEXT, SET_TMP_ID} from "../../../store/actions";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        position: 'relative',
        padding: '15px 20px',
        marginTop: "2rem",
    }
}));
const questionTypes = [
    <Mcq />,
    <Text />,
    <CheckBoxComp />,
    <Matching />,
    <Truth />
]
const Question = () => {
    const classes = useStyles();
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({ type: SET_TMP_ID, payload: { tmpId:uuidv4()}});
    },[])
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader/>
                {questionTypes[question?.questionType - 1]}
            </Grid>
        </Paper>
    );
};

export default Question;