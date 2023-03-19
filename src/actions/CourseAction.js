import {fetchCourseInfo} from "../api/services/Course";
import {toast} from "react-toastify";
import * as Actions from "../store/actions";
import {
    SET_ANNOUNCEMENTS_COMMENTS,
    SET_ASSIGNED_FOR, SET_BACKGROUND_OBJECT_FILE,
    SET_COURSE_ANNOUNCEMENTS,
    SET_COURSE_CLASSMATES,
    SET_COURSE_EXAMS,
    SET_COURSE_INFO,
    SET_ENDING_AT, SET_EXAM_ANSWER_KEY, SET_EXAM_ANSWER_KEY_AT,
    SET_EXAM_RANDOMNESS,
    SET_EXAM_TIMER,
    SET_EXAM_TITLE, SET_LET_STUDENTS_ASK_QUESTIONS,
    SET_NAVIGATION, SET_NEW_COURSE_NAME, SET_NEW_COURSE_SECTION, SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT,
    SET_STUDENTS
} from "../store/actions";

export function CourseAction(data) {
    return (dispatch) => {
        dispatch(setCourseInfo(data['course_info']))
        dispatch({ type: SET_COURSE_ANNOUNCEMENTS, payload: { announcements: data['announcements'] } });
        dispatch(setCourseClassmates(data['classmates']))
        dispatch({ type: SET_COURSE_EXAMS, payload: { exams: data['exams'] } });

    }
}
export function resetCourseReducer() {
    return (dispatch) => {
        dispatch({ type: SET_BACKGROUND_OBJECT_FILE, payload: { backgroundFileObject: null } });
        dispatch({
            type: SET_NEW_COURSE_NAME,
            payload: { courseName: "" },
        });
        dispatch({
            type: SET_NEW_COURSE_SECTION,
            payload: { section: "" },
        });
        dispatch({
            type: SET_LET_STUDENTS_ASK_QUESTIONS,
            payload: { letStudentsAskQuestions: false },
        });
        dispatch({
            type: SET_ANNOUNCEMENTS_COMMENTS,
            payload: { announcementsComments: false },
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

export function setFilteredClassmates(data){
    return {
        type: Actions.SET_FILTERED_CLASSMATES,
        filteredClassmates: data
    }
}
export function setCourseExams(data){
    return {
        type: Actions.SET_COURSE_EXAMS,
        exams: data
    }
}