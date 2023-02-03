import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {axiosPrivate, BASE_URL, token, updateToken} from "../api/axios";
import { DELETE_TOKEN } from "../api/services/RouteNames";
import { accessToken1, login } from "../actions/LoginAcion";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(login(null));
        dispatch(accessToken1(null));
        axios
            .delete(`${BASE_URL}${DELETE_TOKEN}`,{withCredentials: true})
            .then((data) => {
                sessionStorage.removeItem("1store1");
                sessionStorage.removeItem("key");
                sessionStorage.removeItem("jwt");
            })
            .catch((error)=>{
                console.log(error.response.status)
                // alert(error.response.data.message)
            });

        window.location.pathname = '/'


    }, []);
    return <div></div>;
}
