"use client";

import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full md:py-32 xs:py-10 flex flex-col items-center gap-20">
      <h1 className="md:text-9xl xs:text-5xl text-center px-6 leading-relaxed">
        Explore Thailand with Local Experts
      </h1>
      <Link href="/guides">
        <button className="py-7 px-12 rounded-md bg-[#5a8ad6]">
          see our Thai guide
        </button>
      </Link>
    </div>
  );
};

export default Hero;
