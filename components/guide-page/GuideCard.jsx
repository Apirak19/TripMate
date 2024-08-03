import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const guideCard = ({ guideData }) => {
  return (
    <section className="flex flex-wrap gap-5 justify-center ">
      {guideData.map((guide, index) => (
        <article
          className="w-full max-w-[375px] p-4 bg-white rounded-lg shadow-card-shadow flex flex-col gap-4 relative"
          key={guide.guide_id}
        >
          <div
            className="h-[62px] w-full absolute top-0 left-0"
            style={{
              backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
            }}
          ></div>
          <div className="leading-4 flex flex-col gap-2 z-10">
            <div className="flex flex-col gap-1">
              <div
                className="w-[72px] h-[72px] rounded-full bg-cover bg-center bg-no-repeat border-2 border-white mb-2"
                style={{
                  backgroundImage: `url("https://placehold.co/600x400?text=Hello+World")`,
                }}
              ></div>
              <div className="flex gap-1">
                <h4 className="text-xl font-semibold leading-4">
                  {guide.guide_firstname} {guide.guide_lastname}{" "}
                  <span className="font-normal">({guide.guide_age})</span>
                </h4>
                <p className="text-sm leading-4">rating: 5</p>
              </div>
            </div>
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
          </div>
          <button className="w-full p-2 border-2 border-blue-400 rounded-lg">
            Hire
          </button>
        </article>
      ))}
    </section>
  );
};

export default guideCard;
