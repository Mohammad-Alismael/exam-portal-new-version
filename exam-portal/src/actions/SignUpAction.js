import axios from "axios"
import * as Actions from "../store/actions";
import {toast } from 'react-toastify';

export function SignUpAction({username,password,emailId,roleId}){
    return (dispatch) => {
        return axios.post('http://localhost:8080/add-user',{
            username,
            password,
            emailId,
            roleId
        }).then((res)=> {
            console.log(res.data)
            dispatch(signup(res.data))
        }).catch((error) => {
            console.log(error)
            if (error.response.status == 409)
                toast.warn("username already taken")
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