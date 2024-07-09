import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login-container">
      <div className="login-features">
        <p className="feature">Create Notes in one click</p>
      </div>
      <div className="login">
        <form
          className="login-form"
          action="/"
          method="get"
          onSubmit={() => {
            fetch(``, {
              method: "get",
            });
          }}
        >
          <label>Email</label>
          <input
            type="email"
            className="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            className="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              const response = await fetch(
                "http://localhost:3000/AuthenticateUser",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    userId: email,
                    userPassword: password,
                  }),
                }
              );

              const responseJSON = await response.json();
              console.log("User authenticated:", responseJSON);

              if (responseJSON.isAuthorizedUser == true) {
                localStorage.setItem(
                  "user",
                  JSON.stringify({
                    userId: responseJSON.userId,
                    password: responseJSON.passwordToken,
                  })
                );
                navigate("/");
                return;
              }
              alert("Error");
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;