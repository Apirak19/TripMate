"use client";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const RegisterDate = ({ register, setValue, watch, clearErrors }) => {
  const shouldDisableDate = (date) => {
    const today = dayjs();
    const fifteenYearsAgo = today.subtract(15, "years");

    const isFutureDate = date.isAfter(today);
    const isFifteenYearsAgo = date.isBefore(fifteenYearsAgo);
    return isFutureDate || !isFifteenYearsAgo;
  };
  const selectedDate = watch("dateOfBirth");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} sx={{ width: "100%" }}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{ width: "100%", paddingTop: "0px" }}
      >
        <DatePicker
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={(date) => {
            setValue("dateOfBirth", date ? date.format("YYYY-MM-DD") : "");
            clearErrors("dateOfBirth");
          }}
          shouldDisableDate={shouldDisableDate}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "0px",
            width: "100%"
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default RegisterDate;
