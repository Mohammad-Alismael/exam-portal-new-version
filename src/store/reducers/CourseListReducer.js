import * as actionTypes from "../actions";

const initialState = {
  isLoading: false,
  courseList: [],
};

export default function CourseListReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_COURSE_LIST:
      return {
        ...state,
        courseList: action.payload.courseList,
      };
    case actionTypes.FETCH_COURSE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SET_COURSE_LIST_OBJECT:
      return {
        ...state,
        courseList: [...state.courseList, action.payload.courseListObject],
      };
    case actionTypes.FETCH_COURSE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
