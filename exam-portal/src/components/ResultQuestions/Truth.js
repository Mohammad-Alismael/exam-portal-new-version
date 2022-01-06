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
    const selectColor = (index) =>{
        console.log("index =>", index)
        console.log("user answer=>", props.userAnswer);
        console.log("correct Answer=>", props.userAnswer);
        console.log("first condition=>",props.userAnswer == index && props.userAnswer == props.correctAnswer)
        console.log("second condition=>",props.userAnswer == index && props.userAnswer != props.correctAnswer)
        console.log("second condition=>",props.correctAnswer == index)
        if (props.userAnswer == index && props.userAnswer != props.correctAnswer){
            return "green"
        }
        if (props.userAnswer == index && props.userAnswer == props.correctAnswer){
            return "red"
        }
        if (props.correctAnswer == index){
            return "green"
        }


    }
    return (
        <RadioGroup style={{marginLeft:12}}>
            <FormControlLabel value={1} control={<Radio checked={props.userAnswer == 0} />} label={<Typography color={selectColor(0)}>True</Typography> } />
            <FormControlLabel value={0} control={<Radio checked={props.userAnswer == 1}/>} label={<Typography color={selectColor(1)}>False</Typography>} />
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