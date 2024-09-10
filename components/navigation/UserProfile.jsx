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

const UserProfile = () => {
  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          gap: "15%",
        }}
      >
        <DarkModeButton />
        <Link href={"/login"}>
          <Button
            className="text-white hover:bg-white hover:text-blue-500  rounded-md text-nowrap w-[100px] p-0 py-1 mt-1"
            sx={{
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Log in
          </Button>
        </Link>
        <div className="w-10 h-10 bg-white"></div>
      </Box>

      <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" }, gap: "5%" }}>
        <DarkModeButton />
        <DrawerComponent userDataFromServer="nameFromServer" />
      </Box>
    </>
  );
};

export default UserProfile;
