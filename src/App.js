import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Course from "./pages/Course";
import Quiz from "./components/Quiz";
import Logout from "./pages/Logout";
import { connect, useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import PreviewExam from "./pages/PreviewExam";
import ExamStudent from "./pages/ExamStudent";
import Invitation from "./pages/Invitation";
import ResultExam from "./pages/ResultExam";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ActivateEmail from "./pages/ActivateEmail";
import NewClasses from "./pages/NewClasses";
import jwt from "jwt-decode";
import Protected from "./utils/Protected";
import * as Actions from "./store/actions";
import Refresh from "./pages/Refresh";
import axios from "axios";
import TestDashboard from "./pages/TestDashboard";
import { isExpired } from "react-jwt";
import { axiosPrivate } from "./api/axios";
import {theme} from "./utils/global/useStyles";

import { ThemeProvider, createTheme } from '@mui/material/styles';

function App(props) {
  const dispatch = useDispatch();
  return (
      <ThemeProvider theme={theme}>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
              exact
              path="/reset-password/:reset_token"
              element={<ResetPassword />}
          />
          <Route
              path="/activation/:email_token"
              element={<ActivateEmail />}
          />
          <Route exact path="/courses/:course_id" element={<Course />} />
          <Route
              exact
              path="/courses"
              element={
                <Protected>
                  <NewClasses />
                </Protected>
              }
          />
          <Route path="/preview/:examId" element={<PreviewExam />} />
          <Route exact path="/result/:examId" element={<ResultExam />} />
          <Route exact path="/exam/:examId" element={<ExamStudent />} />
          <Route exact path="/invitation/:invitationHash" element={
              <Protected>
                <Invitation />
              </Protected>
          }/>
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/refresh" element={<Refresh />} />
          {/*<Route exact path="/courses" element={*/}
          {/*  <Protected isLoggedIn={isLogged}>*/}
          {/*    <TestDashboard/>*/}
          {/*  </Protected>  }*/}
          {/*/>*/}
        </Routes>
      </ThemeProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    token: state.TokenReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    isTokenExpired: () => dispatch({ type: Actions.isExpired }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
