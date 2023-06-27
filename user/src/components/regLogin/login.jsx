import React, { useState } from "react";
import "./reglog.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
const [Email, setEmail] =useState('');
const [Password, setPassword]=useState('');
  
const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault();

    const values ={
      Email,
      Password
    }
    axios.post('http://localhost:5000/login',values)
    .then(res=>{
     navigate('/main')
    })
  };

  return (
    <div className="register">
      <div className="login">
        <div className="loginWrapper">
          <div className="left">
            <h1>ULTRADEV LIBRARY</h1>
            <p>
              Feel at home at ultradev library as you read you favourite books,
            </p>
          </div>
          <div className="right ">
            <div className="form-container rg-login">
              <h1>LOGIN</h1>
              <form action="post" onSubmit={handleClick}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="loginInput"
                  name="email"
                  value={Email}
                  required
                  onChange={e=>setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="loginInput"
                  name="password"
                  required
                  value={Password}

                  onChange={e=>setPassword(e.target.value)}
                />

                <button type="submit" className="register-btn">
                  LOGIN
                </button>
                <p className="pLogin">
                  Do not have an Account{" "}
                  <span>
                    <Link to="/register">Sign Up</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
