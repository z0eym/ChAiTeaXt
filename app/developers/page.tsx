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
      
    </div>

    {/* Footer */}
    <footer className="mt-auto w-full py-8 px-6 bg-black/70 text-zinc-200">
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
