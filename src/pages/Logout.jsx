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
        axiosPrivate.delete(DELETE_TOKEN).then(console.log)
            .catch(console.log)
        window.location.href = "/"
    }


    render() {
        return (
            <div></div>
        );
    }
}

Logout.propTypes = {};

export default Logout;