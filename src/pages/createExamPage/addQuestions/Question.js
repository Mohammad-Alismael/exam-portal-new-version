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
const Question = ({uid}) => {
    const classes = useStyles();
    const question = useSelector((state) => state.AddQuestionReducer);
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();

    const getQuestionIndex = () =>{
        const questionIndexFound = exam?.questions.findIndex((quest,index)=>{
            return quest.tmpId === uid
        })
        console.log('index',questionIndexFound)

        return questionIndexFound
    }
    const updateQuestionArray = (object)=>{
        const key = Object.keys(object)[0]
        const value = Object.values(object)[0]
        const index = getQuestionIndex()
        const deepCopy = exam?.questions
        const deepCopyObj = deepCopy[index]
        deepCopyObj[key] = value
        deepCopy[index] = deepCopyObj
        // deepCopy[index] = {...deepCopy[index], ...object}
        dispatch({ type: SET_QUESTIONS, payload: { questions:deepCopy}});
    }
    const chooseQuestionType = (questionType) => {
        if (questionType === 1){
            return  <Mcq questionIndex={getQuestionIndex()} updateQuestionArray={updateQuestionArray}/>
        }else if(questionType === 2){
            return <Text questionIndex={getQuestionIndex()} updateQuestionArray={updateQuestionArray}/>;
        }else if(questionType === 3){
            return <CheckBoxComp getQuestionIndex={getQuestionIndex} updateQuestionArray={updateQuestionArray}/>
        }else if(questionType === 4){
            return <Matching getQuestionIndex={getQuestionIndex} updateQuestionArray={updateQuestionArray}/>
        }else {
            return <Truth getQuestionIndex={getQuestionIndex} updateQuestionArray={updateQuestionArray}/>
        }
    }
    useEffect(()=>{
        const questionObj = {
            answerKey: null,
            isActive: true,
            options: null,
            points: 5,
            questionText: "",
            questionType: 5,
            tmpId: uid,
            whoCanSee: 3
        }
        const newQuestionAr = exam.questions;
        newQuestionAr.push(questionObj)
        dispatch({ type: SET_QUESTIONS, payload: { questions:newQuestionAr}});
    },[])

    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader questionIndex={getQuestionIndex()} updateQuestionArray={updateQuestionArray}/>
                {chooseQuestionType(exam.questions[getQuestionIndex()].questionType, uid)}
            </Grid>
        </Paper>
    );
};

export default Question;