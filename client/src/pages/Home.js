import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Trainers from "../components/Trainers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {

  const [plans,
    setPlans] =
    useState([]);

  const [testimonials,
    setTestimonials] =
    useState([]);

  const [about,
    setAbout] =
    useState(null);

  // FETCH DATA

  useEffect(() => {

    fetchPlans();

    fetchTestimonials();

    fetchAbout();

  }, []);

  // MEMBERSHIP PLANS

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

  // TESTIMONIALS

  const fetchTestimonials =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/testimonials"
          );

        setTestimonials(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

  // ABOUT GYM

  const fetchAbout =
    async () => {

      try {

        const res =
          await axios.get(
            "https://gym-backend-8dou.onrender.com/api/about-gym"
          );

        setAbout(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <>

      <Navbar />

      <Hero />

      {/* ABOUT SECTION */}

      <div className="bg-black text-white py-24 px-8">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-bold text-red-500 mb-10">
            {
              about?.title ||
              "About Our Gym"
            }
          </h1>

          <p className="text-2xl text-gray-300 leading-10">

            {
              about?.description ||
              "Best Gym Experience"
            }

          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="bg-gray-900 p-10 rounded-3xl">

              <h1 className="text-6xl font-bold text-red-500">
                {
                  about?.experience ||
                  "10+"
                }
              </h1>

              <p className="text-gray-400 mt-4 text-xl">
                Years Experience
              </p>

            </div>

            <div className="bg-gray-900 p-10 rounded-3xl">

              <h1 className="text-6xl font-bold text-red-500">
                {
                  about?.trainers ||
                  "15+"
                }
              </h1>

              <p className="text-gray-400 mt-4 text-xl">
                Expert Trainers
              </p>

            </div>

            <div className="bg-gray-900 p-10 rounded-3xl">

              <h1 className="text-6xl font-bold text-red-500">
                {
                  about?.members ||
                  "500+"
                }
              </h1>

              <p className="text-gray-400 mt-4 text-xl">
                Active Members
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* MEMBERSHIP PLANS */}

      <div className="bg-black text-white py-24 px-8">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-bold text-center text-red-500 mb-16">
            Membership Plans
          </h1>

          <div className="grid md:grid-cols-3 gap-10">

            {plans.map((plan) => (

              <div
                key={plan._id}
                className="bg-gray-900 p-10 rounded-3xl border border-gray-800 hover:border-red-500 transition"
              >

                <h1 className="text-4xl font-bold">
                  {plan.title}
                </h1>

                <h2 className="text-6xl text-red-500 font-bold mt-6">
                  ₹ {plan.price}
                </h2>

                <p className="text-gray-400 mt-4 text-xl">
                  {plan.duration}
                </p>

                <div className="mt-8 space-y-4">

                  {plan.features.map(
                    (feature, index) => (

                      <p
                        key={index}
                        className="text-lg"
                      >
                        ✅ {feature}
                      </p>

                    )
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      <Trainers />


      {/* TESTIMONIALS */}

      <div className="bg-black text-white py-24 px-8">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-bold text-center text-red-500 mb-16">
            Client Testimonials
          </h1>

          <div className="grid md:grid-cols-3 gap-10">

            {testimonials.map(
              (testimonial) => (

                <div
                  key={testimonial._id}
                  className="bg-gray-900 p-10 rounded-3xl"
                >

                  <img
                    src={testimonial.image}
                    alt=""
                    className="w-28 h-28 rounded-full object-cover mx-auto"
                  />

                  <h1 className="text-3xl font-bold text-center mt-8">
                    {testimonial.name}
                  </h1>

                  <p className="text-gray-400 mt-6 text-center leading-8 text-lg">
                    {testimonial.review}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

      </div>


      <Contact />

      <Footer />

    </>

  );

}

export default Home;