import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

      navigate("/dashboard");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div className="min-h-screen flex justify-center items-center bg-black px-5">

      <div className="bg-gray-900 w-full max-w-md p-10 rounded-3xl shadow-2xl border border-gray-800">

        <h1 className="text-5xl font-bold text-center text-red-500 mb-3">
          POWER GYM
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Login To Continue
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black text-white outline-none border border-gray-700"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-4 mb-6 rounded-xl bg-black text-white outline-none border border-gray-700"
          />

          <button
            className="w-full bg-red-500 py-4 rounded-xl text-xl hover:bg-red-600 transition"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">

          Don’t have an account?

          <Link
            to="/register"
            className="text-red-500 ml-2"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Login;