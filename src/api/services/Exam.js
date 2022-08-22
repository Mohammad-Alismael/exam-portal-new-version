import {axiosPrivate} from "../axios";
import {CREATE_EXAM, FETCH_EXAM_QUESTIONS} from "./RouteNames";
import {toast} from "react-toastify";
import User from "./User";

async function createExam(examObject) {
   User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.post(CREATE_EXAM,examObject)
        return await res['data']
    }catch (e) {
        console.log(e.message.status)
    }
}

async function fetchExamQuestions(exam_id,controller) {
    User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.post(FETCH_EXAM_QUESTIONS,
            {exam_id},{signal: controller.signal})
        return await res['data']
    } catch (e) {
        console.log(e.message.status)
    }
}

export {createExam,fetchExamQuestions};