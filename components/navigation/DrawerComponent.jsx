"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const DrawerComponent = ({userDataFromServer}) => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const setUser = () => {
    localStorage.setItem("username", "aSetUsername");
  };

  const clearUser = () => {
    localStorage.removeItem("username");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    setUserData(userDataFromServer);
    const userFromLocal = localStorage.getItem("username");
  }, []);

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  const DrawerList = (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <div className="flex gap-4 w-full p-4">
        <div className="flex gap-4 items-center">
          <div className="w-[100px] h-[100px] bg-blue-400"></div>
          <h1>username</h1>
          <button onClick={setUser}>setuser</button>
          <button onClick={clearUser}>clearUser</button>
        </div>
        <button
          onClick={toggleDrawer(false)}
          className="absolute top-4 right-4"
        >
          <HighlightOffIcon
            sx={{
              color: "rgb(96 165 250)",
              fontSize: "30px",
            }}
          />
        </button>
      </div>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)} sx={{ color: "white" }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{ marginTop: "64px" }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default DrawerComponent;
