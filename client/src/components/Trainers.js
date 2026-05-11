import React from "react";

import { motion } from "framer-motion";

function Trainers() {

  const trainers = [

    {
      name: "John",
      role: "Bodybuilding Coach",
      image:
        "https://images.unsplash.com/photo-1567013127542-490d757e51fc",
    },

    {
      name: "Alex",
      role: "Fitness Trainer",
      image:
        "https://images.unsplash.com/photo-1549476464-37392f717541",
    },

    {
      name: "David",
      role: "Cardio Expert",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    },

  ];

  return (

    <div
      id="trainers"
      data-aos="fade-up"
      className="bg-black text-white py-20 px-10"
    >

      <h1 className="text-5xl font-bold text-center mb-16">
        Professional Trainers
      </h1>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {trainers.map((trainer, index) => (

          <motion.div
            key={index}
            data-aos="fade-right"
            initial={{
              opacity: 0,
              x: -100
            }}
            whileInView={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.7
            }}
            whileHover={{
              scale: 1.05
            }}
            className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-800 hover:border-red-500 transition duration-300"
          >

            <div className="overflow-hidden">

              <img
                src={trainer.image}
                alt=""
                className="h-96 w-full object-cover hover:scale-110 transition duration-500"
              />

            </div>

            <div className="p-6">

              <h2 className="text-3xl font-bold">
                {trainer.name}
              </h2>

              <p className="text-red-500 mt-3 text-lg">
                {trainer.role}
              </p>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default Trainers;