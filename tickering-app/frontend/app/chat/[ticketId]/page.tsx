"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000';
const socket = require('socket.io-client')(SOCKET_URL, {
  autoConnect: false,
  transports: ['websocket', 'polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const connectSocket = () => {
  socket.connect();
};

const disconnectSocket = () => {
  socket.disconnect();
};

type TicketDetails = {
  description: string;
  deviceInfo: string;
  category: string;
};

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.ticketId as string;

  // 1. STATE HOOKS (Always first)
  const [messages, setMessages] = useState<Array<any>>([]);
  const [input, setInput] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [ticketDetails, setTicketDetails] = useState<TicketDetails>({
    description: '',
    deviceInfo: '',
    category: ''
  });
  const [messagesComplete, setMessagesComplete] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [user, setUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. EFFECTS
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

useEffect(() => {
  if (!user || !ticketId) return;
  connectSocket();

  // Clean up ALL listeners before re-adding
  socket.removeAllListeners('connect');
  socket.removeAllListeners('newMessage');
  socket.removeAllListeners('chatHistory');

  socket.on('connect', () => {
    setIsConnected(true);
    socket.emit('joinChat', { ticketID: ticketId, UserID: user.UserID });
  });

  socket.on('chatHistory', (history: any) => {
  if (history.length === 0) {
    // Manually add the first prompt if the chat is brand new
    setMessages([{
      id: 'welcome-msg',
      role: 'assistant',
      message: 'Welcome! What is the problem you are having today?',
      timestamp: new Date().toISOString(),
    }]);
  } else {
    setMessages(history);
    // Logic to sync ticketDetails state with history would go here
  }
});

  socket.on('newMessage', (message: any) => {
    setMessages(prev => {
      // Check if ID already exists in the current list
      const isDuplicate = prev.some(m => (m.id === message.id || m.messageID === message.id));
      if (isDuplicate) return prev; 
      return [...prev, message];
    });
    setIsSending(false);
  });

  return () => {
    socket.disconnect();
  };
}, [ticketId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 3. HELPER FUNCTIONS
  const endChat = () => {
    disconnectSocket(); 
    localStorage.removeItem('chatSession');
    router.push('/dashboard');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

const sendMessage = (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || !isConnected || isSending || !ticketId) return;

  const userMessageText = input;
  setInput(''); 
  setIsSending(true);

  // 1. Identify current and next steps
  const currentStep = !ticketDetails.description ? 'description' : 
                      !ticketDetails.deviceInfo ? 'deviceInfo' : 'category';

  // 2. Update local state and prepare the next question
  let nextPrompt = "";
  setTicketDetails(prev => {
    const updated = { ...prev };
    if (currentStep === 'description') {
      updated.description = userMessageText;
      nextPrompt = "What is your device or system? (e.g. Windows, iPhone)";
    } else if (currentStep === 'deviceInfo') {
      updated.deviceInfo = userMessageText;
      nextPrompt = "Is this a hardware or software issue?";
    } else if (currentStep === 'category') {
      updated.category = userMessageText;
      setMessagesComplete(true);
      nextPrompt = "Thank you! I've logged your ticket. An agent will be with you shortly.";
    }
    return updated;
  });

  // 3. Emit the user message to the server
  socket.emit('sendMessage', {
    ticketID: ticketId,
    UserID: user?.UserID,
    role: 'user',
    message: userMessageText,
    metadata: { type: currentStep }
  });

  // 4. Manually add the NEXT question to the UI after a small delay 
  // (This makes the AI feel like it's "thinking")
setTimeout(() => {
    if (nextPrompt) {
      // This part handles the initial onboarding prompts (Description -> Device -> Category)
      setMessages(prev => [
        ...prev, 
        {
          id: `ai-prompt-${Date.now()}`,
          role: 'assistant',
          message: nextPrompt,
          timestamp: new Date().toISOString(),
        }
      ]);
    } else if (messagesComplete) {
      // Once onboarding is done, we don't "fake" any more messages.
      // We rely on the socket.on('newMessage') listener we set up in useEffect.
      console.log("Onboarding complete. Waiting for server-side AI response...");
    }
    setIsSending(false);
  }, 600);
};
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat"> 
    
    {/* Navigation Header */}
    <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
  
      <div className="flex items-center gap-20">
        <Link href={"/dashboard"} className="hover:text-[#ae97e7] font-bold text-2xl">
          ChAi TeaXt
        </Link> 

        <div className="flex gap-10 text-2xl">
          <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
          <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
          <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
        </div>
      </div>
  
      <div className="flex items-center gap-6">
        <div className="text-zinc-300 text-2xl">
          <Link 
          href="/user-profile" 
          className="text-2xl text-zinc-300 hover:text-[#ae97e7]">
          {user?.UserName}
        </Link>
        </div>
        
        <button 
          onClick={endChat}
          className="cursor-pointer text-xl bg-red-400 hover:bg-red-700 px-6 py-2 rounded-full transition-colors">
            End Chat
         </button>
      </div>
    </nav> 

    {/* Chat Container */}
    <div className="flex-1 flex flex-col items-center justify-center p-8 mt-20">
      <div className="w-full max-w-4xl bg-black/70 rounded-2xl shadow-2xl p-6">
        
        {/* Chat Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">AI Support Chat</h1>
        </div>
        
        <div className="h-96 overflow-y-auto mb-6 p-4 bg-black/30 rounded-xl border border-zinc-700">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-400">
              <div className="text-6xl mb-4"></div>
              <p className="text-xl">Connecting to AI assistant...</p>
              <p className="text-zinc-500 mt-2">Please wait a moment</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={`${msg.messageID || msg.id}-${index}`}
                className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-6 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#5e17eb] text-white rounded-tr-none'
                    : 'bg-zinc-800 text-zinc-100 rounded-tl-none'}`}>
<div className="flex items-center justify-between mb-1">
  <p className="text-sm opacity-75">
    {msg.role === 'user' ? 'You' : ''}
  </p>
  {msg.metadata && (
    <span className="text-xs bg-black/50 px-2 py-1 rounded">
      {typeof msg.metadata === 'string' 
        ? JSON.parse(msg.metadata).type 
        : msg.metadata.type}
    </span>
  )}
</div>
                  <p className="text-lg">{msg.message}</p>
                  <p className="text-xs mt-2 opacity-60">
                    {new Date(msg.timestamp || msg.createdAt).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Form */}
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              !ticketDetails.description ? "Describe the problem you're facing..." :
              !ticketDetails.deviceInfo ? "What device or system are you having issues with? (e.g., 'Windows laptop', 'iPhone', 'Unsure')" :
              !ticketDetails.category ? "Is this a hardware or software issue? (If unsure, say 'Unsure')" :
              "Type your message here..."
            }
            className="flex-grow p-4 bg-zinc-900 border border-zinc-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ae97e7]"
            disabled={!isConnected || isSending}
            autoFocus/>
          <button
            type="submit"
            disabled={!input.trim() || !isConnected || isSending}
            className={`px-8 py-4 font-semibold rounded-xl transition cursor-pointer bg-[#5e17eb] hover:bg-[#ae97e7] ${
              input.trim() && isConnected && !isSending
                ? 'bg-[#5e17eb] hover:bg-[#ae97e7]'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}`}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </form>
        
        {/* Connection Status */}
        {!isConnected && (
          <div className="mt-4 p-3 bg-amber-900/30 border border-amber-700 text-amber-200 rounded-lg text-center">
             Reconnecting to chat server...
          </div>
        )}
        
        {/* Info */}
        <div className="mt-6 text-center text-zinc-400 text-sm">
          {!messagesComplete
            ? "Please complete the initial questions so I can help you better."
            : "Your chat is being saved to your account."}
        </div>
        
        {/* Ticket Details Summary */}
        {messagesComplete && (
          <div className="mt-4 p-4 bg-zinc-900/50 rounded-lg border border-zinc-700">
            <h3 className="text-lg text-white mb-2">Issue Summary:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-zinc-400">Problem:</p>
                <p className="text-white truncate">{ticketDetails.description}</p>
              </div>
              <div>
                <p className="text-zinc-400">Device:</p>
                <p className="text-white">{ticketDetails.deviceInfo}</p>
              </div>
              <div>
                <p className="text-zinc-400">Category:</p>
                <p className="text-white">{ticketDetails.category}</p>
              </div>
            </div>
          </div>
        )}
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