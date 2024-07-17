"use client";
import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerComponent from "./DrawerComponent";

const pages = ["Products", "Pricing", "Blog"];

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ boxShadow: "none", backgroundColor: "#5a8ad6" }}>
      <Container maxWidth="xl" >
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
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ThaiGuide
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton sx={{ p: 0 }}>
              <DrawerComponent />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
