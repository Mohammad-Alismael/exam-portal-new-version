import * as actionTypes from '../actions'
const initialState = {
    maxQuestions: 0,
   questions : []
}
const ExamReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APPEND_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload.question]
            }
        case actionTypes.SET_MAX_QUESTIONS:
            return {
                ...state,
                maxQuestions: action.payload.maxQuestions
            }
        case actionTypes.SET_QUESTION_ARRAY:
            return {
                ...state,
                questions: action.payload.questionAr
            }
        default:
            break;
    }
    return state;
}

export default ExamReducer