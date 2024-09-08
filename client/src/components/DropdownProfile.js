import React, { useEffect, useRef, useState } from 'react'
import { SERVER_HOST, userProfileLogo } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function DropdownProfile(props) {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({ name: "-" });
  const myref = useRef(null);

  const handleClickOutside = (event) => {
    if (myref.current && !myref.current.contains(event.target)) {
      props.setDropdownOpen(false);
    }
  };

  const handleLogout = async () => {
    fetch(`${SERVER_HOST}/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${SERVER_HOST}/user/admin@notesshare.com`
        );
        const data = await response.json();
        setProfile({ name: data.userName });
      } catch (err) {
        console.log("cannot fetch profile data: ", err);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div
      ref={myref}
      className="flex-col rounded items-center fixed top-16 right-10 bg-slate-200 dark:bg-slate-800 outline outline-2 outline-slate-500 select-none"
      style={{ display: props.displayValue }}
    >
      <FontAwesomeIcon
        icon={faUser}
        className="mt-2 w-10 h-10 cursor-pointer rounded-full "
      />
      <p className="py-2">{profile.name}</p>
      <hr />
      <ul className="flex-col text-lg">
        <li className="px-9 py-2 hover: hover:bg-slate-300 dark:hover:bg-slate-900 ">
          Edit Profile
        </li>
        <li
          className="px-9 py-2 border-t-2 border-slate-400 hover:bg-slate-300 dark:hover:bg-slate-900"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
}

export default DropdownProfile;