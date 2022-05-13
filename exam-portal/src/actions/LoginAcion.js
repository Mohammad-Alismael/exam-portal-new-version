import axios from "axios"
import * as Actions from "../store/actions";
import {toast } from 'react-toastify';
import userApi from "../Classes/UserApi";

export function loginAction(username,password,callback){

    return (dispatch) => {
        return userApi.userAuth(username,password)
            .then( res => {
                callback(res.data)
                dispatch(login(res.data))
            }).catch(error => {
                toast.info(error.response.data.message)
            });
    }
}

export function login(data){
    return {
        type: Actions.AUTHENTICATE,
        access_token : data
    }
}