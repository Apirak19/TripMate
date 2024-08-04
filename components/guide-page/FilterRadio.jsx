"use client";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";

const filterRadio = () => {
  const [filterData, setFilterData] = useState({});

  const handleChange = (event, groupName) => {
    setFilterData((prev) => ({
      ...prev,
      [groupName]: event.target.value,
    }));
    console.log(filterData);
  };

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
    <aside className="md:sticky top-0 h-fit py-5 w-[24%]">
      <div className="p-4 bg-white rounded-lg">
        <h3 className="text-center text-lg font-semibold mb-2">Filter</h3>
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: "calc(100vh - 100px)",
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
                  value={filterData[group.name]}
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
      </div>
    </aside>
  );
};

export default filterRadio;
