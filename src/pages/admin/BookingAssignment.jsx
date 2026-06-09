// Booking Assignment Page
// Admin assigns plumbers to bookings
// Author: Minahil Jehanzaib | TechNexus Internship | 25 May 2026

import { ClipboardList } from 'lucide-react';

// Status colors matching document palette
const statusConfig = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-[#2563EB]',
  in_progress: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-[#10B981]',
  cancelled: 'bg-red-100 text-[#DC2626]',
};

const serviceConfig = {
  Emergency: 'bg-red-100 text-[#DC2626]',
  Routine: 'bg-blue-100 text-[#2563EB]',
  Installation: 'bg-green-100 text-[#10B981]',
};

export default function BookingAssignment({ bookings, setBookings, plumbers }) {
  // Assign or unassign plumber to booking
  const assignPlumber = (bookingId, plumberName) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId
          ? {
              ...b,
              plumber: plumberName || null,
              status: plumberName ? 'confirmed' : 'pending',
            }
          : b
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold font-poppins text-[#0F172A] mb-6">
        Booking Assignment
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: 'Total',
            value: bookings.length,
            color: 'bg-[#F1F5F9] text-[#0F172A]',
          },
          {
            label: 'Pending',
            value: bookings.filter((b) => b.status === 'pending').length,
            color: 'bg-yellow-50 text-yellow-700',
          },
          {
            label: 'Confirmed',
            value: bookings.filter((b) => b.status === 'confirmed').length,
            color: 'bg-blue-50 text-[#2563EB]',
          },
          {
            label: 'Completed',
            value: bookings.filter((b) => b.status === 'completed').length,
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

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F1F5F9]">
            <tr>
              {[
                '#',
                'Client',
                'Service',
                'Address',
                'Scheduled',
                'Status',
                'Assign Plumber',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-[#F8FAFC] transition">
                <td className="px-5 py-4 font-semibold text-[#64748B]">
                  #{b.id}
                </td>
                <td className="px-5 py-4 font-semibold text-[#0F172A]">
                  {b.client}
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${serviceConfig[b.service]}`}
                  >
                    {b.service}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#64748B] max-w-32 truncate">
                  {b.address}
                </td>
                <td className="px-5 py-4 text-[#64748B] text-xs">{b.time}</td>
                <td className="px-5 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusConfig[b.status]}`}
                  >
                    {b.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <select
                    value={b.plumber || ''}
                    onChange={(e) => assignPlumber(b.id, e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-[#F1F5F9] cursor-pointer"
                  >
                    <option value="">— Unassigned —</option>
                    {plumbers
                      .filter((p) => p.available || p.name === b.plumber)
                      .map((p) => (
                        <option key={p.id} value={p.name}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARDS ===== */}
      <div className="md:hidden space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold font-poppins text-[#0F172A]">
                  {b.client}
                </p>
                <p className="text-xs text-[#64748B] mt-1">{b.time}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusConfig[b.status]}`}
              >
                {b.status.replace('_', ' ')}
              </span>
            </div>

            <div className="flex gap-2 mb-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${serviceConfig[b.service]}`}
              >
                {b.service}
              </span>
              <span className="text-xs text-[#64748B] flex items-center">
                ${b.price}
              </span>
            </div>

            <p className="text-xs text-[#64748B] mb-3">📍 {b.address}</p>

            {/* Assign Plumber Dropdown */}
            <div>
              <label className="text-xs font-semibold text-[#64748B] block mb-2">
                Assign Plumber
              </label>
              <select
                value={b.plumber || ''}
                onChange={(e) => assignPlumber(b.id, e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB] bg-[#F1F5F9]"
              >
                <option value="">— Unassigned —</option>
                {plumbers
                  .filter((p) => p.available || p.name === b.plumber)
                  .map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
