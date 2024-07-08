import React from "react";
import { Link } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";
import { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-title">Notes Share</div>
      <div className="navbar-items">
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link>
            <li>Contact</li>
          </Link>
        </ul>
      </div>
      <div className="profile">
        <img
          src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
          alt="user icon"
          className="profile-icon"
          onClick={() => {
            setIsDropdownOpen(!isDropdownOpen);
          }}
        />
      </div>
      <DropdownProfile displayValue={isDropdownOpen ? "flex" : "none"} />
    </div>
  );
};

export default Header;
