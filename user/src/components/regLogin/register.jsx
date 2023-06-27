import React, { useState } from "react";
import "./reglog.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {

  const [Name, setName] =useState('')
  const [userName, setuserName] =useState('')
  const [Address, setAddress] =useState('')
  const [ContactNumber, setContactNumber] =useState('')
  const [Email, setEmail] =useState('')
  const [Password, setPassword] =useState('')
  const [confirmPassword, setConfirmPassword] =useState('')


  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault()

    const values = {
      Name,
      userName,
      Address,
      ContactNumber,
      Email,
      Password,
      confirmPassword,
    };

    if(Password !== confirmPassword){
      alert('Password do not match')
    }else{

   

    try {
      const res = await  axios.post('http://localhost:5000/newmember',values)
      navigate('/login')

    } catch (error) {
      console.log(error)
    }
  }
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
          <div className="right">
            <div className="form-container">
              <h1>REGISTER</h1>

              <form action="" onSubmit={handleClick}>
                <label htmlFor="Name">Name</label>
                <input type="text" 
                name="Name"
                value={Name}
                required
                 onChange={e=>setName(e.target.value)} />

                <label htmlFor="userName">UserName</label>
                <select name="userName"
                
                 value={userName}
                
                 id="" onChange={e=>setuserName(e.target.value)}>
                  <option value="admin">Admin</option>
                  <option value="member">Member</option>
                </select>

                <label htmlFor="Address">Address</label>
                <input type="text"
                 name="Address"
                 value={Address}
                 required
                  onChange={e=>setAddress(e.target.value)} />

                <label htmlFor="ContactNumber">ContactNumber</label>
                <input type="text"
                 name="ContactNumber" 
                 value={ContactNumber}
                 required
                 onChange={e=>setContactNumber(e.target.value)} />

                <label htmlFor="Email">Email</label>
                <input type="email" 
                name="Email"
                value={Email}
                required
                 onChange={e=>setEmail(e.target.value)} />

                <label htmlFor="Password">Password</label>
                <input type="password"
                 name="Password" 
                 value={Password}
                 required
                 onChange={e=>setPassword(e.target.value)} />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                  onChange={e=>setConfirmPassword(e.target.value)}
                />
                <button type="submit"  className="register-btn">REGISTER</button>
                <p>
                  Already have an Account
                  <span>
                    
                    <Link to="/login">Login</Link>
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

export default Register;
