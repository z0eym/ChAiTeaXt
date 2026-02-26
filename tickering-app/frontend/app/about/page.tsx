import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat">

      {/* Navigation Header */}
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
        <div className="flex items-center gap-20">
          <Link href="/" className="hover:text-[#ae97e7] font-bold text-2xl">
            ChAi TeaXt
          </Link>

          <div className="flex gap-10 text-2xl">
            <Link href="/about" className="hover:text-[#ae97e7] text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
          </div>
        </div>

        <Link href="/login" className="text-2xl hover:text-[#ae97e7]">
          Log In
        </Link>
      </nav>

      {/* About Content */}
      <main className="flex flex-1 items-start justify-center px-4 pt-32 pb-20 text-white">
        <div className="w-full max-w-4xl">

          <h1 className="mb-10 text-center text-4xl drop-shadow-lg">
            About ChAi TeaXt
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InfoCard title="What Is ChAi TeaXt?">
              ChAi TeaXt is a web-based ticketing and technical support system designed to help
              users report issues, receive guidance, and communicate efficiently with
              technical support. It combines an AI-powered assistant with a structured
              ticketing system to improve troubleshooting and documentation.
            </InfoCard>

            <InfoCard title="The Problem We’re Solving">
              Technical issues are often slow to resolve due to unclear communication and
              lack of documentation. ChAi TeaXt provides a centralized platform where users
              can submit support requests, get help for common issues, and ensure more complex
              problems are escalated efficiently.
            </InfoCard>

            <InfoCard title="Core Features">
              <ul className="space-y-2">
                <li>Create and manage technical support tickets</li>
                <li>Chat with an AI assistant for common issues and FAQs</li>
                <li>Escalate complex problems to technicians</li>
                <li>Track ticket status and resolution history</li>
              </ul>
            </InfoCard>

            <InfoCard title="Why It Matters">
              By improving communication and documentation, ChAi TeaXt helps reduce downtime,
              increase system uptime, and create a more efficient support workflow for both
              users and technicians.
            </InfoCard>

            <Link href="/developers" className="hover:text-[#ae97e7] md:col-span-2 flex justify-center">
              <InfoCard title="The Team" className="w-full max-w">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Diana Zagorenko</li>
                  <li>Errol Luna</li>
                  <li>Renee Reyes</li>
                  <li>Russell Kim</li>
                  <li>Zoey Miller</li>
                </ul>
              </InfoCard>
            </Link>

          </div>
        </div>
      </main>

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

/* Reusable Black Info Card */
function InfoCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl bg-black/70 p-7 shadow-xl ${className}`}>
      <h2 className="mb-3 text-2xl">{title}</h2>
      <div className="text-white leading-relaxed">
        {children}
      </div>
    </section>
  );
}