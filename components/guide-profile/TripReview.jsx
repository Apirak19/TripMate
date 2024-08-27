"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const TripReview = () => {
  const reviews = [
    {
      avatar: "https://via.placeholder.com/150?text=user1",
      username: "user1",
      tripName: "Trip 1",
      postDate: "2022-10-01",
      title: "Amazing Experience",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod, justo a aliquam tincidunt, mauris nisl tincidunt nunc, id lacinia nisl mauris id nunc. Sed auctor, nunc nec tincidunt tincidunt, nunc mauris.",
      rating: 5,
    },
    {
      avatar: "https://via.placeholder.com/150?text=user2",
      username: "user2",
      tripName: "Trip 2",
      postDate: "2022-10-02",
      title: "Highly Recommended",
      content:
        "Nulla facilisi. Sed euismod mauris non mi tincidunt, ac tincidunt. Fusce euismod, justo a aliquam tincidunt, mauris nisl tincidunt nunc, id lacinia nisl mauris id nunc. Sed auctor, nunc nec tincidunt tincidunt, nunc mauris.",
      rating: 4,
    },
    {
      avatar: "https://via.placeholder.com/150?text=user3",
      username: "user3",
      tripName: "Trip 3",
      postDate: "2022-10-03",
      title: "Great Service",
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce euismod, justo a aliquam tincidunt, mauris nisl tincidunt nunc, id lacinia nisl mauris id nunc. Sed auctor, nunc nec tincidunt tincidunt, nunc mauris.",
      rating: 5,
    },
    {
      avatar: "https://via.placeholder.com/150?text=user4",
      username: "user4",
      tripName: "Trip 4",
      postDate: "2022-10-04",
      title: "Wonderful Trip",
      content:
        "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod. Fusce euismod, justo a aliquam tincidunt, mauris nisl tincidunt nunc, id lacinia nisl mauris id nunc. Sed auctor, nunc nec tincidunt tincidunt, nunc mauris.",
      rating: 4.5,
    },
    {
      avatar: "https://via.placeholder.com/150?text=user5",
      username: "user5",
      tripName: "Trip 5",
      postDate: "2022-10-05",
      title: "Fantastic Guide",
      content:
        "Donec euismod, nunc nec tincidunt tincidunt, nunc mauris. Fusce euismod, justo a aliquam tincidunt, mauris nisl tincidunt nunc, id lacinia nisl mauris id nunc. Sed auctor, nunc nec tincidunt tincidunt, nunc mauris.",
      rating: 3.5,
    },
  ];

  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#687da6",
    },
    "& .MuiRating-iconHover": {
      color: "#4c68a1",
    },
  });
  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute top-1/3 right-0 bg-opacity-50 text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
      >
        <KeyboardArrowUpIcon className="text-slate-400" />
      </button>
    );
  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute bottom-1/3 right-0 bg-opacity-50 text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
      >
        <KeyboardArrowDownIcon className="text-slate-400" />
      </button>
    );
  return (
    <section className="w-full bg-purple-100 flex flex-col p-4 gap-3 rounded-r-lg">
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        renderArrowPrev={renderArrowPrev}
        renderArrowNext={renderArrowNext}
        axis="vertical"
        centerMode={true}
      >
        {reviews.map((review, index) => (
          <article className="pb-10 pr-10 flex flex-col gap-2" key={index}>
            <div className="w-full flex gap-4 items-center">
              <div className="bg-slate-200 w-[75px] h-[75px] rounded-lg"></div>
              <div className="text-start">
                <h2 className="text-lg font-semibold">{review.username}</h2>
                <p>8/20/2024 10:39:36</p>
              </div>
            </div>

            {/* star */}
            <div className="flex flex-col text-start">
              <p>Trip Name</p>
              <StyledRating value={review.rating} readOnly />
            </div>

            {/* review */}
            <p className="text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quae. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quae.
            </p>
          </article>
        ))}
      </Carousel>
      {/* before map */}

      {/* after map */}
    </section>
  );
};

export default TripReview;
