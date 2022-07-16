import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Course1 from './pages/Course1'
import Quiz from './Components/Quiz';
import Logout from "./pages/Logout";
import {connect} from "react-redux";
import React, {useEffect,useState} from "react";
import PreviewExam from "./pages/PreviewExam";
import ExamStudent from "./pages/ExamStudent";
import Invitation from "./pages/Invitation";
import ResultExam from "./pages/ResultExam";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from './pages/ResetPassword'
import ActivateEmail from "./pages/ActivateEmail";
import NewClasses from "./pages/NewClasses"
import jwt from "jwt-decode";
import Protected from "./utils/Protected";
import * as Actions from "./store/actions";
// import Home from "./pages/Home";

function App(props) {
  const [isLoggedIn, setisLoggedIn] = useState(null);
  useEffect(()=>{
    props.isTokenExpired()
    setisLoggedIn(props.token.isExpired)

  },[])
  return (
    <>
      <ToastContainer />
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>} />
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
      <Route exact path="/reset-password/:reset_token" element={<ResetPassword/>}/>
      <Route exact path="/activation/:email_token" element={<ActivateEmail/>}/>
      <Route exact path="/courses/:course_id" element={<Course1/>}/>
      <Route exact path="/courses" element={
        <Protected isLoggedIn={props.token.isExpired}>
          <NewClasses/>
        </Protected>
      }/>
      <Route exact path="/preview/:examId" element={<PreviewExam/>}/>
      <Route exact path="/result/:examId" element={<ResultExam/>}/>
      <Route exact path="/exam/:examId" element={<ExamStudent/>}/>
      <Route exact path="/invitation/:invitationHash" element={<Invitation />}/>
      <Route exact path="/quiz" element={<Quiz/>}/>
    </Routes>
    </>
  );
}
const mapStateToProps = state => {
  return {
    token : state.TokenReducer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    isTokenExpired: () => dispatch({type:Actions.isExpired})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
