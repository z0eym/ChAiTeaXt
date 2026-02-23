"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

type User = {
  UserID: number;
  UserName: string;
  UserEmail: string;
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [previousChats, setPreviousChats] = useState<any[]>([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      router.push("/");
    }
  }, [router]);

  const startNewChat = () => {
    const ticketId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const chatSession = {
      ticketId,
      startedAt: new Date().toISOString(),
      userId: user?.UserID,
      userName: user?.UserName,
      userEmail: user?.UserEmail,
      isLoggedInUser: true
    };
    
    localStorage.setItem('chatSession', JSON.stringify(chatSession));
    router.push(`/chat/${ticketId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("chatSession");
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat">

      {/* Navigation Header */}
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
        <div className="flex items-center gap-20">
          <Link 
            href={user ? "/dashboard" : "/"} 
            className="hover:text-[#ae97e7] font-bold text-2xl">
            ChAi TeaXt
          </Link>

          <div className="flex gap-10 text-2xl">
            <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link 
                href="/user-profile" 
                className="text-2xl text-zinc-300 hover:text-[#ae97e7]">
                {user?.UserName}
              </Link>
              <button 
                onClick={handleLogout}
                className="cursor-pointer text-lg bg-red-400 hover:bg-red-700  px-4 py-2 rounded-full transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-2xl bg-[#ae97e7] hover:bg-[#5e17eb] px-4 py-2 rounded-full transition-colors">Log In</Link>
                <Link href="/signup" className="text-2xl bg-[#ae97e7] hover:bg-[#5e17eb] px-4 py-2 rounded-full transition-colors">Sign Up</Link>
              </div>
            </>
          )}
        </div>
      </nav> 

    {/* Front Page Title */}
    <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center text-glow mt-40">
      <h1 className="font-fredoka mb-14 text-5xl font-semibold leading-tight dark:text-zinc-50 tracking-[10px]"> Try Out </h1>
      <h1 className="font-fredoka text-8xl font-bold leading-tight mb-10"> ChAi TeaXt </h1>
      <h1 className="font-fredoka text-5xl font-bold leading-tight mt-6 tracking-[10px]"> For All Your Technical </h1>
      <h1 className="font-fredoka text-5xl font-bold leading-tight tracking-[10px]"> Support  Needs </h1>

      {/* Start Now Button - Guest Access */}
      <a
        href="/signup"
        className="cursor-pointer gap-4 mt-6 text-2xl text-white flex h-16 items-center justify-center rounded-full bg-black/70 transition-colors hover:bg-[#5e17eb] dark:hover:bg-[#ae97e7] md:w-[158px]"> 
        Start Now
      </a>
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