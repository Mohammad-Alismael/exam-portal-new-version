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
import ImageIcon from "@mui/icons-material/Image";
import {SET_POINTS, SET_QUESTION_TEXT, SET_QUESTION_TYPE, SET_QUESTIONS, SET_WHO_CAN_SEE} from "../../../store/actions";
import FontAwesomeSvgIcon from "../../../components/FontAwesomeSvgIcon";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import IconButton from "@mui/material/IconButton";
import LongMenu from "../../../components/LongMenu";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@material-ui/core";
import Question from "../questions/Question";

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
    const [open, setOpen] = React.useState(false);
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    const updateQuestionText = (e) => {
        updateQuestionArray({ questionText: e.target.value })
        setQuestionText(e.target.value)

    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleWhoCanSee = (e) => {
        updateQuestionArray({ whoCanSee:parseInt(e.target.value) })
    }
    const handleQuestionType = (e) => {
        if (e.target.value == 1|| e.target.value == 3 || e.target.value == 4){
            updateQuestionArray({ options: []})
        }
        updateQuestionArray({ questionType:parseInt(e.target.value) })
    }
    const handlePoints = (e) =>{
        updateQuestionArray({ points: parseInt(e.target.value) })
    }
    const deleteQuestion = (e) =>{
        e.preventDefault()
        exam.questions.splice(questionIndex,1)
        dispatch({ type: SET_QUESTIONS, payload: { questions: exam.questions } });

    }
    const copyOptions = (currentOptions) =>{
        if (currentOptions != null ){
            var options = [];
            for (let i = 0; i < currentOptions.length; i++) {
                options.push({...currentOptions[i], id:  uuidv4()})
            }
            return options
        }
    }
    const duplicateQuestion = (e) =>{
        e.preventDefault()
        const deepCopyExamQuestions = [...exam.questions]
        let copiedQuestion = exam.questions[questionIndex]
        // create new id for duplicate version
        let modifiedObjects = {tmpId: uuidv4(), options: null}
        // create new ids for duplicate options
        const newOptions = copyOptions(copiedQuestion.options)
        modifiedObjects['options'] = newOptions
        // duplicating answer key with new ids

        let newQuestion = {...copiedQuestion, ...modifiedObjects}

        deepCopyExamQuestions[questionIndex + 1] = newQuestion

        for (let i = questionIndex + 1; i < exam.questions.length; i++) {
            deepCopyExamQuestions[i] = exam.questions[i]
        }

        dispatch({ type: SET_QUESTIONS, payload: { questions: deepCopyExamQuestions } });

    }
    const questionPreview = (e) => {
        e.preventDefault()
        handleClickOpen()
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
                    functions={[deleteQuestion,duplicateQuestion,questionPreview]}
                />
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                {/*<DialogContent>*/}
                <Question questionIndex={questionIndex}/>
                {/*</DialogContent>*/}
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default QuestionHeader;
