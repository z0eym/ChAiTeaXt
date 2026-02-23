"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
  UserID: number;
  UserName: string;
  UserEmail: string;
};

export default function developers() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [previousChats, setPreviousChats] = useState<any[]>([]);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      router.push("/developers");
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
            <Link href="/developers" className="hover:text-[#ae97e7] text-[#ae97e7]">Developers</Link>
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


      {/* Developers */}
      <div className="flex-1 flex flex-col items-center pt-32 px-6 pb-12 text-center mt-10">
        <h1 className="text-5xl text-white mb-20 text-glow">Meet the Developers</h1>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="cursor-pointer bg-black/60 rounded-2xl p-6 border border-[#ae97e7]/20 hover:border-[#ae97e7]/50 transition-all hover:scale-[1.02]">
            <h3 className="text-2xl text-white mb-2">Diana Zagorenko</h3>
            <p className="text-zinc-300 mb-4">Senior Year of UWT's IT Bachelors Program</p>
            <Link href="/diana" className="text-[#ae97e7] hover:text-[#9c86e0] underline">View Portfolio</Link>
          </div>

          <div className="cursor-pointer bg-black/60 rounded-2xl p-6 border border-[#ae97e7]/20 hover:border-[#ae97e7]/50 transition-all hover:scale-[1.02]">
            <h3 className="text-2xl text-white mb-2">Errol Luna</h3>
            <p className="text-zinc-300 mb-4">Senior Year of UWT's IT Bachelors Program</p>
            <Link href="/errol" className="text-[#ae97e7] hover:text-[#9c86e0] underline">View Portfolio</Link>
          </div>

          <div className="cursor-pointer bg-black/60 rounded-2xl p-6 border border-[#ae97e7]/20 hover:border-[#ae97e7]/50 transition-all hover:scale-[1.02]">
            <h3 className="text-2xl text-white mb-2">Renee Reyes</h3>
            <p className="text-zinc-300 mb-4">Senior Year of UWT's IT Bachelors Program</p>
            <Link href="/renee" className="text-[#ae97e7] hover:text-[#9c86e0] underline">View Portfolio</Link>
          </div>

          <div className="cursor-pointer bg-black/60 rounded-2xl p-6 border border-[#ae97e7]/20 hover:border-[#ae97e7]/50 transition-all hover:scale-[1.02]">
            <h3 className="text-2xl text-white mb-2">Russell Kim</h3>
            <p className="text-zinc-300 mb-4">Senior Year of UWT's IT Bachelors Program</p>
            <Link href="/russell" className="text-[#ae97e7] hover:text-[#9c86e0] underline">View Portfolio</Link>
          </div>

          <div className="cursor-pointer bg-black/60 rounded-2xl p-6 border border-[#ae97e7]/20 hover:border-[#ae97e7]/50 transition-all hover:scale-[1.02]">
            <h3 className="text-2xl text-white mb-2">Zoey Miller</h3>
            <p className="text-zinc-300 mb-4">Senior Year of UWT's IT Bachelors Program</p>
            <Link href="/zoey" className="text-[#ae97e7] hover:text-[#9c86e0] underline">View Portfolio</Link>
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
