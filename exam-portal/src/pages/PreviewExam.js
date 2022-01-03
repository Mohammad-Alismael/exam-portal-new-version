import React, {Component, useEffect} from 'react';
import {useParams} from "react-router-dom";
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
        console.log(questions)
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
                                color="inherit"
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
                                // onChange={(e)=>
//                                    (setTotalPoints(parseInt(e.target.value)))}
                                required
                                variant="filled" />
                        </Grid>
                        <Grid item xs={6}>
                            <input
                                id="datetime-local"
                                placeholder="Starting At"
                                type="datetime-local"
                                value={new Date(startingAt).toDateString()}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="datetime-local"
                                label="Ending At"
                                type="datetime-local"
                                fullWidth
                                value={endingAt}
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
                                options={val.questionOptions}
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