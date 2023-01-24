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
import {SET_POINTS, SET_QUESTION_TEXT, SET_QUESTION_TYPE, SET_QUESTIONS, SET_WHO_CAN_SEE} from "../../store/actions";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons/faEllipsisV";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@material-ui/core";
import Question from "../questions/Question";
import Tooltip from "@mui/material/Tooltip";
import PublishIcon from "@mui/icons-material/Publish";
import {Badge} from "@mui/material";
import {Editor} from "react-draft-wysiwyg";
import {convertFromRaw, convertToRaw, EditorState} from "draft-js";
import {calcState} from "../../utils/global/GlobalConstants";
import QuestionEditor from "./QuestionEditor";

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
        bottom: 15,
        right: 15,
        // paddingTop: 20
    },
    textEditorContainer: {
        minHeight: '50px',
        padding: "0.8rem",
        // background: 'blue',
        border: '1px solid #D9D9D9'
    },
}));



function QuestionHeader({previewOpen,previewClose,questionIndex,updateQuestionArray,preview}) {
    const classes = useStyles();
    const [questionText, setQuestionText] = React.useState("empty");
    const [whoCanSee, setWhoCanSee] = React.useState(0);
    const [points, setPoints] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const exam = useSelector((state) => state.ExamReducer);
    const question = useSelector((state) => state.AddQuestionReducer);
    const dispatch = useDispatch();
    const [editorState, setEditorState] = React.useState(calcState(exam.questions[questionIndex]['questionText']));
    const updateQuestionText = (e) => {
        setEditorState(e);
        const db = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        updateQuestionArray({ questionText: db })
        setQuestionText(db)

    };
    const handleWhoCanSee = (e) => {
        updateQuestionArray({ whoCanSee:parseInt(e.target.value) })
    }
    const handleQuestionType = (e) => {
        if (e.target.value == 1|| e.target.value == 3 || e.target.value == 4){
            if (!exam?.isItPreview) updateQuestionArray({ options: []})
        }
        updateQuestionArray({ questionType:parseInt(e.target.value) })
    }
    const handleTime = (e) => {
        updateQuestionArray({ time: parseInt(e.target.value) })
    }
    const handlePoints = (e) =>{
        updateQuestionArray({ points: parseInt(e.target.value) })
    }
    const handleQuestionFile = (e) =>{
        e.preventDefault()
        let myFiles = e.target.files;
        Object.assign(myFiles[0],
            {
                preview: URL.createObjectURL(myFiles[0]),
            }
        )
        updateQuestionArray({previewFile: myFiles[0]})
    }
    const removeFile = (e) => {
        updateQuestionArray({previewFile: null})
    }

    useEffect(() => {
        setEditorState(calcState(exam.questions[questionIndex]['questionText']));
    }, []);
    return (
        <>
            {exam.questions[questionIndex]['previewFile'] != null ?
                <Grid xs={12} item>
                    <Badge badgeContent={'x'} color="primary" onClick={removeFile} sx={{cursor: 'pointer'}}>
                        <img style={{maxWidth: '100%'}} src={exam.questions[questionIndex]['previewFile']['preview']}
                             alt={'question img'}/>
                    </Badge>
                </Grid>
                : null}

            <Grid xs={12} item className={classes.textEditorContainer}>
                <QuestionEditor editorState={editorState} onEditorStateChange={updateQuestionText}/>
            </Grid>
            <Grid xs={4} item>
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
            <Grid xs={4} item>
                <FormControl fullWidth variant="standard">
                    <InputLabel id="type">Who can see</InputLabel>
                    <Select
                        disabled={exam?.assignedFor != 3}
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
            {exam?.questionTimer ? <Grid xs={1} item>
                <FormControl fullWidth variant="standard">
                    <TextField
                        type="number"
                        fullWidth
                        value={exam.questions[questionIndex].time}
                        onChange={handleTime}
                        variant="standard"
                        inputProps={{min: 1, max: 100}}
                        label={"minutes"}
                    />
                </FormControl>
            </Grid> : null}
            <Grid xs={4} item>
                <FormControl fullWidth variant="standard">
                    <TextField
                        type="number"
                        fullWidth
                        value={exam.questions[questionIndex].points}
                        onChange={handlePoints}
                        variant="standard"
                        inputProps={{min: 1, max: 100}}
                        label={"points"}
                    />
                </FormControl>
            </Grid>
            <Dialog
                open={preview}
                onClose={previewClose}
            >
                <Question questionIndex={questionIndex}/>
                <DialogActions>
                    <Button onClick={previewClose} autoFocus>
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default QuestionHeader;
