import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import {toast} from "react-toastify";
import * as Actions from "../../store/actions";
import {connect} from "react-redux";
import { Typography } from '@mui/material';

const Truth = (props) => {
    const handleChange = (e) => {
        // [{questionId:"",userAnswer:""}]
        const deepCopy = [...props.examStudent.answeredQuestions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.questionId === props.questionId)
                return true;
        })
        console.log(questionFound)
        if(questionFound == -1){
            deepCopy.push({questionId:parseInt(props.questionId), userAnswer: parseInt(e.target.value)})
            props.setAnsweredQuestionsArray(deepCopy)
        }else {
            deepCopy[questionFound] = {questionId:parseInt(props.questionId), userAnswer: parseInt(e.target.value)}
            props.setAnsweredQuestionsArray(deepCopy)
        }
    }
    return (
        <RadioGroup style={{marginLeft:12}} onChange={handleChange}>
            <FormControlLabel value={1} control={<Radio />} label={<Typography>True</Typography> } />
            <FormControlLabel value={0} control={<Radio />} label={<Typography>False</Typography>} />
        </RadioGroup>
    );
};
const mapStateToProps = state => {
    return {
        user : state.UserReducer,
        examStudent: state.ExamStudentReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setAnsweredQuestionsArray: (questions) => dispatch({type:Actions.SET_NEW_ANSWER_QUESTION_ARRAY,
            payload : {questions}})

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Truth);