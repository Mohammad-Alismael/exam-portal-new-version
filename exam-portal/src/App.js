import Login from './pages/Login'
import Signup from './pages/Signup'
import { Routes, Route } from "react-router-dom";


import React from "react";
// import Home from "./pages/Home";

function App() {
  return (
    <div>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      {/*<Route path="/" element={<Home/>} />*/}
      <Route exact path="/signup" element={<Signup/>}/>
    </Routes>
    </div>
  );
}

export default App;
