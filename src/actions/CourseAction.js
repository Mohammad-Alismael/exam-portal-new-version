import {fetchCourseInfo} from "../api/services/Course";
import {toast} from "react-toastify";
import * as Actions from "../store/actions";

export function CourseAction(course_id) {
    return (dispatch) => {
        return fetchCourseInfo(course_id).then((data)=>{
            console.log(data)
            dispatch(setCourseInfo(data['course_info']))
            dispatch(setCourseAnnouncements(data['announcements']))
            dispatch(setCourseClassmates(data['classmates']))
            dispatch(setCourseExams(data['exams']))
        }).catch(error => {
            console.log(error)
            toast.info(error.response.data.message)
        });
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