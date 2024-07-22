"use client";
import React, { useEffect, useRef } from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking-inline.css";

const TestimonialCarousel = ({ customers }) => {
  const flickingRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (flickingRef.current) {
        const nextIndex = (flickingRef.current.index + 1) % customers.length;
        flickingRef.current.moveTo(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [customers.length]);

  return (
    <Flicking
      ref={flickingRef}
      align="prev"
      circular={true}
      onMoveEnd={() => {
        // Optional: Any additional logic on move end
      }}
    >
      {customers.map((customer, index) => (
        <div className="panel" key={index}>
          <h2>{customer.name}</h2>
          <p>{customer.comment}</p>
        </div>
      ))}
    </Flicking>
  );
};

export default TestimonialCarousel;
