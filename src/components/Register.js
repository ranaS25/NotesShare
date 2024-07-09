import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="register-container">
      <div className="register">
        <form className="register-form">
          <label>Name</label>
          <input
            placeholder="name"
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <br />
          <label>Email</label>
          <input
            placeholder="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
          <br />
          <label>Password</label>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
          <br />
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(
                "user",
                JSON.stringify({ name, email, password })
              );
            }}
          >
            Register
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}


const Otp = () => {
    return (
        <div className="otp-container">
            <div className="otp">
                <h3>Enter the One Time Password</h3>
                <div className="otp-pin-container">
                    <input type="text" maxLength="1" size='1'></input>
                    <input type="text" maxLength="1" size='1'></input>
                    <input type="text" maxLength="1" size='1'></input>
                    <input type="text" maxLength="1" size='1'></input>
                </div>
                <button className="otp-button">Submit</button>
                <p>Resend Otp in <span className="otp-timer">25</span> seconds.</p>
            </div>
        </div>
    )
}

export default Register;
