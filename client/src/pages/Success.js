import React from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaCheckCircle
} from "react-icons/fa";

function Success() {

  const navigate =
    useNavigate();

  return (

    <div className="min-h-screen bg-black flex justify-center items-center px-5">

      <div
        data-aos="zoom-in"
        className="bg-gray-900 text-white p-12 rounded-3xl text-center max-w-lg w-full border border-gray-800"
      >

        <div className="flex justify-center mb-6">

          <FaCheckCircle className="text-green-500 text-8xl" />

        </div>

        <h1 className="text-5xl font-bold mb-5 text-green-500">
          Payment Successful
        </h1>

        <p className="text-gray-400 text-xl leading-8 mb-10">

          Your membership has been activated successfully.

          Welcome to POWER GYM 🔥

        </p>

        <button
          onClick={() =>
            navigate("/dashboard")
          }
          className="w-full bg-red-500 py-4 rounded-xl hover:bg-red-600 transition text-xl font-bold"
        >
          Go To Dashboard
        </button>

      </div>

    </div>

  );

}

export default Success;