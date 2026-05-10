import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

function Admin() {

  const navigate =
    useNavigate();

  const [memberships,
    setMemberships] =
    useState([]);

  const [attendance,
    setAttendance] =
    useState([]);

  const [trainers,
    setTrainers] =
    useState([]);

  const [announcements,
    setAnnouncements] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchData =
    async () => {

      try {

        const membershipRes =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/membership"
          );

        const attendanceRes =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/attendance"
          );

        const trainerRes =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/trainers"
          );

        const announcementRes =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/announcements"
          );

        setMemberships(
          membershipRes.data
        );

        setAttendance(
          attendanceRes.data
        );

        setTrainers(
          trainerRes.data
        );

        setAnnouncements(
          announcementRes.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  useEffect(() => {

    if (
      user?.role !== "admin"
    ) {

      navigate("/dashboard");

      return;

    }

    fetchData();

  }, [navigate, user?.role]);

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  const deleteMember =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this member?"
        );

      if (!confirmDelete)
        return;

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/membership/${id}`
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };

  const filteredMembers =
    memberships.filter(
      (member) =>

        member.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );

  return (

    <div className="min-h-screen bg-black text-white p-10">

      {/* TOP */}
      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-5xl font-bold text-red-500">
            ADMIN ANALYTICS
          </h1>

          <p className="text-gray-400 mt-2">
            Gym Management Dashboard
          </p>

        </div>

        <button
          onClick={logout}
          className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Logout
        </button>

      </div>


      {/* ANALYTICS */}
      <div className="grid md:grid-cols-5 gap-6 mb-10">

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400 text-xl">
            Members
          </h2>

          <h1 className="text-5xl font-bold text-red-500 mt-4">
            {memberships.length}
          </h1>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400 text-xl">
            Attendance
          </h2>

          <h1 className="text-5xl font-bold text-red-500 mt-4">
            {attendance.length}
          </h1>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400 text-xl">
            Trainers
          </h2>

          <h1 className="text-5xl font-bold text-red-500 mt-4">
            {trainers.length}
          </h1>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400 text-xl">
            Announcements
          </h2>

          <h1 className="text-5xl font-bold text-red-500 mt-4">
            {announcements.length}
          </h1>

        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">

          <h2 className="text-gray-400 text-xl">
            Active Members
          </h2>

          <h1 className="text-5xl font-bold text-red-500 mt-4">

            {
              memberships.filter(
                (m) =>
                  new Date(
                    m.expiryDate
                  ) > new Date()
              ).length
            }

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
            setSearch(
              e.target.value
            )
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

            filteredMembers.map(
              (member) => (

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

                      <div className="mt-4 space-y-3">

                        <div>

                          <span
                            className={`px-4 py-2 rounded-lg font-bold ${
                              new Date(
                                member.expiryDate
                              ) > new Date()

                                ? "bg-green-500 text-black"

                                : "bg-red-500 text-white"
                            }`}
                          >

                            {
                              new Date(
                                member.expiryDate
                              ) > new Date()

                                ? "Active"

                                : "Expired"
                            }

                          </span>

                        </div>

                        <p className="text-gray-400">

                          Join:
                          {" "}

                          {
                            new Date(
                              member.joinDate
                            ).toLocaleDateString()
                          }

                        </p>

                        <p className="text-gray-400">

                          Expiry:
                          {" "}

                          {
                            new Date(
                              member.expiryDate
                            ).toLocaleDateString()
                          }

                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        deleteMember(
                          member._id
                        )
                      }
                      className="bg-red-500 px-6 py-3 rounded-xl hover:bg-red-700 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )

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