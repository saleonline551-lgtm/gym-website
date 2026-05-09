import React, { useState } from "react";
import axios from "axios";

function Trainer() {

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      trainer: "",
      timing: "",

    });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]:
      e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "https://gym-backend-8dou.onrender.com/api/trainers",
        formData
      );

      alert(res.data.message);

      setFormData({

        name: "",
        email: "",
        trainer: "",
        timing: "",

      });

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center px-5">

      <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-lg">

        <h1 className="text-5xl font-bold text-center text-red-500 mb-10">
          Trainer Booking
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
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
          >

            <option value="">
              Select Trainer
            </option>

            <option value="Rahul">
              Rahul
            </option>

            <option value="Aman">
              Aman
            </option>

            <option value="Sohail">
              Sohail
            </option>

          </select>

          <select
            name="timing"
            value={formData.timing}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none"
          >

            <option value="">
              Select Timing
            </option>

            <option value="6AM - 8AM">
              6AM - 8AM
            </option>

            <option value="8AM - 10AM">
              8AM - 10AM
            </option>

            <option value="6PM - 8PM">
              6PM - 8PM
            </option>

          </select>

          <button
            className="w-full bg-red-500 py-4 rounded-xl hover:bg-red-600 transition"
          >
            Book Trainer
          </button>

        </form>

      </div>

    </div>

  );
}

export default Trainer;