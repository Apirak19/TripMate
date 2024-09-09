import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import DrawerComponent from "./DrawerComponent";
import DarkModeButton from "./DarkModeButton";

const pages = ["Products", "Pricing", "Blog"];

const Footer = () => {
  return (
    <section className="w-full bg-mainColor flex justify-center shadow-card-shadow">
      <div className="w-full max-w-[1536px] flex flex-col md:flex-row gap-8 justify-between py-4 px-6">
        <div className="w-full max-w-[500px] flex flex-col text-white">
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
              textOverflow: "initial",
            }}
          >
            TripMate
          </Typography>
          <p>Explore Thailand with Local Experts</p>
        </div>
        <div className="text-nowrap flex items-end text-white font-semibold">
          Copyright © 2024
        </div>
      </div>
    </section>
  );
};

export default Footer;
