import React, {
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function Membership() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({

      name: "",
      email: "",
      mobile: "",
      plan: "",
      trainer: "",
      amount: 0,

    });

  const handleChange =
    (e) => {

      const {
        name,
        value
      } = e.target;

      let amount = formData.amount;

      // PLAN PRICE

      if (name === "plan") {

        if (value === "Monthly") {

          amount = 999;

        } else if (
          value === "Quarterly"
        ) {

          amount = 2499;

        } else if (
          value === "Yearly"
        ) {

          amount = 6999;

        }

      }

      setFormData({

        ...formData,

        [name]: value,

        amount,

      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        // SAVE MEMBERSHIP

        const res =
          await axios.post(
            "https://gym-backend-8dou.onrender.com/api/membership",
            formData
          );

        alert(
          res.data.message
        );

        // SAVE DATA FOR PAYMENT

        localStorage.setItem(
          "membership",
          JSON.stringify(formData)
        );

        setFormData({

          name: "",
          email: "",
          mobile: "",
          plan: "",
          trainer: "",
          amount: 0,

        });

        // PAYMENT PAGE

        navigate("/payment");

      } catch (error) {

        console.log(error);

        alert(
          error.response?.data?.message ||
          "Membership Failed"
        );

      }

    };

  return (

    <div className="min-h-screen bg-black text-white flex justify-center items-center px-5">

      <div
        data-aos="zoom-in"
        className="bg-gray-900 p-10 rounded-2xl w-full max-w-lg border border-gray-800"
      >

        <h1 className="text-5xl font-bold text-center text-red-500 mb-10">
          Membership Form
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
            required
          />

          <input
            type="text"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
            required
          />

          {/* MEMBERSHIP PLAN */}

          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
            required
          >

            <option value="">
              Select Plan
            </option>

            <option value="Monthly">
              Monthly - ₹999
            </option>

            <option value="Quarterly">
              Quarterly - ₹2499
            </option>

            <option value="Yearly">
              Yearly - ₹6999
            </option>

          </select>

          {/* TRAINER */}

          <select
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            className="w-full p-4 mb-5 rounded-xl bg-black outline-none border border-gray-700"
          >

            <option value="">
              Choose Trainer (Optional)
            </option>

            <option value="John">
              John
            </option>

            <option value="Alex">
              Alex
            </option>

            <option value="David">
              David
            </option>

          </select>

          {/* AMOUNT */}

          <div className="bg-black border border-red-500 rounded-xl p-4 mb-5 text-center">

            <p className="text-gray-400">
              Total Amount
            </p>

            <h1 className="text-3xl font-bold text-red-500">

              ₹ {formData.amount}

            </h1>

          </div>

          <button
            className="w-full bg-red-500 py-4 rounded-xl hover:bg-red-600 transition text-xl font-bold"
          >
            Continue To Payment
          </button>

        </form>

      </div>

    </div>

  );

}

export default Membership;