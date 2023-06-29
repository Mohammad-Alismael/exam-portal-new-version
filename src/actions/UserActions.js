import * as Actions from "../store/actions";
import { toast } from "react-toastify";
import { createUser, userAuth } from "../api/services/User";
import jwt from "jwt-decode";
import { updateToken } from "../api/axios";

export function loginAction(username, password, callback) {
  return (dispatch) => {
    return userAuth(username, password)
      .then((res) => {
        console.log(res);
        const token = res.data.accessToken;
        const token_data = jwt(token);
        dispatch(login(token_data));
        dispatch(accessToken1(token));
        updateToken(token);
        window.sessionStorage.setItem("jwt", token);
        callback();
      })
      .catch((error) => {
        console.log(error.response);
        toast.info(error.response.data.message);
      });
  };
}

export function signUpAction(
  { username, password, emailId, roleId },
  callback
) {
  return (dispatch) => {
    return createUser({ username, password, emailId, roleId })
      .then((res) => {
        toast.success(res.data.message);
        callback();
      })
      .catch((error) => {
        toast.info(error.response.data.message);
      });
  };
}

export function signup(data) {
  return {
    type: Actions.AUTHENTICATE,
    user_data: data,
  };
}
export function login(data) {
  return {
    type: Actions.SET_USER,
    user: data,
  };
}
export function accessToken1(data) {
  return {
    type: Actions.SET_ACCESS_TOKEN,
    accessToken: data,
  };
}
