// My Bookings Page
// Shows all bookings for the logged-in client
// Features: filter by status, view booking details, cancel booking
// TODO: Replace initialBookings with GET /api/bookings API call when backend is ready
// Author: Fareeha Shah | TechNexus Internship | 18 May 2026
import { useState } from 'react';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Wrench,
  X,
  CheckCircle,
  Loader,
  AlertCircle,
} from 'lucide-react';

// Sample bookings data
const initialBookings = [
  {
    id: 1,
    service: 'Emergency Plumbing',
    date: '2026-05-18',
    time: '10:00 AM',
    address: '92 Bowery St, New York, NY',
    status: 'confirmed',
    price: '$120',
    plumber: 'John Smith',
  },
  {
    id: 2,
    service: 'Drain Cleaning',
    date: '2026-05-20',
    time: '02:00 PM',
    address: '45 Main St, London, UK',
    status: 'pending',
    price: '$80',
    plumber: 'Not Assigned Yet',
  },
  {
    id: 3,
    service: 'Pipe Repair',
    date: '2026-05-15',
    time: '11:00 AM',
    address: '12 King St, Dubai, UAE',
    status: 'completed',
    price: '$150',
    plumber: 'Mike Johnson',
  },
  {
    id: 4,
    service: 'Water Heater Installation',
    date: '2026-05-10',
    time: '09:00 AM',
    address: '78 Queen Ave, Toronto, Canada',
    status: 'cancelled',
    price: '$200',
    plumber: 'David Lee',
  },
];

// Status config
const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-yellow-100 text-yellow-700',
    icon: <Clock size={14} />,
  },
  confirmed: {
    label: 'Confirmed',
    color: 'bg-blue-100 text-[#2563EB]',
    icon: <CheckCircle size={14} />,
  },
  completed: {
    label: 'Completed',
    color: 'bg-green-100 text-[#10B981]',
    icon: <CheckCircle size={14} />,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'bg-red-100 text-[#DC2626]',
    icon: <X size={14} />,
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-purple-100 text-purple-700',
    icon: <Loader size={14} />,
  },
};

export default function MyBookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Filter bookings
  const filtered =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  // Cancel booking
  const handleCancel = (id) => {
    setBookings(
      bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
    setSelectedBooking(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Title */}
      <h1 className="text-2xl font-bold font-poppins text-[#0F172A] mb-6">
        My Bookings
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

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(
          (tab) => (
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
              {tab}
            </button>
          )
        )}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#64748B]">
            <AlertCircle size={48} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No bookings found</p>
          </div>
        )}

        {filtered.map((booking) => {
          const status = statusConfig[booking.status];
          return (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedBooking(booking)}
            >
              {/* Left Side */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] flex items-center justify-center text-[#2563EB]">
                  <Wrench size={22} />
                </div>
                <div>
                  <h3 className="font-semibold font-poppins text-[#0F172A]">
                    {booking.service}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <CalendarCheck size={14} /> {booking.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {booking.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {booking.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-4 md:flex-col md:items-end">
                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                >
                  {status.icon} {status.label}
                </span>
                <span className="text-[#2563EB] font-bold text-lg">
                  {booking.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold font-poppins text-[#0F172A]">
                Booking Details
              </h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-[#64748B] hover:text-[#0F172A]"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-sm">
              {[
                { label: 'Service', value: selectedBooking.service },
                { label: 'Date', value: selectedBooking.date },
                { label: 'Time', value: selectedBooking.time },
                { label: 'Address', value: selectedBooking.address },
                { label: 'Plumber', value: selectedBooking.plumber },
                { label: 'Price', value: selectedBooking.price },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between py-2 border-b border-gray-100"
                >
                  <span className="text-[#64748B] font-medium">
                    {item.label}
                  </span>
                  <span className="text-[#0F172A] font-semibold">
                    {item.value}
                  </span>
                </div>
              ))}

              {/* Status Badge */}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-[#64748B] font-medium">Status</span>
                <span
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[selectedBooking.status].color}`}
                >
                  {statusConfig[selectedBooking.status].icon}
                  {statusConfig[selectedBooking.status].label}
                </span>
              </div>
            </div>

            {/* Cancel Button */}
            {selectedBooking.status !== 'cancelled' &&
              selectedBooking.status !== 'completed' && (
                <button
                  onClick={() => handleCancel(selectedBooking.id)}
                  className="mt-6 w-full py-3 bg-[#DC2626] text-white rounded-xl font-semibold hover:bg-red-700 transition"
                >
                  Cancel Booking
                </button>
              )}

            <button
              onClick={() => setSelectedBooking(null)}
              className="mt-3 w-full py-3 bg-[#F1F5F9] text-[#64748B] rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
