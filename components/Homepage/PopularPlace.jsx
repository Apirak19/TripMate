import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import supabase from "@/utils/supabase/supabaseClient";

const PopularPlace = async () => {
  const { data: attractions, error } = await supabase.rpc(
    "get_attraction_counts"
  );
  if (error) {
    console.error("Error:", error);
  } else {
    // console.log("Attraction trip counts:", attractions);
  }
  const attractionsData = [
    {
      id: 1,
      name: "Phuket",
      region: "Southern Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 1000,
    },
    {
      id: 2,
      name: "Chiang Mai",
      region: "Northern Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 800,
    },
    {
      id: 3,
      name: "Bangkok",
      region: "Central Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 1500,
    },
    {
      id: 4,
      name: "Pattaya",
      region: "Eastern Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 600,
    },
    {
      id: 5,
      name: "Krabi",
      region: "Southern Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 900,
    },
    {
      id: 6,
      name: "Ayutthaya",
      region: "Central Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 400,
    },
    {
      id: 7,
      name: "Hua Hin",
      region: "Central Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 700,
    },
    {
      id: 8,
      name: "Koh Samui",
      region: "Southern Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 1200,
    },
    {
      id: 9,
      name: "Phang Nga",
      region: "Southern Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 300,
    },
    {
      id: 10,
      name: "Koh Phi Phi",
      region: "Southern Thailand",
      image: "https://via.placeholder.com/300",
      totalVisit: 500,
    },
  ];

  // Render the tourist attractions
  const renderTouristAttractions = () => {
    return attractionsData.map((attraction) => (
      <Card key={attraction.id} className="flex-shrink-0 mb-4">
        <CardMedia
          component="img"
          height="140"
          image={attraction.image}
          alt={attraction.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {attraction.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {attraction.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Visits: {attraction.totalVisit}
          </Typography>
        </CardContent>
      </Card>
    ));
  };

  return (
    <section className="w-full max-w-[950px] bg-white rounded-lg flex flex-col gap-4 mt-2 py-4 px-6">
      <div className="flex justify-between">
        <h2 className="text-3xl flex items-center">Popular Destinations</h2>
        <a href="/attractions" className="leading-1"> 
          see all
        </a>
      </div>
      <div className="w-full flex gap-4 overflow-x-auto">
        {renderTouristAttractions()}
      </div>
    </section>
  );
};

export default PopularPlace;
