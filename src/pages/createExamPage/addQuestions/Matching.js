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
import {useDispatch, useSelector} from "react-redux";
import {v4 as uuidv4} from "uuid";
import {SET_ANSWER_KEY, SET_OPTIONS} from "../../../store/actions";
import {store} from "../../../index";
const useStyles = makeStyles((theme) => ({
}));
function Matching ({updateQuestionArray}) {
    const classes = useStyles();
    const [options, setOptions] = React.useState([]);
    const [optionValue,setOptionValue] = React.useState('');
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    const addMatchingOption = (e) => {
        e.preventDefault()
        let id = uuidv4();
        let newObj = {
            id,
            optionValue
        }
        updateQuestionArray({options: [...options, newObj]})
        setOptions([...options, newObj])
    }
    const SetCorrectAnswer = (e) =>{
        updateQuestionArray({answerKey: parseInt(e.target.value)})
    }

    return (
            <>
                <Grid item xs={4}>
                    <FormControl fullWidth variant="standard" margin={'normal'}>
                        <InputLabel id="type">Question Options</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            label="Question Options"
                            onChange={SetCorrectAnswer}
                        >
                            {
                                options.map((val,index)=>{
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
            </>
        );

}


export default Matching;