import React from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

function AdminSidebar() {

  const navigate =
    useNavigate();

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");

  };

  return (

    <div className="w-72 min-h-screen bg-gray-900 p-8">

      <h1 className="text-4xl font-bold text-red-500 mb-10">
        ADMIN
      </h1>

      <div className="flex flex-col gap-5">

        <Link
          to="/admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/trainer-admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Trainers
        </Link>

        <Link
          to="/announcement-admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Announcements
        </Link>

        <Link
          to="/gallery-admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Gallery
        </Link>

        <Link
          to="/diet-admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Diet Plans
        </Link>

        <Link
          to="/workout-admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Workout Plans
        </Link>

        <Link
          to="/attendance-admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Attendance
        </Link>

        <Link
          to="/contact-admin"
          className="bg-black p-4 rounded-xl hover:bg-red-500 transition"
        >
          Support Messages
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 p-4 rounded-xl hover:bg-red-700 transition mt-10"
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default AdminSidebar;