import * as actionTypes from "../actions";
import {
    CHANGE_QUESTION_OPTIONS,
    REMOVE_TIME_OBJECT,
    SET_EXAM_ANSWER_KEY,
    SET_EXAM_QUESTION_INDEX,
    SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS, SET_WHO_CAN_SEE_OBJECT
} from "../actions";
const initialState = {
    examTitle: "",
    startingAt: 0,
    endingAt: 0,
    assignedFor: 3,
    specificStudents : null,
    navigation: null,
    questionTimer: 'false',
    questionRandomness: 'true',
    postingAnswerKey: 'true',
    postingAnswerKeyAt: null,
    questions: [],
    students: [],
    isItPreview : false
};
const ExamReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.APPEND_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.payload.question],
            };
        case actionTypes.CHANGE_PREVIEW:
            return {
                ...state,
                isItPreview: action.payload.isItPreview
            };
        case actionTypes.SET_QUESTIONS:
            return {
                ...state,
                questions: action.payload.questions,
            };
        case actionTypes.CHANGE_QUESTION_OPTIONS:
            const __index = action.payload.index;
            const newOptions = action.payload.newOptions;
            const deepQuestionCopy = state.questions
            const deepQuestionObject = deepQuestionCopy[__index]
            deepQuestionObject['options'] = newOptions
            deepQuestionCopy[__index] = deepQuestionObject
            console.log('index', __index, 'new options', newOptions)
            return {
                ...state,
                questions: deepQuestionCopy
            }
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
        case actionTypes.SET_SPECIFIC_STUDENTS:
            return {
                ...state,
                specificStudents: action.payload.specificStudents,
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
        case actionTypes.SET_EXAM_ANSWER_KEY_AT:
            return {
                ...state,
                postingAnswerKeyAt: action.payload.postingAnswerKeyAt,
            }
        case actionTypes.SET_STUDENTS:
            return {
                ...state,
                students: action.payload.students
            }
        case actionTypes.SET_WHO_CAN_SEE_OBJECT:
            const questionsWithSettedWhoCanSee = state.questions.map((val,i)=>{
                return {val, whoCanSee: action.payload.whoCanSee}
            })
            return {
                ...state,
                questions: questionsWithSettedWhoCanSee
            }
        default:
            break;
    }
    return state;
};

export default ExamReducer;
