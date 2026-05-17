import React, { useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Navbar() {

  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  return (

    <nav className="fixed top-0 w-full bg-black text-white px-10 py-5 z-50">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-red-500">
          POWER GYM
        </h1>

        {/* Desktop Menu */}

        <ul className="hidden md:flex gap-8 text-lg">

          <li>
            <a
              href="#home"
              className="hover:text-red-500 transition"
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#about"
              className="hover:text-red-500 transition"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#plans"
              className="hover:text-red-500 transition"
            >
              Plans
            </a>
          </li>

          <li>
            <a
              href="#trainers"
              className="hover:text-red-500 transition"
            >
              Trainers
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-red-500 transition"
            >
              Contact
            </a>
          </li>

        </ul>

        {/* Desktop Buttons */}

        <div className="hidden md:flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="border border-red-500 px-6 py-2 rounded-lg hover:bg-red-500 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Join Now
          </button>

        </div>

        {/* Mobile Icon */}

        <div
          className="md:hidden text-3xl cursor-pointer"
          onClick={() => setMenu(!menu)}
        >

          {menu ? <FaTimes /> : <FaBars />}

        </div>

      </div>

      {/* Mobile Menu */}

      {menu && (

        <ul className="md:hidden flex flex-col gap-6 mt-8 text-center text-xl bg-black py-10 rounded-xl">

          <li>
            <a
              href="#home"
              onClick={() => setMenu(false)}
            >
              Home
            </a>
          </li>

          <li>
            <a
              href="#about"
              onClick={() => setMenu(false)}
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#plans"
              onClick={() => setMenu(false)}
            >
              Plans
            </a>
          </li>

          <li>
            <a
              href="#trainers"
              onClick={() => setMenu(false)}
            >
              Trainers
            </a>
          </li>

          <li>
            <a
              href="#contact"
              onClick={() => setMenu(false)}
            >
              Contact
            </a>
          </li>

          <button
            onClick={() => navigate("/login")}
            className="border border-red-500 py-3 rounded-lg mx-10"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-red-500 py-3 rounded-lg mx-10"
          >
            Join Now
          </button>

        </ul>

      )}

    </nav>

  );

}

export default Navbar;