import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import QuestionHeader from "../QuestionHeader";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import * as Actions from "../../store/actions";
import {connect} from "react-redux";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: '15vh auto',
        width: '50%',
        margin: "30px auto",
        position: 'relative'
    },
    textField: {
        width: '100%',
    },
    dropDown: {
        margin:"50px"
    },
    deleteIcon : {
        float: "right",
        cursor: "pointer",
        position: 'absolute',
        top: 15,
        right: 15
        // paddingTop: 20
    }
}));
function Matching (props) {
    const classes = useStyles();
    const [options,setOptions] = React.useState([...props.options]);
    const [optionValue,setOptionValue] = React.useState('');
    const [correctAnswer,setCorrectAnswer] = React.useState([...props.correctAnswer])
    const removeItem = (e) => {
        toast.info(e.target.value)
    }
    const addMatchingOption = () =>{
        console.log(optionValue);
        const deepCopy = [...props.questions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })
        assignOption(props.questionId,optionValue)
        deepCopy[questionFound] = {...deepCopy[questionFound],
            questionOptions: [...options,{id:options[options.length - 1]['id']+1,optionValue,questionId:props.questionId}]}
        props.setQuestionArray(deepCopy)
        setOptions([...options,{id:options[options.length - 1]['id']+1,optionValue,questionId:props.questionId}])
    }
    const changeCorrectAnswer = (e) =>{
        const deepCopy = [...correctAnswer]
        deepCopy[0] = {...deepCopy[0],correctAnswer:e.target.value}
        setCorrectAnswer(deepCopy)
        const deepCopyForQuestions = [...props.questions]
        const questionFound = deepCopyForQuestions.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })

        deepCopyForQuestions[questionFound] = {...deepCopyForQuestions[questionFound],
        answerKeys: deepCopy[0]}
        props.setQuestionArray(deepCopyForQuestions)
    }
    const assignOption = (questionId,optionValue) => {
        axios.post('http://localhost:8080/set-question-options',{
            questionId,
            optionValue
        }).then(console.log).catch(console.log)
    }
    useEffect(()=>{
        console.log("matching correct answer =>",options)
    },[])
    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    questionId={props.questionId}
                    points={props.points}
                    whoCanSee={props.whoCanSee}
                    questionText={props.questionText}
                    isActive={props.isActive}
                    options={props.isActive}
                    selectedType={4}
                />
                <Grid item xs={4}>
                    <FormControl fullWidth variant="standard" margin={'normal'}>
                        <InputLabel id="type">Question Options</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            label="Question Options"
                            onChange={changeCorrectAnswer}
                            value={correctAnswer[0]['correctAnswer']}
                        >
                            {
                                options.map((val,index)=>{
                                    console.log(val)
                                    return <MenuItem
                                        value={index}
                                        >{val['optionValue']}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={7} >
                    <FormControl fullWidth margin={'normal'}>
                        <TextField
                            label="Add Option"
                            size="small"
                            fullWidth
                            onChange={(e)=>
                               (setOptionValue(e.target.value))}
                            variant="standard"/>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={addMatchingOption}
                        size={"small"}>Add option</Button>
                </Grid>
            </Grid>
        </Paper>
        );

}
const mapStateToProps = state => {
    return {
        questions : state.ExamReducer.questions,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        appendQuestion: (question) => dispatch({type:Actions.APPEND_QUESTION,
            payload : {question}}),
        setQuestionArray: (newQuestionArray) => dispatch({type:Actions.SET_NEW_QUESTION_ARRAY,
            payload : {newQuestionArray}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Matching);