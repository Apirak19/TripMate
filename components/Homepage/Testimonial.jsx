import React from "react";
import TestimonialCarousel from "./TestimonialCarousel";
import OverallReview from "./OverallReview";
import IndividualReview from "./IndividualReview";

const Testimonial = () => {
  const customers = [
    {
      name: "John Smith",
      comment:
        "I had an amazing time exploring Thailand with TripMate. The local guides were knowledgeable and friendly, and the suggested trips were perfect for my interests.",
      avatar:
        "https://images.unsplash.com/photo-1560264085-7f57a8b0d4e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Jane Doe",
      comment:
        "I highly recommend TripMate for anyone looking to experience the best of Thailand. The suggested trips were well-planned and the local guides made me feel like I was traveling with friends.",
      avatar:
        "https://images.unsplash.com/photo-1556912179-5d7f3c0e6b8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      name: "Bob Johnson",
      comment:
        "I had a fantastic time on my trip to Thailand with TripMate. The suggested trips were diverse and allowed me to see different parts of the country, and the local guides were always available for any questions or recommendations.",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];
  return (
    <div className="w-full max-w-[950px] mt-2 py-4 px-5 flex flex-col items-center bg-white rounded-lg gap-4">
      <h2 className="w-full text-3xl">Review from our trip mates</h2>
      <div className="flex w-full shadow-card-shadow">
        <OverallReview />
        <IndividualReview />
      </div>

      {/* <div>
      <h1 className="text-5xl font-bold text-center mb-20">Review from our trip mates</h1>
      <TestimonialCarousel customers={customers} />
    </div> */}
    </div>
  );
};

export default Testimonial;
