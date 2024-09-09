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
import Link from "next/link";
import UserProfile from "./UserProfile";

const pages = [
  {
    name: "Attractions",
    link: "/attractions",
  },
  {
    name: "Guides",
    link: "/guides",
  },
  {
    name: "Posts",
    link: "/posts",
  },
];

const NavigationBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      }}
      className="bg-mainColor shadow-card-shadow"
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <div className="flex items-center gap-8">
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

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "start",
                gap: "20px",
              }}
            >
              {pages.map((page, index) => (
                <Link href={page.link} key={index}>
                  <Button
                    sx={{
                      color: "white",
                      fontSize: "1rem",
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </div>

          <UserProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
