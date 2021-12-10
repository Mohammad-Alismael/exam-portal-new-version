import * as actionTypes from '../actions'
const initialState = {
   questions : []
}
const ExamReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APPEND_QUESTION:
            return {
                ...state,
                questions: action.playload.questions
            }
        default:
            break;
    }
    return state;
}

export default ExamReducer