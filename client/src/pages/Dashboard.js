import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [memberships, setMemberships] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {

    fetchMemberships();

  }, []);

  const fetchMemberships = async () => {

    try {

      const res = await axios.get(
        "https://gym-backend-8dou.onrender.com/api/membership"
      );

      setMemberships(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* TOP */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-red-500">
            POWER GYM
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome Back 🔥
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>


      {/* PROFILE CARD */}
      <div className="bg-gray-900 p-8 rounded-2xl mb-10">

        <h1 className="text-4xl font-bold mb-6">
          User Profile
        </h1>

        <div className="space-y-4">

          <p className="text-2xl">
            <span className="text-red-500">
              Name:
            </span>{" "}
            {user?.name}
          </p>

          <p className="text-2xl">
            <span className="text-red-500">
              Email:
            </span>{" "}
            {user?.email}
          </p>

          <p className="text-2xl">
            <span className="text-red-500">
              Status:
            </span>{" "}
            Active Member
          </p>

        </div>

      </div>


      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h2 className="text-2xl text-gray-400">
            Total Memberships
          </h2>

          <h1 className="text-5xl font-bold mt-4 text-red-500">
            {memberships.length}
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


      {/* RECENT MEMBERS */}
      <div className="bg-gray-900 p-8 rounded-2xl">

        <h1 className="text-4xl font-bold mb-8">
          Recent Members
        </h1>

        <div className="space-y-5">

          {memberships.slice(0, 5).map((item) => (

            <div
              key={item._id}
              className="bg-black p-5 rounded-xl flex justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-gray-400">
                  {item.email}
                </p>

              </div>

              <span className="text-red-500 text-xl">
                {item.plan}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Dashboard;