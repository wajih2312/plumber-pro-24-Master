// Admin Dashboard Page
// Shows stats, booking breakdown, service charts, country distribution
// Author: Minahil Jehanzaib | TechNexus Internship | 25 May 2026

import { BookOpen, DollarSign, Wrench, Clock } from 'lucide-react';

export default function AdminDashboard({ plumbers, bookings, users }) {
  // Calculate stats from data
  const totalBookings = bookings.length;
  const totalRevenue = bookings
    .filter((b) => b.status === 'completed')
    .reduce((s, b) => s + b.price, 0);
  const activePlumbers = plumbers.filter((p) => p.available).length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;

  // Status color map
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-[#2563EB]',
    in_progress: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-[#10B981]',
    cancelled: 'bg-red-100 text-[#DC2626]',
  };

  // Count bookings by status
  const statusCounts = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold font-poppins text-[#0F172A] mb-6">
        Dashboard Overview
      </h1>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total Bookings',
            value: totalBookings,
            icon: <BookOpen size={22} />,
            color: 'text-[#2563EB]',
            bg: 'bg-blue-50',
          },
          {
            label: 'Total Revenue',
            value: `$${totalRevenue}`,
            icon: <DollarSign size={22} />,
            color: 'text-[#10B981]',
            bg: 'bg-green-50',
          },
          {
            label: 'Active Plumbers',
            value: activePlumbers,
            icon: <Wrench size={22} />,
            color: 'text-yellow-600',
            bg: 'bg-yellow-50',
          },
          {
            label: 'Pending Bookings',
            value: pendingBookings,
            icon: <Clock size={22} />,
            color: 'text-[#DC2626]',
            bg: 'bg-red-50',
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div
              className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-3`}
            >
              {stat.icon}
            </div>
            <p className={`text-3xl font-bold font-poppins ${stat.color}`}>
              {stat.value}
            </p>
            <p className="text-sm text-[#64748B] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ===== CHARTS ROW ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bookings by Service */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold font-poppins text-[#0F172A] mb-4">
            Bookings by Service
          </h3>
          {[
            { type: 'Emergency', color: 'bg-[#DC2626]' },
            { type: 'Routine', color: 'bg-[#2563EB]' },
            { type: 'Installation', color: 'bg-[#10B981]' },
          ].map(({ type, color }) => {
            const count = bookings.filter((b) => b.service === type).length;
            const pct = Math.round((count / totalBookings) * 100);
            return (
              <div key={type} className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#0F172A]">{type}</span>
                  <span className="font-semibold text-[#64748B]">
                    {count} ({pct}%)
                  </span>
                </div>
                <div className="bg-[#F1F5F9] rounded-full h-2">
                  <div
                    className={`${color} h-2 rounded-full transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bookings by Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold font-poppins text-[#0F172A] mb-4">
            Bookings by Status
          </h3>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between py-1 border-b border-[#F1F5F9]"
              >
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}
                >
                  {status.replace('_', ' ')}
                </span>
                <span className="font-bold text-[#0F172A]">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clients by Country */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold font-poppins text-[#0F172A] mb-4">
            Clients by Country
          </h3>
          <div className="space-y-3">
            {['USA', 'UK', 'UAE', 'Canada'].map((country) => {
              const count = users.filter((u) => u.country === country).length;
              return (
                <div
                  key={country}
                  className="flex items-center justify-between py-2 border-b border-[#F1F5F9]"
                >
                  <span className="text-sm text-[#0F172A] font-medium">
                    {country}
                  </span>
                  <span className="font-bold text-[#2563EB]">
                    {count} clients
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
