import * as actionTypes from "../actions";
const initialState = {
  examTitle: "",
  startingAt: new Date(),
  endingAt: 0,
  assignedFor: 3,
  specificStudents: null,
  navigation: null,
  questionTimer: false,
  questionRandomness: true,
  postingAnswerKey: true,
  postingAnswerKeyAt: null,
  questions: [],
  students: [],
  isItPreview: false,
};
function changeQuestionOptions(state, action) {
  const { index, newOptions } = action.payload;
  const deepQuestionCopy = [...state.questions];
  deepQuestionCopy[index] = {
    ...deepQuestionCopy[index],
    options: newOptions,
  };
  console.log("question index =>", index, "new options =>", newOptions);
  return {
    ...state,
    questions: deepQuestionCopy,
  };
}

function setExamQuestionIndex(state, action) {
  const { index, question } = action.payload;
  const newQuestionArray = state.questions.map((obj, i) => (index === i ? { ...question } : obj));
  return {
    ...state,
    questions: newQuestionArray,
  };
}
function removeTimeObject(state) {
  const newQuestionArray = state.questions.map((obj) => {
    console.log(obj);
    return { ...obj, time: null };
  });
  return {
    ...state,
    questions: newQuestionArray,
  };
}
function deleteExamQuestionIndex(state, action) {
  const index = action.payload.index;
  const newQuestionArray = state.questions.filter((question, idx) => {
    return idx !== index;
  });
  return {
    ...state,
    questions: newQuestionArray,
  };
}
function setWhoCanSeeObject(state, action) {
  const questionsWithSettedWhoCanSee = state.questions.map((val) => {
    return { ...val, whoCanSee: action.payload.whoCanSee };
  });
  return {
    ...state,
    questions: questionsWithSettedWhoCanSee,
  };
}
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
        isItPreview: action.payload.isItPreview,
      };
    case actionTypes.SET_QUESTIONS:
      console.log('reducer',action.payload)
      return {
        ...state,
        questions: action.payload.questions,
      };
    case actionTypes.CHANGE_QUESTION_OPTIONS:
      return changeQuestionOptions(state, action);
    case actionTypes.SET_EXAM_QUESTION_INDEX:
      return setExamQuestionIndex(state, action);
    case actionTypes.REMOVE_TIME_OBJECT:
      return removeTimeObject(state);
    case actionTypes.DELETE_EXAM_QUESTION_INDEX:
      return deleteExamQuestionIndex(state, action);
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
      };
    case actionTypes.SET_SPECIFIC_STUDENTS:
      return {
        ...state,
        specificStudents: action.payload.specificStudents,
      };
    case actionTypes.SET_NAVIGATION:
      return {
        ...state,
        navigation: action.payload.navigation,
      };
    case actionTypes.SET_EXAM_TIMER:
      return {
        ...state,
        questionTimer: action.payload.questionTimer,
      };
    case actionTypes.SET_EXAM_RANDOMNESS:
      return {
        ...state,
        questionRandomness: action.payload.questionRandomness,
      };
    case actionTypes.SET_EXAM_ANSWER_KEY:
      return {
        ...state,
        postingAnswerKey: action.payload.postingAnswerKey,
      };
    case actionTypes.SET_EXAM_ANSWER_KEY_AT:
      return {
        ...state,
        postingAnswerKeyAt: action.payload.postingAnswerKeyAt,
      };
    case actionTypes.SET_STUDENTS:
      return {
        ...state,
        students: action.payload.students,
      };
    case actionTypes.SET_WHO_CAN_SEE_OBJECT:
      return setWhoCanSeeObject(state, action);
    default:
      break;
  }
  return state;
};

export default ExamReducer;
