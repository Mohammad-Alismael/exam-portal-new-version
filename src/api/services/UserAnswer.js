import {axiosPrivate} from "../axios";
import {CORRECT_QUESTION_TEXT, CORRECT_QUESTIONS, GET_EXAM_FINAL_RESULT, SUBMIT_USER_ANSWER} from "./RouteNames";

async function submitUserAnswer(userAnswerObject,examId) {
    try {
        const res = await axiosPrivate.post(SUBMIT_USER_ANSWER, { questions: [...userAnswerObject],examId });
        return await res["data"];
    } catch (e) {
        console.log(Object.keys(e));
    }
}
async function getExamGrade(examId,studentId,controller) {
    try {
        const res = await axiosPrivate.get(`${GET_EXAM_FINAL_RESULT}/${examId}/${studentId}`, { signal: controller.signal });
        return await res;
    } catch (e) {
        if (e.response.status)
            throw new Error(e.response.data.message)
    }
}

async function correctQuestionText(points,questionId,username) {
    try {
        const res = await axiosPrivate.post(CORRECT_QUESTION_TEXT,{points,questionId,username});
        return await res['data'];
    } catch (e) {
        console.log(e.response.status);
    }
}
async function correctQuestions(examId,username) {
    try {
        const res = await axiosPrivate.post(CORRECT_QUESTIONS,{examId,username});
        return await res;
    } catch (e) {
        console.log(e.response.status);
    }
}
export {
    submitUserAnswer,
    getExamGrade,
    correctQuestionText,
    correctQuestions
}