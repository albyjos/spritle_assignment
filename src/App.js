import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import RegisterForm from "./Registration";
import MasterLanding from "./MasterLanding";
import Login from "./Login";
import StudentLanding from "./StudentLanding";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/master" element={<MasterLanding />} />
          <Route path="/student" element={<StudentLanding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
