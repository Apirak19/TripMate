import React from "react";
import LoginForm from "@/components/login/LoginForm";

const LoginPage = () => {
   const login = (userEmail, password) => {
     
   //  const result = await connectionPool.query(
   //    `SELECT * 
   //    FROM users 
   //    WHERE user_email = $1`,
   //    [userEmail]
   //  );
   //  console.log("result", result);
  };
  return (
    <main
      className="w-full bg-slate-400 flex justify-center items-center p-4"
      style={{ height: "calc(100vh - 64px - 162px)" }}
    >
      <LoginForm/>
    </main>
  );
};

export default LoginPage;
