import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveAppBar from "./ResponsiveAppBar";
import Sidebar from "../components/Sidebar/Sidebar";
import {CourseContainer} from "../components/Sidebar/Sidebar.styles";
import NavbarDashboard from "./Navbar/NavbarDashboard";


function withSideBarAndResAppBar(Wrapped) {
    return function New(props) {
        return (
            <>
                <NavbarDashboard loading={false}/>
                <Sidebar />
                <CourseContainer>
                    <Wrapped {...props}/>
                </CourseContainer>
            </>
        )
    }
}

export default withSideBarAndResAppBar;