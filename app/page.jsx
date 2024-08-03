import React from "react";
import Hero from "@/components/Homepage/Hero";
import SuggestedTrip from "@/components/Homepage/SuggestedTrip";
import Testimonial from "@/components/Homepage/Testimonial";
import TripCategory from "@/components/Homepage/TripCategory";
import PopularPlace from "@/components/Homepage/PopularPlace";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Hero />
      <TripCategory />
      <PopularPlace />
      <SuggestedTrip />
      <Testimonial />
      <footer className="h-10">footer</footer>
    </div>
  );
};

export default Home;
