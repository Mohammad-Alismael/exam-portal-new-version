import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createTheme, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";
import Truth from "../components/questions/Truth";

import { fetchExamDetailsForStudent } from "../api/services/Exam";
import { fetchExamQuestions } from "../api/services/Question";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import { linearProgressClasses, Paper } from "@mui/material";
import { SET_EXAM_QUESTIONS_STUDENT, SET_QUESTIONS } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Question from "../components/QuestionStudent/Question";
import ExamStudentReducer from "../store/reducers/ExamStudentReducer";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Mcq from "../components/QuestionStudent/Mcq";
import Text from "../components/QuestionStudent/Text";
import CheckBoxComp from "../components/QuestionStudent/CheckBoxComp";
import Matching from "../components/QuestionStudent/Matching";
import {toast} from "react-toastify";
import * as PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: "#FFF",
        height: "7vh",
        padding: "0 1rem",
    },
    questionContainer: {
        margin: "10% 15%",
        padding: "1rem",
    },
    questionTimerContainer: {
        backgroundColor: '#fff',
        borderRadius: '5px 0 0 5px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: '10px',
        padding: '0.5rem',
        float: 'right',
        marginTop: '2.5rem',
    }
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
}));

function QuestionTimer(props) {
    return <div className={props.classes.questionTimerContainer}>
        <Typography><b>{props.timer}</b></Typography>
        <img src={"/images/icons/questionTimer.svg"} alt={"questionTime"}/>
    </div>;
}

QuestionTimer.propTypes = {
    classes: PropTypes.any,
    timer: PropTypes.string
};

function ExamStudent(props) {
    const classes = useStyles();
    const { examId } = useParams();
    const examStudent = useSelector((state) => state.ExamStudentReducer);
    const [isLoading, setIsLoading] = React.useState(false);
    const [timer,setTimer] = React.useState("");
    const [examDetails,setExamDetails] = React.useState(null);
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const dispatch = useDispatch();
    const chooseQuestionType = (questionType) => {
        if (questionType === 1) {
            return <Mcq questionIndex={questionIndex} />;
        } else if (questionType === 2) {
            return <Text questionIndex={questionIndex} />;
        } else if (questionType === 3) {
            return <CheckBoxComp questionIndex={questionIndex} />;
        } else if (questionType === 4) {
            return <Matching questionIndex={questionIndex} />;
        } else {
            return <Truth questionIndex={questionIndex} />;
        }
    };
    const previousQuestion = (e) => {
        e.preventDefault();
        if (questionIndex > 0) setQuestionIndex((prevState) => prevState - 1);
    };
    const nextQuestion = (e) => {
        e.preventDefault();
        if (questionIndex < examStudent.questions.length - 1)
            setQuestionIndex((prevState) => prevState + 1);
    };

    useEffect(()=>{
        let timer_ = examStudent.questions[questionIndex].time * 5;
        let minutes;
        let seconds;
        const interval = setInterval(function () {
            minutes = parseInt(timer_ / 60, 10);
            seconds = parseInt(timer_ % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            setTimer(minutes + ":" + seconds)
            if (--timer_ < 0) {
                if (questionIndex < examStudent.questions.length - 1)
                    setQuestionIndex((prevState) => prevState + 1);
                else
                    clearInterval(interval)
            }

        }, 999);
        return () => clearInterval(interval); //This is important

    },[questionIndex])
    useEffect(() => {
        setIsLoading(true);
        const controller = new AbortController();
        fetchExamDetailsForStudent(examId, controller).then((data) => {
            setExamDetails(data)
            console.log("exam details for students", data);
        });
        fetchExamQuestions(examId, controller).then((data) => {
            console.log("exam questions for students", data);
            const questions = data.map(
                (
                    {
                        is_active,
                        time_limit,
                        points,
                        question_text,
                        question_type,
                        question_id,
                        who_can_see,
                        file_path,
                        options,
                        answerKey,
                    },
                    i
                ) => {
                    return {
                        answerKey,
                        isActive: is_active,
                        options,
                        time: time_limit,
                        points: points,
                        questionText: question_text,
                        questionType: question_type,
                        tmpId: question_id,
                        userAnswer: null,
                        whoCanSee: who_can_see,
                        previewFile: file_path,
                    };
                }
            );
            dispatch({ type: SET_EXAM_QUESTIONS_STUDENT, payload: { questions } });
            setIsLoading(false);
        });
        return () => {
            controller.abort();
        };
    }, []);
    if (isLoading) {
        return <CircularProgress />;
    } else {
        return (
            <>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    maxWidth="xl"
                    className={classes.container}
                >
                    <Typography variant={"h6"}>{"cs202 final".toUpperCase()}</Typography>
                    <Typography>
                        <b>40 mins</b> left
                    </Typography>
                    <Typography>
                        <b>
                            {questionIndex + 1}/{examStudent.questions.length}
                        </b>{" "}
                        Questions
                    </Typography>
                </Grid>
                <BorderLinearProgress
                    variant="determinate"
                    value={((questionIndex + 1) / examStudent.questions.length) * 100}
                    size={40}
                    thickness={4}
                />
                { examStudent.questions[questionIndex].time != null ? <QuestionTimer classes={classes} timer={timer}/> : null}
                <Paper elevation={3} className={classes.questionContainer}>

                    <Grid container spacing={2} sx={{ mt: 2, mb: 2, padding: "0 1rem" }}>
                        {examStudent.questions[questionIndex]["previewFile"] != null ? (
                            <Grid xs={12} item>
                                <img
                                    style={{ maxWidth: "100%", marginBottom: "1rem" }}
                                    src={
                                        examStudent.questions[questionIndex]["previewFile"][
                                            "preview"
                                            ]
                                    }
                                    alt={"question img"}
                                />
                            </Grid>
                        ) : null}
                        {examStudent.questions[questionIndex].questionType !== 4 ? (
                            <Grid item xs={10}>
                                <Typography
                                    style={{ color: "black" }}
                                    sx={{ ml: 1, flex: 1 }}
                                    variant="h6"
                                >
                                    {examStudent.questions[questionIndex].questionText}
                                </Typography>
                            </Grid>
                        ) : null}
                        {examStudent.questions[questionIndex].questionType !== 4 ? (
                            <Grid item xs={2}>
                                <Typography
                                    style={{ color: "black" }}
                                    sx={{ float: "right", flex: 1 }}
                                    variant="subtitle1"
                                >
                                    <b>{examStudent.questions[questionIndex].points} points</b>
                                </Typography>
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid item xs={12} style={{ margin: "0 12px" }}>
                        {chooseQuestionType(
                            examStudent.questions[questionIndex].questionType
                        )}
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        {examDetails?.navigation == 1 ? <Button
                            sx={{ mr: 1 }}
                            disabled={questionIndex === 0}
                            onClick={previousQuestion}
                        >
                            Back
                        </Button> : null}
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button variant="outlined" onClick={nextQuestion}>
                            Next
                        </Button>
                    </Box>
                </Paper>
            </>
        );
    }
}

export default ExamStudent;
