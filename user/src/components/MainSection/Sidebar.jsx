import React, { useState } from "react";
import "./sidebar.css";

const Sidebar = ({ onSelectMenu }) => {
  const [activeItem, setActiveItem] = useState("allbooks");

  const handleClick = (menuItem) => {
    setActiveItem(menuItem);
    onSelectMenu(menuItem);
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <ul className="sidebar-menu">
        {menuItems.map(({ id, label }) => (
          <li
            key={id}
            className={`sidebar-menu-item ${activeItem === id ? "active" : ""}`}
            onClick={() => handleClick(id)}
          >
            <a href={`#${id}`} className="sidebar-link">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const menuItems = [
  { id: "allbooks", label: "All Books" },
  { id: "availablebooks", label: "Available Books" },
  { id: "borrowedbooks", label: "Borrowed Books" },
];

export default Sidebar;
