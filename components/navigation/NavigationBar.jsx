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

const NavigationBar = () => {
  return (
    <AppBar
      position="static"
      sx={{ boxShadow: "none" }}
      className="bg-mainColor"
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
              {pages.map((page) => (
                <Button
                  key={page}
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </div>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "15%",
            }}
          >
            <DarkModeButton />
            <Button className="text-white hover:bg-white hover:text-blue-500  rounded-md px-3 text-nowrap">
              Log in
            </Button>
          </Box>

          <Box
            sx={{ flexGrow: 0, display: { xs: "flex", md: "none" }, gap: "5%" }}
          >
            <DarkModeButton />
            <DrawerComponent />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
