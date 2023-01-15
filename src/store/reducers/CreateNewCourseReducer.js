import * as actionTypes from "../actions";
import {
    SET_ANNOUNCEMENTS_COMMENTS,
    SET_BACKGROUND_OBJECT_FILE,
    SET_LET_STUDENTS_ASK_QUESTIONS,
    SET_NEW_COURSE_NAME,
    SET_NEW_COURSE_SECTION
} from "../actions";

const initialState = {
    courseName: "",
    section: "",
    backgroundFileObject: null,
    letStudentsAskQuestions: false,
    announcementsComments: false
}

const CreateNewCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEW_COURSE_NAME:
            return {
                ...state,
                courseName: action.payload.courseName
            }
        case actionTypes.SET_NEW_COURSE_SECTION:
            return {
                ...state,
                section: action.payload.section
            }
        case actionTypes.SET_BACKGROUND_OBJECT_FILE:
            return {
                ...state,
                backgroundFileObject: action.payload.backgroundFileObject
            }
        case actionTypes.SET_LET_STUDENTS_ASK_QUESTIONS:
            return {
                ...state,
                letStudentsAskQuestions: action.payload.letStudentsAskQuestions
            }
        case actionTypes.SET_ANNOUNCEMENTS_COMMENTS:
            return {
                ...state,
                announcementsComments: action.payload.announcementsComments
            }
        default:
            break;
    }
    return state;
}

export default CreateNewCourseReducer