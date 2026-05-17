import React, { useState } from "react";

import { FaBars, FaTimes } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Navbar() {

  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const scrollToSection = (id) => {

    const section =
      document.getElementById(id);

    if (section) {

      section.scrollIntoView({
        behavior: "smooth"
      });

    }

  };

  return (

    <nav className="fixed top-0 w-full bg-black text-white px-10 py-5 z-50">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold text-red-500">
          POWER GYM
        </h1>

        {/* Desktop Menu */}

        <ul className="hidden md:flex gap-8 text-lg">

          <li
            onClick={() => scrollToSection("home")}
            className="cursor-pointer hover:text-red-500 transition"
          >
            Home
          </li>

          <li
            onClick={() => scrollToSection("about")}
            className="cursor-pointer hover:text-red-500 transition"
          >
            About
          </li>

          <li
            onClick={() => scrollToSection("plans")}
            className="cursor-pointer hover:text-red-500 transition"
          >
            Plans
          </li>

          <li
            onClick={() => scrollToSection("trainers")}
            className="cursor-pointer hover:text-red-500 transition"
          >
            Trainers
          </li>

          <li
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer hover:text-red-500 transition"
          >
            Contact
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

          <li
            onClick={() => {
              scrollToSection("home");
              setMenu(false);
            }}
          >
            Home
          </li>

          <li
            onClick={() => {
              scrollToSection("about");
              setMenu(false);
            }}
          >
            About
          </li>

          <li
            onClick={() => {
              scrollToSection("plans");
              setMenu(false);
            }}
          >
            Plans
          </li>

          <li
            onClick={() => {
              scrollToSection("trainers");
              setMenu(false);
            }}
          >
            Trainers
          </li>

          <li
            onClick={() => {
              scrollToSection("contact");
              setMenu(false);
            }}
          >
            Contact
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