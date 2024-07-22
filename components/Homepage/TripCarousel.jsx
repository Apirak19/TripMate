"use client";
import React, { useEffect, useRef, useState } from "react";
import Flicking from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking-inline.css";
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

export default function TripCarousel({ trips }) {
  const [liked, setLiked] = useState(false);
  const flickingRef = useRef(null);
  const [tripIndex, setTripIndex] = useState(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      if (flickingRef.current) {
        const nextIndex = (flickingRef.current.index + 1) % trips.length;
        flickingRef.current.moveTo(nextIndex);
      }
    }, 3000);
    return () => clearInterval(intervalRef);
  }, [trips.length]);
  return (
    <Flicking
      ref={flickingRef.current}
      align="prev"
      circular={true}
      onMoveEnd={() => {
        // Optional: Any additional logic on move end
      }}
    >
      {trips.map((trip, index) => (
        <Card sx={{ width: "100%" }} key={index}>
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
            image="/static/images/cards/paella.jpg"
            alt="Paella dish"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => setLiked(!liked)}
            >
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </Flicking>
  );
}
