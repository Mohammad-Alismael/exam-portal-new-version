import React, { useCallback } from "react";
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
  SET_QUESTIONS,
} from "../../store/actions";
import Divider from "@mui/material/Divider";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { deleteQuestion } from "../../api/services/Question";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CHECKBOX_QUESTION_TYPE,
  MATCHING_QUESTION_TYPE,
  MCQ_QUESTION_TYPE,
  NOT_FOUND,
  TEXT_QUESTION_TYPE,
  TRUTH_QUESTION_TYPE,
} from "../../utils/global/GlobalConstants";
import { setQuestionsList } from "../../actions/ExamActions";

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    position: "relative",
    padding: "15px 20px",
    marginTop: "1rem",
  },
  test: {
    position: "absolute",
    right: "-50px",
    bottom: 0,
    // padding: '0.6rem',
    backgroundColor: "red",
  },
}));
const Question = ({ questionIndex, uid }) => {
  const classes = useStyles();
  const { examId } = useParams();
  const exam = useSelector((state) => state.ExamReducer);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateQuestionOptions = (newOptionsArray) => {
    dispatch({
      type: CHANGE_QUESTION_OPTIONS,
      payload: { newOptions: newOptionsArray, index: questionIndex },
    });
  };
  const checkOptionText = (optionValue) => {
    const optionTextFound = exam.questions[questionIndex].options.findIndex(
      (option, i) => {
        return option["optionValue"] === optionValue;
      }
    );
    if (optionTextFound != NOT_FOUND) {
      toast.info("option already existed!");
    }
    return optionTextFound;
  };
  const getOptionIndex = (id) => {
    return exam.questions[questionIndex].options.findIndex((option, index) => {
      return option.id == id;
    });
  };
  const setOptionText = (e) => {
    const id = e.target.id;
    const optionIndexFound = getOptionIndex(id);
    const tmp = [...exam.questions[questionIndex].options];
    tmp[optionIndexFound] = {
      ...tmp[optionIndexFound],
      optionValue: e.target.value,
    };
    updateQuestionOptions(tmp);
  };
  const deleteOption = (id) => {
    const optionIndexFound = getOptionIndex(id);
    const tmp = [...exam.questions[questionIndex].options];
    tmp.splice(optionIndexFound, 1);
    updateQuestionOptions(tmp);
  };
  const updateQuestionArrayv2 = useCallback(
    (object) => {
      const [key, value] = Object.entries(object)[0];
      const deepCopy = exam?.questions.slice();
      deepCopy[questionIndex] = {
        ...deepCopy[questionIndex],
        [key]: value,
      };
      dispatch({
        type: SET_EXAM_QUESTION_INDEX,
        payload: {
          question: deepCopy[questionIndex],
          index: questionIndex,
        },
      });
    },
    [dispatch, exam?.questions, questionIndex]
  );

  const chooseQuestionType = (questionType) => {
    switch (questionType) {
      case MCQ_QUESTION_TYPE:
        return (
          <Mcq
            questionIndex={questionIndex}
            updateQuestionArray={updateQuestionArrayv2}
            updateQuestionOptions={updateQuestionOptions}
            checkOptionText={checkOptionText}
            deleteOption={deleteOption}
          />
        );
      case TEXT_QUESTION_TYPE:
        return (
          <Text
            questionIndex={questionIndex}
            updateQuestionArray={updateQuestionArrayv2}
          />
        );
      case CHECKBOX_QUESTION_TYPE:
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
      case MATCHING_QUESTION_TYPE:
        return (
          <Matching
            questionIndex={questionIndex}
            updateQuestionArray={updateQuestionArrayv2}
            updateQuestionOptions={updateQuestionOptions}
          />
        );
      default: // TRUTH_QUESTION_TYPE
        return (
          <Truth
            questionIndex={questionIndex}
            updateQuestionArray={updateQuestionArrayv2}
          />
        );
    }
  };

  const copyOptions = (currentOptions) => {
    if (!currentOptions) {
      return currentOptions;
    }

    return currentOptions.map((option) => ({ ...option, id: uuidv4() }));
  };

  const handleDeleteQuestion = (e) => {
    e.preventDefault();
    if (exam?.isItPreview && exam?.questions.length !== 0) {
      // delete question from db
      const questionId = exam?.questions[questionIndex].tmpId;
      deleteQuestion(questionId, examId)
        .then((data) => {
          dispatch({
            type: DELETE_EXAM_QUESTION_INDEX,
            payload: { index: questionIndex },
          });
        })
        .catch((data) => {
          console.log(data);
          toast.error(data["reason"]);
        });
    } else {
      dispatch({
        type: DELETE_EXAM_QUESTION_INDEX,
        payload: { index: questionIndex },
      });
    }
  };
  const duplicateQuestion = (e) => {
    e.preventDefault();
    const deepCopyExamQuestions = [...exam.questions];

    const copiedQuestion = exam.questions[questionIndex];
    console.log({ copiedQuestion, questionIndex });

    // create new id for duplicate version
    const newId = uuidv4();
    // create new ids for duplicate options
    const newOptions = copyOptions(copiedQuestion.options);
    // duplicate answer key with new ids
    const newQuestion = {
      ...copiedQuestion,
      tmpId: newId,
      options: newOptions,
    };

    deepCopyExamQuestions.splice(questionIndex + 1, 0, newQuestion);

    console.log(deepCopyExamQuestions);
    dispatch(setQuestionsList(deepCopyExamQuestions));
  };

  const questionPreview = (e) => {
    e.preventDefault();
    handleClickOpen();
  };

  return (
    <Paper elevation={3} className={classes.paperStyle}>
      <Grid container spacing={2}>
        <QuestionHeader
          key={uid}
          questionIndex={questionIndex}
          updateQuestionArray={updateQuestionArrayv2}
          previewClose={handleClose}
          preview={open}
        />
        {chooseQuestionType(exam.questions[questionIndex].questionType)}
      </Grid>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <div style={{ height: "2rem" }}>
        <Tooltip title="Preview">
          <IconButton style={{ float: "right" }}>
            <VisibilityIcon onClick={questionPreview} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton style={{ float: "right" }}>
            <DeleteOutlineIcon onClick={handleDeleteQuestion} />
          </IconButton>
        </Tooltip>
        {!exam.isItPreview ? (
          <Tooltip title="Duplicate">
            <IconButton style={{ float: "right" }}>
              <ContentCopyIcon onClick={duplicateQuestion} />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Paper>
  );
};

export default Question;
