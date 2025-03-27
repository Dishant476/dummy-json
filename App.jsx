import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

export default App;
