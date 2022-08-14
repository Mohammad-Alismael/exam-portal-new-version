import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { connect, useDispatch, useSelector } from "react-redux";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import ImageIcon from "@mui/icons-material/Image";
import {SET_POINTS, SET_QUESTION_TEXT, SET_QUESTION_TYPE, SET_QUESTIONS, SET_WHO_CAN_SEE} from "../../../store/actions";
import FontAwesomeSvgIcon from "../../../components/FontAwesomeSvgIcon";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import IconButton from "@mui/material/IconButton";
import LongMenu from "../../../components/LongMenu";
import AddQuestionReducer from "../../../store/reducers/AddQuestionReducer";
import {store} from "../../../index";

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        padding: 30,
        height: "15vh auto",
        width: "50%",
        margin: "30px auto",
        position: "relative",
    },
    textField: {
        width: "100%",
    },
    dropDown: {
        margin: "50px",
    },
    menuIcon: {
        float: "right",
        cursor: "pointer",
        position: "absolute",
        top: 15,
        right: 15,
        // paddingTop: 20
    },
}));
function QuestionHeader({questionIndex,updateQuestionArray}) {
    const classes = useStyles();
    const [questionText, setQuestionText] = React.useState("empty");
    const [whoCanSee, setWhoCanSee] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    const updateExamQuestions = (_question) =>{
        // i'm taking question object from the store to update it to the latest version
        let examQuestions = exam?.questions
        const questionFound = examQuestions.findIndex((quest, index) => {
            if (quest.tmpId === _question.tmpId)
                return true;
        })
        if (questionFound === -1){
            examQuestions.push(_question)
            dispatch({ type: SET_QUESTIONS, payload: { questions: examQuestions } });
        }else {
            examQuestions[questionFound] = _question
            dispatch({ type: SET_QUESTIONS, payload: { questions: examQuestions } });
        }
    }
    const updateQuestionText = (e) => {
        updateQuestionArray({ questionText: e.target.value })
        setQuestionText(e.target.value)

    };
    const handleWhoCanSee = (e) => {
        updateQuestionArray({ whoCanSee:parseInt(e.target.value) })
    }
    const handleQuestionType = (e) => {
        updateQuestionArray({ questionType:parseInt(e.target.value) })
    }
    const handlePoints = (e) =>{
        updateQuestionArray({ points: parseInt(e.target.value) })
    }
    useEffect(()=>{
    },[])
    return (
        <>
            <Grid xs={6} item>
                <TextField
                    id="outlined-uncontrolled"
                    label="Question text"
                    // size="small"
                    value={exam.questions[questionIndex].questionText}
                    defaultValue={""}
                    fullWidth
                    onChange={updateQuestionText}
                    variant="standard"
                />
            </Grid>
            <ImageIcon
                sx={{
                    height: "40px",
                    width: "40px",
                    margin: "20px 5px",
                    cursor: "pointer",
                }}
            />
            <Grid xs={2} item>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="type">Question Type</InputLabel>
                    <Select
                        defaultValue={""}
                        onChange={handleQuestionType}
                        labelId="type"
                        id="type"
                        disabled={false}
                        value={exam.questions[questionIndex].questionType}
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
            <Grid xs={2} item>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="type">Who can see</InputLabel>
                    <Select
                        defaultValue={""}
                        value={exam.questions[questionIndex].whoCanSee}
                        label="Who can see"
                        onChange={handleWhoCanSee}
                    >
                        <MenuItem value={1}>Undergraduate</MenuItem>
                        <MenuItem value={2}>Graduate</MenuItem>
                        <MenuItem value={3}>Undergraduate & Graduate</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid xs={1} item>
                <FormControl fullWidth variant="standard">
                    <TextField
                        type="number"
                        fullWidth
                        value={exam.questions[questionIndex].points}
                        onChange={handlePoints}
                        variant="standard"
                        inputProps={{ min: 1, max: 100 }}
                        label={"points"}
                    />
                </FormControl>
                <LongMenu
                    className={classes.menuIcon}
                    options={["delete", "duplicate", "preview question"]}
                />
            </Grid>
        </>
    );
}

export default QuestionHeader;
