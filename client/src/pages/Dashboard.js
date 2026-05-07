import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold text-red-500">
          Dashboard
        </h1>

        <p className="mt-5 text-2xl">
          Welcome to Power Gym
        </p>

        <button
          onClick={logout}
          className="mt-10 bg-red-500 px-8 py-4 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;