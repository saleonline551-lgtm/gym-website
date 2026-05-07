import React from "react";

function About() {
  return (
    <div
    id="about"
     className="bg-black text-white py-20 px-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48"
          alt=""
          className="rounded-2xl"
        />

        <div>

          <h1 className="text-5xl font-bold mb-6">
            About Our Gym
          </h1>

          <p className="text-gray-300 text-lg leading-8">
            We provide world class fitness training with
            expert trainers and modern equipment.
            Achieve your dream physique with us.
          </p>

          <button className="mt-8 bg-red-500 px-6 py-3 rounded-lg hover:bg-red-600">
            Learn More
          </button>

        </div>

      </div>

    </div>
  );
}

export default About;