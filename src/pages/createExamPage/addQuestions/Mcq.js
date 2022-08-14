import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import * as Actions from "../../../store/actions";
import {connect, useDispatch, useSelector} from "react-redux";
import withAddQuestion from "./withAddQuestion";
import { v4 as uuidv4 } from 'uuid';
import {toast} from "react-toastify";
import {SET_ANSWER_KEY, SET_OPTIONS, SET_QUESTIONS} from "../../../store/actions";
import {store} from "../../../index";

function Mcq({ questionIndex,updateQuestionArray }) {
    const [options, setOptions] = React.useState([]);
    const [optionValue, setOptionValue] = React.useState("");
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();

    const addOption = (e) => {
        e.preventDefault()
        let id = uuidv4();
        let newObj = {
            id,
            optionValue
        }
        if (options.length < 4) {
            updateQuestionArray({options: [...options, newObj]})
            setOptions([...options, newObj])
        }else {
            toast.info('MCQ can only have 4 options max!')
        }
    };

    const setOptionText = (e) =>{
        const id = e.target.id;
        const optionIndexFound = options.findIndex((option,index)=>{
            if (option.id === id)
                return true;
        })
        const tmp = [...options]
        tmp[optionIndexFound] = {...tmp[optionIndexFound],optionValue:e.target.value}
        updateQuestionArray({options: tmp})
        setOptions(tmp)
    }

    const loadOptions = (index) => {
        return (
            <>
                <Grid item xs={12}>
                    <FormControlLabel
                        value={index}
                        control={<Radio  />}
                        label=""
                        sx={{mt: 2}}
                    />
                    <TextField
                        id={options[index]["id"]}
                        label={""}
                        size="small"
                        variant="filled"
                        value={options[index]['optionValue']}
                        sx={{mb: 2}}
                        // defaultValue={exam.questions[id]['options'][index]["optionValue"]}
                        onChange={setOptionText}
                    />
                </Grid>
            </>
        );
    };

    const SetCorrectAnswer = (e) =>{
        updateQuestionArray({answerKey: parseInt(e.target.value)})
    }
    useEffect(()=>{
        console.log(exam.questions[questionIndex])
        // setOptions([...exam.questions[questionIndex].options])
    },[])
    return (
        <Grid xs={12} container>
            <Grid
                item
                style={{ marginLeft: 12 }}
                justifyContent="center"
                alignItems="center"
                xs={12}
            >
                <RadioGroup onChange={SetCorrectAnswer}>
                    <Grid container>
                        {options.map((val, index) => {
                            return loadOptions(index);
                        })}
                    </Grid>
                    <br />
                    <Grid container>
                        <Grid item xs={8}>
                            <TextField
                                label={"option value"}
                                size="small"
                                variant="filled"
                                fullWidth
                                onChange={(e)=>(setOptionValue(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                sx={{mt:2}}
                                variant="contained"
                                size={"medium"}
                                fullWidth
                                onClick={addOption}
                            >
                                add option
                            </Button>
                        </Grid>
                    </Grid>
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

export default Mcq;
