import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const guideCard = ({ guideData }) => {
  return (
    <section className="flex flex-wrap gap-5 px-5 justify-center">
      {guideData.map((guide, index) => (
        <Card sx={{ maxWidth: 345 }} key={guide.guide_id}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={guide.guide_profile_picture}
              alt="green iguana"
            />
            <CardContent className="leading-4 flex flex-col gap-2">
              <div className="flex gap-4 items-center">
                <div
                  className="w-10 h-10 rounded-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
                  }}
                ></div>
                <div className="flex flex-col gap-1">
                  <h4 className="text-xl font-semibold leading-4">
                    {guide.guide_firstname} {guide.guide_lastname}{" "}
                    <span className="font-normal">({guide.guide_age})</span>
                  </h4>
                  <p className="text-sm leading-4">rating: 5</p>
                </div>
              </div>
              {/* <p>
                <span className="font-semibold">age:</span> {guide.guide_age}
              </p> */}
              <p>
                <span className="font-medium">Language: </span>
                {guide.guide_language.map((item) => (
                  <span className="pr-2">{item}</span>
                ))}
              </p>
              <p>
                <span className="font-medium">Working Area: </span>
                {guide.guide_preferred_region.map((item) => (
                  <span className="pr-2">{item}</span>
                ))}
              </p>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </section>
  );
};

export default guideCard;
