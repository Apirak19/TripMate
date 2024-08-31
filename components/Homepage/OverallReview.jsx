"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#60a5fa",
  },
  "& .MuiRating-iconHover": {
    color: "#4c68a1",
  },
});

const OverallReview = () => {
  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
      className="flex flex-col items-center gap-4 bg-blue-100 p-4 rounded-l-lg"
    >
      <h1 className="text-xl font-semibold">Overall</h1>
      <Typography component="header" className="text-5xl text-blue-400 border-[5px] border-blue-400  rounded-full w-28 h-28 flex items-center justify-center">4.5</Typography>
      <StyledRating
        name="customized-color"
        defaultValue={4.5}
        max={5}
        getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
        precision={0.5}
        icon={<FavoriteIcon fontSize="inherit" />}
        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        size="large"
        readOnly
      />
      <p className="text-slate-600">416 reviews</p>
    </Box>
  );
};

export default OverallReview;
