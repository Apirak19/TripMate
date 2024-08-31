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

const TestimonialCarousel = ({ customers }) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const dragX = useMotionValue(0);
  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setTestimonialIndex((prev) => {
          if (prev === customers.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }
    }, 6000);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && testimonialIndex < customers.length - 1) {
      setTestimonialIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && testimonialIndex > 0) {
      setTestimonialIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="relative overflow-hidden py-8">
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
          translateX: `-${testimonialIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <customers customers={customers} testimonialIndex={testimonialIndex} />
      </motion.div>

      <Dots
        customers={customers}
        testimonialIndex={testimonialIndex}
        setTestimonialIndex={setTestimonialIndex}
      />
    </div>
  );
};

const Customers = ({ customers, testimonialIndex }) => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      {customers.map((trip, index) => (
        <motion.div
          key={index}
          animate={{
            scale: testimonialIndex === index ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="aspect-video w-screen shrink-0 rounded-xl flex flex-col items-center"
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: "900px",
              paddingX: "2.5%",
              paddingY: "1%",
              paddingBottom: "20px",
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
              height="194"
              image={trip.image}
              alt={trip.title}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {trip.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
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
            </CardActions>
            <input
              type="text"
              className="w-full px-4"
              placeholder="add a comment"
            />
          </Card>
        </motion.div>
      ))}
    </>
  );
};

const Dots = ({ customers, testimonialIndex, setTestimonialIndex }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {customers.map((_, index) => {
        return (
          <button
            key={index}
            onClick={() => setTestimonialIndex(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === testimonialIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};

export default TestimonialCarousel;
