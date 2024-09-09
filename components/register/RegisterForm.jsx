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
import ErrorIcon from "@mui/icons-material/Error";
import RegisterDate from "./RegisterDate";

const RegisterForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  // const [error, setError] = useState({});
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

  const register = async (e) => {
    e.preventDefault();

    // if (!formData.firstname) {
    //   setError("Please fullfill every fields");
    //   return;
    // }

    try {
      if (formData.password !== formData.repassword) {
        console.log("not matched");
        return;
      } else {
      }
      const result = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      // if (!result.ok) {
      //   throw new Error("Failed to register. Please try again.");
      // }

      const data = await result.json();
      console.log("data from register function", data);
    } catch (err) {
      console.error(err);
      setError("Email or password is not correct");
    }
  };

  useEffect(() => {
    const inputData = localStorage.getItem("formData");
    setFormData(JSON.parse(inputData));
    console.log("inputData", JSON.parse(inputData));
  }, []);

  return (
    <form
      className="w-full max-w-[450px] shadow-card-shadow rounded-lg"
      onSubmit={register}
    >
      <div className="bg-mainColor flex flex-col gap-2 px-8 py-5 pt-8 justify-center rounded-lg">
        <h1 className="text-center text-4xl text-white font-semibold mb-4">
          Register
        </h1>
        {/* Error message */}
        {/* {error && (
          <p className="text-red-800 font-bold flex items-center gap-2">
            {" "}
            <ErrorIcon /> {error}
          </p>
        )} */}
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
        <RegisterDate formData={formData} setFormData={setFormData} />

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
          className="bg-white text-blue-500 hover:text-blue-600 font-extrabold p-2 mt-8 rounded hover:bg-slate-200"
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
