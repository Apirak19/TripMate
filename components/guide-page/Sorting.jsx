"use client";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import SortIcon from "@mui/icons-material/Sort";

const Sorting = () => {
  const [filterData, setFilterData] = useState({});

  const handleChange = (event, groupName) => {
    setFilterData((prev) => ({
      ...prev,
      [groupName]: event.target.value,
    }));
    console.log(filterData);
  };

  const filterGroups = [
    {
      name: "Region",
      values: ["Eastern", "Central", "Northern", "Southern", "Western"],
    },
    {
      name: "Age",
      values: ["Middle", "Senior", "Young"],
    },
    {
      name: "Gender",
      values: ["female", "male"],
    },
    {
      name: "Rating",
      values: ["average", "excellent", "good"],
    },
    {
      name: "Language",
      values: [
        "Arabic",
        "Chinese",
        "English",
        "French",
        "German",
        "Italian",
        "Japanese",
        "Korean",
        "Spanish",
      ],
    },
  ];
  return (
    <div className="hidden md:flex justify-center w-full max-w-[400px] shadow-card-shadow rounded-lg ">
      <label
        htmlFor="sortby"
        className="font-semibold rounded-l-lg py-2 text-center w-1/3 bg-blue-100"
      >
        Sort by
      </label>
      <div className="flex w-full">
        <button
          className="border-r-[1px] w-1/2"
          // onClick={sortByAge}
        >
          Age
        </button>
        <button className="border-r-[1px] w-1/2">Trips</button>
        <button className="border-r-[1px] w-1/2">Followers</button>
        <button className=" px-2">
          <SortIcon />
        </button>
      </div>
    </div>
  );
};

export default Sorting;
