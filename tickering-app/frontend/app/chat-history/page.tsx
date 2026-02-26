"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  UserID: number;
  UserName: string;
  UserEmail: string;
};

type Ticket = {
  ticketID: number;
  description: string;
  deviceInfo: string;
  category: string;
  status: string;
  createdAt: string;
};

export default function ChatHistory() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      fetch(`http://localhost:8081/api/tickets/user/${parsedUser.UserID}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setTickets(data.tickets);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      router.push("/");
    }
  }, [router]);

  const openChat = (ticketID: number) => {
    localStorage.setItem(
      "chatSession",
      JSON.stringify({
        ticketId: ticketID,
        userId: user?.UserID,
        isLoggedInUser: true
      })
    );
    router.push(`/chat/${ticketID}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  {/* CONTENT */}
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat">

      {/* Navigation Header */}
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
        <div className="flex items-center gap-20">
          <Link href="/dashboard" className="hover:text-[#ae97e7] font-bold text-2xl">
            ChAi TeaXt
          </Link>
          <div className="flex gap-10 text-2xl">
            <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/user-profile" className="text-2xl text-[#ae97e7]">
            {user?.UserName}
          </Link>
          <button
            onClick={handleLogout}
            className="cursor-pointer text-lg bg-red-400 hover:bg-red-700 px-4 py-2 rounded-full transition-colors">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-40 px-6 mb-20">
        <div className="w-full max-w-4xl bg-black/70 p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-white mb-6 text-center">
            Chat History
          </h1>

          {loading && <p className="text-center text-zinc-400">Loading chats...</p>}
          {!loading && tickets.length === 0 && <p className="text-center text-zinc-400">No past chats found.</p>}
          <div className="flex flex-col gap-4"> 
            {tickets.map(ticket => (
            <div
              key={ticket.ticketID}
              onClick={async () => {
                if (ticket.status === "closed") { // If ticket is closed, reopen it
                  await fetch(`http://localhost:8081/api/tickets/${ticket.ticketID}/reopen`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ UserID: user?.UserID })
                  });
                }
                localStorage.setItem(
                  "chatSession",
                  JSON.stringify({
                    ticketId: ticket.ticketID,
                    userId: user?.UserID,
                    isLoggedInUser: true,
                  })
                );
                router.push(`/chat/${ticket.ticketID}`);
              }}
              className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 p-5 rounded-xl border border-zinc-700 transition">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-white font-semibold">
                  {ticket.description || "Support Request"}
                </h2>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  ticket.status === "open" ? "bg-green-600" :
                  ticket.status === "closed" ? "bg-red-600" :
                  "bg-yellow-600"}`}>
                  {ticket.status}
                </span>
              </div>
              <p className="text-zinc-400 text-sm mt-2">
                {new Date(ticket.createdAt).toLocaleString()}
              </p>
              {ticket.deviceInfo && (
                <p className="text-zinc-500 text-sm mt-1">
                  Device: {ticket.deviceInfo}
                </p>
              )}
            </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-black/70 text-zinc-200">
        <div className="mx-auto flex flex-col justify-between items-center gap-6">
          <div className="flex gap-10 text-xl">
            <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} ChAi TeaXt AI Help Desk System. All rights reserved.
        </div>
      </footer>

    </div>
  );
}