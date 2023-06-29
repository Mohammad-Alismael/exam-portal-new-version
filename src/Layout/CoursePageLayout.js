import React, { Suspense } from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "../components/LoadingSpinner";
import NavbarDashboard from "../layouts/Navbar/NavbarDashboard";
import Sidebar from "../components/Sidebar/Sidebar";
import { CourseContainer } from "../components/Sidebar/Sidebar.styles";
import { Outlet, useNavigate } from "react-router-dom";

CoursePageLayout.propTypes = {};

function CoursePageLayout(props) {
  return (
    <div>
      <NavbarDashboard loading={false} />
      <>
        <Sidebar />
        <CourseContainer>
          <Outlet />
        </CourseContainer>
      </>
    </div>
  );
}

export default CoursePageLayout;
