"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  UserID: string;
  UserName: string;
  UserEmail: string;
};

export default function UserProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const parsed = JSON.parse(loggedInUser);
      setUser(parsed);
      setName(parsed.UserName);
      setEmail(parsed.UserEmail);
    } else {
      router.push("/"); // if they are not logged in, put them back to the main page
    }
  }, [router]);

  // lets user logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("chatSession");
    router.push("/");
  };

  // Lets user update their name if they want to
  const updateName = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:8081/api/user/${user.UserID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const data = await res.json();
    if (data.success) {
      const updatedUser = { ...user, UserName: name };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage("Name updated");
    } else {
      setMessage("Unable to update name");
    }
  };

  // Lets user update their email if they want to
  const updateEmail = async () => {
    if (!user) return;
    const res = await fetch(`http://localhost:8081/api/user/${user.UserID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.success) {
      const updatedUser = { ...user, UserEmail: email };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage("Email updated");
    } else {
      setMessage("Unable to update email");
    }
  };

  // Lets user update their password if they want to
  const updatePassword = async () => {
    if (!user) return;
    if (!oldPassword || !newPassword) {
      setMessage("Enter old and new password");
      return;
    }
    const res = await fetch(`http://localhost:8081/api/user/${user.UserID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, password: newPassword })
    });
    const data = await res.json();
    if (data.success) {
      setOldPassword("");
      setNewPassword("");
      setMessage("Password updated");
    } else {
      setMessage(data.message || "Old password incorrect");
    }
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
        <Link 
          href="/user-profile" 
          className="text-2xl text-[#ae97e7]">
          {user?.UserName}
        </Link>
        <button 
          onClick={handleLogout}
          className="cursor-pointer text-lg bg-red-400 hover:bg-red-700 px-4 py-2 rounded-full transition-colors">
          Logout
        </button>
      </div>
    </nav> 

      {/* Dashboard */}
      <div className="mt-20 flex-1 flex flex-col items-center justify-center text-center px-6">
        {user && <h1 className="text-5xl mb-10 text-glow">User Profile</h1>}
        <div className="w-full max-w-2xl flex flex-col gap-6">

         {/* Change Name */}
         <div className="bg-black/60 p-6 rounded-xl text-left">
            <h2 className="text-2xl mb-4">Change Name</h2>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 mb-4"/>
            <button
              onClick={updateName}
              className="cursor-pointer bg-[#ae97e7] hover:bg-[#8d77d1] px-5 py-2 rounded-full font-semibold">
              Update Name
            </button>
         </div>

         {/* Change Email */}
         <div className="bg-black/60 p-6 rounded-xl text-left">
            <h2 className="text-2xl mb-4">Update Email</h2>
            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 mb-4"/>
            <button
              onClick={updateEmail}
              className="cursor-pointer bg-[#ae97e7] hover:bg-[#8d77d1] px-5 py-2 rounded-full font-semibold">
              Update Email
            </button>
         </div>

         {/* Change Password */}
         <div className="bg-black/60 p-6 rounded-xl text-left">
            <h2 className="text-2xl mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 mb-3"/>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 mb-4"/>         
            <button
              onClick={updatePassword}
              className="cursor-pointer bg-[#ae97e7] hover:bg-[#8d77d1] px-5 py-2 rounded-full font-semibold">
              Update Password
            </button>
         </div>
         {message && (
           <p className="text-center text-zinc-300">{message}</p>
         )}
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

        {/* Copyright */}
        <div className="mt-8 text-center text-zinc-400 text-sm">
        &copy; {new Date().getFullYear()} ChAi TeaXt AI Help Desk System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}