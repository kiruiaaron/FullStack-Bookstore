import "./topbar.css";
import React, { useState } from "react";
import Logout from "../regLogin/Logout";

const Topbar = () => {
  const userName = localStorage.getItem("Name") || "User";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <div className="logo">
          <span className="logo">ABBRON</span>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
        </div>
        <span>
          {getGreeting()}, {userName}!
        </span>
        <span>
          <Logout />
        </span>
      </div>
    </div>
  );
};

export default Topbar;
