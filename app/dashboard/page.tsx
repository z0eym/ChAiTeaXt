"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type User = {
  UserID: number;
  UserName: string;
  UserEmail: string;
};

// post login
export default function Dashboard() {
   const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
      const loggedInUser = (localStorage.getItem("user"));
      if (loggedInUser) {
        setUser(JSON.parse(loggedInUser));
      }
   }, []);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat"> 
    
    {/* Navigation Header */}
    <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
  
      {/* Nav Links */}
      <div className="flex items-center gap-20">
        <Link href="/" className="hover:text-[#ae97e7] font-bold text-2xl">ChAi TeaXt</Link> 

        <div className="flex gap-10 text-2xl">
          <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
          <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
          <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
        </div>
      </div>

      <div className="flex items-center">
        <Link href="/user-profile" className="text-2xl hover:text-[#ae97e7]">
        {user?.UserName}
        </Link> 
      </div>
    </nav> 

    {/* Dashboard */}
     <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center text-glow">
        {user && <h1 className="text-5xl mb-10">Hello, {user.UserName}!</h1>}
      
        <Link
          className="gap-4 mt-6 text-2xl text-white flex h-16 items-center justify-center rounded-full bg-black/70 transition-colors hover:bg-[#5e17eb] dark:hover:bg-[#ae97e7] md:w-[200px]"
          href="/components">Open AI Chat</Link>
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
