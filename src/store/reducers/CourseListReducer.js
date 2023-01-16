import * as actionTypes from '../actions'
import {SET_COURSE_LIST} from "../actions";

const initialState = {
    courseList: []
}

const CourseListReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COURSE_LIST:
            return {
                ...state,
                courseList: action.payload.courseList
            }
        default:
            break;
    }

    return state;
}

export default CourseListReducer;