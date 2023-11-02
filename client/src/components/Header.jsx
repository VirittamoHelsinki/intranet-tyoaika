import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import drop from "../assets/drop.png";
import "../styles/Header.scss";

const Header = () => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const logoutRef = useRef();

  const onLogout = () => {
    // Implement your logout logic here
    // For example, redirect to a login page or clear user session
    // You can replace this with your own logout functionality
  };

  return (
    <div className="header-main">
      <Link to="/" className="header-label">
        Virittämö
      </Link>
      {/* Check if a user is logged in and display their name */}
      {/* You can replace this with your own authentication logic */}
      <label className="header-label" ref={logoutRef} onClick={() => setLogoutOpen(!logoutOpen)}>
        User Name
        <img src={drop} alt="" />
        <div className="dropdown">
          {logoutOpen && (
            <div className="dropdown-content" onClick={onLogout}>
              Kirjaudu ulos
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default Header;
