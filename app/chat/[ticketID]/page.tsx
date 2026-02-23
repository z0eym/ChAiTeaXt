"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8081';
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
  const ticketID = params.ticketID as string;
  
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

  useEffect(() => { // made change here -zoey!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login")
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  // Connect to Socket.io server
  useEffect(() => {
    if (!user) 
      return;
    connectSocket();

  socket.on('connect', () => {
    setIsConnected(true);
    
    const session = JSON.parse(localStorage.getItem('chatSession') || '{}');
    socket.emit('joinChat', {
      ticketID: ticketID || session.ticketID,
      UserID: user.UserID 
    });

    setMessages(prevMessages => {
        if (prevMessages.length === 0) {
        const firstAIMessage = {
          id: Date.now(),
          role: 'assistant',
          message: 'Hello, what is the problem you are facing today?',
          timestamp: new Date().toISOString(),
        };
        return [firstAIMessage];
        }
        return prevMessages;
    });
  });
  socket.on('chatHistory', (history: any) => {
    if (history.length > 0) {
      const hasCategory = history.some((msg: any) => 
        msg.metadata && JSON.parse(msg.metadata).type === 'category'
      );
      
      if (hasCategory) {
        setMessagesComplete(true);
        // setConversationSteps('complete');
        
        const descriptionMsg = history.find((msg: any) => 
        msg.metadata && JSON.parse(msg.metadata).type === 'description'
        );
        const deviceMsg = history.find((msg: any) => 
        msg.metadata && JSON.parse(msg.metadata).type === 'deviceInfo'
        );
        const categoryMsg = history.find((msg: any) => 
        msg.metadata && JSON.parse(msg.metadata).type === 'category'
        );
        
        if (descriptionMsg) setTicketDetails(prev => ({ ...prev, description: descriptionMsg.message }));
        if (deviceMsg) setTicketDetails(prev => ({ ...prev, deviceInfo: deviceMsg.message }));
        if (categoryMsg) setTicketDetails(prev => ({ ...prev, category: categoryMsg.message }));
      }
      setMessages(history);
    }
  });

  socket.on("ticketCreated", ({ ticketID }: { ticketID: number }) => { // new change here too -zoey
    const session = JSON.parse(localStorage.getItem("chatSession") || "{}");
    const updatedSession = {
      ...session,
      ticketID: ticketID
    };
    localStorage.setItem("chatSession", JSON.stringify(updatedSession));
  });

    socket.on('newMessage', (message: any) => {
      setMessages(prev => {
        const updatedMessages = [...prev, message];
        return updatedMessages;
      });

      setIsSending(false);
   
      // Focus input after receiving message
      setTimeout(() => {
          inputRef.current?.focus();
      }, 100);
    });

      socket.on('disconnect', () => {
      setIsConnected(false);
      });
      return () => {
         socket.off('connect');
         socket.off('chatHistory');
         socket.off('newMessage');
         socket.off('disconnect');
         disconnectSocket();
      };
   }, [ticketID, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInitialFlow = useCallback((userInput: string, session: any) => {
    if (!messagesComplete) {
      if (!ticketDetails.description) {
        setTicketDetails(prev => ({ ...prev, description: userInput }));
      } else if (!ticketDetails.deviceInfo) {
        setTicketDetails(prev => ({ ...prev, deviceInfo: userInput }));
      } else if (!ticketDetails.category) {
        setTicketDetails(prev => ({ ...prev, category: userInput }));
      }
    }
}, [ticketDetails, messagesComplete]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !isConnected || isSending) return;

    setIsSending(true);
    const session = JSON.parse(localStorage.getItem('chatSession') || '{}');

    const userMessage = {
      id: Date.now(),
      role: 'user',
      message: input,
      timestamp: new Date().toISOString(), 
    };

    setMessages(prev => [...prev, userMessage]);
    socket.emit('sendMessage', {
      ticketID: ticketID || session.ticketID,
      UserID: user?.UserID,
      role: 'user',
      message: input,
      metadata: null
    });
    handleInitialFlow(input, session);
    setInput('');
    };

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
                key={msg.messageID || msg.id || index}
                className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-6 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#5e17eb] text-white rounded-tr-none'
                    : 'bg-zinc-800 text-zinc-100 rounded-tl-none'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm opacity-75">
                      {msg.role === 'user' ? 'You' : ''}
                    </p>
                    {msg.metadata && typeof msg.metadata === 'string' && JSON.parse(msg.metadata).type && (
                      <span className="text-xs bg-black/50 px-2 py-1 rounded">
                        {JSON.parse(msg.metadata).type}
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