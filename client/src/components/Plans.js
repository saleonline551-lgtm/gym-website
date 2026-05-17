import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

function Plans() {

  const [plans,
    setPlans] =
    useState([]);

  useEffect(() => {

    fetchPlans();

  }, []);

  const fetchPlans =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/membership-plans"
          );

        setPlans(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <section
      id="plans"
      data-aos="fade-up"
      className="bg-gray-950 text-white py-20 px-10"
    >

      <h1 className="text-5xl font-bold text-center mb-16">
        Membership Plans
      </h1>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {(plans.length > 0
          ? plans
          : [
              {
                title: "Basic",
                price: "999",
                duration: "1 Month",
                features: [
                  "Gym Access",
                  "Cardio",
                  "Locker"
                ]
              },
              {
                title: "Standard",
                price: "1999",
                duration: "3 Months",
                features: [
                  "Trainer Support",
                  "Diet Plan",
                  "Workout Plan"
                ]
              },
              {
                title: "Premium",
                price: "2999",
                duration: "6 Months",
                features: [
                  "Personal Trainer",
                  "Premium Equipment",
                  "Full Access"
                ]
              }
            ]).map((plan, index) => (

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
              scale: 1.05
            }}
            className="bg-black p-10 rounded-2xl border border-gray-800 hover:border-red-500 transition duration-300 shadow-lg"
          >

            <h2 className="text-3xl font-bold mb-4">
              {plan.title}
            </h2>

            <h1 className="text-5xl text-red-500 mb-6">
              ₹{plan.price}
            </h1>

            <p className="text-gray-400 mb-8 leading-7">
              {plan.duration}
            </p>

            <div className="space-y-3 mb-8">

              {plan.features?.map(
                (feature, i) => (

                  <p key={i}>
                    ✅ {feature}
                  </p>

                )
              )}

            </div>

            <Link
              to="/login"
              className="block w-full bg-red-500 py-4 rounded-xl hover:bg-red-600 text-center transition"
            >
              Choose Plan
            </Link>

          </motion.div>

        ))}

      </div>

    </section>

  );

}

export default Plans;