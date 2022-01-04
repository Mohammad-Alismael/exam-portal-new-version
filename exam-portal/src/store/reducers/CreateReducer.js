import * as actionTypes from '../actions'
const initialState = {
    questionsC: ["l"],

}

const CreateReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CREATE_EXAM_ARRAY:
            return {
                ...state,
                questionsC: action.payload.ar
            }
        default:
            break;
    }
    return state
}
export default CreateReducer;