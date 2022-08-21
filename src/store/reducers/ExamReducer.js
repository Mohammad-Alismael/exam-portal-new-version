import * as actionTypes from "../actions";
import {REMOVE_TIME_OBJECT, SET_EXAM_ANSWER_KEY, SET_EXAM_QUESTION_INDEX, SET_QUESTIONS} from "../actions";
const initialState = {
    examTitle: "",
    startingAt: 0,
    endingAt: 0,
    assignedFor: null,
    navigation: null,
    questionTimer: 'false',
    questionRandomness: 'true',
    postingAnswerKey: 'true',
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
        case actionTypes.SET_EXAM_QUESTION_INDEX:
            const index = action.payload.index
            const newQuestion = action.payload.question
            const newQuestionArray = state.questions.map((obj,i)=>{
                if (index === i){
                    return {...newQuestion}
                }else {
                    return obj
                }
            })
            return {
                ...state,
                questions: newQuestionArray,
            };
        case actionTypes.REMOVE_TIME_OBJECT:
            // setting time object to null
            const __newQuestionArray = state.questions.map((obj,i)=>{
                console.log(obj)
                return {...obj,time : null}
            })
            return {
                ...state,
                questions: __newQuestionArray,
            };
        case actionTypes.DELETE_EXAM_QUESTION_INDEX:
            const _index = action.payload.index
            const _newQuestionArray = state.questions.filter((question,index)=>{
                return index !== _index
            })
            return {
                ...state,
                questions: _newQuestionArray,
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
