import React from "react";
import Link from "next/link";

const LoginSignup = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat relative">

      {/* Navigation Header */}
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black px-10 py-4 rounded-full text-zinc-200 shadow-xl">
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
      
      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className='bg-black bg-opacity-80 p-10 rounded-xl shadow-xl max-w-md w-full flex flex-col gap-6 mt-28 text-white'>
          <div className="header">
              <div className='text-4xl text-center mb-6'>Login</div>
              <div className="underline"></div>
          </div>

            <div className="inputs">
                <div className="input">
                    <input type="text" />
                </div>

            {/* Email Input */}
            <div className="input">Email
                <input type="email" placeholder="Enter Your Email" className="mb-5 p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ae97e7] w-full"/>
            </div>

                  {/* Password Input */}
                  <div className="input">Password
                      <input type="password" placeholder="Enter Your Password" className="mb-5 p-3 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#ae97e7] w-full"/>
                  </div>
            </div>

          <div className="submit-container flex flex-col ">
              <button
          type="submit"
          className="cursor-pointer bg-[#ae97e7] py-3 rounded hover:bg-[#5e17eb] transition-colors">Login</button>
              <div className="submit mt-5">Don't Have an Account? 
                <Link href="/signup" className="underline hover:text-[#ae97e7] ml-2">Click Here</Link></div>
          </div>
        </div>
      </div>
      {/* Footer */}
    <footer className="mt-auto w-full py-8 px-6 bg-black/70 text-zinc-200">
      <div className=" mx-auto flex flex-col justify-between items-center gap-6">
        <div className="flex gap-10 text-xl">
          <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
          <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
          <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-zinc-400 text-sm">
        &copy; {new Date().getFullYear()} ChAi TeaXt. All rights reserved.
      </div>
    </footer>
    </div>
  );
}

export default LoginSignup;
