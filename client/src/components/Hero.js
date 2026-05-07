import React from "react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <div
      id="home"
      className="h-screen bg-cover bg-center flex items-center px-10 text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438')",
      }}
    >

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >

        <h1 className="text-7xl font-bold leading-tight">
          BUILD YOUR <br />
          DREAM BODY
        </h1>

        <p className="mt-6 text-xl text-gray-300 max-w-xl">
          Professional trainers, modern equipment and
          premium fitness experience.
        </p>

        <button className="mt-8 bg-red-500 px-8 py-4 rounded-lg text-xl hover:bg-red-600 hover:scale-105 transition">
          Join Today
        </button>

      </motion.div>

    </div>
  );
}

export default Hero;