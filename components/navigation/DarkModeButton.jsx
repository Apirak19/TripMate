"use client";
import React from "react";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import NightlightIcon from "@mui/icons-material/Nightlight";

const DarkModeButton = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <button onClick={()=>setDarkMode(!darkMode)}>
      {darkMode ? <NightlightIcon /> : <NightlightOutlinedIcon />}
    </button>
  );
};

export default DarkModeButton;
