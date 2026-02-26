import React from "react";
import Link from "next/link";

// Diana Zagorenko Portfolio – Styled to match ChAi TeaXt pages
export default function DianaPortfolio() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat">

      {/* Navigation Header */}
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
        <div className="flex items-center gap-20">
          <Link href="/" className="hover:text-[#ae97e7] text-2xl">
            ChAi TeaXt
          </Link>
          <div className="flex gap-10 text-2xl">
            <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7] text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
          </div>
        </div>
        <Link href="/login" className="text-2xl hover:text-[#ae97e7]">Log In</Link>
      </nav>

      <div className="flex-1 pt-32 px-10 pb-16 text-zinc-200">
        <header className="text-center mb-16">
          <h1 className="text-5xl text-white mb-4">Diana Zagorenko</h1>
          <p className="text-xl">
            Undergraduate IT Student | Aspiring Data Scientist
          </p>
        </header>

        {/* About Me */}
        <InfoCard title="About Me">
          Hi! My name is Diana Zagorenko. I am an undergraduate student in the
          Information Technology program at the University of Washington with an
          interest in software development, systems, and encryption.
        </InfoCard>

        {/* Skills */}
        <InfoCard title="Skills">
          <table className="w-full mb-6">
            <thead className="bg-black/70">
              <tr>
                <th className="px-4 py-2 text-left">Skill</th>
                <th className="px-4 py-2 text-left">Proficiency</th>
                <th className="px-4 py-2 text-left">Experience</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Java", "Intermediate", "3 Years"],
                ["SQL", "Intermediate", "1+ Year"],
                ["HTML/CSS", "Intermediate", "2 Years"],
                ["JavaScript", "Basic", "1 Year"],
                ["C#", "Introductory", "3 Months"],
                ["Git/GitHub", "Basic", "1 Year"],
                ["Linux", "Basic", "6 Months"],
              ].map(([skill, level, exp]) => (
                <tr key={skill}>
                  <td className="bg-black/40 border border-white/10 px-4 py-2">{skill}</td>
                  <td className="bg-black/40 border border-white/10 px-4 py-2">{level}</td>
                  <td className="bg-black/40 border border-white/10 px-4 py-2">{exp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfoCard>

        {/* Projects */}
        <InfoCard title="Projects">
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>ChAi TeaXt AI Help Desk System</strong> – Senior capstone
              project focused on building a ticketing system with real-time
              chat using Next.js, Socket.IO, and a database backend.
            </li>
            <li>
              <strong>AJR Media Website</strong> – Car photography website
              developed as part of a team, contributing to site structure,
              content organization, and front-end styling.
            </li>
            <li>
              <strong>Resonance Sound Healing Website</strong> – Contributed to
              client onboarding and project documentation, including gathering
              requirements, recording meetings, and producing a comprehensive
              project portfolio outlining system and design requirements.
            </li>
          </ol>
        </InfoCard>

        {/* Contact */}
        <InfoCard title="Contact">
          <ul className="space-y-2">
            <li>
              Email:{" "}
              <a
                href="mailto:dzagorenko24@gmail.com"
                className="underline hover:text-[#ae97e7]"
              >
                dzagorenko24@gmail.com
              </a>
            </li>
            <li>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/diana-z-927453367"
                target="_blank"
                className="underline hover:text-[#ae97e7]"
              >
                linkedin.com/in/diana-z-927453367
              </a>
            </li>
          </ul>
        </InfoCard>
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

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl bg-black/70 p-7 shadow-xl mb-8">
      <h2 className="mb-3 text-2xl text-white">{title}</h2>
      <div className="text-white/90 leading-relaxed">{children}</div>
    </section>
  );
}
