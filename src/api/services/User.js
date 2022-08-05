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
            axiosPrivate.interceptors.request.use(
                config => {
                    if (token) {
                        config.headers['Authorization'] = 'Bearer ' + token
                    }
                    return config
                },
                error => {
                    Promise.reject(error)
                }
            );
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
            axiosPrivate.interceptors.request.use(
                config => {
                    console.log(newAccessToken)
                    config.headers['Authorization'] = 'Bearer ' + newAccessToken
                    return config
                },
                error => {
                    Promise.reject(error)
                }
            );

        }).catch((err)=>{
            console.log(err)
            if (err.response.status == 406){
                window.location.href = '/logout'
                toast("session expired, you must log in again!")
            }
        })
    }
    static async refreshTokenv2() {
        try {
            const {data} = await axiosPrivate.post('/user/refresh')
            updateToken(data['accessToken'])
        }catch (err) {
            console.log(err)
            if (err.response.status === 406) {
                window.location.href = '/logout'
                toast("session expired, you must log in again!")
            }
        }
    }

    static refreshTokenWithCallBack = async callback => {
        try {
            const {data} = await axiosPrivate.post('/user/refresh')
            updateToken(data['accessToken'])
            callback()
        } catch (err) {
            console.log(err)
            if (err.response.status === 406) {
                window.location.href = '/logout'
                toast("session expired, you must log in again!")
            }
            callback()
        }
    };
    static async checkTokenExpiration() {
        if (isExpired(token)) {
            User.refreshToken()
        }
    }
}

export default User;