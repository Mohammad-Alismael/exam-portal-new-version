import * as actionTypes from '../actions'
import {SET_COURSE_CLASSMATES, SET_COURSE_EXAMS} from "../actions";

const initialState = {
    courseId: "",
    course_info: null,
    announcements: [],
    classmates: [],
    filteredClassmates: [],
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
            console.log(action.payload.announcements)
            return {
                ...state,
                announcements: action.payload.announcements
            }
        case actionTypes.SET_COURSE_CLASSMATES:
            return {
                ...state,
                classmates: action.classmates
            }
        case actionTypes.SET_FILTERED_CLASSMATES:
            return {
                ...state,
                filteredClassmates: action.filteredClassmates
            }
        case actionTypes.SET_COURSE_EXAMS:
            return {
                ...state,
                exams: action.payload.exams
            }
        default:
            break;
    }
    return state;
}
export default CourseReducer