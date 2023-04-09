import * as actionTypes from "../actions";
import jwt from "jwt-decode";

const initialState = {
  user: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      break;
  }
  return state;
};
export default UserReducer;
