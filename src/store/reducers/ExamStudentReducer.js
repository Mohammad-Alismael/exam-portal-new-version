import * as actionTypes from '../actions'
const initialState = {
    answeredQuestions : []
}

const ExamStudentReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ANSWER_QUESTION_ARRAY:
            return {
                ...state,
                answeredQuestions: []
            }

        case actionTypes.SET_NEW_ANSWER_QUESTION_ARRAY:
            return {
                ...state,
                answeredQuestions: action.payload.questions
            }

        default:
            break;
    }
    return state;
}

export default ExamStudentReducer