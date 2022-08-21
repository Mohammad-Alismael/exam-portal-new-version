import * as actionTypes from '../actions'
import {SET_COURSE_EXAMS} from "../actions";

const initialState = {
    courseId: "",
    course_info: null,
    announcements: [],
    classmates: [],
    exams: []
}

const CourseReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COURSE_ID:
            return {
                ...state,
                courseId: action.payload.courseId
            }
        case actionTypes.SET_COURSE_INFO:
            return {
                ...state,
                course_info: action.course_info
            }
        case actionTypes.SET_COURSE_ANNOUNCEMENTS:
            return {
                ...state,
                announcements: action.announcements
            }
        case actionTypes.SET_COURSE_EXAMS:
            return {
                ...state,
                exams: action.exams
            }
        default:
            break;
    }
    return state;
}
export default CourseReducer