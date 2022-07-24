import React, {useEffect} from 'react';
import {axiosPrivate} from "../api/axios";
import {useDispatch, useSelector} from "react-redux";
import jwt from 'jwt-decode';
import UserReducerV2 from "../store/reducers/UserReducerV2";

function TestDashboard(props) {
    const dispatch = useDispatch()
    const token = useSelector(state => state.TokenReducer)['access_token'];
    const user = useSelector(state => state.UserReducerV2).user;
    const refresh = async () => {
        const response = await axiosPrivate.get('user/refresh')
        return await response.data;
    }
    return (
        <div>
            this is dashboard page, hello {user['username']}
        </div>
        );

}

export default TestDashboard;