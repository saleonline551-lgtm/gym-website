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
    <>
      <Navbar />
      <Hero />
      <About />
      <Plans />
      <Trainers />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;