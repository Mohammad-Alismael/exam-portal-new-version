import * as actionTypes from "../actions";

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
              announcementsComments: action.payload.announcementsComments,
            };
        case actionTypes.SET_NEW_COURSE_OBJECT:
            return {
                ...action.payload.newCourseObject
            }
        default:
            break;
    }
    return state;
}

export default CreateNewCourseReducer