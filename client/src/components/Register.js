import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const navigate = useNavigate(); // Initialize navigate hook

  const handleRegister = async() => {
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    const result = await fetch(`${process.env.SERVER_HOST}/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName:name, email, password }),
    })
    if(result.ok){
      console.log("ok");
      const jsonResult = await result.json();
      console.log(jsonResult);

      // change the route
      navigate("/");

    }
    // setShowOtp(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
      {!showOtp ? (
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Account</h2>
          <form className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Create a password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              type="button"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200"
              onClick={handleRegister}
            >
              Register
            </button>
          </form>
        </div>
      ) : (
        <Otp />
      )}
    </div>
  );
}

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    
    // Auto focus to next input
    if (e.target.value && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Verify Your Email</h2>
      <p className="text-center text-gray-600 mb-6">Enter the 4-digit code sent to your email</p>
      
      <div className="flex justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            className="w-16 h-16 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digit && index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
              }
            }}
          />
        ))}
      </div>
      
      <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200">
        Verify
      </button>
      
      <p className="text-center text-gray-600 mt-4">
        Resend code in <span className="font-semibold text-blue-600">{timer}</span> seconds
      </p>
    </div>
  );
};

export default Register;