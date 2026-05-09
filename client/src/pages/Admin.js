import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Admin() {

  const navigate = useNavigate();

  const [memberships, setMemberships] =
    useState([]);

  const [search, setSearch] =
    useState("");

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

      return;

    }

    fetchMemberships();

  }, [navigate, user?.role]);

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  // DELETE MEMBER
  const deleteMember = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this member?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `https://gym-backend-8dou.onrender.com/api/membership/${id}`
      );

      fetchMemberships();

    } catch (error) {

      console.log(error);

    }

  };

  // SEARCH FILTER
  const filteredMembers =
    memberships.filter((member) =>

      member.name
        .toLowerCase()
        .includes(search.toLowerCase())

    );

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

{/* STATS */}
<div className="grid md:grid-cols-4 gap-6 mb-10">

  <div className="bg-gray-900 p-6 rounded-2xl">

    <h2 className="text-gray-400 text-xl">
      Total Members
    </h2>

    <h1 className="text-5xl font-bold text-red-500 mt-4">
      {memberships.length}
    </h1>

  </div>

  <div className="bg-gray-900 p-6 rounded-2xl">

    <h2 className="text-gray-400 text-xl">
      Premium Plans
    </h2>

    <h1 className="text-5xl font-bold text-red-500 mt-4">

      {
        memberships.filter(
          (m) => m.plan === "Premium"
        ).length
      }

    </h1>

  </div>

  <div className="bg-gray-900 p-6 rounded-2xl">

    <h2 className="text-gray-400 text-xl">
      Basic Plans
    </h2>

    <h1 className="text-5xl font-bold text-red-500 mt-4">

      {
        memberships.filter(
          (m) => m.plan === "Basic"
        ).length
      }

    </h1>

  </div>

  <div className="bg-gray-900 p-6 rounded-2xl">

    <h2 className="text-gray-400 text-xl">
      Active Members
    </h2>

    <h1 className="text-5xl font-bold text-red-500 mt-4">
      {memberships.length}
    </h1>

  </div>

</div>

      {/* SEARCH */}
      <div className="mb-8">

        <input
          type="text"
          placeholder="Search Members..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full p-5 rounded-2xl bg-gray-900 border border-gray-700 outline-none text-white text-xl"
        />

      </div>


      {/* MEMBERS */}
      <div className="bg-gray-900 p-8 rounded-2xl">

        <h1 className="text-4xl font-bold mb-8">
          Members List
        </h1>

        <div className="space-y-6">

          {filteredMembers.length > 0 ? (

            filteredMembers.map((member) => (

              <div
                key={member._id}
                className="bg-black p-6 rounded-2xl border border-gray-800 hover:border-red-500 transition"
              >

                <h1 className="text-3xl font-bold text-white">
                  {member.name}
                </h1>

                <p className="text-gray-400 mt-2">
                  {member.email}
                </p>

                <div className="flex justify-between items-center mt-5">

                  <div>

                    <span className="text-red-500 text-2xl">
                      {member.plan}
                    </span>

                    <div className="mt-3">

                      <span className="bg-green-500 px-4 py-2 rounded-lg text-black font-bold">
                        Active
                      </span>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      deleteMember(member._id)
                    }
                    className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <p className="text-gray-400 text-xl">
              No Members Found
            </p>

          )}

        </div>

      </div>

    </div>

  );
}

export default Admin;