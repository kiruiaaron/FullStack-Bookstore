import React, { useState } from "react";
import "./reglog.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const Register = () => {

  const [Name, setName] =useState('')
  const [Address, setAddress] =useState('')
  const [ContactNumber, setContactNumber] =useState('')
  const [EmailAddress, setEmail] =useState('')
  const [Password, setPassword] =useState('')
  const [ConfirmPassword, setConfirmPassword] =useState('')


  const navigate = useNavigate();

  const handleClick = async(e) => {
    e.preventDefault()

    const values = {
      Name,
      Address,
      ContactNumber,
      EmailAddress,
      Password,
      ConfirmPassword,
    };

    if(Password !== ConfirmPassword){
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
            <h1>ABBRON LIBRARY</h1>
            <p>
              Feel at home at ABBRON library as you read you favourite books,
            </p>
          </div>
          <div className="right">
            <div className="form-container-rg">
              <h1>REGISTER</h1>

              <form className="rg-log" action="" onSubmit={handleClick}>
                <label htmlFor="Name">Name</label>
                <input type="text" 
                name="Name"
                value={Name}
                required
                 onChange={e=>setName(e.target.value)} />

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

                <label htmlFor="EmailAddress">Email Address</label>
                <input type="email" 
                name="EmailAddress"
                value={EmailAddress}
                required
                 onChange={e=>setEmail(e.target.value)} />

                <label htmlFor="Password">Password</label>
                <input type="password"
                 name="Password" 
                 value={Password}
                 required
                 onChange={e=>setPassword(e.target.value)} />

                <label htmlFor="ConfirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="ConfirmPassword"
                  value={ConfirmPassword}
                  required
                  onChange={e=>setConfirmPassword(e.target.value)}
                />
                <button type="submit"  className="register-btn">REGISTER</button>
                <p>
                  Already have an Account
                  <span className="pLogin">
                    
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
