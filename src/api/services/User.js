import axios from "axios";
import {axiosPrivate, token, updateToken} from "../axios";
import {toast} from "react-toastify";
import {isExpired} from "react-jwt";

class User {
    static userAuth(username, password) {
        return axiosPrivate.post('/user/auth',{
            username,
            password
        }).then((res)=> {
            const token = res.data['accessToken'];
            // axiosPrivate.interceptors.request.use(function (config) {
            //     config.headers.Authorization =  token ? `Bearer ${token}` : '';
            //     return config;
            // })
            return res
        }).catch((error)=>{
            // console.log(error)
           throw error
        })
    }
    static createUser({username,password,emailId,roleId}) {
        return axiosPrivate.post('/user/create',{
            username,
            password,
            email_id: emailId,
            role_id: roleId
        }).then((res)=> {
            console.log('data from backend',res)
            return res
        }).catch((error)=>{
            // console.log(error)
            throw error
        })
    }
    static refreshToken(){
        axiosPrivate.post('/user/refresh').then((res)=>{
            const newAccessToken = res.data['accessToken']
            updateToken(newAccessToken)
        }).catch((err)=>{
            console.log(err)
            if (err.response.status == 406){
                window.location.href = '/logout'
                toast("session expired, you must log in again!")
            }
        })
    }
    static checkTokenExpiration(){
        if (isExpired(token)){
            User.refreshToken()
        }
    }
}

export default User;