import {axiosPrivate} from "../axios";
import {FETCH_STUDENTS_SUBMISSION, GET_EXAM_FINAL_RESULT} from "./RouteNames";

async function fetchStudentsSubmission(examId,controller) {
    try {
        const res = await axiosPrivate.get(`${FETCH_STUDENTS_SUBMISSION}/${examId}`, {signal: controller.signal});
        return await res['data'];
    } catch (e) {
        console.log(e.response.status);
    }
}

export {
    fetchStudentsSubmission
}