import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import axios from "axios";
import withAddQuestion from "./withAddQuestion";
import {useSelector} from "react-redux";
const useStyles = makeStyles((theme) => ({
}));
function Matching ({id}) {
    const classes = useStyles();
    // const [options,setOptions] = React.useState([...props.options]);
    const [optionValue,setOptionValue] = React.useState('');
    // const [correctAnswer,setCorrectAnswer] = React.useState([...props.correctAnswer]);
    const exam = useSelector((state) => state.ExamReducer);

    // const removeItem = (e) => {
    //     toast.info(e.target.value)
    // }
    // const addMatchingOption = () =>{
    //     console.log(optionValue);
    //     const deepCopy = [...props.questions]
    //     const questionFound = deepCopy.findIndex(function(item,index){
    //         if (item.question.questionId === props.questionId)
    //             return true;
    //     })
    //     assignOption(props.questionId,optionValue)
    //     deepCopy[questionFound] = {...deepCopy[questionFound],
    //         questionOptions: [...options,{id:options[options.length - 1]['id']+1,optionValue,questionId:props.questionId}]}
    //     props.setQuestionArray(deepCopy)
    //     setOptions([...options,{id:options[options.length - 1]['id']+1,optionValue,questionId:props.questionId}])
    // }
    // const changeCorrectAnswer = (e) =>{
    //     const deepCopy = [...correctAnswer]
    //     deepCopy[0] = {...deepCopy[0],correctAnswer:e.target.value}
    //     setCorrectAnswer(deepCopy)
    //     const deepCopyForQuestions = [...props.questions]
    //     const questionFound = deepCopyForQuestions.findIndex(function(item,index){
    //         if (item.question.questionId === props.questionId)
    //             return true;
    //     })
    //
    //     deepCopyForQuestions[questionFound] = {...deepCopyForQuestions[questionFound],
    //     answerKeys: deepCopy[0]}
    //     props.setQuestionArray(deepCopyForQuestions)
    // }
    // const assignOption = (questionId,optionValue) => {
    //     axios.post('http://localhost:8080/set-question-options',{
    //         questionId,
    //         optionValue
    //     }).then(console.log).catch(console.log)
    // }
    useEffect(()=>{
        // console.log("matching correct answer =>",options)
    },[])
    return (
            <>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="standard" margin={'normal'}>
                        <InputLabel id="type">Question Options</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            label="Question Options"
                            // onChange={changeCorrectAnswer}
                            // value={correctAnswer[0]['correctAnswer']}
                        >
                            {
                                exam.questions[id]['options'].map((val,index)=>{
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
                        // onClick={addMatchingOption}
                        size={"small"}>Add option</Button>
                </Grid>
            </>
        );

}


export default Matching;