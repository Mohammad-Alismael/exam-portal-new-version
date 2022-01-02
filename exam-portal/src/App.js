import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Classes from "./pages/Classes";
import Course1 from "./pages/Course1";
import Quiz from "./components/Quiz";
import Logout from "./pages/Logout";
import QuizShow from "./components/StudentsSide/QuizShow";
import StreamData from "./components/StudentsSide/StreamData";
import CongratulationsView from "./components/StudentsSide/CongratulationsView";
import React from "react";
import PreviewExam from "./pages/PreviewExam";
import ExamStudent from "./pages/ExamStudent";
import Invitation from "./pages/Invitation";
// import Home from "./pages/Home";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/classes' element={<Classes />} />
        <Route exact path='/course1' element={<Course1 />} />
        <Route exact path='/preview/:examId' element={<PreviewExam />} />
        <Route exact path='/exam/:examId' element={<ExamStudent />} />
        <Route
          exact
          path='/invitation/:invitationHash'
          element={<Invitation />}
        />
        <Route exact path='/quiz' element={<Quiz />} />
        <Route exact path='/quiz-preview' element={<QuizShow />} />
        <Route exact path='/stream-preview' element={<StreamData />} />
        <Route
          exact
          path='/congratulations-view'
          element={<CongratulationsView />}
        />
      </Routes>
    </div>
  );
}

export default App;
