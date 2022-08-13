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

import {SET_QUESTION_TEXT, SET_QUESTIONS, SET_TMP_ID} from "../../../store/actions";
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
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();
    const updateExamQuestions = (_question) =>{
        // i'm taking question object from the store to update it to the latest version
        let examQuestions = exam?.questions
        const questionFound = examQuestions.findIndex((quest, index) => {
            if (quest.tmpId === _question.tmpId)
                return true;
        })
        if (questionFound === -1){
            examQuestions.push(_question)
            dispatch({ type: SET_QUESTIONS, payload: { questions: examQuestions } });
        }else {
            examQuestions[questionFound] = _question
            dispatch({ type: SET_QUESTIONS, payload: { questions: examQuestions } });
        }
    }
    const chooseQuestionType = (questionType) => {
        if (questionType === 1){
            return  <Mcq updateQuestionArray={updateExamQuestions}/>
        }else if(questionType === 2){
            return <Text updateQuestionArray={updateExamQuestions}/>;
        }else if(questionType === 3){
            return <CheckBoxComp updateQuestionArray={updateExamQuestions}/>
        }else if(questionType === 4){
            return <Matching updateQuestionArray={updateExamQuestions}/>
        }else {
            return <Truth updateQuestionArray={updateExamQuestions}/>
        }
    }
    useEffect(()=>{
        dispatch({ type: SET_TMP_ID, payload: { tmpId:uuidv4()}});
    },[])
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader/>
                {chooseQuestionType(question?.questionType)}
            </Grid>
        </Paper>
    );
};

export default Question;