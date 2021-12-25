import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ImageIcon from '@mui/icons-material/Image';
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import {toast} from "react-toastify";
import QuizBody from "./QuizBody";
import index from "@mui/material/darkScrollbar";
import {connect} from "react-redux";
import * as Actions from '../store/actions';
import {useEffect} from "react";
import axios from "axios";

import {useNavigate} from "react-router-dom";

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


function Quiz(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        let sumPoints = 0;
        // const len = props.questions.questions.length
        // for (let i = 0; i < len; i++) {
        //     let points = props.questions.questions[i]['points'];
        //     console.log(points)
        //     sumPoints += points
        // }
        console.log("sum points => ", sumPoints)
        console.log("total points => ", totalPoints)
        if (sumPoints <= totalPoints){
            assignExamsInfo().then((data)=>{
                setExamId(data['examId'])
                props.questions.questions.map(((val, index1) => {
                    assignQuestion(
                        data['examId'],
                        val.QuestionType
                        ,val.questionText
                        ,val.points
                        ,val.WhoCanSee).then((data)=>{
                        console.log("question data => " , data)
                        // console.log("question => ",data['questionId'])
                        if (data['questionType'] != 2) {
                            console.log("this is not a text question")
                            console.log("options=>", val['options'])
                            val['options'].map((val, index) => {
                                console.log(val)
                                assignOptions(data['questionId'], val).then((data)=>{
                                    console.log("assignOptions => ",data);
                                })
                            })
                        }

                        assignCorrectAnswer(data['questionId'],val['correctAnswer']).then((data)=>{
                            console.log("assignCorrectAnswer =>",data);
                            props.emptyQuestions([])
                            navigate("/course1");
                        })

                    })
                }))
            })

            console.log("questions array =>", props.questions.questions)

        }else {
            toast.warn('you exceeded total points')
        }

        setOpen(false);
    };

    const [howManyQuestions, setHowManyQuestions] = React.useState(1);
    const [totalPoints,setTotalPoints] = React.useState(0);
    const [examTitle,setExamTitle] = React.useState('');
    const [startingAt,setStartingAt] =  React.useState(0);
    const [endingAt,setEndingAt] =  React.useState(0);
    const [examId,setExamId] = React.useState('')
    const assignExamsInfo = async () => {

        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/add-exam', {
                title: examTitle,
                score: totalPoints,
                creatorId: props.user.user_id,
                startingAt,
                endingAt
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error.response)
                    reject('no exams found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    const assignQuestion = async (examId,questionType,questionText,points,whoCanSee) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/add-question', {
                questionType,
                creatorExamId: props.user.user_id,
                questionText,
                points,
                examId,
                isActive: 1,
                whoCanSee
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no question found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    const assignOptions = async (questionId,optionValue) => {
        console.log(examId)
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/set-question-options', {
                questionId,
                optionValue
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no question found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    const assignCorrectAnswer = async (questionId,correctAnswer) => {
        console.log(examId)
        const promise = new Promise((resolve, reject) => {
            axios.post('http://localhost:8080/set-answer-key', {
                questionId,
                correctAnswer
            }).then((data) => {
                resolve(data.data)
            })
                .catch((error) => {
                    console.log(error)
                    reject('no answer key found!')
                })
        })

        try {
            return await promise
        } catch (e) {
            return Promise.resolve(e)
        }
    }

    const addQuestionContainer = (e) => {
        if (parseInt(e.target.value) < 101 && parseInt(e.target.value) > 0) {
            setHowManyQuestions(parseInt(e.target.value))
            props.setMaxNumberQuestions(parseInt(e.target.value))

        }else
            toast("that's beyond our limit")
    }
    useEffect(()=>{
        props.setTotalPoints(0)
        props.emptyQuestions([])
        console.log("questions array =>", props.questions.questions)

    },[])
    return (
        <ThemeProvider theme={theme2}>
            <AppBar
                sx={{ position: 'fixed',bgcolor:"#ffd05e"}}

            >
                <Toolbar>
                    <Typography style={{color:"black"}} sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Exam / Quiz
                    </Typography>
                    <Button style={{ textTransform: 'none' }}
                             color="inherit" onClick={handleClose}>
                        Assign
                    </Button>
                </Toolbar>
            </AppBar>
                <Box sx={{ mt: 10 }}>
                    <Paper elevation={3} className={classes.paperStyle}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField id="filled-basic"
                                           label="exam title"
                                           size="small"
                                           fullWidth
                                           required
                                           onChange={(e)=>
                                               (setExamTitle((e.target.value)))}
                                           variant="filled" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                           label="points"
                                           size="small"
                                           type="number"
                                           fullWidth
                                           inputProps={{ min: 1 }}
                                           onChange={(e)=>
                                               (setTotalPoints(parseInt(e.target.value)))}
                                               required
                                           variant="filled" />
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    id="datetime-local"
                                    placeholder="Starting At"
                                    type="datetime-local"
                                    onChange={(e)=>
                                        (setStartingAt(new Date(e.target.value).valueOf()))}

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <input
                                    id="datetime-local"
                                    placeholder="Ending At"
                                    type="datetime-local"
                                    onChange={(e)=>
                                        (setEndingAt(new Date(e.target.value).valueOf()))}

                                />
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper elevation={3} className={classes.paperStyle}>
                        <Grid container>

                        <Grid item xs={12}>
                            <TextField
                                type="number"
                                fullWidth
                                label={"How many questions"}
                                inputProps={{ min: 1, max: 100 }}
                                onChange={addQuestionContainer}
                            />
                        </Grid>
                        </Grid>
                    </Paper>

                    {
                        [...Array(howManyQuestions)].map((val,index)=>{
                            return <QuizBody key={index} id={index+1}/>
                        })
                    }
                </Box>

        </ThemeProvider>
    );
}
const mapStateToProps = state => {
    return {
        questions : state.ExamReducer,
        user : state.UserReducer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setMaxNumberQuestions: (questions) => dispatch({type:Actions.SET_MAX_QUESTIONS,
            payload : {questions}}),
        setTotalPoints : (points) => dispatch({type: Actions.SET_TOTAL_POINTS,
            payload : {points}}),
        emptyQuestions : (questions) => dispatch({type: Actions.SET_QUESTION_ARRAY,
            payload : {questions}})

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Quiz)
