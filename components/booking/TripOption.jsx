"use client";
import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const TripOption = ({ attractionData, guideData }) => {
  const today = dayjs(new Date());
  const tomorrow = today.add(1, "day");

  const [isOneDayTrip, setIsOneDayTrip] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(today);
  const [numberOfDay, setNumberOfDay] = useState(1);
  const [destination, setDestination] = useState(null);
  useEffect(() => {
    if (isOneDayTrip) {
      setNumberOfDay(1);
    } else {
      setNumberOfDay(endDate.diff(startDate, "day") + 1);
    }
    console.log(destination);
  }, [startDate, endDate, destination]);

  useEffect(() => {
    if (isOneDayTrip) {
      setStartDate(today);
      setEndDate(today);
    } else {
      setStartDate(today);
      setEndDate(tomorrow);
    }
  }, [isOneDayTrip]);

  useEffect(() => {
    console.log(numberOfDay * 2000);
  }, [numberOfDay]);

  const handleDestinationSelect = (e) => {
    setDestination(e.target.value);
  };

  const handleDaySelect = (e) => {
    if (e.target.value === "One day trip") {
      setIsOneDayTrip(true);
    } else if (e.target.value === "Multiple day trip") {
      setIsOneDayTrip(false);
    }
  };
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
            defaultValue={"-- attraction --"}
            onChange={handleDestinationSelect}
          >
            <option className="text-slate-500" disabled>
              -- attraction --
            </option>
            {attractionData.map((item, index) => (
              <option value={item.attraction_name} key={index}>
                {item.attraction_name}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full flex gap-4 items-center">
          <label className="w-full font-semibold text-lg">
            Select travel duration:
          </label>
          <select
            name="duration"
            id=""
            className="w-full border-2 rounded-md px-2 py-2 "
            onChange={handleDaySelect}
            defaultValue={"-- duration --"}
          >
            <option className="text-slate-500" disabled>
              -- duration --
            </option>
            <option>One day trip</option>
            <option>Multiple day trip</option>
          </select>
        </div>

        {/* select number of days */}
        {isOneDayTrip === null ? (
          ""
        ) : isOneDayTrip ? (
          <div className="w-full flex gap-4 items-center">
            <label className="w-full font-semibold text-lg">
              Select Trip Date:
            </label>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]} sx={{ width: "100%" }}>
                <DatePicker
                  value={startDate}
                  onChange={(e) => {
                    console.log("change date", e);
                    setStartDate(e);
                    setEndDate(e);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        ) : (
          <>
            <div className="w-full flex gap-4 items-center">
              <label className="w-full font-semibold text-lg">
                Select first date:
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: "100%" }}
                >
                  <DatePicker
                    value={startDate}
                    onChange={(e) => {
                      console.log("change date", e);
                      setStartDate(e);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="w-full flex gap-4 items-center">
              <label className="w-full font-semibold text-lg">
                Select last date:
              </label>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ width: "100%" }}
                >
                  <DatePicker
                    value={endDate}
                    onChange={(e) => {
                      console.log("change date", e);
                      setEndDate(e);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </>
        )}
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

          {isOneDayTrip !== null && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Duration: </p>
              <p className="text-xl">
                {numberOfDay}
                {numberOfDay === 1 ? (
                  <span className="font-semibold"> day</span>
                ) : (
                  <span className="font-semibold"> days</span>
                )}
              </p>
            </div>
          )}

          {isOneDayTrip && destination && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-xl">
                {guideData.guide_wage * numberOfDay}
                <span className="font-semibold"> THB.</span>
              </p>
            </div>
          )}

          <button className="bg-blue-400 text-white font-bold py-4 px-3 rounded-lg transform hover:scale-[101%]">Book now</button>
        </div>
      </article>
    </section>
  );
};

export default TripOption;
