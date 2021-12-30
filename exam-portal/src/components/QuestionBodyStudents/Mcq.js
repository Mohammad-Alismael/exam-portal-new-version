import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from "@mui/material/Grid";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import * as Actions from "../../store/actions";



function Mcq(props) {
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
        <RadioGroup
            name="radio-buttons-group"
            onChange={handleChange}
        >
            { props.options.map((val,index)=>{
                return (
                    <Grid item fullwidth>
                        <FormControlLabel value={index} control={<Radio />} label={val['optionValue']} />
                    </Grid>
                )
            })

            }

        </RadioGroup>
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
export default connect(mapStateToProps,mapDispatchToProps)(Mcq);