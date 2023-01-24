import axios from "axios";
import {isExpired} from "react-jwt";
import {REFRESH_TOKEN} from "./services/RouteNames";
import {toast} from "react-toastify";
export const BASE_URL = 'http://localhost:8080';
let token = null

export function updateToken(_token) {
    token = _token
    console.log("global token set to", token)
}

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

axiosPrivate.interceptors.request.use(async  req => {
    console.log('calling',token)
    if (token != null) req.headers.Authorization = 'Bearer ' + token
    if (!isExpired(token)) return req

    if (token != null && token !== ""){
        try {
            console.log('calling api for new token to refresh this token' + token)
            const {data} = await axios.post(`${BASE_URL}${REFRESH_TOKEN}`,{},{
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            })
            updateToken(data['accessToken'])
            req.headers.Authorization = 'Bearer ' + data['accessToken']
        }catch (e) {
            console.log(e.response)
            window.location.href = '/logout'
            toast("session expired, you must log in again!")
        }
    }

    return req
});
class MyError extends Error {
    constructor(data) {
        super(data.message);
        this.status = data.status;
    }
}
export {token,axiosPrivate,MyError}