import React, {Component, memo, useEffect} from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import {  useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@material-ui/core";
import Question from "../PreviewQuestions/Question";
import { convertToRaw } from "draft-js";
import {
  calcState,
  CHECKBOX_QUESTION_TYPE,
  MATCHING_QUESTION_TYPE,
  MCQ_QUESTION_TYPE,
  TEXT_QUESTION_TYPE,
  TRUTH_QUESTION_TYPE,
} from "../../utils/global/GlobalConstants";
import QuestionEditor from "./QuestionEditor";
import {
  selectExamQuestions,
  selectQuestionHeader,
} from "../../store/selectors/ExamSelectors";

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
    minHeight: "50px",
    padding: "0.8rem",
    // background: 'blue',
    border: "1px solid #D9D9D9",
  },
}));

function QuestionHeader({
  previewClose,
  questionIndex,
  updateQuestionArray,
  preview,
}) {
  const classes = useStyles();
  const [questionText, setQuestionText] = React.useState("empty");
  const exam = useSelector((state) => state.ExamReducer);
  const { questions } = useSelector(selectExamQuestions);
  const { questionTimer, assignedFor } =
    useSelector(selectQuestionHeader);

  const [editorState, setEditorState] = React.useState(
    calcState(questions[questionIndex]["questionText"])
  );
  const updateQuestionText = (e) => {
    setEditorState(e);
    const db = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log(db);
    updateQuestionArray({ questionText: db });
    setQuestionText(db);
  };
  const handleWhoCanSee = (e) => {
    updateQuestionArray({ whoCanSee: parseInt(e.target.value) });
  };
  const handleQuestionType = (e) => {
    if (e.target.value == 1 || e.target.value == 3 || e.target.value == 4) {
      if (!exam?.isItPreview) updateQuestionArray({ options: [] });
    }
    updateQuestionArray({ questionType: parseInt(e.target.value) });
  };
  const handleTime = (e) => {
    updateQuestionArray({ time: parseInt(e.target.value) });
  };
  const handlePoints = (e) => {
    updateQuestionArray({ points: parseInt(e.target.value) });
  };

  useEffect(() => {
    setEditorState(calcState(questions[questionIndex]["questionText"]));
  }, []);
  return (
    <>
      {/*{exam.questions[questionIndex]['previewFile'] != null ?*/}
      {/*    <Grid xs={12} item>*/}
      {/*        <Badge badgeContent={'x'} color="primary" onClick={removeFile} sx={{cursor: 'pointer'}}>*/}
      {/*            <img style={{maxWidth: '100%'}} src={exam.questions[questionIndex]['previewFile']['preview']}*/}
      {/*                 alt={'question img'}/>*/}
      {/*        </Badge>*/}
      {/*    </Grid>*/}
      {/*    : null}*/}

      <Grid xs={12} item className={classes.textEditorContainer}>
        <QuestionEditor
          updateQuestionArray={updateQuestionArray}
          editorState={editorState}
          onEditorStateChange={updateQuestionText}
        />
      </Grid>
      <Grid xs={4} item>
        <FormControl fullWidth variant="standard">
          <InputLabel id="type">Question Type</InputLabel>
          <Select
            defaultValue=""
            onChange={handleQuestionType}
            labelId="type"
            id="type"
            disabled={false}
            value={questions[questionIndex].questionType}
            label="Question type"
          >
            <MenuItem value={MCQ_QUESTION_TYPE}>MCQs</MenuItem>
            <MenuItem value={TEXT_QUESTION_TYPE}>Text</MenuItem>
            <MenuItem value={CHECKBOX_QUESTION_TYPE}>Checkbox</MenuItem>
            <MenuItem value={MATCHING_QUESTION_TYPE}>Matching</MenuItem>
            <MenuItem value={TRUTH_QUESTION_TYPE}>True/False</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid xs={4} item>
        <FormControl fullWidth variant="standard">
          <InputLabel id="type">Who can see</InputLabel>
          <Select
            disabled={assignedFor != 3}
            value={questions[questionIndex].whoCanSee}
            label="Who can see"
            onChange={handleWhoCanSee}
          >
            <MenuItem value={1}>Undergraduate</MenuItem>
            <MenuItem value={2}>Graduate</MenuItem>
            <MenuItem value={3}>Undergraduate & Graduate</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      {questionTimer ? (
        <Grid xs={2} item>
          <FormControl fullWidth variant="standard">
            <TextField
              type="number"
              fullWidth
              value={questions[questionIndex].time}
              onChange={handleTime}
              variant="standard"
              inputProps={{ min: 1, max: 100 }}
              label={"minutes"}
            />
          </FormControl>
        </Grid>
      ) : null}
      <Grid xs={2} item>
        <FormControl fullWidth variant="standard">
          <TextField
            type="number"
            fullWidth
            value={questions[questionIndex].points}
            onChange={handlePoints}
            variant="standard"
            inputProps={{ min: 1, max: 100 }}
            label={"points"}
          />
        </FormControl>
      </Grid>
      <Dialog open={preview} onClose={previewClose}>
        <Question questionIndex={questionIndex} />
        <DialogActions>
          <Button onClick={previewClose} autoFocus>
            close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default memo(QuestionHeader);
