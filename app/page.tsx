import Link from "next/link";

// Front Page (Before Sign/Log In)
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat"> 
    
    {/* Navigation Header */}
    <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black px-10 py-4 rounded-full text-zinc-200 shadow-xl">
  
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
        <Link href="/login" className="text-2xl hover:text-[#ae97e7]">Log In</Link> 
      </div>
    </nav> 

    {/* Front Page Title */}
    <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center text-glow">
      <h1 className="font-fredoka mb-14 text-5xl font-semibold leading-tight dark:text-zinc-50 tracking-[10px]"> Try Out </h1>
      <h1 className="font-fredoka text-8xl font-bold leading-tight mb-10"> ChAi TeaXt </h1>
      <h1 className="font-fredoka text-5xl font-bold leading-tight mt-6 tracking-[10px]"> For All Your Technical </h1>
      <h1 className="font-fredoka text-5xl font-bold leading-tight tracking-[10px]"> Support  Needs </h1>

      <Link className="gap-4 mt-6 text-2xl text-white flex h-16 items-center justify-center rounded-full bg-black transition-colors hover:bg-[#5e17eb] dark:hover:bg-[#ae97e7] md:w-[158px]"
        href="/aichat" // Add in AI chatbox link page/application
        target="_blank"
        rel="noopener noreferrer"> Start Now
      </Link>
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
        &copy; {new Date().getFullYear()} ChAi TeaXt. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
