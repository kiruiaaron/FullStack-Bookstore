import React from "react";
import "./Admin.css";
import Logout from "../../components/regLogin/Logout";

const TopBar = ({ onLogout }) => {
  // Retrieve the username from localStorage
  const userName = localStorage.getItem("Name") || "User";

  // Function to determine the greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="topbar">
      <div className="topbar-content">
        <span className="greeting">
          {getGreeting()}, {userName}!
        </span>
        <button className="logout-btn">
          <Logout />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
