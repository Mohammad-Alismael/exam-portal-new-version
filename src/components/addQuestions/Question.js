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
    CHANGE_QUESTION_OPTIONS,
    DELETE_EXAM_QUESTION_INDEX,
    SET_EXAM_QUESTION_INDEX,
    SET_QUESTION_TEXT,
    SET_QUESTIONS,
    SET_TMP_ID,
} from "../../store/actions";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {deleteQuestion} from "../../api/services/Question";
import {useNavigate, useParams} from "react-router-dom";
import {deleteExam} from "../../api/services/Exam";
import {toast} from "react-toastify";

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
const Question = ({ questionIndex, uid }) => {
    const classes = useStyles();
    const { examId } = useParams();
    const exam = useSelector((state) => state.ExamReducer);
    const course = useSelector(state => state.CourseReducer);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getQuestionIndex = () => {
        const questionIndexFound = exam?.questions.findIndex((quest, index) => {
            return quest.tmpId === uid;
        });
        console.log("index", questionIndexFound);

        return questionIndexFound;
    };
    const updateQuestionOptions = (newOptionsArray) => {
        dispatch({ type: CHANGE_QUESTION_OPTIONS,
            payload: { newOptions: newOptionsArray, index: questionIndex } });
    }
    const checkOptionText = (optionValue) => {
        const optionTextFound = exam.questions[questionIndex].options.findIndex((option,i)=>{
            return option['optionValue'] === optionValue
        })
        if (optionTextFound != -1){
            toast.info("option already existed!");
        }
        return optionTextFound
    }
    const getOptionIndex = (id) => {
        return exam.questions[questionIndex].options.findIndex((option, index) => {
            return option.id == id
        });
    }
    const setOptionText = (e) => {
        const id = e.target.id;
        const optionIndexFound = getOptionIndex(id);
        const tmp = [...exam.questions[questionIndex].options];
        console.log(optionIndexFound,tmp)
        tmp[optionIndexFound] = {
            ...tmp[optionIndexFound],
            optionValue: e.target.value,
        };
        console.log(tmp)
        updateQuestionOptions(tmp)
    };
    const deleteOption = (id) => {
        const optionIndexFound = getOptionIndex(id);
        const tmp = [...exam.questions[questionIndex].options];
        tmp.splice(optionIndexFound,1)
        updateQuestionOptions(tmp)
    }
    const updateQuestionArrayv2 = (object) => {
        console.log('wtf from here',object)
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
                    updateQuestionOptions={updateQuestionOptions}
                    checkOptionText={checkOptionText}
                    setOptionText={setOptionText}
                    deleteOption={deleteOption}
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
                    updateQuestionOptions={updateQuestionOptions}
                    checkOptionText={checkOptionText}
                    setOptionText={setOptionText}
                    deleteOption={deleteOption}
                    getOptionIndex={getOptionIndex}
                />
            );
        } else if (questionType === 4) {
            return (
                <Matching
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                    updateQuestionOptions={updateQuestionOptions}
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

    function deleteExamIfNoQuestions() {
        // if it is in preview status and no exam questions then delete the whole exam
        if (exam?.questions.length === 0) {
            deleteExam(examId).then((data) => {
                console.log(data)
                navigate(`/courses/${course?.courseId}/exams`)
            })
        }
    }

    const handleDeleteQuestion = (e) =>{
        e.preventDefault()
        if (exam?.isItPreview && exam?.questions.length !== 0){
            // delete question from db
            const questionId = exam?.questions[questionIndex].tmpId
            deleteQuestion(questionId,examId).then((data)=>{
                dispatch({ type: DELETE_EXAM_QUESTION_INDEX, payload: { index: questionIndex } });
                deleteExamIfNoQuestions();
            })
        }else {
            dispatch({ type: DELETE_EXAM_QUESTION_INDEX, payload: { index: questionIndex } });
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
            deepCopyExamQuestions[i+1] = exam.questions[i]
        }
        console.log(deepCopyExamQuestions)
        dispatch({ type: SET_QUESTIONS, payload: { questions: deepCopyExamQuestions } });

    }
    const questionPreview = (e) => {
        e.preventDefault()
        handleClickOpen()
    }

    return (
        <Paper elevation={3} className={classes.paperStyle}>
            <Grid container spacing={2}>
                <QuestionHeader
                    questionIndex={questionIndex}
                    updateQuestionArray={updateQuestionArrayv2}
                    previewOpen={handleClickOpen}
                    previewClose={handleClose}
                    preview={open}
                />
                {chooseQuestionType(exam.questions[questionIndex].questionType)}
            </Grid>
            <Divider sx={{mt:2,mb:2}}/>
            <div style={{height: '2rem'}}>
                <Tooltip title="Preview">
                    <IconButton style={{float: 'right'}}>
                        <VisibilityIcon onClick={questionPreview} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton style={{float: 'right'}}>
                        <DeleteOutlineIcon onClick={handleDeleteQuestion} />
                    </IconButton>
                </Tooltip>
                {!exam.isItPreview ? <Tooltip title="Duplicate">
                    <IconButton style={{float: 'right'}}>
                        <ContentCopyIcon onClick={duplicateQuestion} />
                    </IconButton>
                </Tooltip> : null }
            </div>
        </Paper>
    );
};

export default Question;
