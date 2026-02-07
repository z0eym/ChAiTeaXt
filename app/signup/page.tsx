"use client";
import Link from "next/link";
import React, { useState } from "react";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async () => {
      /* Check for: 
        - All Fields Filled Out
        - Passwords
          - If email already exists in database
          - Not Matching
          - Must Contain more than 6 characters, an uppercase letter, and number or special character */
      if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
      }
      if (!name || !email || !password || !confirmPassword) {
        alert("All fields are required");
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters");
        return;
      }
      if (!/[A-Z]/.test(password)) {
        alert("Password must contain at least one uppercase letter");
        return;
      }
      if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
        alert("Password must contain at least one number or special character");
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email");
        return;
      }
      if (name.trim() === "") {
        alert("Name cannot be empty");
        return;
      }

    try {
      const res = await fetch("http://localhost:8081/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        window.location.href = "/post-signup";
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
}
  return (
    <div className="min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat flex flex-col relative items-center justify-center">

      {/* Navigation Header */}
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
        <div className="flex items-center gap-20">
          <Link href="/" className="hover:text-[#ae97e7] cursor-pointer text-2xl">
            ChAi TeaXt
          </Link>

          <div className="flex gap-10 text-2xl">
            <Link href="/about" className="hover:text-[#ae97e7] cursor-pointer">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7] cursor-pointer">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7] cursor-pointer">Help</Link>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className='bg-black/70 bg-opacity-80 p-10 rounded-xl shadow-xl max-w-md w-full flex flex-col gap-6 mt-10 text-white'>
          <div className="header">
              <div className='text-4xl text-center mb-6'>Sign Up</div>
              <div className="underline"></div>
          </div>

          <div className="inputs">

          {/* Full Name Input */}
          <div className="input">Name
            <input type="text"
                  placeholder="Enter Your Name"
                  value={name}                 
                  onChange={(e) => setName(e.target.value)}  
                  className="mb-5 p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ae97e7] w-full"/>
              </div>

          {/* Email Input */}
          <div className="input">Email
              <input type="email"
                  placeholder="Enter Your Email"
                  value={email}                 
                  onChange={(e) => setEmail(e.target.value)}  
                  className="mb-5 p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ae97e7] w-full"/>
              </div>

          {/* Password Confirmation */}
          <div className="input">Password
              <input type="password"
                  placeholder="Enter Your Password"
                  value={password}                 
                  onChange={(e) => setPassword(e.target.value)}  
                  className="mb-5 p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ae97e7] w-full"/>
              </div>

          {/* Password Input */}
          <div className="input">Confirm Password
              <input type="password"
                  placeholder="Confirm Your Password"
                  value={confirmPassword}                 
                  onChange={(e) => setConfirmPassword(e.target.value)}  
                  className="mb-5 p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ae97e7] w-full"/>
              </div>
        </div>
      

      <div className="submit-container flex flex-col ">
        <button type="button" 
        onClick={handleSubmit} 
        className="cursor-pointer bg-[#ae97e7] py-3 rounded hover:bg-[#5e17eb] transition-colors">
          Sign Up</button>
        <div className="submit mt-5">Already Have an Account? 
          <Link href="/login" className="underline hover:text-[#ae97e7] ml-2">Click Here</Link>
        </div>
      </div>
      </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-black/70 text-zinc-200">
        <div className=" mx-auto flex flex-col justify-between items-center gap-6">
        <div className="flex gap-10 text-xl">
          <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
          <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
          <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
        </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-zinc-400 text-sm">
        &copy; {new Date().getFullYear()} ChAi TeaXt AI Help Desk System. All rights reserved.
        </div>
      </footer>
    
    </div>
  );
}

export default Signup;



































