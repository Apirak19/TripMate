"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import RegisterDate from "./RegisterDate";
import { debounce } from "lodash";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs";
import { redirect } from "next/navigation";

const RegisterForm = () => {
  const [shouldRemove, setShouldRemove] = useState(false);
  let initialData;
  if (typeof window !== "undefined" && localStorage.getItem("registerData")) {
    initialData = JSON.parse(localStorage.getItem("registerData")) || {
      firstname: "",
      lastname: "",
      username: "",
      dateOfBirth: "",
      email: "",
      password: "",
      repassword: "",
    };
  }

  const checkIsUnique = async (field, value) => {
    const result = await fetch("/api/register-check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        check: field,
        input: value,
      }),
    });
    const isUnique = await result.json();
    console.log("result", isUnique);
    return isUnique;
  };
  const debouncedCheckIsUnique = debounce(checkIsUnique, 500);

  const checkPassword = (value) => {
    return formValues.password === value;
  };

  const registerSchema = z.object({
    firstname: z
      .string()
      .min(2, { message: "Firstname must be at least 2 characters" }),
    lastname: z
      .string()
      .min(2, { message: "Lastname must be at least 2 characters" }),
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .refine(
        async (username) => {
          const exists = await checkIsUnique("username", username);
          return !exists;
        },
        {
          message: "This username has already been used",
        }
      ),
    dateOfBirth: z
      .string()
      .min(1, { message: "Date of birth is required" })
      .refine(
        (value) => {
          const date = dayjs(value);
          const today = dayjs();
          const fifteenYearsAgo = today.subtract(15, "years");
          return date.isBefore(fifteenYearsAgo);
        },
        { message: "You must be at least 15 years old" }
      ),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .refine(
        async (email) => {
          const exists = await checkIsUnique("email", email);
          return !exists;
        },
        {
          message: "This email has already been registered",
        }
      ),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .refine((value) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((value) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one digit",
      }),
    repassword: z.string().refine((value) => checkPassword(value), {
      message: "Passwords do not match",
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: initialData,
  });

  const formValues = watch();

  useEffect(() => {
    if (!shouldRemove) {
      console.log("watched effect: ", formValues);
      console.log("should remove", shouldRemove);
      localStorage.setItem("registerData", JSON.stringify(formValues));
    }
  }, [formValues, shouldRemove]);

  const registerNow = async (formData) => {
    try {
      const result = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await result.json();
      console.log("data from register function", data);
      setShouldRemove(true);
      localStorage.removeItem("registerData");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    console.log("form data: ", data);
    await registerNow(data);
  };

  return (
    <form
      className="w-full max-w-[450px] shadow-card-shadow rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="bg-mainColor flex flex-col gap-2 px-5 py-8 md:px-8  justify-center rounded-lg">
        <h1 className="text-center text-4xl text-white font-semibold mb-4">
          Register
        </h1>

        <p className="text-white font-semibold">First name</p>
        <input
          type="text"
          placeholder="your first name"
          className="p-2 rounded"
          {...register("firstname")}
        />
        {errors.firstname && (
          <div className="flex gap-2 text-red-900 font-extrabold">
            <ErrorIcon />
            <p className="">{errors.firstname.message}</p>
          </div>
        )}

        <p className="text-white font-semibold">Last name</p>
        <input
          type="text"
          placeholder="your last name"
          className="p-2 rounded"
          {...register("lastname")}
        />
        {errors.lastname && (
          <div className="flex gap-2 text-red-900 font-extrabold">
            <ErrorIcon />
            <p className="">{errors.lastname.message}</p>
          </div>
        )}

        <p className="text-white font-semibold">Username</p>
        <input
          type="text"
          placeholder="username to be displayed "
          className="p-2 rounded"
          {...register("username")}
        />
        {errors.username && (
          <div className="flex gap-2 text-red-900 font-extrabold">
            <ErrorIcon />
            <p className="">{errors.username.message}</p>
          </div>
        )}

        <p className="text-white font-semibold">Date of birth</p>
        <RegisterDate
          register={register}
          setValue={setValue}
          watch={watch}
          setError={setError}
          clearErrors={clearErrors}
        />
        {errors.dateOfBirth && (
          <div className="flex gap-2 text-red-900 font-extrabold">
            <ErrorIcon />
            <p className="">{errors.dateOfBirth.message}</p>
          </div>
        )}

        <p className="text-white font-semibold">Email</p>
        <input
          type="email"
          placeholder="yourMail@email.com"
          className="p-2 rounded"
          {...register("email")}
        />
        {errors.email && (
          <div className="flex gap-2 text-red-900 font-extrabold">
            <ErrorIcon />
            <p className="">{errors.email.message}</p>
          </div>
        )}

        <p className="text-white font-semibold">Password</p>
        <input
          type="password"
          placeholder="At least 8 characters including A-Z, a-z, and 0-9"
          className="p-2 rounded"
          {...register("password")}
        />
        {errors.password && (
          <div className="flex gap-2 text-red-900 font-extrabold">
            <ErrorIcon />
            <p className="">{errors.password.message}</p>
          </div>
        )}

        <p className="text-white font-semibold">Confirm password</p>
        <input
          type="password"
          placeholder="At least 8 characters including A-Z, a-z, and 0-9"
          className="p-2 rounded"
          {...register("repassword")}
        />
        {errors.repassword && (
          <div className="flex gap-2 text-red-900 font-extrabold">
            <ErrorIcon />
            <p className="">{errors.repassword.message}</p>
          </div>
        )}

        {/* button */}
        <button
          className="bg-white text-blue-500 hover:text-blue-600 font-extrabold p-2 mt-8 rounded hover:bg-slate-200"
          type="submit"
        >
          Register
        </button>

        
      </div>
    </form>
  );
};

export default RegisterForm;
