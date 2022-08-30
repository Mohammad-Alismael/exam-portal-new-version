import * as actionTypes from '../actions'
import {SET_EXAM_QUESTIONS_STUDENT} from "../actions";
const initialState = {
    questions : []
}

const ExamStudentReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EXAM_QUESTIONS_STUDENT:
            return {
                ...state,
                questions: action.payload.questions
            }
        default:
            break;
    }
    return state;
}

export default ExamStudentReducer