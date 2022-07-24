import axios from "axios";
import {axiosPrivate, updateToken} from "../axios";
import {toast} from "react-toastify";

class User {
    static userAuth(username, password) {
        return axiosPrivate.post('/user/auth',{
            username,
            password
        }).then((res)=> {
            const token = res.data['accessToken'];
            axiosPrivate.interceptors.request.use(function (config) {
                config.headers.Authorization =  token ? `Bearer ${token}` : '';
                return config;
            })
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
        axiosPrivate.get('/user/refresh').then((res)=>{
            const newAccessToken = res.data['accessToken']
            return newAccessToken
            // sessionStorage.setItem('key',newAccessToken)
            // console.log("newAccessToken from user", newAccessToken)
        }).catch((err)=>{
            console.log(err)
            if (err.response.status == 406){
                window.location.href = '/logout'
                toast("session expired, you must log in again!")
            }
        })
    }
}

export default User;