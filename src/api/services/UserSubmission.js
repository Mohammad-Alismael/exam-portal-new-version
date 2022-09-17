import {axiosPrivate} from "../axios";
import {
    DID_STUDENT_SUBMIT,
    FETCH_PENDING_AND_GRADED_EXAMS,
    FETCH_STUDENTS_SUBMISSION,
    GET_EXAM_FINAL_RESULT
} from "./RouteNames";
import {getUserInfo} from "./User";

async function fetchStudentsSubmission(examId,controller) {
    try {
        const res = await axiosPrivate.get(`${FETCH_STUDENTS_SUBMISSION}/${examId}`, {signal: controller.signal});
        return await res['data'];
    } catch (e) {
        console.log(e.response.status);
    }
}
async function fetchStudentSubmission(examId,username,controller) {
    const user = await getUserInfo(username)
    console.log('studentId',user?.user_id)
    try {
        const res = await axiosPrivate.get(`${FETCH_STUDENTS_SUBMISSION}/${examId}/${user?.user_id}`, {signal: controller.signal});
        return await res['data'];
    } catch (e) {
        console.log(e.response.status);
    }
}
async function didUserSubmit(examId,studentId,controller) {
    // const user = await getUserInfo(username)
    // console.log('studentId',user?.user_id)
    try {
        const res = await axiosPrivate.get(`${DID_STUDENT_SUBMIT}/${examId}/${studentId}`, {signal: controller.signal});
        return await res['data'];
    } catch (e) {
        console.log(e.response.status);
    }
}

async function fetchPendingAndSubmittedExam(classroomId, studentId, controller) {
    try {
        const res = await axiosPrivate.get(`${FETCH_PENDING_AND_GRADED_EXAMS}/${classroomId}/${studentId}`,
            {signal: controller.signal})
        return await res['data'];
    }catch (e) {
        console.log(e.response.status);
    }
}
export {
    fetchStudentsSubmission,
    fetchStudentSubmission,
    didUserSubmit,
    fetchPendingAndSubmittedExam
}