import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import QuestionHeader from "./QuestionHeader";
import { Paper } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Truth from "./Truth";
import { useDispatch, useSelector } from "react-redux";
import Mcq from "./Mcq";
import Text from "./Text";
import CheckBoxComp from "./CheckBoxComp";
import Matching from "./Matching";
import { v4 as uuidv4 } from "uuid";

import {
    SET_EXAM_QUESTION_INDEX,
    SET_QUESTION_TEXT,
    SET_QUESTIONS,
    SET_TMP_ID,
} from "../../../store/actions";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import LongMenu from "../../../components/LongMenu";

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        position: "relative",
        padding: "15px 20px",
        marginTop: "2rem",
    },
    test: {
        position: 'absolute',
        right: '-50px',
        bottom: 0,
        // padding: '0.6rem',
        backgroundColor: 'red'
    }
}));
const questionTypes = [
    <Mcq />,
    <Text />,
    <CheckBoxComp />,
    <Matching />,
    <Truth />,
];
const Question = ({ questionIndex, uid }) => {
    const classes = useStyles();
    const question = useSelector((state) => state.AddQuestionReducer);
    const exam = useSelector((state) => state.ExamReducer);
    const dispatch = useDispatch();

    const getQuestionIndex = () => {
        const questionIndexFound = exam?.questions.findIndex((quest, index) => {
            return quest.tmpId === uid;
        });
        console.log("index", questionIndexFound);

        return questionIndexFound;
    };
    const updateQuestionArray = (object) => {
        const key = Object.keys(object)[0];
        const value = Object.values(object)[0];
        const index = getQuestionIndex();
        const deepCopy = exam?.questions;
        const deepCopyObj = deepCopy[index];
        deepCopyObj[key] = value;
        deepCopy[index] = deepCopyObj;
        // deepCopy[index] = {...deepCopy[index], ...object}
        dispatch({ type: SET_QUESTIONS, payload: { questions: deepCopy } });
    };
    const updateQuestionArrayv2 = (object) => {
        const key = Object.keys(object)[0];
        const value = Object.values(object)[0];
        const index = getQuestionIndex();
        const deepCopy = exam?.questions;
        const deepCopyObj = deepCopy[index];
        deepCopyObj[key] = value;
        dispatch({ type: SET_EXAM_QUESTION_INDEX, payload: { question: deepCopyObj, index } });
    };
    const chooseQuestionType = (questionType) => {
        if (questionType === 1) {
            return (
                <Mcq
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                />
            );
        } else if (questionType === 2) {
            return (
                <Text
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                />
            );
        } else if (questionType === 3) {
            return (
                <CheckBoxComp
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                />
            );
        } else if (questionType === 4) {
            return (
                <Matching
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                />
            );
        } else {
            return (
                <Truth
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                />
            );
        }
    };
    const copyOptions = (currentOptions) =>{
        if (currentOptions != null ){
            var options = [];
            for (let i = 0; i < currentOptions.length; i++) {
                options.push({...currentOptions[i], id:  uuidv4()})
            }
            return options
        }

        return currentOptions

    }
    const deleteQuestion = (e) =>{
        e.preventDefault()
        exam.questions.splice(questionIndex,1)
        dispatch({ type: SET_QUESTIONS, payload: { questions: exam.questions } });

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
            deepCopyExamQuestions[i+1] = exam.questions[i]
        }
        dispatch({ type: SET_QUESTIONS, payload: { questions: deepCopyExamQuestions } });

    }
    const questionPreview = (e) => {
        e.preventDefault()
        // handleClickOpen()
    }

    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                />
                {chooseQuestionType(exam.questions[questionIndex].questionType)}
            </Grid>
            <Divider sx={{mt:2,mb:2}}/>
            <div style={{height: '1rem'}}>
                <Tooltip title="Preview">
                    <VisibilityIcon onClick={questionPreview} style={{float: 'right',marginLeft: '1rem'}}/>
                </Tooltip>
                <Tooltip title="Delete">
                    <DeleteOutlineIcon onClick={deleteQuestion} style={{float: 'right',marginLeft: '1rem'}}/>
                </Tooltip>
                <Tooltip title="Duplicate">
                    <ContentCopyIcon  onClick={duplicateQuestion} style={{float: 'right'}}/>
                </Tooltip>
                {/*<div  style={{float: 'right'}}>*/}
                {/*    <LongMenu*/}
                {/*        options={["Delete", "Duplicate", "Preview Question"]}*/}
                {/*        functions={[deleteQuestion,duplicateQuestion,questionPreview]}*/}
                {/*    />*/}
                {/*</div>*/}

            </div>
        </Paper>
    );
};

export default Question;
