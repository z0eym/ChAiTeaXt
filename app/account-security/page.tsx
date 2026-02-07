import Link from "next/link";

export default function AccountSecurityPage() {
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
          
          <h1 className="text-4xl text-white mb-6">Account & Security</h1>
          <p className="text-xl text-zinc-300 mb-8">Manage your account and protect your data</p>
          
          <div className="space-y-8">
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Password Reset Process</h2>
              <ol className="space-y-4 text-left text-zinc-300">
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <span>Click "Forgot Password" on the login page</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <span>Enter the email address associated with your account</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <span>Check your email for password reset instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <span>Click the reset link (expires after 24 hours)</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                  <span>Create a new strong password</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-[#ae97e7] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">6</span>
                  <span>Log in with your new credentials</span>
                </li>
              </ol>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Role Permissions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg text-white mb-2">User Permissions</h3>
                  <ul className="text-zinc-300 space-y-1 ml-4">
                    <li>• Create and manage own tickets</li>
                    <li>• Update personal profile information</li>
                    <li>• View personal chat and ticket history</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg text-white mb-2">Account Security Features</h3>
                  <ul className="text-zinc-300 space-y-1 ml-4">
                    <li>• End-to-end encryption for chat messages</li>
                    <li>• Session timeout after 15 minutes of inactivity</li>
                    <li>• Secure password storage with hashing</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4">Privacy Settings</h2>
              <ul className="space-y-2 text-left text-zinc-300 ml-4">
                <li>• Control what data is stored about your usage</li>
                <li>• Opt-out of anonymous analytics collection</li>
                <li>• Request data deletion in accordance with privacy laws</li>
                <li>• Chat history retention: 90 days for unresolved tickets, 30 days for resolved</li>
                <li>• Data is encrypted both in transit and at rest</li>
              </ul>
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