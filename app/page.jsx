import React from "react";
import Hero from "@/components/Homepage/Hero";
import SuggestedTrip from "@/components/Homepage/SuggestedTrip";
import Testimonial from "@/components/Homepage/Testimonial";
import TripCategory from "@/components/Homepage/TripCategory";
import PopularPlace from "@/components/Homepage/PopularPlace";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import Image from "next/image";
import { loginIsRequiredServer } from "@/lib/loginIsRequiredServer";
import { signOut } from "next-auth/react";

const Home = async () => {
  await loginIsRequiredServer();
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const session = await getServerSession(authConfig);
  console.log("session: ", session);

  return (
    <div className="w-full flex flex-col items-center pb-4">
      <h1 className="text-8xl">{session.user.name}</h1>
      <Image src={session.user.image} width={200} height={200}></Image>
      <Hero />
      <TripCategory />
      <PopularPlace />
      <SuggestedTrip />
      <Testimonial />
    </div>
  );
};

export default Home;
