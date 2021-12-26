import React from 'react';
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import * as Actions from "../../store/actions";
import {connect} from "react-redux";

function Text(props) {
    const handleChange = (e) => {
        // [{questionId:"",userAnswer:""}]
        const deepCopy = [...props.examStudent.answeredQuestions]
       const questionFound = deepCopy.findIndex(function(item,index){
           if (item.questionId === props.questionId)
               return true;
       })
        console.log(questionFound)
        if(questionFound == -1){
            deepCopy.push({questionId:props.questionId, userAnswer: e.target.value})
            props.setAnsweredQuestionsArray(deepCopy)
        }else {
            deepCopy[questionFound] = {questionId:props.questionId, userAnswer: e.target.value}
            props.setAnsweredQuestionsArray(deepCopy)
        }
    }
    return (
        <Grid item xs={12}>
            <TextField id="filled-basic"
                       label="long answer text"
                       fullWidth
                       onChange={handleChange}
                       variant="standard" />
        </Grid>
    );
}
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
export default connect(mapStateToProps,mapDispatchToProps)(Text);