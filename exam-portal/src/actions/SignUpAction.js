import * as Actions from "../store/actions";
import {toast } from 'react-toastify';
import userApi from "../api/services/User";

export function SignUpAction({username,password,emailId,roleId},callback){
    return (dispatch) => {
        return userApi.createUser({username,password,emailId,roleId})
            .then((res)=> {
                toast.success(res.data.message)
                callback()
        }).catch(error => {
                toast.info(error.response.data.message)
            });
    }
}

export function signup(data) {
    return {
        type: Actions.AUTHENTICATE,
        user_data : data
    }
}