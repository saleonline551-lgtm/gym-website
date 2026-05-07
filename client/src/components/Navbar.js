import React, { useState } from "react";
import { Link } from "react-scroll";
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
            <Link
              to="home"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-500"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-500"
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="plans"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-500"
            >
              Plans
            </Link>
          </li>

          <li>
            <Link
              to="trainers"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-500"
            >
              Trainers
            </Link>
          </li>

          <li>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="cursor-pointer hover:text-red-500"
            >
              Contact
            </Link>
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
            <Link
              to="home"
              smooth={true}
              duration={500}
              onClick={() => setMenu(false)}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="about"
              smooth={true}
              duration={500}
              onClick={() => setMenu(false)}
            >
              About
            </Link>
          </li>

          <li>
            <Link
              to="plans"
              smooth={true}
              duration={500}
              onClick={() => setMenu(false)}
            >
              Plans
            </Link>
          </li>

          <li>
            <Link
              to="trainers"
              smooth={true}
              duration={500}
              onClick={() => setMenu(false)}
            >
              Trainers
            </Link>
          </li>

          <li>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              onClick={() => setMenu(false)}
            >
              Contact
            </Link>
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