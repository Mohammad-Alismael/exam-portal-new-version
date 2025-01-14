import { axiosPrivate, token } from "../axios";
import {
    CREATE_EXAM,
    DELETE_EXAM,
    DELETE_QUESTION,
    FETCH_EXAM_DETAILS,
    FETCH_EXAM_DETAILS_STUDENT,
    FETCH_EXAM_QUESTIONS,
    FETCH_EXAM_STUDENTS,
    FETCH_EXAMS, FETCH_EXAMS_STUDENT, FETCH_MISSED_EXAMS,
    UPDATE_EXAM,
    UPDATE_EXAM_DETAILS,
} from "./RouteNames";
import { toast } from "react-toastify";
import User from "./User";

async function fetchExams(courseId, controller) {
    try {
        const res = await axiosPrivate.get(`${FETCH_EXAMS}/${courseId}`, { signal: controller.signal });
        return await res["data"];
    } catch (e) {
        console.log(e.message.status);
    }
}


async function fetchExamsStudent(courseId, controller) {
    try {
        const res = await axiosPrivate.post(
            `${FETCH_EXAMS_STUDENT}/${courseId}`, { signal: controller.signal }
        );
        return await res["data"];
    } catch (e) {
        console.log(e.message.status);
    }
}
async function createExam(examObject) {
    console.log("exam object => ",examObject)
    try {
        const res = await axiosPrivate.post(CREATE_EXAM, { ...examObject });
        return await res["data"];
    } catch (e) {
        console.log(e.message.status);
    }
}

async function fetchExamDetails(exam_id,courseId, controller) {
    try {
        const res = await axiosPrivate.get(`${FETCH_EXAM_DETAILS}/${courseId}/${exam_id}`, {
            signal: controller.signal,
        });
        return await res["data"];
    } catch (e) {
        throw new Error(e.response.data["message"]);
    }
}

async function fetchExamStudents(exam_id, controller) {
    try {
        const res = await axiosPrivate.get(`${FETCH_EXAM_STUDENTS}/${exam_id}`, {
            signal: controller.signal,
        });
        return await res["data"];
    } catch (e) {
        console.log(e);
    }
}

async function updateExamDetails(examObject) {
    try {
        const res = await axiosPrivate.put(UPDATE_EXAM_DETAILS, { ...examObject });
        return await res["data"];
    } catch (e) {
        console.log(Object.keys(e));
    }
}

async function deleteExam(examId) {
    try {
        const res = await axiosPrivate.delete(DELETE_EXAM, {
            headers: {
                Authorization: "Bearer " + token,
            },
            data: {
                examId,
            },
        });
        return await res["data"];
    } catch (e) {
        console.log(e);
    }
}

async function fetchExamDetailsForStudent(exam_id, controller) {
    try {
        const res = await axiosPrivate.get(
            `${FETCH_EXAM_DETAILS_STUDENT}/${exam_id}`,
            { signal: controller.signal }
        );
        return await res["data"];
    } catch (e) {
        console.log(e);
    }
}

async function fetchMissedExams(courseId, controller) {
    try {
        const res = await axiosPrivate.get(
            `${FETCH_MISSED_EXAMS}/${courseId}`,
            {signal: controller.signal}
        );
        return await res["data"];
    } catch (e) {
        console.log(e);
    }
}

export {
    fetchExamDetailsForStudent,
    deleteExam,
    fetchExams,
    updateExamDetails,
    createExam,
    fetchExamDetails,
    fetchExamStudents,
    fetchMissedExams,
    fetchExamsStudent
};
