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
function Mcq({ id }) {
    const [options, setOptions] = React.useState([]);
    const [answerKey, setAnswerKey] = React.useState([]);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const exam = useSelector((state) => state.ExamReducer);

    // const setOptionText = (e) => {
    //     let id = e.target.id;
    //     let optionValue = e.target.value;
    //     const deepCopy = [...props.questions];
    //     const questionFound = deepCopy.findIndex(function (item, index) {
    //         if (item.question.questionId === props.questionId) return true;
    //     });
    //
    //     const foundIndex = deepCopy[questionFound]["questionOptions"].findIndex(
    //         function (item, index) {
    //             if (item.id == id) return true;
    //         }
    //     );
    //
    //     deepCopy[questionFound]["questionOptions"][foundIndex] = {
    //         ...deepCopy[questionFound]["questionOptions"][foundIndex],
    //         optionValue,
    //     };
    //     deepCopy[questionFound] = { ...deepCopy[questionFound] };
    //     props.setQuestionArray(deepCopy);
    // };

    const loadOptions = (index) => {
        return (
            <>
                <Grid item xs={1}>
                    <FormControlLabel
                        value={index}
                        control={<Radio  />}
                        label=""
                    />
                </Grid>
                <Grid item xs={11}>
                    <TextField
                        // id={exam.questions[id]['options'][index]["id"]}
                        label={""}
                        size="small"
                        variant="filled"
                        // defaultValue={exam.questions[id]['options'][index]["optionValue"]}
                        // onChange={setOptionText}
                        fullWidth
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
                    {/*<Grid container style={{ padding: "10px 0" }}>*/}
                    {/*    {exam.questions[id]['options'].map((val, index) => {*/}
                    {/*        return loadOptions(index);*/}
                    {/*    })}*/}
                    {/*</Grid>*/}
                </RadioGroup>
            </Grid>
        </Grid>
    );
}

export default Mcq;
