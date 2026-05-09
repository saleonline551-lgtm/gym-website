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

      setFormData({
        name: "",
        email: "",
        plan: "",
      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center px-5">

      <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-lg">

        <h1 className="text-5xl font-bold text-center text-red-500 mb-10">
          Membership Form
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
          />

          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
          >

            <option value="">
              Select Plan
            </option>

            <option value="Basic">
              Basic
            </option>

            <option value="Premium">
              Premium
            </option>

            <option value="VIP">
              VIP
            </option>

          </select>

          <button
            className="w-full bg-red-500 py-4 rounded-xl hover:bg-red-600"
          >
            Join Membership
          </button>

        </form>

      </div>

    </div>

  );
}

export default Membership;