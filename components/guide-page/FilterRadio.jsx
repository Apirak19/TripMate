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
      name: "region",
      values: ["Eastern", "Central", "Northern", "Southern", "Western"],
    },
    {
      name: "age",
      values: ["Middle", "Senior", "Young"],
    },
    {
      name: "gender",
      values: ["female", "male"],
    },
    {
      name: "rating",
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
    <aside className=" ">
      <div className="flex flex-col gap-2 p-4 bg-white rounded-lg">
        <h3 className="text-center text-lg font-semibold">Filter</h3>

        {radioGroups.map((group) => (
          <>
            <Divider />
            <FormControl key={group.name}>
              <FormLabel id={`controlled-radio-buttons-group-${group.name}`}>
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
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </>
        ))}
      </div>
    </aside>
  );
};

export default filterRadio;
