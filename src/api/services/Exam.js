import {axiosPrivate} from "../axios";
import {
    CREATE_EXAM,
    FETCH_EXAM_DETAILS,
    FETCH_EXAM_QUESTIONS,
    FETCH_EXAM_STUDENTS,
    FETCH_EXAMS,
    UPDATE_EXAM
} from "./RouteNames";
import {toast} from "react-toastify";
import User from "./User";

async function fetchExams(courseId,controller) {
    User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.post(FETCH_EXAMS,{courseId} ,{signal: controller.signal})
        return await res['data']
    } catch (e) {
        console.log(e.message.status)
    }
}

async function createExam(examObject) {
   User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.post(CREATE_EXAM,{...examObject})
        return await res['data']
    }catch (e) {
        console.log(e.message.status)
    }
}

async function fetchExamQuestions(exam_id,controller) {
    User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.post(FETCH_EXAM_QUESTIONS,
            {examId: exam_id},{signal: controller.signal})
        return await res['data']
    } catch (e) {
        console.log(e)
    }
}

async function fetchExamDetails(exam_id,controller) {
    User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.get(FETCH_EXAM_DETAILS + exam_id, {signal: controller.signal})
        return await res['data']
    } catch (e) {
        console.log(e)
    }
}

async function fetchExamStudents(exam_id,controller) {
    User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.get(FETCH_EXAM_STUDENTS + exam_id, {signal: controller.signal})
        return await res['data']
    } catch (e) {
        console.log(e)
    }
}

async function updateExam(examObject) {
    User.checkTokenExpiration()
    try {
        const res = await axiosPrivate.post(UPDATE_EXAM, {...examObject})
        return await res['data']
    } catch (e) {
        console.log(Object.keys(e))
    }
}
export {fetchExams,updateExam,createExam,fetchExamQuestions,fetchExamDetails,fetchExamStudents};