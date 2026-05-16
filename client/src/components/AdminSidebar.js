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

    <div className="w-72 min-h-screen bg-gray-900 p-8 border-r border-gray-800">

      {/* LOGO */}

      <h1 className="text-5xl font-extrabold text-red-500 mb-12 tracking-wide">
        ADMIN
      </h1>

      {/* MENU */}

      <div className="flex flex-col gap-5">

        <Link
          to="/admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Dashboard
        </Link>

        <Link
          to="/trainer-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Trainers
        </Link>

        <Link
          to="/announcement-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Announcements
        </Link>

        <Link
          to="/gallery-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Gym Gallery
        </Link>

        {/* NEW MENU */}

        <Link
          to="/membership-plan-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Membership Plans
        </Link>

        <Link
          to="/testimonial-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Client Testimonials
        </Link>

        <Link
          to="/about-gym-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          About Our Gym
        </Link>

        <Link
          to="/attendance-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Attendance
        </Link>

        <Link
          to="/contact-admin"
          className="bg-black p-4 rounded-2xl hover:bg-red-500 hover:scale-105 transition duration-300 text-lg font-semibold"
        >
          Support Messages
        </Link>

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="bg-red-500 p-4 rounded-2xl hover:bg-red-700 transition duration-300 mt-10 text-lg font-bold"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default AdminSidebar;