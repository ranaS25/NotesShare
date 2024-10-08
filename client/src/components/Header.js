import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownProfile from "./DropdownProfile";
import { useState } from "react";
import useDarkMode from "../utils/useDarkMode";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [activeTab, setActiveTab] = useState(0);

  // console.log("Dark Mode: " + (darkMode ? "On" : "Off"));


 



  return (
    <div
      className={`flex sticky z-50 top-0  h-fit justify-between bg-orange-300 dark:bg-slate-600 p-2 dark:text-slate-100`}
    >
      <div className="grid place-content-center font-sans text-2xl">
        Notes Share
      </div>
      <div className="flex items-center">
        <ul className="h-[100%] flex">
          <Link to="/">
            <li
              className={`flex items-center h-[100%] px-4 dark:hover:bg-slate-700 ${
                activeTab === 0
                  ? "border-b-2 border-slate-900 dark:border-slate-200"
                  : ""
              }`}
              onClick={() => setActiveTab(0)}
            >
              Home
            </li>
          </Link>
          <Link to="/about">
            <li
              className={`flex items-center h-[100%] px-4 dark:hover:bg-slate-700 ${
                activeTab === 1
                  ? "border-b-2 border-slate-900 dark:border-slate-200"
                  : ""
              }`}
              onClick={() => setActiveTab(1)}
            >
              About
            </li>
          </Link>
          <Link>
            <li
              className={`flex items-center h-[100%] px-4 dark:hover:bg-slate-700 ${
                activeTab === 2
                  ? "border-b-2 border-slate-900 dark:border-slate-200"
                  : ""
              }`}
              onClick={() => setActiveTab(2)}
            >
              Contact
            </li>
          </Link>
          <li className="flex items-center px-4 ">
            <label className="flex items-center">
              {darkMode ? "Dark Mode" : "Light Mode"}
              <input
                className="mx-2 h-4 w-4"
                type="checkbox"
                checked={darkMode}
                onChange={(e) => {
                  setDarkMode(e.target.checked);
                }}
              ></input>
            </label>
          </li>
        </ul>
      </div>
      <div className="items-center">
        <img
          src="https://cdn-icons-png.freepik.com/512/3177/3177440.png"
          alt="user icon"
          className="w-10"
          onClick={() => {
            if(!isDropdownOpen) {setIsDropdownOpen(!isDropdownOpen);}
          }}
        />
      </div>
      <DropdownProfile displayValue={isDropdownOpen ? "flex" : "none"} setDropdownOpen={setIsDropdownOpen}/>
    </div>
  );
};

export default Header;
