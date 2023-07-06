// Individual selectors for each property
import { createSelector } from "reselect";

const selectExamTitle = (state) => state.ExamReducer.examTitle;
const selectStartingAt = (state) => state.ExamReducer.startingAt;
const selectEndingAt = (state) => state.ExamReducer.endingAt;
const selectAssignedFor = (state) => state.ExamReducer.assignedFor;
const selectSpecificStudents = (state) => state.ExamReducer.specificStudents;
const selectNavigation = (state) => state.ExamReducer.navigation;
const selectQuestionTimer = (state) => state.ExamReducer.questionTimer;
const selectPostingAnswerKey = (state) => state.ExamReducer.postingAnswerKey;
const selectPostingAnswerKeyAt = (state) =>
  state.ExamReducer.postingAnswerKeyAt;
const selectQuestionRandomness = (state) =>
  state.ExamReducer.questionRandomness;
const selectTotalPoints = (state) => state.ExamReducer.totalPoints;

export const selectQuestions = (state) => state.ExamReducer.questions;
export const selectExamProperties = createSelector(
  selectExamTitle,
  selectStartingAt,
  selectEndingAt,
  selectAssignedFor,
  selectSpecificStudents,
  selectNavigation,
  selectQuestionTimer,
  selectPostingAnswerKey,
  selectPostingAnswerKeyAt,
  selectQuestionRandomness,
  selectTotalPoints,
  (
    examTitle,
    startingAt,
    endingAt,
    assignedFor,
    specificStudents,
    navigation,
    questionTimer,
    postingAnswerKey,
    postingAnswerKeyAt,
    questionRandomness,
    totalPoints
  ) => ({
    examTitle,
    startingAt,
    endingAt,
    assignedFor,
    specificStudents,
    navigation,
    questionTimer,
    postingAnswerKey,
    postingAnswerKeyAt,
    questionRandomness,
    totalPoints,
  })
);
export const selectExamSettings = createSelector(
  selectExamTitle,
  selectStartingAt,
  selectEndingAt,
  selectAssignedFor,
  (examTitle, startingAt, endingAt, assignedFor) => ({
    examTitle,
    startingAt,
    endingAt,
    assignedFor,
  })
);

export const selectExamQuestions = createSelector(
  selectQuestions,
  (questions) => ({
    questions,
  })
);

export const selectQuestionHeader = createSelector(
  selectQuestionTimer,
  selectAssignedFor,
  (questionTime, assignedFor) => ({
    questionTime,
    assignedFor,
  })
);
