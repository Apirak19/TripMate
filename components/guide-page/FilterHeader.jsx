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

const FilterHeader = () => {
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
    <aside className="top-0 h-fit md:hidden max-w-[600px]">
      <div className=" bg-white flex flex-col ">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              cursor: "pointer",
              backgroundColor: "#dbeafe",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
            }}
          >
            <h3 className="text-center text-lg font-semibold">Filter</h3>
          </AccordionSummary>
          <AccordionDetails>
            <div
              className="overflow-y-auto px-4 py-4 mr-4 flex flex-wrap gap-4 w-full justify-center"
              style={{
                maxHeight: "calc(100vh - 100px)",
              }}
            >
              {filterGroups.map((group, index) => (
                <div
                  key={group.name}
                  className="w-full max-w-[250px] flex items-center shadow-card-shadow rounded-lg"
                >
                  <h1 className="w-full max-w-[100px] bg-blue-100 px-4 h-full flex items-center rounded-l-lg">
                    {group.name}
                  </h1>
                  <FormControl sx={{ width: "100%" }}>
                    <Select
                      multiple
                      displayEmpty
                      labelId="simple-select-label"
                      id="simple-select"
                      value={filterData[group.name] || []}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <p className="text-black">{group.name}</p>;
                        }

                        return selected.join(", ");
                      }}
                      onChange={(event) => handleChange(event, group.name)}
                      sx={{
                        border: "none",
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>{group.name}</em>
                      </MenuItem>
                      {group.values.map((value, index) => (
                        <MenuItem key={value} value={value}>
                          <Checkbox
                            checked={
                              filterData[group.name]?.indexOf(value) > -1
                            }
                          />
                          <ListItemText primary={value} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ padding: "0px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              cursor: "pointer",
              backgroundColor: "#dbeafe",
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          >
            <h3 className="text-center text-lg font-semibold">Sort by</h3>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: "0px" }}>
            <div className="flex w-full flex-col items-center">
              <button
                className="shadow-card-shadow w-full py-2 hover:bg-slate-100 border-slate-400  border-t-[1px]"
                // onClick={sortByAge}
              >
                Age
              </button>
              <button className="shadow-card-shadow w-full py-2 hover:bg-slate-100 border-slate-400  border-t-[1px]">
                Trips
              </button>
              <button className="shadow-card-shadow w-full py-2 hover:bg-slate-100  border-slate-400  border-t-[1px]">
                Followers
              </button>
              <button className="w-full py-2 hover:bg-slate-100 border-slate-400  border-t-[1px]">
                <SortIcon />
              </button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </aside>
  );
};

export default FilterHeader;
