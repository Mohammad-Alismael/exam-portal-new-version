import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React from "react";
import HomePageInstructor from "./pages/HomePageInstrutor";
// import Home from "./pages/Home";

function App() {
  return (
    <div>
      <ToastContainer />
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/home" element={<HomePageInstructor/>}/>
    </Routes>
    </div>
  );
}

export default App;
