import * as actionTypes from '../actions'
import {SET_COURSE_LIST} from "../actions";

const initialState = {
    courseList: [],
    isLoading: false,
}

const CourseListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COURSE_LIST:
            return {
                ...state,
                courseList: action.payload.courseList
            }
        case actionTypes.FETCH_COURSE_LIST_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case actionTypes.FETCH_COURSE_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false
            };

        default:
            break;
    }

    return state;
}

export default CourseListReducer;