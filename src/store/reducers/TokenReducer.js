import * as actionTypes from '../actions'
import { isExpired } from "react-jwt";
import {UPDATE_REFRESH_TOKEN} from "../actions";
import axios from "axios";
import {axiosPrivate} from "../../api/axios";

const initialState = {
   access_token : "",
}
const refresh = async () => {
    const response = await axiosPrivate.get('user/refresh')
    return response.data;
}
const TokenReducer  = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHENTICATE:
            axiosPrivate.interceptors.request.use(function (config) {
                const token = action.token;
                config.headers.Authorization =  token ? `Bearer ${token}` : '';
                return config;
            })
            return {
                ...state,
                access_token: action.token,
            }
        case actionTypes.REFRESH_TOKEN:
            refresh().then((res)=>{
                alert(res['accessToken'])
                axiosPrivate.interceptors.request.use(function (config) {
                    const token = res['accessToken'];
                    config.headers.Authorization =  token ? `Bearer ${token}` : '';
                    return config;
                })
                return {
                    ...state,
                    access_token: res['accessToken'],
                }
            }).catch((err)=>{
                console.log(err)
                return {
                    ...state,
                    access_token: '',
                }
            })

        default:
            break;
    }
    return state;
}

export default TokenReducer
