"use client";
import React, {useState} from 'react'
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

const PostCard = ({ trip }) => {
   const [liked, setLiked] = useState(false);
  return (
   <Card
   sx={{
     width: "100%",
           paddingBottom: "1rem",
     borderRadius: "12px",
   }}
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
  )
}

export default PostCard
