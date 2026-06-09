// Support Tickets Page
// Allows client to raise issues and chat with support team
// Features: create ticket, view ticket chat, send messages, filter by status
// TODO: Replace initialTickets with POST /api/tickets API call when backend is ready
// Author: Fareeha Shah | TechNexus Internship | 18 May 2026
import { useState } from 'react';
import {
  Ticket,
  Plus,
  Send,
  X,
  CheckCircle,
  Clock,
  Loader,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';

// Sample tickets data
const initialTickets = [
  {
    id: 'TKT-001',
    subject: 'Plumber arrived late',
    status: 'resolved',
    date: '2026-05-15',
    messages: [
      {
        sender: 'client',
        text: 'My plumber was supposed to arrive at 10AM but came at 12PM.',
        time: '10:30 AM',
      },
      {
        sender: 'admin',
        text: 'We sincerely apologize for the delay. We have noted this issue and will ensure it does not happen again.',
        time: '11:00 AM',
      },
      {
        sender: 'client',
        text: 'Thank you for the response.',
        time: '11:15 AM',
      },
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Invoice amount incorrect',
    status: 'in_progress',
    date: '2026-05-17',
    messages: [
      {
        sender: 'client',
        text: 'I was charged $200 but the agreed price was $150.',
        time: '02:00 PM',
      },
      {
        sender: 'admin',
        text: 'We are reviewing your invoice. Please allow 24 hours.',
        time: '03:00 PM',
      },
    ],
  },
  {
    id: 'TKT-003',
    subject: 'Pipe still leaking after repair',
    status: 'open',
    date: '2026-05-18',
    messages: [
      {
        sender: 'client',
        text: 'The pipe that was repaired yesterday is still leaking.',
        time: '09:00 AM',
      },
    ],
  },
];

const statusConfig = {
  open: {
    label: 'Open',
    color: 'bg-red-100 text-[#DC2626]',
    icon: <AlertCircle size={14} />,
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Loader size={14} />,
  },
  resolved: {
    label: 'Resolved',
    color: 'bg-green-100 text-[#10B981]',
    icon: <CheckCircle size={14} />,
  },
};

export default function SupportTickets() {
  const [tickets, setTickets] = useState(initialTickets);
  const [filter, setFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [showNewForm, setShowNewForm] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Filter tickets
  const filtered =
    filter === 'all' ? tickets : tickets.filter((t) => t.status === filter);

  // Send message in ticket
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updated = tickets.map((t) =>
      t.id === selectedTicket.id
        ? {
            ...t,
            messages: [
              ...t.messages,
              {
                sender: 'client',
                text: newMessage,
                time: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ],
          }
        : t
    );
    setTickets(updated);
    setSelectedTicket(updated.find((t) => t.id === selectedTicket.id));
    setNewMessage('');
  };

  // Create new ticket
  const handleCreateTicket = () => {
    if (!newSubject.trim() || !newDesc.trim()) return;
    const newTicket = {
      id: `TKT-00${tickets.length + 1}`,
      subject: newSubject,
      status: 'open',
      date: new Date().toISOString().split('T')[0],
      messages: [
        {
          sender: 'client',
          text: newDesc,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ],
    };
    setTickets([newTicket, ...tickets]);
    setNewSubject('');
    setNewDesc('');
    setShowNewForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title + New Ticket Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold font-poppins text-[#0F172A]">
          Support Tickets
        </h1>
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          <Plus size={18} /> New Ticket
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          {
            label: 'Total Tickets',
            value: tickets.length,
            color: 'bg-[#F1F5F9] text-[#0F172A]',
          },
          {
            label: 'Open',
            value: tickets.filter((t) => t.status === 'open').length,
            color: 'bg-red-50 text-[#DC2626]',
          },
          {
            label: 'Resolved',
            value: tickets.filter((t) => t.status === 'resolved').length,
            color: 'bg-green-50 text-[#10B981]',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} rounded-2xl p-4 text-center shadow-sm`}
          >
            <p className="text-3xl font-bold font-poppins">{stat.value}</p>
            <p className="text-sm font-medium text-[#64748B] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'open', 'in_progress', 'resolved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition
              ${
                filter === tab
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-white text-[#64748B] border border-gray-200 hover:bg-[#F1F5F9]'
              }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#64748B]">
            <Ticket size={48} className="mx-auto mb-3 opacity-30" />
            <p className="font-medium">No tickets found</p>
          </div>
        )}

        {filtered.map((ticket) => {
          const status = statusConfig[ticket.status];
          return (
            <div
              key={ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              className="bg-white rounded-2xl shadow-sm p-6 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#2563EB]">
                  <Ticket size={22} />
                </div>
                <div>
                  <h3 className="font-semibold font-poppins text-[#0F172A]">
                    {ticket.subject}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-[#64748B]">
                    <span>{ticket.id}</span>
                    <span>•</span>
                    <span>{ticket.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={13} />
                      {ticket.messages.length} messages
                    </span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
              >
                {status.icon} {status.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* ===== NEW TICKET MODAL ===== */}
      {showNewForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-poppins text-[#0F172A]">
                Create New Ticket
              </h2>
              <button
                onClick={() => setShowNewForm(false)}
                className="text-[#64748B] hover:text-[#0F172A]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="text-sm font-semibold text-[#64748B] block mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="e.g. Pipe still leaking..."
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-[#64748B] block mb-2">
                Describe your issue
              </label>
              <textarea
                rows={4}
                placeholder="Please describe your problem in detail..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
              />
            </div>

            <button
              onClick={handleCreateTicket}
              className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Submit Ticket
            </button>
            <button
              onClick={() => setShowNewForm(false)}
              className="mt-3 w-full py-3 bg-[#F1F5F9] text-[#64748B] rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ===== TICKET CHAT MODAL ===== */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg flex flex-col"
            style={{ height: '90vh' }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="font-bold font-poppins text-[#0F172A]">
                  {selectedTicket.subject}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#64748B]">
                    {selectedTicket.id}
                  </span>
                  <span
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusConfig[selectedTicket.status].color}`}
                  >
                    {statusConfig[selectedTicket.status].icon}
                    {statusConfig[selectedTicket.status].label}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="text-[#64748B] hover:text-[#0F172A]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedTicket.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs rounded-2xl px-4 py-3 text-sm
                    ${
                      msg.sender === 'client'
                        ? 'bg-[#2563EB] text-white rounded-br-none'
                        : 'bg-[#F1F5F9] text-[#0F172A] rounded-bl-none'
                    }`}
                  >
                    <p className="font-semibold text-xs mb-1 opacity-70">
                      {msg.sender === 'client' ? 'You' : '🔧 Support Team'}
                    </p>
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-2 opacity-60 text-right`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            {selectedTicket.status !== 'resolved' ? (
              <div className="p-4 border-t border-gray-100 flex gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-[#2563EB] text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <Send size={18} />
                </button>
              </div>
            ) : (
              <div className="p-4 border-t border-gray-100 text-center text-sm text-[#10B981] font-semibold">
                ✅ This ticket has been resolved
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
