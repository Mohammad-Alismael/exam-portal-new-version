import axios from "axios";
import {isExpired} from "react-jwt";
import {REFRESH_TOKEN} from "./services/RouteNames";
export const BASE_URL = 'http://localhost:8081';
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

// axiosPrivate.interceptors.request.use(
//     config => {
//         if (token != null) {
//             config.headers['Authorization'] = 'Bearer ' + token
//         }
//         return config
//     },
//     error => {
//         Promise.reject(error)
//     }
// );

axiosPrivate.interceptors.request.use(async  req => {
    console.log('calling',token)
    if (token != null) req.headers.Authorization = 'Bearer ' + token

    if (!isExpired(token)) return req

    if (token != null){
        const {data} = await axios.post(REFRESH_TOKEN)
        updateToken(data['accessToken'])
        req.headers.Authorization = 'Bearer ' + data['accessToken']
    }

    return req
});

export {token,axiosPrivate}