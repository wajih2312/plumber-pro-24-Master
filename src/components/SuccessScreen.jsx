// Success Screen - shown after booking is confirmed
// Author: Taimoor Amin | TechNexus Internship | 25 May 2026

import {
  CheckCircle,
  CalendarCheck,
  Clock,
  MapPin,
  Phone,
  Wrench,
} from 'lucide-react';
import { SERVICES } from '../data/bookingData';

export default function SuccessScreen({
  name,
  phone,
  selectedService,
  selectedDate,
  selectedTime,
  address,
  onReset,
}) {
  // Get service details
  const service = SERVICES.find((s) => s.id === selectedService);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-md p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 bg-[#10B981]">
          <CheckCircle size={48} className="text-white" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold font-poppins text-[#10B981] mb-2">
          Booking Confirmed!
        </h1>
        <p className="text-[#64748B] mb-6">
          Thank you <strong className="text-[#0F172A]">{name}</strong>! Your
          plumber is on the way.
        </p>

        {/* Booking Details */}
        <div className="bg-[#F1F5F9] rounded-2xl p-5 mb-6 text-left space-y-3">
          {[
            {
              icon: <Wrench size={15} />,
              label: 'Service',
              value: service?.label,
            },
            {
              icon: <CalendarCheck size={15} />,
              label: 'Date',
              value: selectedDate,
            },
            { icon: <Clock size={15} />, label: 'Time', value: selectedTime },
            { icon: <MapPin size={15} />, label: 'Address', value: address },
            { icon: <Phone size={15} />, label: 'Phone', value: phone },
          ].map((item) => (
            <div
              key={item.label}
              className="flex justify-between border-b border-gray-200 pb-2"
            >
              <span className="flex items-center gap-2 text-sm text-[#64748B]">
                {item.icon} {item.label}
              </span>
              <span className="text-sm font-semibold text-[#0F172A] text-right max-w-xs">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* SMS Note */}
        <div className="bg-green-50 rounded-xl p-3 mb-6">
          <p className="text-sm text-[#10B981] font-medium">
            📱 SMS confirmation will be sent to <strong>{phone}</strong>
          </p>
        </div>

        {/* Book Another Button */}
        <button
          onClick={onReset}
          className="w-full py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-blue-700 transition font-poppins"
        >
          Book Another Service
        </button>
      </div>
    </div>
  );
}
