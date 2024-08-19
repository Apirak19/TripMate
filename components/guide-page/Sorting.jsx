"use client";
import React, { useState, useContext, useEffect } from "react";
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
import { GuideFilterContext } from "@/contexts/guideFilter";

const Sorting = () => {
  const { filteredData, updateFilteredData, filterOptions, setFilterOptions } =
    useContext(GuideFilterContext);
  const [sortOptions, setSortOptions] = useState({
    Sort: "Rating",
    Desc: true,
  });
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    console.log("sortOptions: ", sortOptions);
    console.log("filterOptions: ", filterOptions);
  }, [sortOptions, filterOptions]);

  const getSortedData = async () => {
    try {
    } catch {}
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

  const handleSort = async (sortType) => {
    let updatedSortOptions;

    if (sortType === "Switch") {
      updatedSortOptions = { ...sortOptions, Desc: !sortOptions.Desc };
      setSortOptions(updatedSortOptions);
    } else {
      updatedSortOptions = { ...sortOptions, Sort: sortType };
      setSortOptions(updatedSortOptions);
    }
    try {
      fetch("/api/guides", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "filter",
          values: filterOptions,
          sort: updatedSortOptions,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data: ", data);
          updateFilteredData(data);
        });
    } catch (error) {
      console.log("error sort");
    }
  };

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
          className={`border-r-[1px] w-1/2  ${
            sortOptions["Sort"] === "Rating"
              ? "bg-blue-200 "
              : "hover:bg-blue-200"
          } `}
          // onClick={sortByAge}
          value="Rating"
          onClick={(e) => {
            handleSort(e.target.value);
          }}
          disabled={sortOptions["Sort"] === "Rating"}
        >
          Rating
        </button>
        <button
          className={`border-r-[1px] w-1/2  ${
            sortOptions["Sort"] === "Trips"
              ? "bg-blue-200 "
              : "hover:bg-blue-200"
          } `}
          // onClick={sortByAge}
          value="Trips"
          onClick={(e) => {
            handleSort(e.target.value);
          }}
          disabled={sortOptions["Sort"] === "Trips"}
        >
          Trips
        </button>
        <button
          className={`border-r-[1px] w-1/2  ${
            sortOptions["Sort"] === "Followers"
              ? "bg-blue-200 "
              : "hover:bg-blue-200"
          } `}
          // onClick={sortByAge}
          value="Followers"
          onClick={(e) => {
            handleSort(e.target.value);
          }}
          disabled={sortOptions["Sort"] === "Followers"}
        >
          Followers
        </button>
        <button
          className={` px-2 transform transition-transform duration-300 `}
          style={{
            transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
          }}
          value="Switch"
          onClick={() => {
            setIsFlipped((prev) => !prev);
            handleSort("Switch");
          }}
        >
          <SortIcon />
        </button>
      </div>
    </div>
  );
};

export default Sorting;
