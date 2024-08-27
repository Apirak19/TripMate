"use client";
import React, { useState, useEffect, useContext } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import { GuideFilterContext } from "@/contexts/guideFilter";

const FilterRadio = () => {
  const {
    filterData,
    updateFilteredData,
    getFilteredData,
    filterOptions,
    setFilterOptions,
    setLoading,
  } = useContext(GuideFilterContext);
  const numberOfKeys = Object.keys(filterOptions).length;

  const resetOptions = () => {
    setFilterOptions({});
  };

  const handleChange = (event, groupName) => {
    const selectedValue = event.target.value;

    setFilterOptions((prevState) => ({
      ...prevState,
      [groupName]: selectedValue, // Update the state with the new value for the group
    }));
  };

  const handleSearch = () => {
    setLoading(true);
    fetch("/api/guides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "filter",
        values: filterOptions,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        updateFilteredData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    // console.log("filterOptions", filterOptions);
    // console.log("numbers", numberOfKeys);
  }, [filterOptions]);

  const radioGroups = [
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
      values: ["Female", "Male"],
    },
    {
      name: "Rating",
      values: ["Average", "Good", "Excellent"],
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
    <aside className="md:sticky md:block hidden top-0 h-fit py-5 w-full max-w-[275px]">
      <div className=" bg-white rounded-lg shadow-card-shadow">
        <article
          className={`flex items-center text-center  bg-blue-100 py-4 px-7 rounded-t-lg ${
            numberOfKeys === 0 ? "justify-center" : "justify-between"
          }`}
        >
          <h4 className="text-lg font-semibold">Filter</h4>
          {numberOfKeys > 0 && (
            <h4
              className="text-sm hover:text-blue-400 cursor-pointer"
              onClick={resetOptions}
            >
              reset
            </h4>
          )}
        </article>
        <div
          className="overflow-y-auto px-4"
          style={{
            maxHeight: "calc(100vh - 200px)",
          }}
        >
          {radioGroups.map((group, index) => (
            <div
              key={group.name}
              style={{
                borderBottom:
                  index === radioGroups.length - 1 ? "none" : "1px solid black",
                padding: "12px 0",
              }}
            >
              <FormControl sx={{}}>
                <FormLabel
                  id={`controlled-radio-buttons-group-${group.name}`}
                  sx={{ fontWeight: 600, color: "#000", marginBottom: "12px" }}
                >
                  {group.name}
                </FormLabel>

                <RadioGroup
                  aria-labelledby={`controlled-radio-buttons-group-${group.name}`}
                  name={`controlled-radio-buttons-group-${group.name}`}
                  value={filterOptions[group.name] || ""}
                  onChange={(event) => handleChange(event, group.name)}
                >
                  {group.values.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio size="small" />}
                      label={option}
                      sx={{ color: "#656c6f" }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          ))}
        </div>
        <div className="w-full ">
          <button
            className="w-full text-center text-lg font-semibold py-4 bg-slate-50 rounded-b-lg"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterRadio;
