import * as actionTypes from "../actions";

const initialState = {
    tmpId: '',
    answerKey: 0,
    points: 5,
    whoCanSee: 1,
    questionType: 5,
    questionText: "",
    isActive: true,
    options: null
};
const AddQuestionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TMP_ID:
            return {
                ...state,
                tmpId: action.payload.tmpId
            }
        case actionTypes.SET_ANSWER_KEY:
            return {
                ...state,
                answerKey: action.payload.answerKey
            }
        case actionTypes.SET_POINTS:
            return {
                ...state,
                points: action.payload.points
            }
        case actionTypes.SET_WHO_CAN_SEE:
            return {
                ...state,
                whoCanSee: action.payload.whoCanSee
            }
        case actionTypes.SET_QUESTION_TYPE:
            return {
                ...state,
                questionType: action.payload.questionType
            }
        case actionTypes.SET_QUESTION_TEXT:
            return {
                ...state,
                questionText: action.payload.questionText
            }
        case actionTypes.SET_IS_ACTIVE:
            return {
                ...state,
                isActive: action.payload.isActive
            }
        case actionTypes.SET_OPTIONS:
            return {
                ...state,
                options: action.payload.options
            }
        default:
            break;
    }
    return state;
}

export default AddQuestionReducer;