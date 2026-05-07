import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
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
        "https://gym-backend-8dou.onrender.com/api/auth/register",
        formData
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-white">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-2xl w-96"
      >

        <h1 className="text-4xl font-bold mb-8 text-center">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-black rounded-lg outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-black rounded-lg outline-none"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-black rounded-lg outline-none"
        />

        <button className="bg-red-500 w-full py-4 rounded-lg hover:bg-red-600">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;