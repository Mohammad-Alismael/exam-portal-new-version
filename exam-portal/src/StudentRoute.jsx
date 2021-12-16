import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Classwork from "./components/Classwork";
import QuizForm from "./components/QuizForm";

const StudentRoute = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/classwork' element={<Classwork />} />
        <Route path='/quizform' element={<QuizForm />} />
      </Routes>
    </Router>
  );
};

export default StudentRoute;
