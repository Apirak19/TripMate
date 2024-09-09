"use client";
import React, { useState } from "react";
import Link from "next/link";

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null); // For error handling

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

  return (
    <form className="w-full max-w-[450px]" onSubmit={login}>
      <div className="bg-mainColor flex flex-col gap-2 p-10 justify-center rounded-lg">
        <h1 className="text-center text-2xl text-white font-semibold">
          Log in
        </h1>
        {error && <p className="text-red-500">{error}</p>} {/* Error message */}
        <p className="text-white font-semibold">Email</p>
        <input
          type="email"
          placeholder="yourMail@email.com"
          className="p-2 rounded"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <p className="text-white font-semibold">Password</p>
        <input
          type="password"
          placeholder="*****"
          className="p-2 rounded"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button
          className="bg-white text-blue-400 font-semibold p-2 mt-2 rounded hover:bg-slate-50"
          type="submit"
        >
          Login
        </button>
        <div className="flex justify-between mt-2 text-white">
          <Link href={"/forgotten"}>Forgotten password</Link>
          <Link href={"/register"}>Create an account</Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
