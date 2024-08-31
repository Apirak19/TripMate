"use client";
import React, { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Snackbar from '@mui/material/Snackbar';

const TripOption = ({ attractionData, guideData, bookingData }) => {
  const today = dayjs(new Date());
  const tomorrow = today.add(1, "day");

  const [isOneDayTrip, setIsOneDayTrip] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(today);
  const [numberOfDay, setNumberOfDay] = useState(1);
  const [destination, setDestination] = useState(null);
  const [payable, setPayable] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false)
  const [clickable, setClickable] = useState(true)

  const handleBookNow = async () => {
    setClickable(false)
    // const bookingResponse = await fetch("/api/create-booking", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     isOneDayTrip,
    //     guide_id: guideData.guide_id,
    //     user_id: 1,
    //     startDate: startDate.toISOString(),
    //     endDate: endDate.toISOString(),
    //   }),
    // });

    // const bookingResponseData = await bookingResponse.json();
    // console.log("bookingResponseData", bookingResponseData);

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        checkoutTitle: `A ${numberOfDay}-Day Trip in ${destination} with ${guideData.guide_firstname} ${guideData.guide_lastname}`,
        guide_id: guideData.guide_id,
        total: guideData.guide_wage * numberOfDay,
        user_id: 1,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url; // Redirects to the Stripe checkout page
    } else {
      console.error("Failed to create checkout session");
      setErrorSnackbar(true)
    }
  };

  useEffect(() => {
    if (isOneDayTrip) {
      setNumberOfDay(1);
    } else {
      setNumberOfDay(endDate.diff(startDate, "day") + 1);
    }
    console.log(destination);
    console.log(bookingData);
  }, [startDate, endDate, destination]);

  useEffect(() => {
    console.log(numberOfDay * 2000);
  }, [numberOfDay]);

  useEffect(() => {
    if (isOneDayTrip !== null && destination !== null) {
      setPayable(true);
    }
  }, [isOneDayTrip, destination]);

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

  dayjs.extend(utc);
  dayjs.extend(timezone);

  let disabledDates = [];

  const getDisabledDate = (start, end) => {
    const dates = [];
    let currentDate = start;
    while (currentDate.isBefore(end) || currentDate.isSame(end, "day")) {
      dates.push(currentDate);
      currentDate = currentDate.add(1, "day");
    }
    return dates;
  };

  bookingData.forEach((booking) => {
    const startDate = dayjs(booking.booking_start_date).utc().startOf("day");
    const endDate = dayjs(booking.booking_end_date).utc().startOf("day");
    disabledDates = disabledDates.concat(getDisabledDate(startDate, endDate));
  });

  const shouldDisableDate = (date) => {
    const isPastDate = date.isBefore(dayjs().utc().startOf("day"));
    const isDisabledDate = disabledDates.some((disabledDate) =>
      date.isSame(disabledDate, "day")
    );
    return isPastDate || isDisabledDate;
  };
  useEffect(() => {
    // Function to check if a date is disabled
    const isDateDisabled = (date) => {
      return disabledDates.some((disabledDate) =>
        date.isSame(disabledDate, "day")
      );
    };

    // Function to find the next available date
    const findNextAvailableDate = (date) => {
      let nextDate = date;
      while (isDateDisabled(nextDate)) {
        nextDate = nextDate.add(1, "day");
      }
      return nextDate;
    };

    let initialStartDate = today;

    // Check if today's date is disabled and find the next available date if needed
    if (isDateDisabled(today)) {
      initialStartDate = findNextAvailableDate(today);
    }

    // Set start and end dates based on whether it's a one-day trip
    setStartDate(initialStartDate);
    setEndDate(
      isOneDayTrip ? initialStartDate : initialStartDate.add(1, "day")
    );

    console.log("Initial Start Date: ", initialStartDate.format("YYYY-MM-DD"));
    console.log(
      "Disabled Dates: ",
      disabledDates.map((date) => date.format("YYYY-MM-DD"))
    );
  }, [isOneDayTrip]);
  return (
    <section className="w-full flex gap-4">
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={6000}
        // onClose={handleClose}
        message="Note archived"
        // action={action}
      />
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
                  shouldDisableDate={shouldDisableDate}
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
                    shouldDisableDate={shouldDisableDate}
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
                    shouldDisableDate={shouldDisableDate}
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
          <h1 className="text-3xl font-bold">Booking Details</h1>
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

          {isOneDayTrip !== null && destination && (
            <div className="flex gap-4">
              <p className="text-xl font-semibold">Total:</p>
              <p className="text-xl">
                {guideData.guide_wage * numberOfDay}
                <span className="font-semibold"> THB.</span>
              </p>
            </div>
          )}

          <button
            className="bg-blue-400 text-white font-bold py-4 px-3 rounded-lg transform hover:scale-[101%] disabled:bg-slate-200 disabled:transform-none"
            disabled={!payable || !clickable}
            onClick={handleBookNow}
          >
            Book now
          </button>
        </div>
      </article>
    </section>
  );
};

export default TripOption;
