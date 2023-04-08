import * as actionTypes from "../actions";
const initialState = {
  totalPoints: 0,
  questionsC: [],
};

const CreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CREATE_EXAM_ARRAY:
      return {
        ...state,
        questionsC: action.payload.newQuestionArray,
      };
    case actionTypes.APPEND_QUESTION_EXAM:
      console.log("from redux=>", state);
      return {
        ...state,
        questionsC: [...state.questionsC, action.payload.question],
      };
    default:
      return state;
  }
};
export default CreateReducer;
