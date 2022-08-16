import * as actionTypes from "../actions";
import {SET_EXAM_ANSWER_KEY, SET_QUESTIONS} from "../actions";
const initialState = {
    examTitle: "",
    startingAt: 0,
    endingAt: 0,
    assignedFor: null,
    navigation: null,
    questionTimer: null,
    questionRandomness: '1',
    postingAnswerKey: null,
    questions: [],
};
const ExamReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APPEND_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload.question],
            };
        case actionTypes.SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload.questions,
            };
        case actionTypes.SET_EXAM_TITLE:
            return {
                ...state,
                examTitle: action.payload.examTitle,
            };
        case actionTypes.SET_STARTING_AT:
            return {
                ...state,
                startingAt: action.payload.startingAt,
            };
        case actionTypes.SET_ENDING_AT:
            return {
                ...state,
                endingAt: action.payload.endingAt,
            };
        case actionTypes.SET_ASSIGNED_FOR:
            return {
                ...state,
                assignedFor: action.payload.assignedFor,
            }
        case actionTypes.SET_NAVIGATION:
            return {
                ...state,
                navigation: action.payload.navigation,
            }
        case actionTypes.SET_EXAM_TIMER:
            return {
                ...state,
                questionTimer: action.payload.questionTimer,
            }
        case actionTypes.SET_EXAM_RANDOMNESS:
            return {
                ...state,
                questionRandomness: action.payload.questionRandomness,
            }
        case actionTypes.SET_EXAM_ANSWER_KEY:
            return {
                ...state,
                postingAnswerKey: action.payload.postingAnswerKey,
            }
        default:
            break;
    }
    return state;
};

export default ExamReducer;
