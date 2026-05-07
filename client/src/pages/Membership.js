import React, { useState } from "react";
import axios from "axios";

function Membership() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    plan: "",
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
        "https://gym-backend-8dou.onrender.com/api/membership",
        formData
      );

      alert(res.data.message);

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center text-white px-5">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-10 rounded-2xl w-full max-w-lg"
      >

        <h1 className="text-5xl font-bold text-center mb-10 text-red-500">
          Book Membership
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-black rounded-lg outline-none"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-black rounded-lg outline-none"
        />

        <select
          name="plan"
          onChange={handleChange}
          className="w-full p-4 mb-5 bg-black rounded-lg outline-none"
        >

          <option>Select Plan</option>

          <option>Basic - ₹999</option>

          <option>Standard - ₹1999</option>

          <option>Premium - ₹2999</option>

        </select>

        <button className="bg-red-500 w-full py-4 rounded-lg hover:bg-red-600">
          Book Now
        </button>

      </form>

    </div>
  );
}

export default Membership;