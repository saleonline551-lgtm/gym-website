import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Plans from "../components/Plans";
import Trainers from "../components/Trainers";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {

  return (

    <div className="bg-black overflow-x-hidden">

      <Navbar />

      {/* HOME */}
      <section id="home">
        <Hero />
      </section>

      {/* ABOUT */}
      <section id="about">
        <About />
      </section>

      {/* PLANS */}
      <section id="plans">
        <Plans />
      </section>

      {/* TRAINERS */}
      <section id="trainers">
        <Trainers />
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <Testimonials />
      </section>

      {/* CONTACT */}
      <section id="contact">
        <Contact />
      </section>

      <Footer />

    </div>

  );

}

export default Home;