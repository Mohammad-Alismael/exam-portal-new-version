import {fetchCourseInfo} from "../api/services/Course";
import {toast} from "react-toastify";
import * as Actions from "../store/actions";
import {SET_COURSE_ANNOUNCEMENTS, SET_COURSE_CLASSMATES, SET_COURSE_EXAMS, SET_COURSE_INFO} from "../store/actions";

export function CourseAction(data) {
    return (dispatch) => {
            console.log(data)
        dispatch(setCourseInfo(data['course_info']))
        dispatch(setCourseAnnouncements(data['announcements']))
        dispatch(setCourseClassmates(data['classmates']))
        dispatch({ type: SET_COURSE_EXAMS, payload: { exams: data['exams'] } });

    }
}

function setCourseInfo(data){
    return {
        type: Actions.SET_COURSE_INFO,
        course_info: data
    }
}
export function setCourseAnnouncements(data){
    return {
        type: Actions.SET_COURSE_ANNOUNCEMENTS,
        announcements: data
    }
}
export function setCourseClassmates(data){
    return {
        type: Actions.SET_COURSE_CLASSMATES,
        classmates: data
    }
}
export function setCourseExams(data){
    return {
        type: Actions.SET_COURSE_EXAMS,
        exams: data
    }
}