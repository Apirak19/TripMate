import React from 'react'
import RegisterForm from '@/components/register/RegisterForm'

const Register = () => {
  return (
    <main className="w-full bg-[#536ea4] flex justify-center items-center px-4 py-8"
    style={{ minHeight: "calc(100vh - 64px - 114px)" }}>
      <RegisterForm />
    </main>
  )
}

export default Register
