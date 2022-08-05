import axios from "axios";
const BASE_URL = 'http://localhost:8081';
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

axiosPrivate.interceptors.request.use(
    config => {
        if (token != null) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
);
export {token,axiosPrivate}