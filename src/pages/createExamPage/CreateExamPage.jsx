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
import Truth from "./addQuestions/Truth";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {SET_QUESTIONS} from "../../store/actions";
import {useDispatch, useSelector} from "react-redux";
import Text from "./questions/Text";
import Mcq from "./questions/Mcq";
import Matching from "./questions/Matching";
import CheckBoxComp from "./questions/CheckBoxComp";
import CheckboxComp from "../../components/QuestionBodyStudents/CheckboxComp";
import Question from "./addQuestions/Question";
import {v4 as uuidv4} from "uuid";

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
    const [isLoading, setIsLoading] = React.useState(false);
    const [examTitle, setExamTitle] = React.useState("");
    const [examPoints, setExamPoints] = React.useState(0);
    const [startingAt, setStartingAt] = React.useState(0);
    const [endingAt, setEndingAt] = React.useState(0);
    const dispatch = useDispatch()
    const addQuestion = (e) => {
        e.preventDefault();
        setQuestions([...questions,<Question uid={uuidv4()}/>])
        console.log(exam.questions)
    };

    const components = [
        <ExamSettings />,
        <ExamNavigation />,
        <ExamTimer />,
        <ExamVisibility />,
        <ExamRandomness />,
        <ExamAnswerKey />,
    ];
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

                {questions && questions.map((val,index)=>{
                    return val
                })}

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
