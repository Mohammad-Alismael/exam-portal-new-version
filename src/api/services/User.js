import axios from "axios";
import { axiosPrivate, BASE_URL, token, updateToken } from "../axios";
import { toast } from "react-toastify";
import { isExpired } from "react-jwt";
import { AUTH_USER, CREATE_USER, FETCH_USER_INFO, FORGET_PASSWORD, REFRESH_TOKEN } from "./RouteNames";

export function userAuth(username, password) {
    return axios.post(`${BASE_URL}${AUTH_USER}`, {
        username,
        password
    }, { withCredentials: true }).then((res) => {
        const token = res.data.accessToken;

        axiosPrivate.interceptors.request.use(
            config => {
                if (token) {
                    config.headers['Authorization'] = 'Bearer ' + token;
                }
                return config;
            },
            error => {
                Promise.reject(error);
            }
        );

        return res;
    }).catch((error) => {
        throw error;
    });
}

export function createUser({ username, password, emailId, roleId }) {
    return axios.post(`${BASE_URL}${CREATE_USER}`, {
        username,
        password,
        email_id: emailId,
        role_id: roleId
    }).then((res) => {
        console.log('data from backend', res);
        return res;
    }).catch((error) => {
        throw error;
    });
}

export function refreshToken() {
    axiosPrivate.post(REFRESH_TOKEN).then((res) => {
        const newAccessToken = res.data.accessToken;
        updateToken(newAccessToken);

        axiosPrivate.interceptors.request.use(
            config => {
                console.log(newAccessToken);
                config.headers['Authorization'] = 'Bearer ' + newAccessToken;
                return config;
            },
            error => {
                Promise.reject(error);
            }
        );

    }).catch((err) => {
        console.log(err);
        if (err.response.status === 406) {
            window.location.href = '/logout';
            toast("session expired, you must log in again!");
        }
    });
}

export async function refreshTokenv2() {
    try {
        const { data } = await axiosPrivate.post(REFRESH_TOKEN);
        const token = data.accessToken;

        axiosPrivate.interceptors.request.use(async req => {
            console.log('calling v2', token);
            req.headers.Authorization = 'Bearer ' + token;
            return req;
        });
    } catch (err) {
        console.log(err);
        if (err.response.status === 406) {
            window.location.href = '/logout';
            toast("session expired, you must log in again!");
        }
    }
}

export async function refreshTokenWithCallBack(callback) {
    try {
        const { data } = await axiosPrivate.post(REFRESH_TOKEN);
        updateToken(data.accessToken);
        callback();
    } catch (err) {
        console.log(err);
        toast("session expired, you must log in again!");
        callback();
    }
}

export function checkTokenExpiration() {
    if (isExpired(token)) {
        refreshToken();
    }
}

export async function getUserInfo(username) {
    try {
        const response = await axiosPrivate.get(`${FETCH_USER_INFO}/${username}`);
        return response.data;
    } catch (error) {
        throw new Error('error happened!');
    }
}

export async function setForgetPassword(email) {
    try {
        const response = await axiosPrivate.post(`${FORGET_PASSWORD}`, {
            email_id: email
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data.message);
        throw new Error(error.response.data.message);
    }
}
