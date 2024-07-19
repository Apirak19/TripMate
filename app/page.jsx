"use client";
import React, { useState } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import Hero from "@/components/Homepage/Hero";
import SuggestedTrip from "@/components/Homepage/SuggestedTrip";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#5a8ad6] via-[#8ea6ab] to-[#5a8ad6]">
      <NavigationBar />
      {/* <Carousel /> */}
      <Hero />
      <SuggestedTrip />
      <footer className="h-10">footer</footer>
    </div>
  );
};

export default Home;
