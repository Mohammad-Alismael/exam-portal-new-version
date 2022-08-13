import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { connect, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import withAddQuestion from "./withAddQuestion";
const Truth = () => {
    // const [answerKey,setAnswerKey] = React.useState([]);
    // const [isLoading, setIsLoading] = React.useState(false);
    // const handleChange = (e) =>{
    //     console.log(e.target)
    //     const deepCopyForAnswerKey = [...answerKey]
    //     deepCopyForAnswerKey[0] = {...deepCopyForAnswerKey[0],correctAnswer:parseInt(e.target.value)}
    //     setAnswerKey([...deepCopyForAnswerKey])
    //     const deepCopy = [...props.questions]
    //     const questionFound = deepCopy.findIndex(function(item,index){
    //         if (item.question.questionId === props.questionId)
    //             return true;
    //     })
    //
    //     deepCopy[questionFound] = {...deepCopy[questionFound],answerKeys:deepCopyForAnswerKey[0]}
    //     props.setQuestionArray(deepCopy)
    // }
    // useEffect(()=>{
    //     setIsLoading(false)
    //     const questionFound = props.questions.findIndex(function(item,index){
    //         if (item.question.questionId === props.questionId)
    //             return true;
    //     })
    //     console.log("answer key =>",props.questions[questionFound]['answerKeys'])
    //     setAnswerKey([...props.questions[questionFound]['answerKeys']])
    //     setIsLoading(true)
    // },[])

    return (
        <RadioGroup style={{ marginLeft: 12 }}>
            <FormControlLabel
                value={1}
                control={<Radio />}
                label={"True"}
            />
            <FormControlLabel
                value={0}
                control={<Radio  />}
                label={"False"}
            />
        </RadioGroup>
    );
};

export default Truth;
