import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function TestimonialAdmin() {

  const [testimonials,
    setTestimonials] =
    useState([]);

  const [name,
    setName] =
    useState("");

  const [image,
    setImage] =
    useState("");

  const [review,
    setReview] =
    useState("");

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

  useEffect(() => {

    fetchTestimonials();

  }, []);

  const addTestimonial =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "https://gym-backend-8dou.onrender.com/api/testimonials",

          {
            name,
            image,
            review,
          }
        );

        setName("");
        setImage("");
        setReview("");

        fetchTestimonials();

      } catch (error) {

        console.log(error);

      }

    };

  const deleteTestimonial =
    async (id) => {

      try {

        await axios.delete(
          `https://gym-backend-8dou.onrender.com/api/testimonials/${id}`
        );

        fetchTestimonials();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold text-red-500 mb-10">
        Client Testimonials
      </h1>

      <form
        onSubmit={addTestimonial}
        className="bg-gray-900 p-8 rounded-2xl mb-10"
      >

        <input
          type="text"
          placeholder="Client Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <textarea
          placeholder="Client Review"
          value={review}
          onChange={(e) =>
            setReview(e.target.value)
          }
          className="w-full p-4 mb-5 rounded-xl bg-black"
        />

        <button
          className="bg-red-500 px-8 py-4 rounded-xl"
        >
          Add Testimonial
        </button>

      </form>

      <div className="space-y-6">

        {testimonials.map(
          (testimonial) => (

            <div
              key={testimonial._id}
              className="bg-gray-900 p-8 rounded-2xl"
            >

              <img
                src={testimonial.image}
                alt=""
                className="w-24 h-24 rounded-full object-cover mb-5"
              />

              <h1 className="text-3xl font-bold">
                {testimonial.name}
              </h1>

              <p className="text-gray-400 mt-4">
                {testimonial.review}
              </p>

              <button
                onClick={() =>
                  deleteTestimonial(
                    testimonial._id
                  )
                }
                className="bg-red-500 px-6 py-3 rounded-xl mt-6"
              >
                Delete
              </button>

            </div>

          )
        )}

      </div>

    </div>

  );

}

export default TestimonialAdmin;