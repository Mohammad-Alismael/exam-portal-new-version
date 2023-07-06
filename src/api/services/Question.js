import { axiosPrivate, token } from "../axios";
import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  FETCH_EXAM_QUESTIONS,
  FETCH_EXAM_QUESTIONS_STUDENT,
  FETCH_EXAM_STUDENTS,
  UPDATE_EXAM_QUESTION,
} from "./RouteNames";

async function deleteQuestion(questionId, examId) {
  try {
    const res = await axiosPrivate.delete(DELETE_QUESTION, {
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        questionId,
        examId,
      },
    });
    return await res["data"];
  } catch (e) {
    console.log(e["response"]);
    throw {
      status: e["response"]["status"],
      reason: e["response"]["data"]["message"],
    };
  }
}

async function fetchExamQuestions(exam_id, controller) {
  try {
    const res = await axiosPrivate.get(`${FETCH_EXAM_QUESTIONS}/${exam_id}`, {
      signal: controller.signal,
    });
    return await res["data"];
  } catch (e) {
    console.log(e);
  }
}

async function updateExamQuestions(examObject) {
  try {
    const res = await axiosPrivate.put(
      `${UPDATE_EXAM_QUESTION}/${examObject?.exam_id}`,
      { ...examObject }
    );
    return await res["data"];
  } catch (e) {
    console.log(e);
  }
}
async function fetchExamQuestionsStudent(exam_id, controller) {
  try {
    const res = await axiosPrivate.get(
      `${FETCH_EXAM_QUESTIONS_STUDENT}/${exam_id}`,
      { signal: controller.signal }
    );
    return await res["data"];
  } catch (e) {
    console.log(e);
  }
}

async function createQuestionsRequest(questionsObject) {
  console.log("question object =>", questionsObject);
  const res = await axiosPrivate.post(`${CREATE_QUESTION}`, {
    ...questionsObject,
  });
  return res["data"];
}

function wrapWithTryCatch(fn) {
  return async function (exam_id, controller) {
    try {
      return await fn(exam_id, controller);
    } catch (error) {
      console.error(error);
    }
  };
}
const createQuestions = wrapWithTryCatch(createQuestionsRequest);
export {
  deleteQuestion,
  createQuestions,
  createQuestionsRequest,
  fetchExamQuestions,
  updateExamQuestions,
  fetchExamQuestionsStudent,
};
