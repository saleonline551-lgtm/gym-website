import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { FaStar } from "react-icons/fa";

function Testimonials() {

  const [reviews,
    setReviews] =
    useState([]);

  useEffect(() => {

    fetchTestimonials();

  }, []);

  const fetchTestimonials =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/testimonials"
          );

        setReviews(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="bg-gray-950 text-white py-20 px-10">

      <h1 className="text-5xl font-bold text-center mb-16">
        Client Testimonials
      </h1>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {reviews.map((item, index) => (

          <motion.div
            key={index}
            initial={{
              opacity: 0,
              y: 80
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            whileHover={{
              scale: 1.03
            }}
            className="bg-black p-8 rounded-2xl border border-gray-800 shadow-lg"
          >

            <div className="flex gap-1 text-yellow-400 mb-5">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>

            <p className="text-gray-300 leading-8">
              "{item.review}"
            </p>

            <h2 className="text-2xl font-bold mt-6 text-red-500">
              {item.name}
            </h2>

          </motion.div>

        ))}

      </div>

    </div>

  );

}

export default Testimonials;