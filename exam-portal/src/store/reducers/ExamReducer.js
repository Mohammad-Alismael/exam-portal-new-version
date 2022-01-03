import * as actionTypes from '../actions'
const initialState = {
    examTitle:"",
    startingAt:0,
    endingAt:0,
    totalPoints: 0,
   questions : []
}
const ExamReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APPEND_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload.question]
            }
        case actionTypes.SET_QUESTION_ARRAY:
            return {
                ...state,
                questions: []
            }
        case actionTypes.SET_MAX_QUESTIONS:
            return {
                ...state,
                maxQuestions: action.payload.maxQuestions
            }
        case actionTypes.SET_NEW_QUESTION_ARRAY:
            return {
                ...state,
                questions: action.payload.newQuestionArray
            }
        case actionTypes.SET_TOTAL_POINTS:
            return {
                ...state,
                totalPoints: action.payload.points
            }
        case actionTypes.SET_EXAM_TITLE:
            return {
                ...state,
                examTitle: action.payload.examTitle
            }
        case actionTypes.SET_ENDING_AT:
            return {
                ...state,
                endingAt: action.payload.endingAt
            }
        case actionTypes.SET_STARTING_AT:
            return {
                ...state,
                startingAt: action.payload.startingAt
            }
        case actionTypes.CHECK_TOTAL_POINTS:
            let totalPoints = 0;
            for (let i = 0; i < state.length; i++) {
                let points = state.questions[i]['points'];
                totalPoints += points
            }
            console.log(totalPoints)
            return {
                ...state,
                totalPoints: totalPoints
            }
        default:
            break;
    }
    return state;
}

export default ExamReducer