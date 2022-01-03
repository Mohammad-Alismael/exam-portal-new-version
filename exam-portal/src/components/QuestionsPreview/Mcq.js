import React, {Component, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import QuestionHeader from "../QuestionHeader";
import {makeStyles} from "@material-ui/core/styles";
import * as Actions from "../../store/actions";
import {connect} from "react-redux";
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
function Mcq(props) {
    const classes = useStyles();
    const [options,setOptions] = React.useState([]);
    const [answerKey,setAnswerKey] = React.useState([]);
    const [questionIndex,setQuestionIndex] = React.useState(0)
    const setOptionText = (e) =>{

        let id = e.target.id;
        let optionValue = e.target.value;
        const deepCopy = [...props.questions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })

        const foundIndex = deepCopy[questionFound]['questionOptions'].findIndex(function(item,index){
            if (item.id == id)
                return true;
        })

        deepCopy[questionFound]['questionOptions'][foundIndex] = {...deepCopy[questionFound]['questionOptions'][foundIndex],
            optionValue}
        deepCopy[questionFound] = {...deepCopy[questionFound]}
        props.setQuestionArray(deepCopy)

    }

    const loadOptions = (index) =>{
        console.log("question found =>",answerKey[0])
        return(
            <>
                <Grid item xs={1}>
                    <FormControlLabel
                        value={index}
                        control={<Radio checked={index == answerKey[0]['correctAnswer']}/>}  label="" />
                </Grid>
                <Grid item xs={11}>
                <TextField
                    id={options[index]['id']}
                    label={""}
                    size="small"
                    variant="filled"
                    defaultValue={options[index]['optionValue']}
                    onChange={setOptionText}
                    fullWidth
                />
                </Grid>
            </>
        )
    }
    const handleCorrectAnswerUpdate = (e) =>{
        console.log("from update =>",e.target)
        const deepCopyForAnswerKey = [...answerKey]
        deepCopyForAnswerKey[0] = {...deepCopyForAnswerKey[0],correctAnswer:parseInt(e.target.value)}
        setAnswerKey([...deepCopyForAnswerKey])
        const deepCopy = [...props.questions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })

        deepCopy[questionFound] = {...deepCopy[questionFound],answerKeys:deepCopyForAnswerKey};
        console.log("from deep copy=>", deepCopy[questionFound])
        setAnswerKey(deepCopyForAnswerKey)
        props.setQuestionArray(deepCopy)
    }
    useEffect(()=>{
        const questionFound = props.questions.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })
        setQuestionIndex(questionFound)
        setOptions([...props.options])
        console.log(props.options)
        setAnswerKey(props.questions[questionIndex]['answerKeys'])
        console.log("from mcqs",props.correctAnswer)
        console.log("question found =>",questionIndex)
        console.log(props.questions[questionIndex]['answerKeys'][0]['correctAnswer'])
    },[])

    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    points={props.points}
                    whoCanSee={props.whoCanSee}
                    questionText={props.questionText}
                    isActive={props.isActive}
                    options={props.isActive}
                    selectedType={1}
                />
                <Grid xs={12} container>
                    <Grid item
                          style={{marginLeft:12}}
                          justifyContent="center"
                          alignItems="center"
                          xs={12}>
                        <RadioGroup onChange={handleCorrectAnswerUpdate}>
                            <Grid container style={{padding:'10px 0'}}>
                            {
                                options.map((val,index)=>{
                                    return loadOptions(index)
                                })
                            }
                            </Grid>
                        </RadioGroup>
                    </Grid>
                </Grid>

            </Grid>
        </Paper>
        )

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

export default connect(mapStateToProps,mapDispatchToProps)(Mcq);