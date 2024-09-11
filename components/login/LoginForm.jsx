"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async (e) => {
    e.preventDefault();

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
      } else {
        // window.location.href = "/";
      }

      const data = await result.json();
      console.log(data);
    } catch (err) {
      console.error(err);
      setError("Email or password is not correct");
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const signInResponse = await signIn("credentials", {
      email: userEmail,
      password: userPassword,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/");
    } else {
      console.log("error", signInResponse);
      setError("Email or password is not correct");
    }
  };

  return (
    <form className="w-full max-w-[450px]" onSubmit={handleSignin}>
      <div className="bg-mainColor flex flex-col gap-2 p-10 justify-center rounded-lg">
        <h1 className="text-center text-2xl text-white font-semibold">
          Log in
        </h1>
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
        {error && <p className="text-red-800 font-extrabold">{error}</p>}{" "}
        {/* Error message */}
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
