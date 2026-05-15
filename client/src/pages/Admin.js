import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import AdminSidebar from "../components/AdminSidebar";

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

  // FETCH DATA

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

  // DELETE MEMBER

  const deleteMember =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this customer?"
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

  // RENEW MEMBERSHIP

  const renewMembership =
    async (id) => {

      try {

        await axios.put(
          `https://gym-backend-8dou.onrender.com/api/membership/renew/${id}`
        );

        alert(
          "Membership Renewed"
        );

        fetchData();

      } catch (error) {

        console.log(error);

      }

    };

  // SEARCH FILTER

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

    <div className="flex bg-black text-white min-h-screen">

      {/* SIDEBAR */}

      <AdminSidebar />

      {/* CONTENT */}

      <div className="flex-1 p-10">

        <h1 className="text-5xl font-bold text-red-500 mb-3">
          ADMIN ANALYTICS
        </h1>

        <p className="text-gray-400 mb-10">
          Gym Management Dashboard
        </p>

        {/* ANALYTICS */}

        <div className="grid md:grid-cols-5 gap-6 mb-10">

          <div className="bg-gray-900 p-6 rounded-2xl">

            <h2 className="text-gray-400 text-xl">
              Customers
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
              Active Customers
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
            placeholder="Search Customers..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="w-full p-5 rounded-2xl bg-gray-900 border border-gray-700 outline-none text-white text-xl"
          />

        </div>

        {/* CUSTOMERS LIST */}

        <div className="bg-gray-900 p-8 rounded-2xl">

          <h1 className="text-4xl font-bold mb-8">
            Customers List
          </h1>

          <div className="space-y-6">

            {filteredMembers.length > 0 ? (

              filteredMembers.map(
                (member) => (

                  <div
                    key={member._id}

                    onClick={() =>
                      navigate(
                        `/customer/${member.email}`
                      )
                    }

                    className="bg-black p-6 rounded-2xl border border-gray-800 cursor-pointer hover:border-red-500 hover:scale-[1.01] transition duration-300"
                  >

                    <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">

                      {/* CUSTOMER INFO */}

                      <div className="flex-1">

                        <h1 className="text-3xl font-bold text-white">
                          {member.name}
                        </h1>

                        <p className="text-gray-400 mt-2 break-all">
                          {member.email}
                        </p>

                        {/* PLAN */}

                        <div className="mt-5 flex flex-col gap-4">

                          <p className="text-red-500 text-2xl font-bold">
                            {member.plan}
                          </p>

                          {/* STATUS */}

                          <span
                            className={`w-fit px-4 py-2 rounded-xl font-bold ${
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

                      </div>

                      {/* BUTTONS */}

                      <div
                        className="flex gap-4"

                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >

                        <button
                          onClick={() =>
                            renewMembership(
                              member._id
                            )
                          }
                          className="bg-green-500 px-6 py-3 rounded-xl hover:bg-green-700 transition text-black font-bold"
                        >
                          Renew
                        </button>

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

                  </div>

                )
              )

            ) : (

              <p className="text-gray-400 text-xl">
                No Customers Found
              </p>

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default Admin;