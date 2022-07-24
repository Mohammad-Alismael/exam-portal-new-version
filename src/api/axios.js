import axios from "axios";
const BASE_URL = 'http://localhost:8081';

// export default axios.create({
//     baseURL: BASE_URL
// });

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

let token = null

export function updateToken(_token) {
    token = _token
}

export default token