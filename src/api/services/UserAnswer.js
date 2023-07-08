import { axiosPrivate } from "../axios";
import {
  CORRECT_QUESTION_TEXT,
  CORRECT_QUESTIONS,
  GET_EXAM_FINAL_RESULT,
  SUBMIT_USER_ANSWER,
} from "./RouteNames";

async function submitUserAnswer(userAnswerObject, examId) {
  try {
    const res = await axiosPrivate.post(SUBMIT_USER_ANSWER, {
      questions: [...userAnswerObject],
      examId,
    });
    return await res["data"];
  } catch (e) {
    console.log(Object.keys(e));
  }
}
async function getExamGrade(examId, studentId, controller) {
  try {
    return await axiosPrivate.get(`${GET_EXAM_FINAL_RESULT}/${examId}`, {
      signal: controller.signal,
    });
  } catch (e) {
    if (e.response.status) throw new Error(e.response.data.message);
  }
}

async function correctQuestionText(points, questionId, username) {
  try {
    const res = await axiosPrivate.post(CORRECT_QUESTION_TEXT, {
      points,
      questionId,
      username,
    });
    return res["data"];
  } catch (e) {
    console.log(e.response.status);
  }
}
async function correctQuestions(examId, username) {
  try {
    const res = await axiosPrivate.post(CORRECT_QUESTIONS, {
      examId,
      username,
    });
    return res;
  } catch (e) {
    console.log(e.response.status);
  }
}
export {
  submitUserAnswer,
  getExamGrade,
  correctQuestionText,
  correctQuestions,
};
