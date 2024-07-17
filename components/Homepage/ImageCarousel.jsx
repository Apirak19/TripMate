"use client";
import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const images = [
  "https://via.placeholder.com/800x400?text=Image+1",
  "https://via.placeholder.com/800x400?text=Image+2",
  "https://via.placeholder.com/800x400?text=Image+3",
  "https://via.placeholder.com/800x400?text=Image+4",
];

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "400px",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          component="img"
          src={image}
          sx={{
            display: currentIndex === index ? "block" : "none",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.5s ease-in-out",
          }}
        />
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

export default ImageCarousel;
