import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  const [memberships, setMemberships] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

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

  useEffect(() => {

    if (user?.role !== "admin") {

      navigate("/dashboard");

    }

    fetchMemberships();

    // eslint-disable-next-line

  }, []);

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
            ADMIN PANEL
          </h1>

          <p className="text-gray-400 mt-2">
            Manage Gym Members
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>


      {/* MEMBERS */}
      <div className="bg-gray-900 p-8 rounded-2xl">

        <h1 className="text-4xl font-bold mb-8">
          Members List
        </h1>

        <div className="space-y-6">

          {memberships.map((member) => (

            <div
              key={member._id}
              className="bg-black p-6 rounded-2xl border border-gray-800"
            >

              <h1 className="text-3xl font-bold text-white">
                {member.name}
              </h1>

              <p className="text-gray-400 mt-2">
                {member.email}
              </p>

              <div className="flex justify-between mt-5">

                <span className="text-red-500 text-2xl">
                  {member.plan}
                </span>

                <span className="bg-green-500 px-4 py-2 rounded-lg text-black font-bold">
                  Active
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Admin;