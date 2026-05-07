import React from "react";
import { motion } from "framer-motion";

function Contact() {
  return (
    <div
      id="contact"
      className="bg-black text-white py-20 px-10"
    >

      <div className="max-w-5xl mx-auto">

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Contact Us
        </motion.h1>

        <motion.form
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid gap-6 bg-gray-950 p-10 rounded-3xl shadow-2xl"
        >

          <input
            type="text"
            placeholder="Your Name"
            className="p-4 bg-black rounded-lg outline-none border border-gray-800 focus:border-red-500"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="p-4 bg-black rounded-lg outline-none border border-gray-800 focus:border-red-500"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="p-4 bg-black rounded-lg outline-none border border-gray-800 focus:border-red-500"
          />

          <textarea
            rows="6"
            placeholder="Your Message"
            className="p-4 bg-black rounded-lg outline-none border border-gray-800 focus:border-red-500"
          ></textarea>

          <button className="bg-red-500 py-4 rounded-lg text-xl hover:bg-red-600 hover:scale-105 transition">
            Send Message
          </button>

        </motion.form>

      </div>

    </div>
  );
}

export default Contact;