import axios from "axios"
import * as Actions from "../store/actions";
import {toast } from 'react-toastify';

export function loginAction(username,password){
    return (dispatch) => {
        return axios.post('http://localhost:8080/authenticate',{
            username,
            password
        }).then((res)=> {
            console.log(res.data)
            dispatch(login(res.data))
        }).catch((error)=>{
                if(error.response.status == 500)
                    toast.info("incorrect username or password")
                else
                    toast.error('error happened!')
            })
    }
}

export function login(data){
    return {
        type: Actions.AUTHENTICATE,
        user_data : data
    }
}