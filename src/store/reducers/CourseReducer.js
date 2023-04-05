import * as actionTypes from '../actions'

const initialState = {
    isLoading: false,
    courseId: "",
    course_info: null,
    announcements: [],
    classmates: [],
    filteredClassmates: [],
    exams: [],
    error: null
}

const CourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COURSE_ID:
            return {
                ...state,
                courseId: action.payload.courseId
            }
        case actionTypes.SET_COURSE_INFO:
            return {
                ...state,
                course_info: action.payload.course_info
            }
        case actionTypes.FETCH_COURSE_INFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_COURSE_INFO_SUCCESS:
            return {
                ...state,
                isLoading: false
            };
        case actionTypes.FETCH_COURSE_INFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        case actionTypes.SET_COURSE_ANNOUNCEMENTS:
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