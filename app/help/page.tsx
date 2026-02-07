import Link from "next/link";

// Help/Support Page for ChAi TeaXt
export default function HelpPage() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat">
    
    {/* Navigation Header */}
    <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
  
      {/* Nav Links */}
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

    {/* Main Content */}
    <div className="flex-1 flex flex-col items-center justify-start pt-32 px-6 pb-12 text-center">
      {/* Page Title */}
      <h1 className="text-5xl text-white mb-4 text-glow">AI Help Desk Support</h1>
      <p className="text-xl text-zinc-300 mb-12 max-w-2xl">Get instant AI assistance or connect with human technicians</p>
      
      {/* Structured Categories */}
      <div className="w-full max-w-6xl mb-16">
        <h2 className="text-3xl text-white mb-10">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { 
              title: "Getting Started", 
              desc: "New user guides & account setup",
              features: ["User Registration", "Dashboard Overview", "First-Time Setup"],
              href: "/getting-started"
            },
            { 
              title: "Technical Issues", 
              desc: "Hardware & software troubleshooting",
              features: ["Connection Issues", "Performance Problems", "Bug Reporting"],
              href: "/technical-issues"
            },
            { 
              title: "Account & Security", 
              desc: "User management and data protection",
              features: ["Password Reset", "Role Permissions", "Privacy Settings"],
              href: "/account-security"
            }
          ].map((category) => (
            <Link key={category.title} href={category.href}>
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-[#ae97e7]/20 hover:border-[#ae97e7]/50 transition-all hover:scale-[1.02] cursor-pointer">
                <h3 className="text-xl text-white mb-2">{category.title}</h3>
                <p className="text-zinc-400 mb-4">{category.desc}</p>
                <ul className="text-left text-zinc-300 text-sm space-y-1">
                  {category.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-[#ae97e7] mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* FAQs Section */}
        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
          <h2 className="text-3xl text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { 
                q: "How do I reset my password?", 
                a: "Go to the login page and click 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox to reset your password." 
              },
              { 
                q: "How do I create an account?", 
                a: "Visit our login page → Click 'Don't have an Account?' → Enter your information → Click 'Sign Up'. You'll receive a confirmation email to activate your account." 
              },
              { 
                q: "How do I create a support ticket?", 
                a: "Navigate to your dashboard → Click 'New Ticket' → Fill in title, description, and category → Submit. Our AI will immediately start assisting you." 
              },
              { 
                q: "How does the AI escalation work?", 
                a: "If the AI cannot resolve your issue after multiple attempts or detects keywords like 'I need more help', it will automatically escalate to a human technician." 
              },
              { 
                q: "Can I use ChAi TeaXt on mobile?", 
                a: "Yes, our web app is fully responsive and works on all mobile browsers. No app installation required." 
              },
              { 
                q: "What happens if I close my browser during a chat?", 
                a: "Your chat history and ticket progress are saved. Simply log back in to resume where you left off." 
              },
            ].map((faq, index) => (
              <div key={index} className="text-left border-b border-zinc-700/50 pb-4 last:border-0">
                <h3 className="text-lg text-white mb-2 flex items-start">
                  <span className="text-[#ae97e7] mr-2">Q:</span> 
                  {faq.q}
                </h3>
                <p className="text-zinc-300 flex items-start">
                  <span className="text-[#ae97e7] mr-2">A:</span> 
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & System Features */}
        <div className="space-y-8">
          {/* Contact Information */}
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
            <h2 className="text-3xl text-white mb-6">Contact Support</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg text-white mb-2">Email Support</h3>
                <p className="text-zinc-300">support@chaiteaxt.com</p>
                <p className="text-zinc-400 text-sm mt-1">Response within 24 hours</p>
              </div>
              <div>
                <h3 className="text-lg text-white mb-2">Live Chat</h3>
                <p className="text-zinc-300">Available 24/7 through AI Assistant</p>
                <p className="text-zinc-400 text-sm mt-1">Human technician handoff when needed</p>
              </div>
              <div>
                <h3 className="text-lg text-white mb-2">Real-time Support</h3>
                <p className="text-zinc-300">Ticket creation in under 12 seconds</p>
                <p className="text-zinc-400 text-sm mt-1">AI response guaranteed in under 2 minutes</p>
              </div>
            </div>
          </div>

          {/* System Status & Features */}
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-[#ae97e7]/20">
            <h2 className="text-3xl text-white mb-6">System Features</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">AI Assistant (Gemini)</span>
                <span className="text-green-400">● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">Real-time Chat</span>
                <span className="text-green-400">● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">File Attachments</span>
                <span className="text-green-400">● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">Human Escalation</span>
                <span className="text-green-400">● Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300">Multi-user Support</span>
                <span className="text-green-400">● 50+ daily tickets</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role-Based Information */}
      <div className="w-full max-w-6xl mt-12">
        <h2 className="text-3xl text-white mb-8">User Roles & Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              role: "Users",
              color: "from-blue-500 to-purple-500",
              permissions: [
                "Create/Update own tickets",
                "Chat with AI Assistant",
                "View ticket history",
                "Upload attachments",
                "Rate support quality"
              ]
            },
            {
              role: "Technicians",
              color: "from-green-500 to-teal-500",
              permissions: [
                "View assigned tickets",
                "Access user chat history",
                "Update ticket status",
                "Human takeover from AI",
                "Priority management"
              ]
            },
            {
              role: "Administrators",
              color: "from-red-500 to-orange-500",
              permissions: [
                "Full system access",
                "User role management",
                "View all tickets & chats",
                "System configuration",
                "Audit logs access"
              ]
            }
          ].map((roleInfo) => (
            <div key={roleInfo.role} className="bg-gradient-to-br to-black/40 via-black/20 from-black/60 backdrop-blur-sm rounded-2xl p-6 border border-[#ae97e7]/20">
              <h3 className={`text-2xl font-bold bg-gradient-to-r ${roleInfo.color} bg-clip-text text-transparent mb-4`}>
                {roleInfo.role}
              </h3>
              <ul className="space-y-2 text-left">
                {roleInfo.permissions.map((perm, idx) => (
                  <li key={idx} className="text-zinc-300 flex items-center">
                    <span className="text-[#ae97e7] mr-2">✓</span>
                    {perm}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Updates Notice */}
      <div className="mt-12 p-6 bg-black/70 rounded-2xl border border-[#ae97e7]/30 max-w-4xl">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="text-xl text-white">System Status: Operational</h3>
        </div>
        <p className="text-zinc-300">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        <p className="text-zinc-400 text-sm mt-2">Uptime: 99.95% • AI Response Time: &lt;2 min • Concurrent Users: 5+</p>
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