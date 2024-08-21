"use client";
import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const TripOption = ({ attractionData, guideData }) => {
  return (
    <section className="w-full flex gap-4">
      {/* booking form */}
      <article className="w-full p-4 bg-white rounded-lg flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Trip options</h1>
        <div className="w-full flex gap-4 items-center">
          <label className="w-full font-semibold text-lg">
            Select your destination:{" "}
          </label>
          <select
            name="destination"
            id=""
            className="w-full border-2 rounded-md px-2 py-2 "
          >
            <option value="" className="text-slate-500" disabled selected>
              -- attraction --
            </option>
            {attractionData.map((item, index) => (
              <option value={item.attraction_id}>{item.attraction_name}</option>
            ))}
          </select>
        </div>

        <div className="w-full flex gap-4 items-center">
          <label className="w-full font-semibold text-lg">
            Select travel duration:
          </label>
          <select
            name="destination"
            id=""
            className="w-full border-2 rounded-md px-2 py-2 "
          >
            <option value="" className="text-slate-500" disabled selected>
              -- duration --
            </option>
            <option value="one-day-trip">One day trip</option>
            <option value="multiple-day-trip">Multiple day trip</option>
          </select>
        </div>

        <div className="w-full flex gap-4 items-center">
          <label className="w-full font-semibold text-lg">
            Select first date:
          </label>

          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
              <DatePicker />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="w-full flex gap-4 items-center">
          <label className="w-full font-semibold text-lg">
            Select last date:
          </label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
              <DatePicker />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </article>

      {/* all cost */}
      <article className="flex flex-col w-full">
        <div className="w-full p-4 bg-white rounded-lg flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Booking details</h1>
          <div className="flex gap-4">
            <p className="text-xl font-semibold">Guide fee:</p>
            <p className="text-xl">
              {guideData.guide_wage}
              <span className="font-semibold"> THB.</span>
            </p>
          </div>

          <div className="flex gap-4">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-xl">
              {guideData.guide_wage}
              <span className="font-semibold"> THB.</span>
            </p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default TripOption;
