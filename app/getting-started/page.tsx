import Link from "next/link";

export default function GettingStartedPage() {
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
          
          <h1 className="text-4xl text-white mb-6">Getting Started Guide</h1>
          <p className="text-xl text-zinc-300 mb-8">Everything you need to start using ChAi TeaXt effectively</p>
          
          <div className="space-y-8">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Account Registration</h2>
              <ol className="space-y-4 text-left text-zinc-300">
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <span>Visit the login page and click "Don't have an Account?"</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <span>Enter your email, create a password, and provide basic information</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <span>Check your email for the verification link and click to activate your account</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <span>Log in with your credentials to access your dashboard</span>
                </li>
              </ol>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Dashboard Overview</h2>
              <ul className="space-y-3 text-left text-zinc-300">
                <li className="flex items-center">
                  <span className="text-[#ae97e7] mr-2">•</span>
                  <span><strong>Ticket Management:</strong> View all your submitted tickets with current status</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#ae97e7] mr-2">•</span>
                  <span><strong>New Ticket Button:</strong> Located prominently for quick issue reporting</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#ae97e7] mr-2">•</span>
                  <span><strong>Chat History:</strong> Access previous conversations with AI and technicians</span>
                </li>
                <li className="flex items-center">
                  <span className="text-[#ae97e7] mr-2">•</span>
                  <span><strong>Account Settings:</strong> Update your profile, email, and password</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">First-Time Setup Checklist</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-[#ae97e7] rounded mr-3"></div>
                  <span className="text-zinc-300">Complete your profile information</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-[#ae97e7] rounded mr-3"></div>
                  <span className="text-zinc-300">Review the tutorial for ticket creation</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-[#ae97e7] rounded mr-3"></div>
                  <span className="text-zinc-300">Test the AI chat assistant with a sample question</span>
                </div>
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-[#ae97e7] rounded mr-3"></div>
                  <span className="text-zinc-300">Explore the knowledge base for common solutions</span>
                </div>
              </div>
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