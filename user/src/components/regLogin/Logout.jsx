// File: user/src/components/Logout.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('MemberID');
    localStorage.removeItem('EmailAddress');
    localStorage.removeItem('role');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default Logout;