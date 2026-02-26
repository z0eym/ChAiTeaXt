// app/technician-dashboard/page.tsx
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

type Ticket = {
  ticketID: number;
  UserID: number;
  description: string;
  deviceInfo: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userName?: string;
  actionTaken?: string; // Track what action was taken
  actionTime?: string; // Track when action was taken
};

type ChatMessage = {
  chatMessageID?: number;
  ticketID: number;
  role: 'user' | 'assistant' | 'technician';
  chatMessages: string;
  UserID: number | null;
  createdAt: string;
  userName?: string;
};

export default function TechnicianDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [processedTickets, setProcessedTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showChatView, setShowChatView] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(null);
  const [technicianName] = useState("Alex Chen");

  useEffect(() => {
    // Mock data for demonstration
    const mockTickets: Ticket[] = [
      {
        ticketID: 1001,
        UserID: 101,
        description: "Cannot connect to Wi-Fi",
        deviceInfo: "Windows Laptop",
        category: "hardware",
        status: "active",
        createdAt: "2024-03-15T10:30:00Z",
        updatedAt: "2024-03-15T10:30:00Z",
        userName: "John Doe"
      },
      {
        ticketID: 1002,
        UserID: 102,
        description: "Software installation failed",
        deviceInfo: "MacBook Pro",
        category: "software",
        status: "active",
        createdAt: "2024-03-15T09:15:00Z",
        updatedAt: "2024-03-15T09:45:00Z",
        userName: "Jane Smith"
      },
      {
        ticketID: 1003,
        UserID: 103,
        description: "Email not syncing",
        deviceInfo: "iPhone 13",
        category: "software",
        status: "active",
        createdAt: "2024-03-15T08:00:00Z",
        updatedAt: "2024-03-15T08:30:00Z",
        userName: "Bob Johnson"
      },
    ];
    
    setTickets(mockTickets);
    // Auto-select first ticket for better UX
    if (mockTickets.length > 0) {
      setSelectedTicket(mockTickets[0]);
      loadChatHistory(mockTickets[0]);
    }
  }, []);

  const loadChatHistory = (ticket: Ticket) => {
    const mockChat: ChatMessage[] = [
      {
        ticketID: ticket.ticketID,
        role: 'user',
        chatMessages: ticket.description,
        UserID: ticket.UserID,
        createdAt: ticket.createdAt,
        userName: ticket.userName
      },
      {
        ticketID: ticket.ticketID,
        role: 'assistant',
        chatMessages: "I understand you're having an issue. Can you tell me more about what you're experiencing?",
        UserID: null,
        createdAt: new Date(new Date(ticket.createdAt).getTime() + 60000).toISOString(),
      },
      {
        ticketID: ticket.ticketID,
        role: 'user',
        chatMessages: "I've tried restarting but it's still not working.",
        UserID: ticket.UserID,
        createdAt: new Date(new Date(ticket.createdAt).getTime() + 120000).toISOString(),
        userName: ticket.userName
      },
    ];
    
    setChatHistory(mockChat);
    setSelectedTicket(ticket);
    setShowChatView(true);
    setShowActionDropdown(null);
  };

  const processTicket = (ticket: Ticket, action: string) => {
    // Add to processed tickets with action info
    const processedTicket = {
      ...ticket,
      status: 'processed',
      actionTaken: action,
      actionTime: new Date().toISOString()
    };
    setProcessedTickets([processedTicket, ...processedTickets]);
    
    // Remove from active tickets
    const updatedTickets = tickets.filter(t => t.ticketID !== ticket.ticketID);
    setTickets(updatedTickets);
    
    // If this was the selected ticket, select the next available
    if (selectedTicket?.ticketID === ticket.ticketID) {
      if (updatedTickets.length > 0) {
        setSelectedTicket(updatedTickets[0]);
        loadChatHistory(updatedTickets[0]);
      } else {
        setSelectedTicket(null);
        setShowChatView(false);
      }
    }
    setShowActionDropdown(null);
  };

  const handleResolve = (ticket: Ticket) => {
    processTicket(ticket, 'Resolved');
    alert(`Ticket #${ticket.ticketID} marked as resolved`);
  };

  const handleEscalate = (ticket: Ticket) => {
    processTicket(ticket, 'Escalated');
    alert(`Ticket #${ticket.ticketID} escalated to senior technician`);
  };

  const handleAIHandoff = (ticket: Ticket) => {
    processTicket(ticket, 'AI Hand-off');
    alert(`Ticket #${ticket.ticketID} handed off to AI assistant`);
  };

  const handleNeedInfo = (ticket: Ticket) => {
    processTicket(ticket, 'Needs More Info');
    alert(`Ticket #${ticket.ticketID} marked as awaiting more information`);
  };

  const getActionIcon = (action: string) => {
    switch(action) {
      case 'Resolved': return '✓';
      case 'Escalated': return '⬆';
      case 'AI Hand-off': return '🤖';
      case 'Needs More Info': return '?';
      default: return '•';
    }
  };

  const getActionColor = (action: string) => {
    switch(action) {
      case 'Resolved': return 'text-green-400';
      case 'Escalated': return 'text-orange-400';
      case 'AI Hand-off': return 'text-purple-400';
      case 'Needs More Info': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[url('/PurpleOmbreBG.png')] bg-cover bg-center bg-no-repeat">
      
      {/* Navigation Header */}
      <nav className="z-50 absolute top-5 left-5 right-5 flex items-center justify-between bg-black/70 px-10 py-4 rounded-full text-zinc-200 shadow-xl">
        <div className="flex items-center gap-20">
          <Link href="/" className="hover:text-[#ae97e7] font-bold text-2xl">
            ChAi TeaXt
          </Link>
          <div className="flex gap-10 text-2xl">
            <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
          </div>
        </div>
        
        <Link href="/login" className="text-xl hover:text-[#ae97e7] px-4 py-2 border border-[#ae97e7]/30 rounded-full">
          Log Out
        </Link>
      </nav>

      {/* Technician Name */}
      <div className="absolute top-28 right-5 z-40">
        <p className="text-zinc-400 text-lg">Technician</p>
        <p className="text-white text-3xl font-semibold">{technicianName}</p>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 pt-32 px-6 pb-12">
        <h1 className="text-4xl text-white mb-8 text-glow">Technician Dashboard</h1>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Ticket Lists */}
          <div className="lg:col-span-1 space-y-6">
            {/* Active Tickets */}
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                My Assigned Tickets ({tickets.length})
              </h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.ticketID}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      loadChatHistory(ticket);
                    }}
                    className={`bg-black/40 rounded-lg p-3 border cursor-pointer transition-all hover:border-[#ae97e7]/50 ${
                      selectedTicket?.ticketID === ticket.ticketID 
                        ? 'border-[#ae97e7] bg-[#ae97e7]/10' 
                        : 'border-[#ae97e7]/20'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white font-medium">Ticket #{ticket.ticketID}</span>
                    </div>
                    <p className="text-zinc-300 text-sm mb-1">{ticket.userName}</p>
                    <p className="text-zinc-400 text-xs truncate">{ticket.description}</p>
                    <p className="text-zinc-500 text-xs mt-1">
                      {formatTime(ticket.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Processed Tickets Section - Shows ALL actions */}
            <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-[#ae97e7]/20">
              <h2 className="text-2xl text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-purple-400 rounded-full mr-2"></span>
                Processed Tickets ({processedTickets.length})
              </h2>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {processedTickets.map((ticket) => (
                  <div
                    key={`${ticket.ticketID}-${ticket.actionTime}`}
                    className="bg-black/40 rounded-lg p-3 border border-[#ae97e7]/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white font-medium">Ticket #{ticket.ticketID}</span>
                      <span className={`${getActionColor(ticket.actionTaken || '')} text-xs flex items-center gap-1`}>
                        {getActionIcon(ticket.actionTaken || '')} {ticket.actionTaken}
                      </span>
                    </div>
                    <p className="text-zinc-300 text-sm mb-1">{ticket.userName}</p>
                    <p className="text-zinc-400 text-xs truncate">{ticket.description}</p>
                    {ticket.actionTime && (
                      <p className="text-zinc-500 text-xs mt-1">
                        {formatDate(ticket.actionTime)}
                      </p>
                    )}
                  </div>
                ))}
                {processedTickets.length === 0 && (
                  <p className="text-zinc-400 text-center py-4">No processed tickets yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Chat View */}
          <div className="lg:col-span-2">
            {showChatView && selectedTicket ? (
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-[#ae97e7]/20 flex flex-col h-[650px]">
                {/* Chat Header with Dropdown Action Menu */}
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#ae97e7]/20">
                  <div>
                    <h2 className="text-2xl text-white">
                      Ticket #{selectedTicket.ticketID} - {selectedTicket.userName}
                    </h2>
                    <p className="text-zinc-400 text-sm mt-1">{selectedTicket.description}</p>
                  </div>
                  
                  {/* Dropdown Menu for Actions */}
                  <div className="relative">
                    <button
                      onClick={() => setShowActionDropdown(showActionDropdown === selectedTicket.ticketID ? null : selectedTicket.ticketID)}
                      className="bg-[#ae97e7] hover:bg-[#5e17eb] text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors"
                    >
                      <span>Actions</span>
                      <span className="text-lg">▼</span>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {showActionDropdown === selectedTicket.ticketID && (
                      <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-sm border border-[#ae97e7]/30 rounded-lg shadow-xl z-50">
                        <button
                          onClick={() => handleResolve(selectedTicket)}
                          className="w-full text-left px-4 py-3 text-sm text-white hover:bg-green-600/30 first:rounded-t-lg flex items-center gap-3"
                        >
                          <span className="text-green-400">✓</span> Resolve Ticket
                        </button>
                        <button
                          onClick={() => handleEscalate(selectedTicket)}
                          className="w-full text-left px-4 py-3 text-sm text-white hover:bg-orange-600/30 flex items-center gap-3"
                        >
                          <span className="text-orange-400">⬆</span> Escalate
                        </button>
                        <button
                          onClick={() => handleAIHandoff(selectedTicket)}
                          className="w-full text-left px-4 py-3 text-sm text-white hover:bg-purple-600/30 flex items-center gap-3"
                        >
                          <span className="text-purple-400">🤖</span> AI Hand-off
                        </button>
                        <button
                          onClick={() => handleNeedInfo(selectedTicket)}
                          className="w-full text-left px-4 py-3 text-sm text-white hover:bg-blue-600/30 last:rounded-b-lg flex items-center gap-3"
                        >
                          <span className="text-blue-400">?</span> Need More Info
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Ticket Summary */}
                <div className="mb-4 p-3 bg-black/40 rounded-lg border border-[#ae97e7]/20">
                  <h3 className="text-md text-[#ae97e7] mb-2 font-medium">Ticket Summary</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-zinc-400 text-xs">Device Info</p>
                      <p className="text-white text-sm">{selectedTicket.deviceInfo || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">Category</p>
                      <p className="text-white text-sm capitalize">{selectedTicket.category || 'Not specified'}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">Created</p>
                      <p className="text-white text-sm">{formatDate(selectedTicket.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-zinc-400 text-xs">Last Updated</p>
                      <p className="text-white text-sm">{formatDate(selectedTicket.updatedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.role === 'user'
                            ? 'bg-[#ae97e7] text-white'
                            : msg.role === 'technician'
                            ? 'bg-green-600 text-white'
                            : 'bg-black/70 text-white'
                        }`}
                      >
                        <p className="text-xs opacity-75 mb-1">
                          {msg.role === 'user' ? msg.userName || 'User' : 
                           msg.role === 'technician' ? 'Technician' : 'AI Assistant'}
                        </p>
                        <p>{msg.chatMessages}</p>
                        <p className="text-xs opacity-50 mt-1">
                          {formatTime(msg.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="mt-auto">
                  <input
                    type="text"
                    placeholder="Type your response... (Demo - Not functional yet)"
                    disabled
                    className="w-full bg-black/40 border border-[#ae97e7]/20 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-[#ae97e7]"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6 border border-[#ae97e7]/20 h-[650px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl text-zinc-400 mb-2">Select a ticket to view chat</p>
                  <p className="text-zinc-500">Click on any ticket from your queue to see the conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 px-6 bg-black/70 text-zinc-200">
        <div className="mx-auto flex flex-col justify-between items-center gap-6">
          <div className="flex gap-10 text-xl">
            <Link href="/about" className="hover:text-[#ae97e7]">About</Link>
            <Link href="/developers" className="hover:text-[#ae97e7]">Developers</Link>
            <Link href="/help" className="hover:text-[#ae97e7]">Help</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-zinc-400 text-sm">
          &copy; {new Date().getFullYear()} ChAi TeaXt AI Help Desk System. All rights reserved.
        </div>
      </footer>
    </div>
  );
}