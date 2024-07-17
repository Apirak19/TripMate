"use client";
import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const trips = [
  {
    author: "Apirak Fakin",
    profileImg: "https://via.placeholder.com/800x400?text=Image+1",
    location: "Bangkok",
    title: "A Trip1 you wont't forget!",
    content:
      "I've used react-dnd in the past, but the project seems abandoned. I'm considering react-beautiful-dnd, maintained by Atlassian. Which is your go-to library to create draggable components? I've used react-dnd in the past, but the project seems abandoned. I'm considering react-beautiful-dnd, maintained by Atlassian. Which is your go-to library to create draggable components?",
    likes: 20,
    comments: 20,
  },
  {
    author: "Apirak Fakin",
    profileImg: "https://via.placeholder.com/800x400?text=Image+2",
    title: "A Trip2 you wont't forget!",
    location: "Bangkok",
    content:
      "I've used react-dnd in the past, but the project seems abandoned. I'm considering react-beautiful-dnd, maintained by Atlassian. Which is your go-to library to create draggable components? I've used react-dnd in the past, but the project seems abandoned. I'm considering react-beautiful-dnd, maintained by Atlassian. Which is your go-to library to create draggable components?",
    likes: 20,
    comments: 20,
  },
  {
    author: "Apirak Fakin",
    profileImg: "https://via.placeholder.com/800x400?text=Image+3",
    title: "A Trip3 you wont't forget!",
    location: "Bangkok",
    content:
      "I've used react-dnd in the past, but the project seems abandoned. I'm considering react-beautiful-dnd, maintained by Atlassian. Which is your go-to library to create draggable components? I've used react-dnd in the past, but the project seems abandoned. I'm considering react-beautiful-dnd, maintained by Atlassian. Which is your go-to library to create draggable components?",
    likes: 20,
    comments: 20,
  },
];

const TripCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trips.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === trips.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      {trips.map((trip, index) => (
        <div
          className={`bg-[#5a8ad6] w-1/2 rounded-xl mx-auto my-20 py-5 px-5 ${
            currentIndex === index ? "flex" : "hidden"
          }
          flex-col gap-4 relative
          `}
        >
          <FavoriteBorderIcon className="absolute right-[20px]" />
          <div className="flex items-center gap-4">
            <img
              src={trip.profileImg}
              alt={trip.author}
              className="rounded-full w-20 h-20 object-cover"
            />
            <h4>{trip.author}</h4>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-bold">{trip.title}</h3>
            <p className="truncate-3-lines">
              {trip.content.slice(0, 200)}{" "}
              <a href="/" className="border-b-2">
                read more
              </a>
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 rounded-xl bg-[#2b6086] py-1 px-4">
              <p>Likes</p>
              <p>{trip.likes}</p>
            </div>
            <div className="flex gap-2 rounded-xl bg-[#2b6086] py-1 px-4">
              <p>Comments</p>
              <p>{trip.comments}</p>
            </div>
          </div>
        </div>
      ))}
      <IconButton
        onClick={handlePrev}
        sx={{
          opacity: "0.5",
          position: "absolute",
          top: "50%",
          left: "5%",
          "&:hover": {
            backgroundColor: "#d8dfeb",
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>
      <IconButton
        onClick={handleNext}
        sx={{
          opacity: "0.5",
          position: "absolute",
          top: "50%",
          right: "5%",
          "&:hover": {
            backgroundColor: "#d8dfeb",
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default TripCarousel;
