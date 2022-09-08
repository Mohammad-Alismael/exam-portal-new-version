import {axiosPrivate} from "../axios";
import {GET_EXAM_FINAL_RESULT, SUBMIT_USER_ANSWER} from "./RouteNames";

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
        console.log(e.response.status);
    }
}

export {
    submitUserAnswer,
    getExamGrade
}