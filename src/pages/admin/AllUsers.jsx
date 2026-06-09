// All Users Page
// Shows all registered clients with their details
// Author: Minahil Jehanzaib | TechNexus Internship | 25 May 2026

import { Users } from 'lucide-react';

export default function AllUsers({ users }) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold font-poppins text-[#0F172A] mb-6">
        All Registered Clients
      </h1>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {['USA', 'UK', 'UAE', 'Canada'].map((country) => (
          <div
            key={country}
            className="bg-white rounded-2xl p-4 text-center shadow-sm"
          >
            <p className="text-3xl font-bold font-poppins text-[#2563EB]">
              {users.filter((u) => u.country === country).length}
            </p>
            <p className="text-sm text-[#64748B] mt-1">{country} Clients</p>
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
                'Name',
                'Email',
                'Phone',
                'Country',
                'Joined',
                'Bookings',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#F8FAFC] transition">
                <td className="px-6 py-4 text-[#64748B]">{u.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center text-xs font-bold">
                      {u.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <span className="font-semibold text-[#0F172A]">
                      {u.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-[#2563EB]">{u.email}</td>
                <td className="px-6 py-4 text-[#64748B]">{u.phone}</td>
                <td className="px-6 py-4">
                  <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full text-xs font-semibold">
                    {u.country}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#64748B] text-xs">{u.joined}</td>
                <td className="px-6 py-4 font-bold text-[#2563EB] text-base">
                  {u.bookings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARDS ===== */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div key={u.id} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold">
                  {u.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <p className="font-semibold text-[#0F172A]">{u.name}</p>
                  <p className="text-xs text-[#2563EB]">{u.email}</p>
                </div>
              </div>
              <span className="bg-[#F1F5F9] text-[#64748B] px-3 py-1 rounded-full text-xs font-semibold">
                {u.country}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#F1F5F9] rounded-lg p-2">
                <p className="text-xs text-[#64748B]">Phone</p>
                <p className="font-semibold text-[#0F172A] text-xs">
                  {u.phone}
                </p>
              </div>
              <div className="bg-[#F1F5F9] rounded-lg p-2">
                <p className="text-xs text-[#64748B]">Joined</p>
                <p className="font-semibold text-[#0F172A] text-xs">
                  {u.joined}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-2">
                <p className="text-xs text-[#64748B]">Bookings</p>
                <p className="font-bold text-[#2563EB]">{u.bookings}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
