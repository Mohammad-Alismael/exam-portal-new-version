import * as Actions from "../store/actions";
import {toast } from 'react-toastify';
import userApi from "../api/services/User";
import jwt from "jwt-decode";

export function loginAction(username,password,callback){

    return (dispatch) => {
        return userApi.userAuth(username,password)
            .then( res => {
                const token_data = jwt(res.data['accessToken'] )
                dispatch(login(token_data))
                sessionStorage.setItem('key',res.data['accessToken'] )
                callback()
            }).catch(error => {
                console.log(error)
                toast.info(error.response.data.message)
            });
    }
}

export function login(data){
    return {
        type: Actions.SET_USER,
        user: data
    }
}