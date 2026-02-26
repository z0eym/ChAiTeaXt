import Link from "next/link";

export default function TechnicalIssuesPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat">
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
        <div className="flex items-center gap-20">
          <Link href="/" className="hover:text-[#ae97e7] text-2xl">ChAi TeaXt</Link> 
          <div className="flex gap-10 text-2xl">
            <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7] text-[#ae97e7]">Help</Link>
          </div>
        </div>
        <div className="flex items-center">
          <Link href="/login" className="text-2xl hover:text-[#ae97e7]">Log In</Link> 
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-start pt-32 px-6 pb-12">
        <div className="w-full max-w-4xl">
          <div className="mb-8">
            <Link href="/help" className="text-[#ae97e7] hover:text-[#9c86e0] text-lg">← Back to Help Center</Link>
          </div>
          
          <h1 className="text-4xl text-white mb-6">Technical Issues & Troubleshooting</h1>
          <p className="text-xl text-zinc-300 mb-8">Solutions for common hardware and software problems</p>
          
          <div className="space-y-8">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Connection Issues</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg text-white mb-2">Cannot Connect to Service</h3>
                  <ul className="text-zinc-300 space-y-2 ml-4">
                    <li>• Check your internet connection</li>
                    <li>• Clear browser cache and cookies</li>
                    <li>• Try using a different browser</li>
                    <li>• Disable VPN if being used</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Performance Problems</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg text-white mb-2">Slow Loading Times</h3>
                  <ul className="text-zinc-300 space-y-2 ml-4">
                    <li>• Close unnecessary browser tabs</li>
                    <li>• Clear browser cache</li>
                    <li>• Check your internet speed</li>
                    <li>• Update your browser to latest version</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Bug Reporting</h2>
              <p className="text-zinc-300 mb-4">When reporting a bug, please include:</p>
              <ol className="space-y-2 text-left text-zinc-300 ml-4">
                <li>1. Steps to reproduce the issue</li>
                <li>2. Screenshots or screen recordings</li>
                <li>3. Browser and version information</li>
                <li>4. Operating system details</li>
                <li>5. Any error messages received</li>
              </ol>
            </div>
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