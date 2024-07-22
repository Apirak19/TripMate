import React from "react";
import Hero from "@/components/Homepage/Hero";
import SuggestedTrip from "@/components/Homepage/SuggestedTrip";
import Testimonial from "@/components/Homepage/Testimonial";

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <SuggestedTrip />
      <Testimonial />
      <footer className="h-10">footer</footer>
    </div>
  );
};

export default Home;
