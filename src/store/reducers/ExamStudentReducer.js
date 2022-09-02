import * as actionTypes from '../actions'
const initialState = {
    questionIndex: 0,
    questions : [],
    examDetails: null,
}

const ExamStudentReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EXAM_QUESTIONS_STUDENT:
            return {
                ...state,
                questions: action.payload.questions
            }
        case actionTypes.SET_QUESTION_INDEX:
            console.log(action.payload)
            return {
                ...state,
                questionIndex: action.payload.questionIndex
            }
        case actionTypes.SET_STUDENT_EXAM_DETAILS:
            return {
                ...state,
                examDetails: action.payload.examDetails
            }
        default:
            return state;
    }

}

export default ExamStudentReducer