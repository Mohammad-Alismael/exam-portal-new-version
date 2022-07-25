import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {axiosPrivate, updateToken} from "../api/axios";

class Logout extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        localStorage.removeItem("1store1");
        sessionStorage.removeItem('key')
        updateToken("")
        axiosPrivate.delete('/user/logout').then((res)=> {
            if (res.status == 204){
                window.location.href = "/"
            }
        })
            .catch((err)=> {console.log(err)})
    }


    render() {
        return (
            <div></div>
        );
    }
}

Logout.propTypes = {};

export default Logout;