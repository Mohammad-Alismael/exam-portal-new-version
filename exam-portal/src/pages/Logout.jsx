import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class Logout extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        localStorage.removeItem("1store1");

    }


    render() {
        return (
            <div>
                you are logged out!
                <Link to='/'>login here again </Link>
            </div>
        );
    }
}

Logout.propTypes = {};

export default Logout;