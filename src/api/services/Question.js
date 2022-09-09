import {axiosPrivate, token} from "../axios";
import {DELETE_QUESTION, FETCH_EXAM_QUESTIONS, FETCH_EXAM_STUDENTS, UPDATE_EXAM_QUESTION} from "./RouteNames";

async function deleteQuestion(questionId,examId) {
    try {
        const res = await axiosPrivate.delete(DELETE_QUESTION,{
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: {
                questionId,
                examId
            }
        })
        return await res['data']
    } catch (e) {
        console.log(e)
    }
}

async function fetchExamQuestions(exam_id,controller) {
    try {
        const res = await axiosPrivate.get(`${FETCH_EXAM_QUESTIONS}/${exam_id}`, {signal: controller.signal})
        return await res['data']
    } catch (e) {
        console.log(e)
    }
}

async function updateExamQuestions(examObject) {
    try {
        const res = await axiosPrivate.post(UPDATE_EXAM_QUESTION,{...examObject})
        return await res['data']
    } catch (e) {
        console.log(e)
    }
}
export {deleteQuestion,fetchExamQuestions,updateExamQuestions};