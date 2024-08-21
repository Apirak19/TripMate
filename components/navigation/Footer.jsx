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
    <section className="w-full bg-mainColor flex justify-center">
      <div className="w-full max-w-[1536px] flex justify-between border-2 p-6">
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
          <address>
            Lorem ipsum dolor sit amet.
              </address>
              <address>
            Lorem ipsum dolor sit amet.
              </address>
              <address>
            Lorem ipsum dolor sit amet.
          </address>
        </div>
        <div className="text-nowrap flex items-end text-white font-semibold">
          Copyright © 2024
        </div>
      </div>
    </section>
  );
};

export default Footer;
