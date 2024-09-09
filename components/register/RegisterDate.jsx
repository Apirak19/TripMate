"use client";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const RegisterDate = ({ formData, setFormData }) => {
  const shouldDisableDate = (date) => {
    const today = dayjs();
    const fifteenYearsAgo = today.subtract(15, "years");

    const isFutureDate = date.isAfter(today);
    const isFifteenYearsAgo = date.isBefore(fifteenYearsAgo);
    return isFutureDate || !isFifteenYearsAgo;
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={["DatePicker"]}
        sx={{ width: "100%", paddingTop: "0px" }}
      >
        <DatePicker
          onChange={(e) => {
            setFormData({ ...formData, ["dateOfBirth"]: e.toISOString() });
            console.log(formData);
          }}
          shouldDisableDate={shouldDisableDate}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            padding: "0px",
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default RegisterDate;
