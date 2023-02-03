import axios from "axios";
import {axiosPrivate, BASE_URL, token, updateToken} from "../axios";
import {toast} from "react-toastify";
import {isExpired} from "react-jwt";
import {AUTH_USER, CREATE_USER, FETCH_USER_INFO, FORGET_PASSWORD, REFRESH_TOKEN} from "./RouteNames";

class User {
    static userAuth(username, password) {
        return axios.post(`${BASE_URL}${AUTH_USER}`,{
            username,
            password
        },{withCredentials: true}).then((res)=> {
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
        return axios.post(`${BASE_URL}${CREATE_USER}`,{
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
        axiosPrivate.post(REFRESH_TOKEN).then((res)=>{
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
            const {data} = await axiosPrivate.post(REFRESH_TOKEN)
            const token = data['accessToken']
            axiosPrivate.interceptors.request.use(async  req => {
                console.log('calling v2',token)
                req.headers.Authorization = 'Bearer ' + token
                return req
            });
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
            const {data} = await axiosPrivate.post(REFRESH_TOKEN)
            updateToken(data['accessToken'])
            callback()
        } catch (err) {
            console.log(err)

            // if (err.response.status === 406) {
            window.location.href = '/logout'
            toast("session expired, you must log in again!")
            // }
            callback()
        }
    };
    static checkTokenExpiration() {
        if (isExpired(token)) {
            User.refreshToken()
        }
    }
}
const userAuth = async (username, password) => {
    try {
        const res = await axios.post(
            `${BASE_URL}${AUTH_USER}`,
            {
                username,
                password,
            },
            { withCredentials: true }
        );
        const token = res.data["accessToken"];
        axiosPrivate.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers["Authorization"] = "Bearer " + token;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        return res;
    } catch (error) {
        throw error;
    }
};
export const getUserInfo = async (username) =>{
    try {
        let response = await axiosPrivate(`${FETCH_USER_INFO}/${username}`);
        return await response.data;
    }catch (e) {
        throw Error('error happened!')
    }
}

export const setForgetPassword = async (email) => {
    try {
        let response = await axiosPrivate.post(`${FORGET_PASSWORD}`,{
            email_id: email
        });
        return await response.data;
    } catch (e) {
        console.log(e.response.data.message)
        throw Error(e.response.data.message)
    }
}
export default User;