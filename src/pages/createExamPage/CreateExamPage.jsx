import React, {useEffect, useRef} from "react";
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
import Truth from "./questions/Truth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {SET_QUESTIONS} from "../../store/actions";
import {useDispatch} from "react-redux";
import Text from "./questions/Text";
import Mcq from "./questions/Mcq";
import Matching from "./questions/Matching";
import CheckBoxComp from "./questions/CheckBoxComp";
import CheckboxComp from "../../components/QuestionBodyStudents/CheckboxComp";

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
    const [questions, setQuestions] = React.useState([
        {
            questionId: 54,
            answerKey: 0,
            points: 5,
            whoCanSee: 1,
            questionType: 5,
            questionText: "tf is that",
            isActive: true,
        },{
            questionId: 55,
            answerKey: 0,
            points: 5,
            questionType: 5,
            whoCanSee: 1,
            questionText: "tf is that2",
            isActive: true,
        },{
            questionId: 56,
            answerKey: 0,
            points: 5,
            whoCanSee: 1,
            questionType: 5,
            questionText: "tf is that3",
            isActive: true,
        },{
            questionId: 57,
            answerKey: 0,
            points: 5,
            whoCanSee: 3,
            questionType: 1,
            questionText: "choose the correct answer",
            isActive: true,
            options: [
                {
                    optionId: 1,
                    optionValue: "nah fam!"
                },
                {
                    optionId: 2,
                    optionValue: "aiight"
                },
                {
                    optionId: 3,
                    optionValue: "suck ya mum"
                },
                {
                    optionId: 4,
                    optionValue: "that's mad"
                }
            ]
        }
    ]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [examTitle, setExamTitle] = React.useState("");
    const [examPoints, setExamPoints] = React.useState(0);
    const [startingAt, setStartingAt] = React.useState(0);
    const [endingAt, setEndingAt] = React.useState(0);
    const dispatch = useDispatch()
    const addQuestion = (e) => {
        e.preventDefault();
    };

    const components = [
        <ExamSettings />,
        <ExamNavigation />,
        <ExamTimer />,
        <ExamVisibility />,
        <ExamRandomness />,
        <ExamAnswerKey />,
    ];
    const questionTypes = [
        <Mcq />,
        <Text />,
        <CheckBoxComp />,
        <Matching />,
        <Truth />
    ]
    const chooseQuestionType = (questionType,index) => {
        if (questionType === 1){
            return  <Mcq key={index+1} id={index}/>
        }else if(questionType === 2){
            return <Text key={index+1} id={index}/>;
        }else if(questionType === 3){
            return <CheckboxComp key={index+1}  id={index}/>
        }else if(questionType === 4){
            return <Matching key={index+1}  id={index}/>
        }else {
            return <Truth key={index+1}  id={index}/>
        }
    }
    useEffect(()=>{
        // dispatch({type:SET_QUESTIONS,payload:{questions}})
    },[])
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

                {questions && questions.map(({questionType},index)=>{
                    return chooseQuestionType(questionType,index)
                })}
                {/*<Question id={1} component={<Truth/>}/>*/}
                {/*<Question id={0} component={<Text/>}/>*/}
                {/*<Question id={3} component={<Mcq />}/>*/}
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
