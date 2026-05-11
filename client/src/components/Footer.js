import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

function Footer() {

  return (

    <div className="bg-gray-950 text-white pt-16 pb-10 px-10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Logo Section */}
        <div>

          <h1 className="text-4xl font-bold text-red-500">
            POWER GYM
          </h1>

          <p className="text-gray-400 mt-5 leading-7">
            Transform your body with professional trainers,
            premium equipment and modern fitness programs.
          </p>

        </div>


        {/* Quick Links */}
        <div>

          <h2 className="text-2xl font-bold mb-5">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-red-500 cursor-pointer">
              Home
            </li>

            <li className="hover:text-red-500 cursor-pointer">
              About
            </li>

            <li className="hover:text-red-500 cursor-pointer">
              Plans
            </li>

            <li className="hover:text-red-500 cursor-pointer">
              Trainers
            </li>

            <li className="hover:text-red-500 cursor-pointer">
              Contact
            </li>

          </ul>

        </div>


        {/* Social Icons */}
        <div>

          <h2 className="text-2xl font-bold mb-5">
            Follow Us
          </h2>

          <div className="flex gap-5 text-2xl">

            <div className="bg-black p-4 rounded-full hover:bg-red-500 transition cursor-pointer">
              <FaFacebookF />
            </div>

            <div className="bg-black p-4 rounded-full hover:bg-red-500 transition cursor-pointer">
              <FaInstagram />
            </div>

            <div className="bg-black p-4 rounded-full hover:bg-red-500 transition cursor-pointer">
              <FaTwitter />
            </div>

            <div className="bg-black p-4 rounded-full hover:bg-red-500 transition cursor-pointer">
              <FaYoutube />
            </div>

          </div>

        </div>


        {/* MAP SECTION */}
        <div>

          <h2 className="text-2xl font-bold mb-5">
            Gym Location
          </h2>

          <iframe
            title="gym-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.199700794804!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670d3b44d8f%3A0x2b1d8c6c7a3b9c5e!2sGym!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="220"
            style={{
              border: 0,
              borderRadius: "20px",
            }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

        </div>

      </div>


      {/* Bottom */}
      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">

        © 2026 POWER GYM. All Rights Reserved.

      </div>

    </div>

  );

}

export default Footer;