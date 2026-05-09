import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-5xl font-bold text-red-500">
            POWER GYM
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome Back Athlete 🔥
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>


      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-2xl text-gray-400">
            Total Members
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            250+
          </h1>

        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-2xl text-gray-400">
            Active Trainers
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            15
          </h1>

        </div>

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-2xl text-gray-400">
            Membership Plans
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            3
          </h1>

        </div>

      </div>


      {/* RECENT BOOKINGS */}
      <div className="bg-gray-900 p-8 rounded-2xl">

        <h1 className="text-4xl font-bold mb-8">
          Recent Activity
        </h1>

        <div className="space-y-5">

          <div className="bg-black p-5 rounded-xl flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-bold">
                Premium Membership
              </h2>

              <p className="text-gray-400">
                Joined Today
              </p>
            </div>

            <span className="text-red-500 text-xl">
              Active
            </span>

          </div>

          <div className="bg-black p-5 rounded-xl flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-bold">
                Personal Trainer Session
              </h2>

              <p className="text-gray-400">
                Tomorrow 7 AM
              </p>
            </div>

            <span className="text-green-500 text-xl">
              Scheduled
            </span>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;