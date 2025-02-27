import React, { useState } from "react";
import "./Loginpage.css";
import axios from "axios";
import { url } from "./uploader";
import { useNavigate } from "react-router-dom";
const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("")
  const naviagate = useNavigate()
  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
       const {data} = await axios.post(url+'/auth/login',{email,password})
       if(!data.token){
        return setError(data.message)
       }
       localStorage.setItem('token',data?.token)
       naviagate('/admin')
    } catch (error) {
      console.log(error?.response.data.message)
      setError(error?.response.data.message)
    }
 
  };

  return (
    <div className="login-page">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
    </div>
  );
};

export default Loginpage;
