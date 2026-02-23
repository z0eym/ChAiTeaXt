"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  UserID: number;
  UserName: string;
  UserEmail: string;
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [previousChats, setPreviousChats] = useState<any[]>([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      fetch(`http://localhost:8081/api/tickets/user/${parsedUser.UserID}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setPreviousChats(data.tickets);
        });
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
        <Link href="/dashboard" className="hover:text-[#ae97e7] font-bold text-2xl">ChAi TeaXt</Link> 

        <div className="flex gap-10 text-2xl">
          <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
          <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
          <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">
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
      </div>
    </nav> 

    {/* Dashboard Content */}
    <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
      <h1 className="text-5xl mb-4 text-glow">Welcome back, {user?.UserName}!</h1>
      
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
        <button
          onClick={startNewChat} // !!!!! changed
          className="cursor-pointer text-xl flex h-14 items-center justify-center rounded-xl bg-black/50 transition-colors hover:bg-black/70 p-4 w-full">
          Start New Chat
        </button>
        <div className="flex flex-col items-center gap-4 w-full max-w-2xl">
          <Link
            href="/chat-history"
            className="cursor-pointer text-xl flex h-14 items-center justify-center rounded-xl bg-black/50 transition-colors hover:bg-black/70 p-4 w-full">
            View Chat History
          </Link>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="w-full py-8 px-6 bg-black/70 text-zinc-200 mt-12">
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