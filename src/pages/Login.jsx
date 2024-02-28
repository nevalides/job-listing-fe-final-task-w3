import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const navigate = useNavigate("/");
  //   const userData = {
  //     username: "johnd",
  //     password: "m38rmF$",
  //   };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
    };

    axios
      .post("https://fakestoreapi.com/auth/login", userData)
      .then((response) => {
        // console.log(response.status, response.data.token);
        if (response.status === 200) {
          localStorage.setItem("isLogin", true);
          location.replace("/");
          //   navigate("/");
        }
      })
      .catch((error) => {
        alert("Please enter your credentials");
        // console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-screen bg-cyan-light relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0f1e32] z-0"></div>
      <main className="flex flex-col items-center px-6 relative z-10 min-h-screen justify-center">
        <div className="flex flex-col items-center justify-center rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <img
            className="max-h-[15vh]"
            src="https://assets-global.website-files.com/622b063e1c5d763e016af5ee/64806bb59d2c2cbcf0cf376c_Lister.png"
            alt="logo"
          />
          <p className="max-w-prose text-lg md:text-xl lg:text-2xl text-white mb-6 text-center leading-relaxed">
            Sign In
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label
                htmlFor="username"
                className="form-label max-w-prose text-lg md:text-xl lg:text-2xl text-white mb-8 text-center"
              >
                Username
              </label>
              <br />
              <input
                type="text"
                name="username"
                className="form-control"
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label max-w-prose text-lg md:text-xl lg:text-2xl text-white mb-8 text-center"
              >
                Password
              </label>
              <br />
              <input
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-cyan-dark hover:bg-[#eac77d] text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
      <img
        src="https://miro.medium.com/v2/resize:fit:1200/1*ZJBkfG3WN83TLlr7ESYrLA.jpeg" // Replace with your image path
        alt="Developer working on code"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
    </div>
  );
}
