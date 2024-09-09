"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

const RegisterForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [error, setError] = useState(null); // For error handling
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    dateOfBirth: "",
    email: "",
    password: "",
    repassword: "",
  });

  const handleFormChange = (field, e) => {
    const updatedFormData = {
      ...formData,
      [field]: e.target.value,
    };
    setFormData(updatedFormData);
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  const login = async (e) => {
    e.preventDefault(); // Corrected method

    // Basic form validation
    if (!userEmail || !userPassword) {
      setError("Email and password are required.");
      return;
    }

    try {
      const result = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      if (!result.ok) {
        throw new Error("Failed to login. Please try again.");
      }

      const data = await result.json();
      console.log(data);
    } catch (err) {
      console.error(err);
      setError("Email or password is not correct");
    }
  };

  const shouldDisableDate = (date) => {
    const today = dayjs();
    const fifteenYearsAgo = today.subtract(15, "years");

    const isFutureDate = date.isAfter(today);
    const isFifteenYearsAgo = date.isBefore(fifteenYearsAgo);
    return isFutureDate || !isFifteenYearsAgo;
  };

  useEffect(() => {
    const inputData = localStorage.getItem("formData");
    setFormData(JSON.parse(inputData));
    console.log("inputData", JSON.parse(inputData));
  }, []);

  return (
    <form
      className="w-full max-w-[450px] shadow-card-shadow rounded-lg"
      onSubmit={login}
    >
      <div className="bg-mainColor flex flex-col gap-2 px-8 py-5 pt-8 justify-center rounded-lg">
        <h1 className="text-center text-4xl text-white font-semibold mb-4">
          Register
        </h1>
        {error && <p className="text-red-500">{error}</p>} {/* Error message */}
        <p className="text-white font-semibold">First name</p>
        <input
          type="text"
          placeholder="your first name"
          className="p-2 rounded"
          value={formData.firstname}
          onChange={(e) => {
            handleFormChange("firstname", e);
          }}
        />
        <p className="text-white font-semibold">Last name</p>
        <input
          type="text"
          placeholder="your last name"
          className="p-2 rounded"
          value={formData.lastname}
          onChange={(e) => {
            handleFormChange("lastname", e);
          }}
        />
        <p className="text-white font-semibold">Username</p>
        <input
          type="text"
          placeholder="username to be displayed "
          className="p-2 rounded"
          value={formData.username}
          onChange={(e) => {
            handleFormChange("username", e);
          }}
        />
        <p className="text-white font-semibold">Date of birth</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DatePicker"]}
            sx={{ width: "100%", paddingTop: "0px" }}
          >
            <DatePicker
              value={birthDate}
              onChange={(e) => {
                console.log("change date", e);
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
        <p className="text-white font-semibold">Email</p>
        <input
          type="email"
          placeholder="yourMail@email.com"
          className="p-2 rounded"
          value={formData.email}
          onChange={(e) => {
            handleFormChange("email", e);
          }}
        />
        <p className="text-white font-semibold">Password</p>
        <input
          type="password"
          placeholder="password must contain at least 8 characters"
          className="p-2 rounded"
          value={formData.password}
          onChange={(e) => {
            handleFormChange("password", e);
          }}
        />
        <p className="text-white font-semibold">Confirm password</p>
        <input
          type="password"
          placeholder="password must contain at least 8 characters"
          className="p-2 rounded"
          value={formData.repassword}
          onChange={(e) => {
            handleFormChange("repassword", e);
          }}
        />
        {/* end */}
        <button
          className="bg-white text-blue-500 font-extrabold p-2 mt-8 rounded hover:bg-slate-100"
          type="submit"
        >
          Login
        </button>
        <div className="flex flex-col justify-between mt-4 text-white">
          <Link
            href={"/forgotten"}
            className="font-semibold hover:text-slate-200"
          >
            Forgotten password
          </Link>
          <Link
            href={"/register"}
            className="font-semibold hover:text-slate-200"
          >
            Create an account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
