import React, { useState } from "react";
import "./reglog.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [EmailAddress, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error message

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();

    const values = {
      EmailAddress,
      Password,
    };
    try {
      const response = await axios.post("http://localhost:5000/login", values);
      console.log(response.data.success);
      if (response.data.success === "true") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("MemberID", response.data.MemberID);
        localStorage.setItem("EmailAddress", response.data.EmailAddress);
        localStorage.setItem("Name", response.data.Name); // Store name in localStorage
        localStorage.setItem("role", response.data.role); // Store role in localStorage

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/Admin");
        } else {
          navigate("/Main");
        }
      } else {
        setError("Incorrect email or password."); // Set error message
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred. Please try again."); // Set error message for network errors
    }
  };

  return (
    <div className="register">
      <div className="login">
        <div className="loginWrapper">
          <div className="left">
            <h1>ULTRADEV LIBRARY</h1>
            <p>
              Feel at home at ultradev library as you read your favourite books,
            </p>
          </div>
          <div className="right ">
            <div className="form-container rg-login">
              <h1>LOGIN</h1>
              <form action="post" onSubmit={handleClick}>
                <label htmlFor="EmailAddress">Email Address</label>
                <input
                  type="email"
                  className="loginInput"
                  name="EmailAddress"
                  value={EmailAddress}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="loginInput"
                  name="password"
                  required
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="register-btn">
                  LOGIN
                </button>
                {error && <p className="error-message">{error}</p>}{" "}
                {/* Display error message */}
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
