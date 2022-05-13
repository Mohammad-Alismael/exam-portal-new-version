import axios from "axios"
import * as Actions from "../store/actions";
import {toast } from 'react-toastify';
import userApi from "../Classes/UserApi";

export function SignUpAction({username,password,emailId,roleId}){
    return (dispatch) => {
        return userApi.createUser({username,password,emailId,roleId})
            .then((res)=> {
            console.log(res.data)
            toast.success(res.data.message)

            // dispatch(signup(res.data))
        }).catch((error) => {
            console.log(error)
            if (error.response.status == 409)
                toast.warn(error.response.message)
            else
                toast.error('error happened!')
        })
    }
}

export function signup(data) {
    return {
        type: Actions.AUTHENTICATE,
        user_data : data
    }
}