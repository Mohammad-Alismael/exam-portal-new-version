import React, {Component, useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import index from "@mui/material/darkScrollbar";
import CircularProgress from '@mui/material/CircularProgress';
import Mcq from "../Components/QuestionsPreview/Mcq";
import Text from "../Components/QuestionsPreview/Text";
import Truth from "../Components/QuestionsPreview/Truth";
import CheckBoxComp from "../Components/QuestionsPreview/CheckBoxComp";
import Matching from "../Components/QuestionsPreview/Matching";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import {Box} from "@mui/material";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import moment from 'moment'
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {toast} from "react-toastify";

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
    }

}));

const theme2 = createTheme({
    typography: {
        h6: {
            fontSize: 32,
            marginTop: -40,
            color: '#161b22'
        },
    },
    palette: {
        primary: {
            main: 'rgb(22,27,34)',
        },
        secondary: {
            main: '#ffd05e',
        }
    }
})

function PreviewExam(props) {
    const classes = useStyles();
    const {examId} = useParams();
    const navigate = useNavigate();
    const [questions,setQuestions] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [examTitle,setExamTitle] = React.useState('');
    const [examPoints,setExamPoints] = React.useState(0);
    const [startingAt,setStartingAt] = React.useState(0);
    const [endingAt,setEndingAt] = React.useState(0);

    const getExamInfo = async () => {
        setIsLoading(false)
        const examInfo = await axios.post('http://localhost:8080/get-exam-id-info', {
            examId
        })
        console.log("exam info=>", examInfo.data)
        setExamTitle(examInfo.data['title'])
        setExamPoints(examInfo.data['score'])
        setStartingAt(examInfo.data['startingAt'])
        setEndingAt(examInfo.data['endingAt'])
    }
    const getExamQuestionsv2 = async () => {

        const questionss = await axios.post('http://localhost:8080/list-questions', {
            examId,
        })

       return questionss.data

    }
    useEffect( ()=>{

        getExamInfo().then(console.log)
        getExamQuestionsv2().then((data)=>{
            console.log("questions =>",data)
            setQuestions([...data])
            props.setQuestionArray([...data])
            setIsLoading(true)
        })

    },[])
    const updateExam = () =>{
        console.log(props.questions)
        updateExamInfo()
        props.questions.map((val,index)=>{
            updateQuestion(val['question'])
            if (val['question']['questionType'] != 3 &&
                val['question']['questionType'] != 5){
                val['questionOptions'].map((val,index)=>{
                    updateOptions(val)
                })
            }
            if (val['question']['questionType'] != 2){
                val['answerKeys'].map((val,index)=>{
                    updateAnswerKey(val)
                })
            }
        })
        props.setQuestionArray([])
        navigate('/course1')
    }
    const updateExamInfo = () => {
        axios.post('http://localhost:8080/update-exam',{
            examId,
            creatorId: props.user.user_id,
            title: examTitle ,
            score:examPoints,
            startingAt: startingAt,
            endingAt: endingAt

    }).then(console.log).catch(console.log)
    }
    const updateQuestion = (data) =>{
        axios.post('http://localhost:8080/update-question', {
            questionId:data['questionId'],
            questionType: data['questionType'],
            creatorExamId: props.user.user_id,
            questionText: data['questionText'],
            points: data['points'],
            examId,
            isActive: 1,
            whoCanSee: data['whoCanSee']
        }).then(console.log).catch(console.log)
    }
    const updateOptions = (data) =>{
        axios.post('http://localhost:8080/update-question-options',{
            id: data['id'],
            questionId: data['questionId'],
            optionValue: data['optionValue']
        }).then(console.log).catch(console.log)
    }

    const updateAnswerKey = (data) => {
        if (data['id'] != -1) {
            axios.post('http://localhost:8080/update-answer-key', {
                id: data['id'],
                questionId: data['questionId'],
                correctAnswer: data['correctAnswer']
            }).then(console.log).catch(console.log)
        }else{
            setAnswerKeyForCheckBox(data)
        }
    }
    const setAnswerKeyForCheckBox = (data) => {
        axios.post('http://localhost:8080/set-answer-key',{
            questionId: data['questionId'],
            correctAnswer: data['correctAnswer']
        }).then(console.log).catch(console.log)
    }
    const updateStartingAt = (e) => {
        setStartingAt(Date.parse(e.target.value))
    }
    const updateEndingAt = (e) => {
        setEndingAt(Date.parse(e.target.value))
    }
    if (!isLoading){
        return <CircularProgress />
    }else {
        return (
            <Box sx={{ mt: 10 }}>
                <AppBar
                    sx={{ position: 'fixed',bgcolor:"#ffd05e"}}>
                    <Toolbar>
                        <Typography style={{color:"black"}} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Exam id : {examId}
                        </Typography>
                        <Button style={{ textTransform: 'none' }}
                                color="primary"
                                onClick={updateExam}
                        >
                            update exam
                        </Button>
                    </Toolbar>
                </AppBar>
                <Paper elevation={3} className={classes.paperStyle}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="filled-basic"
                                       label="exam title"
                                       size="small"
                                       fullWidth
                                       required
                                       value={examTitle}
                                       onChange={(e) =>(setExamTitle(e.target.value))}
                                       variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="points"
                                size="small"
                                type="number"
                                fullWidth
                                value={examPoints}
                                inputProps={{ min: 1 }}
                                onChange={(e) =>(setExamPoints(parseInt(e.target.value)))}
                                required
                                variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="datetime-local"
                                label="Ending At"
                                type="datetime-local"
                                fullWidth
                                defaultValue={new Date(startingAt).toISOString().slice(0,16)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={updateStartingAt}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="datetime-local"
                                label="Ending At"
                                type="datetime-local"
                                fullWidth
                                onChange={updateEndingAt}
                                defaultValue={new Date(endingAt).toISOString().slice(0,16)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                {
                    questions.map((val,index)=>{
                        if (val.question.questionType === 1){
                            return <Mcq
                                questionId={val.question.questionId}
                                questionText={val.question.questionText}
                                correctAnswer={val['answerKeys']}
                                points={val.question.points}
                                options={val.questionOptions}
                                isActive={val.question.isActive}
                                whoCanSee={val.question.whoCanSee}
                            />
                        }else if (val.question.questionType === 2){
                            return <Text
                                questionId={val.question.questionId}
                                questionText={val.question.questionText}
                                correctAnswer={val['answerKeys']}
                                points={val.question.points}
                                isActive={val.question.isActive}
                                whoCanSee={val.question.whoCanSee}
                            />
                        }else if (val.question.questionType === 3){
                            return <CheckBoxComp
                                questionId={val.question.questionId}
                                questionText={val.question.questionText}
                                correctAnswer={val['answerKeys']}
                                points={val.question.points}
                                options={val['questionOptions']}
                                isActive={val.question.isActive}
                                whoCanSee={val.question.whoCanSee}
                            />
                        }else if (val.question.questionType === 4){
                            return <Matching
                                questionId={val.question.questionId}
                                questionText={val.question.questionText}
                                correctAnswer={val['answerKeys']}
                                points={val.question.points}
                                options={val.questionOptions}
                                isActive={val.question.isActive}
                                whoCanSee={val.question.whoCanSee}
                            />
                        }else if (val.question.questionType === 5){
                            return <Truth
                                questionId={val.question.questionId}
                                questionText={val.question.questionText}
                                points={val.question.points}
                                whoCanSee={val.question.whoCanSee}
                            />
                        }
                    })
                }

            </Box>
        );
    }
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

export default connect(mapStateToProps,mapDispatchToProps)(PreviewExam);