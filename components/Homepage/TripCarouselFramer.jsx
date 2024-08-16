"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";

const DRAG_BUFFER = 50;
const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export default function TripCarousel({ trips }) {
  const [tripIndex, setTripIndex] = useState(0);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setTripIndex((prev) => {
          if (prev === trips.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, 15000); // Set interval to 10 seconds

    return () => clearInterval(intervalRef);
  }, []);
  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && tripIndex < trips.length - 1) {
      setTripIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && tripIndex > 0) {
      setTripIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative overflow-hidden w-full">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${tripIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Trips trips={trips} tripIndex={tripIndex} />
      </motion.div>

      <Dots trips={trips} tripIndex={tripIndex} setTripIndex={setTripIndex} />
    </div>
  );
}

const Trips = ({ trips, tripIndex }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      {trips.map((trip, index) => (
        <motion.div
          key={index}
          animate={{
            scale: tripIndex === index ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="aspect-video w-full shrink-0 rounded-xl flex flex-col items-center"
        >
          <Card
            sx={{
              width: "100%",
              paddingBottom: "1rem",
            }}
            key={index}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {trip.avatar}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              image={trip.image}
              alt={trip.title}
              sx={{ objectFit: "cover", draggable: false, WebkitUserSelect: "none" }} 
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {trip.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="flex flex-col items-start">
              <div className="">
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => setLiked(!liked)}
                >
                  {liked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                {trip.likes.length}
                <IconButton aria-label="share">
                  <InsertCommentOutlinedIcon />
                </IconButton>
                {trip.comments.length}
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
              <input
                type="text"
                className="w-full px-2"
                placeholder="add a comment"
              />
            </CardActions>
          </Card>
        </motion.div>
      ))}
    </>
  );
};

const Dots = ({ trips, tripIndex, setTripIndex }) => {
  return (
    <div className="flex w-full justify-center gap-2">
      {trips.map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => setTripIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === tripIndex ? "bg-mainColor" : "border-2 border-mainColor"
            }`}
          />
        );
      })}
    </div>
  );
};
