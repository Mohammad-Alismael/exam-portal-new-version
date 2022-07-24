import {Navigate, useNavigate,useLocation} from "react-router-dom";
import axios, {axiosPrivate} from "../api/axios";
import { isExpired } from "react-jwt";
import token from "../api/axios";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as Actions from "../store/actions";
import {toast} from "react-toastify";
const Protected = ({ isLoggedIn, children }) => {
    const dispatch = useDispatch()
    const [accessToken,setAccessToken] = useState('')
    const [isLogged, setIsLogged] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.UserReducerV2).user;

    useEffect(()=>{
        // if (isExpired(sessionStorage.getItem('key'))){
        //     navigate('/refresh')
        // }
        const interval = setInterval(() => {
            axiosPrivate.get('/user/refresh').then((res)=>{
                const newAccessToken = res.data['accessToken']
                sessionStorage.setItem('key',newAccessToken)
                console.log("newAccessToken", newAccessToken)
            }).catch((err)=>{
                console.log(err)
                if (err.response.status == 406){
                    navigate('/logout')
                    toast("session expired, you must log in again!")
                }
            })
            // requesting new access token before 5 sec of expiration
        }, ((user['exp'] - user['iat']) * 1000) - 5000 );
        return () => clearInterval(interval);
    },[])
    if (user == null) {
        return <Navigate to="/" replace state={{ path: location.pathname }}/>;
    }
    return children;
};
export default Protected;