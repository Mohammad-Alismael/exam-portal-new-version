import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursePage from "./pages/course/CoursePage";
import Logout from "./pages/Logout";
import { useSelector } from "react-redux";
import React, { Suspense, useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditExam from "./pages/EditExam";
import ExamStudent from "./pages/examStudent/ExamStudent";
import Invitation from "./pages/Invitation";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ActivateEmail from "./pages/ActivateEmail";
import Courses from "./pages/classes/Courses";
import Protected from "./utils/Protected";
import { theme } from "./utils/global/useStyles";
import { ThemeProvider } from "@mui/material/styles";
import ExamPage from "./pages/course/exam/ExamPage";
import PeoplePage from "./pages/course/people/PeoplePage";
import GradesPage from "./pages/GradesPage";
import { refreshTokenWithCallBack } from "./api/services/User";
import CreateExamPage from "./pages/createExamPage/CreateExamPage";
import {
  ALL_ROLES,
  INSTRUCTOR_ROLE,
  STUDENT_ROLES,
} from "./utils/global/GlobalConstants";
import StudentExamResult from "./pages/StudentExamResult/StudentExamResult";
import ExamsStudent from "./pages/course/examsStudent/ExamsStudent";
import StatisticsPage from "./pages/course/statistics/StatisticsPage";
import LoadingSpinner from "./components/LoadingSpinner";
import { token } from "./api/axios";
import Layout from "./Layout/Layout";
import { nestedRoutes, routes } from "./utils/routes";
import CoursePageLayout from "./Layout/CoursePageLayout";
import NotFound from "./pages/NotFound";
function App(props) {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.UserReducerV2);
  const [location, setLocation] = useState(window.location.href);

  useEffect(() => {
    let isMounted = true;
    const refreshToken = async () => {
      try {
        console.log("This should run first!");
        console.log({ token, user });
        if (
          token === null &&
          user !== null &&
          window.location.pathname != "logout"
        ) {
          await refreshTokenWithCallBack(() => {
            isMounted && setLoading(false);
          });
        }
        isMounted && setLoading(false);
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle the error and update the UI accordingly
      }
    };
    refreshToken().then(console.log);
    return () => {
      isMounted = false;
    };
  }, [user, location]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes &&
            routes.map((route, index) => {
              const { component, path } = route;
              return <Route key={index} path={path} element={component} />;
            })}
          <Route path="/course-page" element={<CoursePageLayout />}>
            <Route
              path=":course_id"
              element={nestedRoutes[0].coursePage.element}
            ></Route>
          </Route>
          <Route path="/course-page/:course_id" element={<CoursePageLayout />}>
            {nestedRoutes &&
              nestedRoutes[0].children.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                );
              })}
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
