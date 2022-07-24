import React, {useEffect, useState} from 'react';
import axios from "axios";
import * as Actions from "../store/actions";
import {connect} from "react-redux";
import {axiosPrivate} from "../api/axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
function Refresh(props) {
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(props.token)
        axiosPrivate.get('/user/refresh').then((res)=>{
            const newAccessToken = res.data['accessToken']
            sessionStorage.setItem('key',newAccessToken)
            console.log("newAccessToken", newAccessToken)
            // props.updateAccessToken(token)
            navigate('/courses')
        }).catch((err)=>{
            console.log(err)
            if (err.response.status == 406){
                navigate('/')
                toast("session expired, you must log in again!")
            }
        })
    },[])
    return (
        <div></div>
    );
}

export default Refresh;