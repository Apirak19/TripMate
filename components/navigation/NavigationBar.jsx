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
      sx={{ boxShadow: "none", backgroundColor: "#031e54" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TripMate
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "start",
              paddingLeft: "7%",
              gap: "5%",
            }}
          >
            {pages.map((page) => (
              <Button key={page} sx={{ my: 2, color: "white" }}>
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: "15%" }}>
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
