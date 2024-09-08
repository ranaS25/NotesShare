import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto bg-white/20  h-fit flex flex-col w-full p-10 grow">
      <div className="login-features w-full max-w-[600px] mx-auto">
        <p className="text-4xl font-semibold">Create Notes in one click</p>
      </div>
      <div className="grow min-w-96 w-full max-w-[600px] mx-auto pt-10">
        <form
          className="flex flex-col"
          action="/"
          method="get"
          onSubmit={() => {
            fetch(``, {
              method: "post",
            });
          }}
        >
          <label className="text-lg font-semibold">Email</label>
          <input
            type="email"
            className="my-2 p-2 rounded border"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label className="text-lg font-semibold">Password</label>
          <input
            type="password"
            className="my-2 p-2 rounded border"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="text-lg font-bold bg-blue-600 text-white p-2 mt-4 rounded"
            onClick={async (e) => {
              e.preventDefault();
              const response = await fetch(
                "http://localhost:3000/users/login",
                {
                  method: "POST",
                  credentials: 'include',
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: email,
                    password: password,
                  }),
                }
              );

              const responseJSON = await response.json();
              console.log(responseJSON);

              return;
            }}
          >
            Login
          </button>
          <button
            type="button"
            className=" bg-black/20 font-semibold    mt-2 rounded p-2"
          >
            New User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;