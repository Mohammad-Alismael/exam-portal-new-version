import React, {Component, useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import {makeStyles} from "@material-ui/core/styles";
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
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
function QuestionHeader(props) {
    const classes = useStyles();
    const [questionText,setQuestionText] = React.useState("");
    const [whoCanSee,setWhoCanSee] = React.useState(0);
    const [points,setPoints] = React.useState(0)
    const updateQuestionText = (e) =>{
        setQuestionText(e.target.value)
        const deepCopy = [...props.questions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })
        console.log(questionFound)
        if(questionFound != -1){
            deepCopy[questionFound]['question'] = {...deepCopy[questionFound]['question'],questionText:e.target.value}
            props.setQuestionArray(deepCopy)
        }

    }
    const handleWhoCanSee = (e) => {
        setWhoCanSee(parseInt(e.target.value))
        const deepCopy = [...props.questions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })
        deepCopy[questionFound]['question'] = {...deepCopy[questionFound]['question'],whoCanSee:parseInt(e.target.value)}
        props.setQuestionArray(deepCopy)
    }
    const handlePoints = (e) =>{
        setPoints(parseInt(e.target.value))
        const deepCopy = [...props.questions]
        const questionFound = deepCopy.findIndex(function(item,index){
            if (item.question.questionId === props.questionId)
                return true;
        })
        deepCopy[questionFound]['question'] = {...deepCopy[questionFound]['question'],points:parseInt(e.target.value)}
        props.setQuestionArray(deepCopy)
    }
    const deleteQuestion = () => {
        axios.post('http://localhost:8080/delete-question', {
            questionId: props.questionId,
            creatorExamId: props.user.user_id
        }).then(console.log).catch(console.log)
        // window.location.reload();
    }
    useEffect(()=>{
        // setQuestionText(props.questionText)
        // setWhoCanSee(props.whoCanSee)
        // setPoints(props.points)
    },[])
    return (
            <>
                <Grid xs={4} item>
                    <TextField
                        id="filled-basic"
                        label="Question text"
                        size="small"
                        value={questionText}
                        fullWidth
                        onChange={updateQuestionText}
                        variant="standard" />

                </Grid>
                {/*<ImageIcon style={{ height: '40px', width: '40px',margin: '20px 5px',cursor: "pointer" }}/>*/}
                <Grid xs={3} item>
                    <FormControl fullWidth variant="standard" >
                        <InputLabel id="type">Question Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            disabled={true}
                            value={props.selectedType}
                            label="Question type"
                        >
                            <MenuItem value={1}>MCQs</MenuItem>
                            <MenuItem value={2}>Text</MenuItem>
                            <MenuItem value={3}>Checkbox</MenuItem>
                            <MenuItem value={4}>Matching</MenuItem>
                            <MenuItem value={5}>True/False</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={3} item>
                    <FormControl fullWidth variant="standard" >
                        <InputLabel id="type">Who can see</InputLabel>
                        <Select
                            value={whoCanSee}
                            label="Who can see"
                            onChange={handleWhoCanSee}
                        >
                            <MenuItem value={1}>Undergraduate</MenuItem>
                            <MenuItem value={2}>Graduate</MenuItem>
                            <MenuItem value={3}>Undergraduate & Graduate</MenuItem>

                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={2} item>
                    <FormControl fullWidth variant="standard" >
                    <TextField
                        type="number"
                        fullWidth
                        value={points}
                        onChange={handlePoints}
                        variant="standard"
                        inputProps={{ min: 1, max: 100 }}
                        label={"points"}/>
                    </FormControl>
                    <DeleteOutlinedIcon
                        onClick={deleteQuestion}
                        className={classes.deleteIcon}/>
                </Grid>
            </>
        )

}

const mapStateToProps = state => {
    return {
        questions : state.ExamReducer.questions,
        user : state.UserReducer
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

export default connect(mapStateToProps,mapDispatchToProps)(QuestionHeader);