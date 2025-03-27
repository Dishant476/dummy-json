import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
        const response = await axios.post("https://dummyjson.com/auth/login", {
          username,
          password
        }, {
          headers: { "Content-Type": "application/json" } 
        });
    
        console.log("response",  response)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
