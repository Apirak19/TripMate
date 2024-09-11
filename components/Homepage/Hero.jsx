"use client";

import React from "react";
import Link from "next/link";
import heroBg from "@/assets/images/hero-page.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Hero = () => {
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <div className="w-full relative">
      {/* <div className="w-full xs:py-10 sm:py-24 md:py-40 lg:px-20 flex flex-col items-center gap-20 md:gap-40">
          <h1 className="sm:w-full sm:text-6xl lg:text-[150px] xs:text-5xl xs:w-[400px] text-center px-6 xs:leading-normal md:leading-none">
            Explore Thailand with Local Experts
          </h1>
          <button className="py-7 px-12 rounded-md bg-mainColor text-white">
            see our Thai guide
          </button>
        </div> */}
      <button onClick={handleLogout}>Log out</button>
      <Image src={heroBg} alt="hero" layout="responsive" />
      <div className="flex justify-center absolute top-2/3 w-full">
        <Link
          href="/guides"
          className=" bg-slate-50 px-4 py-1 rounded-lg text-[8px] sm:text-xs md:text-base"
        >
          click to see our guides
        </Link>
      </div>
    </div>
  );
};

export default Hero;
