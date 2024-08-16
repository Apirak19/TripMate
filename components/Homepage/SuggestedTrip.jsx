import React, { use } from "react";
import TripCarousel from "./TripCarouselFramer";

const SuggestedTrip = () => {
  const trips = [
    {
      author: "Jane Doe",
      avatar:
        "https://images.unsplash.com/photo-1556912179-5d7f3c0e6b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      creatAt: "September 14, 2016",
      title: "Thai Street Food Tour",
      content:
        "Experience the best of Thai street food with our local guides. From Pad Thai to Mango Sticky Rice, you'll get to taste a variety of dishes and learn about their history and cultural significance.",
      image: "https://placehold.co/600x400",
      likes: [
        {
          user: "John Smith",
          likedAt: "September 14, 2016",
        },
        {
          user: "Bob Johnson",
          likedAt: "September 14, 2016",
        },
        {
          user: "Jane Doe",
          likedAt: "September 14, 2016",
        },
        {
          user: "John Smiths",
          likedAt: "September 14, 2016",
        },
      ],
      comments: [
        { author: "John Smith", content: "This tour was amazing!" },
        { author: "Bob Johnson", content: "I highly recommend this tour!" },
      ],
    },
    {
      author: "Morgan Mo",
      avatar:
        "https://images.unsplash.com/photo-1556912179-5d7f3c0e6b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      creatAt: "September 14, 2016",
      title: "Thai Cooking Class",
      content:
        "Learn how to cook authentic Thai dishes with our local chefs. From shopping for ingredients at a local market to preparing and cooking the dishes, you'll get an immersive experience in Thai cuisine.",
      image: "https://placehold.co/600x400",
      likes: [
        {
          user: "John Smiths",
          likedAt: "September 14, 2016",
        },
        {
          user: "Bob Johnson",
          likedAt: "September 14,2016",
        },
        { user: "Jane Doe", likedAt: " September ,2021" },
      ],
      comments: [
        { author: "John Smith", content: "This class was so much fun!" },
        { author: "Bob Johnson", content: "I learned so many new recipes!" },
      ],
    },
    {
      author: "Morgana Mee",
      avatar:
        "https://images.unsplash.com/photo-1556912179-5d7f3c0e6b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      creatAt: "September 14, 2016",
      title: "Thai Fighting Class",
      content:
        "Learn the ancient art of Muay Thai with our experienced instructors. From basic techniques to advanced moves, you'll get a full workout and learn self-defense skills.",
      image: "https://placehold.co/600x400",
      likes: [
        {
          user: "John Smiths",
          likedAt: "September 14, 2016",
        },
        {
          user: "Bob Johnson",
          likedAt: "September 14,2016",
        },
      ],
      comments: [
        { author: "John Smith", content: "This class was so much fun!" },
        { author: "Bob Johnson", content: "I learned so many techniques!" },
      ],
    },
  ];
  return (
    <div className="w-full max-w-[950px] mt-2 py-4 flex flex-col items-center bg-white rounded-lg">
      <div className="flex w-full px-5">
        <h2 className="w-full text-3xl ">Suggested Trips</h2>
        <a href="" className="text-base text-nowrap leading-10 text-blue-400">
          see all
        </a>
      </div>
      <TripCarousel trips={trips} />
    </div>
  );
};

export default SuggestedTrip;
