import * as actionTypes from '../actions'
import {SET_EXAM_STUDENT_TIMER, SET_QUESTION_TIME_LEFT, SET_QUESTION_USER_ANSWER} from "../actions";
const initialState = {
    questionIndex: 0,
    questions : [],
    examDetails: null,
}

const ExamStudentReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EXAM_QUESTIONS_STUDENT:
            return {
                ...state,
                questions: action.payload.questions
            }
        case actionTypes.SET_QUESTION_INDEX:
            return {
                ...state,
                questionIndex: action.payload.questionIndex
            }
        case actionTypes.SET_STUDENT_EXAM_DETAILS:
            return {
                ...state,
                examDetails: action.payload.examDetails
            }
        case actionTypes.SET_QUESTION_TIME_LEFT:
            const deepCopy = state.questions;
            deepCopy[state.questionIndex]['time'] = action.payload.time
            return {
                ...state,
                questions: deepCopy
            }
        case actionTypes.SET_EXAM_STUDENT_TIMER:
            const examDetailsDeepCopy = state.examDetails;
            examDetailsDeepCopy['timeLeft'] = action.payload.timeLeft
            return {
                ...state,
                examDetails: examDetailsDeepCopy
            }
        case actionTypes.SET_QUESTION_USER_ANSWER:
            const deepCopy_ = state.questions;
            deepCopy_[state.questionIndex]['userAnswer'] = action.payload.userAnswer
            return {
                ...state,
                questions: deepCopy_
            }
        default:
            return state;
    }

}

export default ExamStudentReducer