import {
  SET_ASSIGNED_FOR,
  SET_ENDING_AT,
  SET_EXAM_ANSWER_KEY,
  SET_EXAM_ANSWER_KEY_AT,
  SET_EXAM_RANDOMNESS,
  SET_EXAM_TIMER,
  SET_EXAM_TITLE,
  SET_NAVIGATION,
  SET_QUESTIONS,
  SET_SPECIFIC_STUDENTS,
  SET_STARTING_AT,
  SET_STUDENTS,
} from "../store/actions";
import { v4 as uuidv4 } from "uuid";

export function ExamActions() {
  return (dispatch) => {
    dispatch(setStartingAt(0));
    dispatch(setEndingAt(0));
    dispatch(setExamTitle(""));
    dispatch(setAssignedFor(3));
    dispatch(setSpecificStudents(null));
    dispatch(setStudents([]));
    dispatch(setNavigation(false));
    dispatch(setExamTimer(false));
    dispatch(setExamRandomness(true));
    dispatch(setExamAnswerKeyAt(null));
    dispatch(setExamAnswerKey(true));
    dispatch(setQuestionsList([]));
  };
}

export function setExamProperties(examDetails, examQuestions) {
  return (dispatch) => {
    dispatch(setStartingAt(examDetails["starting_at"]));
    dispatch(setEndingAt(examDetails["ending_at"]));
    dispatch(setExamTitle(examDetails["title"]));
    dispatch(setAssignedFor(examDetails["assigned_for"]));
    dispatch(setSpecificStudents(null));
    dispatch(setNavigation(examDetails["navigation"]));
    dispatch(setExamTimer(examDetails["question_timer"]));
    dispatch(setExamRandomness(examDetails["question_randomness"]));
    dispatch(setExamAnswerKeyAt(examDetails["see_result_at"]));
    dispatch(setExamAnswerKey(examDetails["see_result_at"] == null));
    dispatch(setQuestionsList(examQuestions));
  };
}

export function setStartingAt(startingAt) {
  return {
    type: SET_STARTING_AT,
    payload: { startingAt },
  };
}

export function setEndingAt(endingAt) {
  return {
    type: SET_ENDING_AT,
    payload: { endingAt },
  };
}

export function setExamTitle(examTitle) {
  return {
    type: SET_EXAM_TITLE,
    payload: { examTitle },
  };
}

export function setAssignedFor(assignedFor) {
  return {
    type: SET_ASSIGNED_FOR,
    payload: { assignedFor },
  };
}

export function setSpecificStudents(specificStudents) {
  return {
    type: SET_SPECIFIC_STUDENTS,
    payload: { specificStudents },
  };
}

export function setStudents(students) {
  return {
    type: SET_STUDENTS,
    payload: { students },
  };
}

export function setNavigation(navigation) {
  return {
    type: SET_NAVIGATION,
    payload: { navigation },
  };
}

export function setExamTimer(questionTimer) {
  return {
    type: SET_EXAM_TIMER,
    payload: { questionTimer },
  };
}

export function setExamRandomness(questionRandomness) {
  return {
    type: SET_EXAM_RANDOMNESS,
    payload: { questionRandomness },
  };
}

export function setExamAnswerKeyAt(postingAnswerKeyAt) {
  return {
    type: SET_EXAM_ANSWER_KEY_AT,
    payload: { postingAnswerKeyAt },
  };
}

export function setExamAnswerKey(postingAnswerKey) {
  return {
    type: SET_EXAM_ANSWER_KEY,
    payload: { postingAnswerKey },
  };
}

export function setQuestionsList(questions) {
  return {
    type: SET_QUESTIONS,
    payload: { questions },
  };
}

export function createNewQuestion(questions) {
  return (dispatch) => {
    const uid = uuidv4();
    const questionObj = {
      answerKey: [],
      isActive: true,
      options: [],
      time: null,
      points: 5,
      questionText: "",
      objectFile: null,
      questionType: 5,
      tmpId: uid,
      whoCanSee: 3,
      previewFile: null,
    };

    const newQuestionAr = [...questions];
    newQuestionAr.push(questionObj);
    dispatch(setQuestionsList(newQuestionAr));
  };
}
