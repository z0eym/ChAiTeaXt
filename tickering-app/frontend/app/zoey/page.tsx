import React from "react";
import Link from "next/link";

export default function ZoeyPortfolio() {
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
          <h1 className="text-5xl text-white text-glow mb-4">Zoey Miller</h1>
          <p className="text-xl">
            Undergraduate IT Student | Aspiring Project Manager
          </p>
        </header>

        {/* About Me */}
        <InfoCard title="About Me">
          Hello, my name is Zoey Miller. I am an undergraduate student in the IT
          program at the University of Washington with an interest in Project
          Management.
        </InfoCard>

        {/* Skills */}
        <InfoCard title="Skills">
          <table className="w-full border-[#ae97e7] mb-6">
            <thead className="bg-black/70">
              <tr>
                <th className="px-4 py-2">Skill</th>
                <th className="px-4 py-2">Proficiency</th>
                <th className="px-4 py-2">Experience</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Java", "Basic", "2 Years"],
                ["HTML", "Basic", "1 Year"],
                ["C#", "Basic", "6 Months"],
                ["TypeScript", "Basic", "2 Months"],
                ["PowerPoint", "Proficient", "6 Years"],
                ["MS Project", "Proficient", "1 Year"],
                ["Excel", "Proficient", "6 Years"],
                ["Git/GitHub", "Proficient", "2 Years"],
                ["Linux", "Proficient", "1 Year"],
              ].map(([skill, level, exp]) => (
                <tr key={skill}>
                  <td className="bg-black/40 border border-[#ae97e7]/20 px-4 py-2">{skill}</td>
                  <td className="bg-black/40 border border-[#ae97e7]/20 px-4 py-2">{level}</td>
                  <td className="bg-black/40 border border-[#ae97e7]/20 px-4 py-2">{exp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </InfoCard>

        {/* Projects */}
        <InfoCard title="Projects">
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <p>AJRMedia Website</p> - Car photography business website for a client built with a
              team of 4, using Wix. Served as Project Manager.
            </li>
            <li>
              <p>Personal Portfolio</p> - The portfolio you are viewing right now! Built using HTML and converted
              into Next.js.
            </li>
            <li>
              <p>CheyDoesNails Website</p> - Nail services business website built with a
              team of 4, using HTML, CSS, and JavaScript. Served as Project Manager.
            </li>
            <li>
              <p>Senior Project: ChAi TeaXt</p> - The web application you are viewing right now! Built with a team of 5 for our senior project, using Next.js, Socket.IO, MySQL, etc,. Served as Project Manager.
            </li>
            <li>
              <Link href="https://www.affluproductions.com/" className="cursor pointer hover:text-[#ae97e7]">Affluent Productions Website</Link> - A website to promote discord activites, thus earning revenue for game developer
            </li>
          </ol>
        </InfoCard>

        {/* Contact */}
        <InfoCard title="Contacts">
          <ul className="Contacts">
            <li>
              <p>Email: <a href="mailto:z0eyvm@gmail.com ?subject=Inquiry&body=" className="underline hover:text-[#ae97e7]">
                z0eyvmiller@gmail.com</a></p></li>

            <li>
              <p>GitHub: <a href="https://github.com/z0eyvm" target="_blank" className="underline hover:text-[#ae97e7]">
                github.z0eyvm
              </a></p>{" "}
              
            </li>
            <li>
              <p>LinkedIn: <a href="https://www.linkedin.com/in/zoey-miller-548a872a3/" target="_blank" className="underline hover:text-[#ae97e7]">
                linkedin.zoeymiller
              </a></p>{" "}
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
