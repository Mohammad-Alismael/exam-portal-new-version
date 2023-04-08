import * as actionTypes from "../actions";
import jwt from "jwt-decode";
import { SET_SUBMISSIONS } from "../actions";

const initialState = {
  submissions: [],
};

const SubmissionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SUBMISSIONS:
      return {
        ...state,
        submissions: action.payload.submissions,
      };
    default:
      break;
  }
  return state;
};
export default SubmissionsReducer;
