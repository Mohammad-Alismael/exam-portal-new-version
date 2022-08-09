import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {axiosPrivate, updateToken} from "../api/axios";
import {DELETE_TOKEN} from "../api/services/RouteNames";

class Logout extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        sessionStorage.removeItem("1store1");
        sessionStorage.removeItem('key')
        updateToken("")
        axiosPrivate.delete(DELETE_TOKEN).then((res)=> {
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