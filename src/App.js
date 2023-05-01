import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursePage from "./pages/course/CoursePage";
import Logout from "./pages/Logout";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
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
// import {token} from "./api/axios";
import { theme } from "./utils/global/useStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ExamPage from "./pages/course/exam/ExamPage";
import PeoplePage from "./pages/course/people/PeoplePage";
import GradesPage from "./pages/GradesPage";
import User from "./api/services/User";
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
function App(props) {
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.UserReducerV2);
  const [location, setLocation] = useState(window.location.href);

  useEffect(() => {
    let isMounted = true;
    const refreshToken = async () => {
      console.log("This should run first!");
      console.log({ token, user });
      if (
        token === null &&
        user !== null &&
        window.location.pathname != "logout"
      ) {
        await User.refreshTokenWithCallBack(() => {
          isMounted && setLoading(false);
        });
      }
      isMounted && setLoading(false);
    };
    refreshToken().then(console.log);
    return () => {
      isMounted = false;
    };
  }, [token, user, location]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password/:reset_token"
          element={<ResetPassword />}
        />
        <Route path="/activation/:email_token" element={<ActivateEmail />} />
        <Route
          path="/courses"
          element={
            <Protected onlyAccessTo={ALL_ROLES}>
              <Courses />
            </Protected>
          }
        />
        <Route path="/courses/:course_id">
          <Route
            index={true}
            element={
              <Protected onlyAccessTo={ALL_ROLES}>
                <CoursePage />
              </Protected>
            }
          />
          <Route
            path="exams"
            element={
              <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
                <ExamPage />
              </Protected>
            }
          />
          <Route
            path="exams-student"
            element={
              <Protected onlyAccessTo={STUDENT_ROLES}>
                <ExamsStudent />
              </Protected>
            }
          />
          <Route
            path="people"
            element={
              <Protected onlyAccessTo={ALL_ROLES}>
                <PeoplePage />
              </Protected>
            }
          />
          <Route
            path="grades/:examId"
            element={
              <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
                <GradesPage />
              </Protected>
            }
          />
          <Route
            path="grades/:examId/:username"
            element={
              <Protected onlyAccessTo={ALL_ROLES}>
                <StudentExamResult />
              </Protected>
            }
          />
          <Route
            path="statistics/:examId"
            element={
              <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
                <StatisticsPage />
              </Protected>
            }
          />
          <Route
            path="grades/:examId/:studentId"
            element={
              <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
                <GradesPage />
              </Protected>
            }
          />
          <Route
            path="create-exam"
            element={
              <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
                <CreateExamPage />
              </Protected>
            }
          />
          <Route
            path="edit-exam/:examId"
            element={
              <Protected onlyAccessTo={INSTRUCTOR_ROLE}>
                <EditExam />
              </Protected>
            }
          />
        </Route>
        <Route
          exact
          path="/exam/:examId"
          element={
            <Protected onlyAccessTo={STUDENT_ROLES}>
              <ExamStudent />
            </Protected>
          }
        />
        <Route
          exact
          path="/invitation/:invitationHash"
          element={
            <Protected onlyAccessTo={ALL_ROLES}>
              <Invitation />
            </Protected>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
