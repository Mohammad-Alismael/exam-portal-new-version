import {Navigate, useNavigate,useLocation} from "react-router-dom";
import axios, {axiosPrivate} from "../api/axios";
import { isExpired } from "react-jwt";
import token from "../api/axios";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import * as Actions from "../store/actions";
import {toast} from "react-toastify";
const Protected = ({children, onlyAccessTo}) => {
    const dispatch = useDispatch()
    const [accessToken,setAccessToken] = useState('')
    const [isLogged, setIsLogged] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector((state) => state.UserReducerV2).user;
    const roles = onlyAccessTo.includes(user.role_id)
    if (user == null && roles) {
        return <Navigate to="/" replace state={{ path: location.pathname }}/>;
    }
    return children;
};
export default Protected;