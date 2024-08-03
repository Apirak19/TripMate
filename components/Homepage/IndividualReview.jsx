"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const IndividualReview = () => {
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
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-opacity-50 text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
      >
        <ArrowBackIosNewIcon className="text-slate-400" />
      </button>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <button
        type="button"
        onClick={onClickHandler}
        title={label}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-opacity-50 text-white border-none rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
      >
        <ArrowForwardIosIcon className="text-slate-400" />
      </button>
    );
  return (
    <Carousel
      showStatus={false}
      showIndicators={false}
      showThumbs={true}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
      className="w-full overflow-x-hidden m-auto"
    >
      {reviews.map((review, index) => (
        <div key={index} className="py-4 px-14 w-full flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <StyledRating value={review.rating} readOnly />
            <h4 className="text-start font-semibold">{review.title}</h4>
          </div>

          <p className="text-justify border-y-[1px] py-4">{review.content}</p>

          <div className="flex gap-3">
            <div
              className="flex w-14 h-14 rounded-full"
              style={{
                backgroundImage: `url(${review.avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            {/* <a
                href="#"
                className=" bg-slate-50 rounded-full flex items-center justify-center"
              >
                <img src={review.avatar} alt={review.username} />
              </a> */}
            <div className="flex flex-col items-start justify-center">
              <p className="font-medium">{review.username}</p>
              <p>{review.postDate}</p>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default IndividualReview;
