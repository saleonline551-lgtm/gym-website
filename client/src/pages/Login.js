import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import {
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  provider
} from "../firebase";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  // NORMAL LOGIN

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://gym-backend-8dou.onrender.com/api/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(res.data.message);

      // ADMIN LOGIN

      if (res.data.user.role === "admin") {

        navigate("/admin");

      } else {

        // USER LOGIN → DASHBOARD

        navigate("/dashboard");

      }

    } catch (error) {

      alert(
        error.response?.data?.message || "Login Failed"
      );

    }

  };

  // GOOGLE LOGIN

  const googleLogin = async () => {

    try {

      const result = await signInWithPopup(
        auth,
        provider
      );

      const user = result.user;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      alert("Google Login Successful");

      // GOOGLE USER → DASHBOARD

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Google Login Failed");

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-black px-5 relative overflow-hidden">

      {/* Background Glow */}

      <div className="absolute w-96 h-96 bg-red-500 opacity-20 blur-3xl rounded-full top-0 left-0"></div>

      <div className="absolute w-96 h-96 bg-red-500 opacity-20 blur-3xl rounded-full bottom-0 right-0"></div>

      <div className="bg-gray-900/80 backdrop-blur-lg w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-800 z-10">

        <h1 className="text-5xl font-extrabold text-center text-red-500 mb-3 tracking-wide">
          POWER GYM
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Welcome Back Champion 💪
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black text-white outline-none border border-gray-700 focus:border-red-500 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-4 mb-6 rounded-xl bg-black text-white outline-none border border-gray-700 focus:border-red-500 transition"
          />

          <button
            className="w-full bg-red-500 py-4 rounded-xl text-xl font-bold hover:bg-red-600 transition duration-300"
          >
            Login
          </button>

        </form>

        {/* Divider */}

        <div className="flex items-center my-6">

          <div className="flex-1 h-[1px] bg-gray-700"></div>

          <p className="px-4 text-gray-400 text-sm">
            OR
          </p>

          <div className="flex-1 h-[1px] bg-gray-700"></div>

        </div>

        {/* GOOGLE BUTTON */}

        <button
          onClick={googleLogin}
          className="w-full bg-white text-black py-4 rounded-xl text-lg font-semibold hover:bg-gray-200 transition duration-300 flex justify-center items-center gap-3"
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="google"
            className="w-6 h-6"
          />

          Continue with Google

        </button>

        <p className="text-center text-gray-400 mt-8">

          Don’t have an account?

          <Link
            to="/register"
            className="text-red-500 ml-2 hover:text-red-400"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;