import userApi from "../api/services/User";
import {toast} from "react-toastify";
import {
    SET_ASSIGNED_FOR,
    SET_ENDING_AT, SET_EXAM_ANSWER_KEY, SET_EXAM_ANSWER_KEY_AT, SET_EXAM_RANDOMNESS, SET_EXAM_TIMER,
    SET_EXAM_TITLE, SET_NAVIGATION, SET_QUESTIONS,
    SET_SPECIFIC_STUDENTS,
    SET_STARTING_AT, SET_STUDENTS
} from "../store/actions";

export default function ResetExamReducer(){
    return (dispatch) => {
        dispatch({
            type: SET_STARTING_AT,
            payload: {startingAt: 0},
        });
        dispatch({
            type: SET_ENDING_AT,
            payload: {endingAt: 0},
        });
        dispatch({
            type: SET_EXAM_TITLE,
            payload: {examTitle: ""},
        });
        dispatch({
            type: SET_ASSIGNED_FOR,
            payload: {assignedFor: 3},
        });
        dispatch({
            type: SET_SPECIFIC_STUDENTS,
            payload: {specificStudents: null},
        });
        dispatch({
            type: SET_STUDENTS,
            payload: {students: []},
        });
        dispatch({
            type: SET_NAVIGATION,
            payload: {navigation: false},
        });
        dispatch({
            type: SET_EXAM_TIMER,
            payload: {questionTimer: false},
        });
        dispatch({
            type: SET_EXAM_RANDOMNESS,
            payload: {questionRandomness: true},
        });
        dispatch({
            type: SET_EXAM_ANSWER_KEY_AT,
            payload: {postingAnswerKeyAt: null},
        });
        dispatch({
            type: SET_EXAM_ANSWER_KEY,
            payload: {postingAnswerKey: true},
        });
        dispatch({ type: SET_QUESTIONS, payload: { questions: [] } });
    }
}