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
import {connect, useSelector} from "react-redux";
import withAddQuestion from "./withAddQuestion";
import { v4 as uuidv4 } from 'uuid';
import {toast} from "react-toastify";

function Mcq({ updateQuestionArray }) {
    const [options, setOptions] = React.useState([]);
    const [answerKey, setAnswerKey] = React.useState([]);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const [optionValue, setOptionValue] = React.useState("");
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);

    const addOption = (e) => {
        e.preventDefault()
        let id = uuidv4();
        let newObj = {
            id,
            optionValue
        }
        if (options.length <= 4)
            setOptions([...options,newObj])
        else
            toast.info('MCQ question can only have 4 options max!')
    };

    const setOptionText = (e) =>{
        const id = e.target.id;
        const optionIndexFound = options.findIndex((option,index)=>{
            if (option.id === id)
                return true;
        })
        const tmp = [...options]
        tmp[optionIndexFound] = {...tmp[optionIndexFound],optionValue:e.target.value}
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
    // const handleCorrectAnswerUpdate = (e) => {
    //     console.log("from update =>", e.target);
    //     const deepCopyForAnswerKey = [...answerKey];
    //     deepCopyForAnswerKey[0] = {
    //         ...deepCopyForAnswerKey[0],
    //         correctAnswer: parseInt(e.target.value),
    //     };
    //     setAnswerKey([...deepCopyForAnswerKey]);
    //     const deepCopy = [...props.questions];
    //     const questionFound = deepCopy.findIndex(function (item, index) {
    //         if (item.question.questionId === props.questionId) return true;
    //     });
    //
    //     deepCopy[questionFound] = {
    //         ...deepCopy[questionFound],
    //         answerKeys: deepCopyForAnswerKey,
    //     };
    //     console.log("from deep copy=>", deepCopy[questionFound]);
    //     setAnswerKey(deepCopyForAnswerKey);
    //     props.setQuestionArray(deepCopy);
    // };
    useEffect(() => {
        // const questionFound = props.questions.findIndex(function (item, index) {
        //     if (item.question.questionId === props.questionId) return true;
        // });
        // setQuestionIndex(questionFound);
        // setOptions([...props.options]);
        //
        // setAnswerKey(props.questions[questionIndex]["answerKeys"]);
        // console.log("from mcqs", props.correctAnswer);
    }, []);

    return (
        <Grid xs={12} container>
            <Grid
                item
                style={{ marginLeft: 12 }}
                justifyContent="center"
                alignItems="center"
                xs={12}
            >
                <RadioGroup onChange={(e)=>(alert(e.target.value))}>
                    <Grid container>
                        {options.map((val, index) => {
                            return loadOptions(index);
                        })}
                    </Grid>
                    <br />
                    <Grid container>
                        <Grid item xs={8}>
                            <TextField
                                // id={exam.questions[id]['options'][index]["id"]}
                                label={"option value"}
                                size="small"
                                variant="filled"
                                fullWidth
                                onChange={(e)=>(setOptionValue(e.target.value))}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button
                                variant={"outlined"}
                                variant="contained"
                                size={"medium"}
                                fullWidth
                                onClick={addOption}
                            >
                                submit option
                            </Button>
                        </Grid>
                    </Grid>
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

export default Mcq;
