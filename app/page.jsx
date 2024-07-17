"use client";
import React, { useState } from "react";
import NavigationBar from "@/components/navigation/NavigationBar";
import Carousel from "@/components/Homepage/Carousel";
import Hero from "@/components/Homepage/Hero";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-[#5a8ad6] to-white">
      <NavigationBar />
      {/* <Carousel /> */}
      <Hero />
    </div>
  );
};

export default Home;
