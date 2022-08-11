import * as actionTypes from '../actions'

const initialState = {
    courseId: "",
    course_info: null,
    announcements: [],
    classmates: []
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
        case actionTypes.SET_COURSE_CLASSMATES:
            return {
                ...state,
                classmates: action.classmates
            }
        default:
            break;
    }
    return state;
}
export default CourseReducer