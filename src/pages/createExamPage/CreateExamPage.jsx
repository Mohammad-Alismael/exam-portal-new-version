import React, { useEffect, useRef } from "react";
import ResponsiveAppBar from "../../layouts/ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import HorizontalLinearStepper from "./HorizontalLinearStepper";
import * as PropTypes from "prop-types";
import ExamSettings from "./ExamSettings";
import ExamNavigation from "./ExamNavigation";
import ExamTimer from "./ExamTimer";
import ExamVisibility from "./ExamVisibility";
import ExamRandomness from "./ExamRandomness";
import ExamAnswerKey from "./ExamAnswerKey";
import AddIcon from "@mui/icons-material/Add";
import Truth from "./addQuestions/Truth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SET_QUESTIONS } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Text from "./questions/Text";
import Mcq from "./questions/Mcq";
import Matching from "./questions/Matching";
import CheckBoxComp from "./questions/CheckBoxComp";
import CheckboxComp from "../../components/QuestionStudent/CheckboxComp";
import Question from "./addQuestions/Question";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: "7% 15%",
        float: "center",
    },
    paperStyle: {
        padding: "1rem",
    },
    textField: {
        width: "100%",
    },
    subContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
    },
    addQuestionBtn: {
        float: "right",
    },
}));

function CreateExamPage(props) {
    const classes = useStyles();
    const navigate = useNavigate();
    const exam = useSelector((state) => state.ExamReducer);
    const [questions, setQuestions] = React.useState([]);
    const dispatch = useDispatch();
    const getQuestionIndex = (uid) => {
        const questionIndexFound = exam?.questions.findIndex((quest, index) => {
            return quest.tmpId === uid;
        });
        return questionIndexFound;
    };
    const addQuestion = (e) => {
        e.preventDefault();
        const uid = uuidv4();
        const questionObj = {
            answerKey: null,
            isActive: true,
            options: null,
            points: 5,
            questionText: "",
            questionType: 5,
            tmpId: uid,
            whoCanSee: 3,
        };

        const newQuestionAr = exam.questions;
        newQuestionAr.push(questionObj);
        dispatch({ type: SET_QUESTIONS, payload: { questions: newQuestionAr } });

        const questionIndexFound = getQuestionIndex(uid);

        // setQuestions([
        //     ...questions,
        //     <Question questionIndex={questionIndexFound} uid={uid} />,
        // ]);
    };

    const components = [
        <ExamSettings />,
        <ExamNavigation />,
        <ExamTimer />,
        // <ExamVisibility />,
        <ExamRandomness />,
        <ExamAnswerKey />,
    ];

    useEffect(() => {
        console.log(exam.questions.length)
        // exam.questions.map(({ tmpId }, index) => {
        //     console.log(tmpId,getQuestionIndex(tmpId))
        //     console.log(exam.questions[getQuestionIndex(tmpId)])
        //     setQuestions([
        //         ...questions,
        //         <Question questionIndex={getQuestionIndex(tmpId)} uid={tmpId} />
        //     ]);
        // });
    }, []);
    return (
        <>
            <ResponsiveAppBar />
            <div className={classes.container}>
                <Paper elevation={5} className={classes.paperStyle}>
                    <Typography sx={{ mb: 2 }} variant="h4" align={"left"}>
                        <b>Exam Details</b>
                    </Typography>
                    <HorizontalLinearStepper components={components} />
                </Paper>

                {/*{questions && questions.map((val, index) => {*/}
                {/*    console.log('question maping', questions)*/}
                {/*    return val;*/}
                {/*})}*/}
                {
                    exam.questions.map(({tmpId},index)=>{
                        return <Question questionIndex={getQuestionIndex(tmpId)} uid={tmpId} />
                    })
                }
                <div>
                    <Button
                        sx={{ mt: 3 }}
                        onClick={addQuestion}
                        className={classes.addQuestionBtn}
                        variant="contained"
                        color="warning"
                    >
                        <b>add question</b>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CreateExamPage;
