// Booking Summary Box
// Shows live preview of what user has selected
// Author: Taimoor Amin | TechNexus Internship | 25 May 2026

import { CalendarCheck, Clock, MapPin, Wrench, DollarSign } from 'lucide-react';
import { SERVICES } from '../data/bookingData';

export default function BookingSummary({
  selectedService,
  selectedDate,
  selectedTime,
  address,
}) {
  // Find full service object
  const service = SERVICES.find((s) => s.id === selectedService);
  if (!service) return null;

  return (
    <div className="bg-[#F1F5F9] border border-gray-200 rounded-2xl p-5 mb-6">
      <h3 className="font-bold font-poppins text-[#0F172A] mb-4 flex items-center gap-2">
        📋 Booking Summary
      </h3>

      <div className="space-y-3">
        {/* Service */}
        <div className="flex justify-between items-center py-2 border-b border-blue-100">
          <span className="flex items-center gap-2 text-sm text-[#64748B]">
            <Wrench size={14} /> Service
          </span>
          <span className={`font-semibold text-sm ${service.textColor}`}>
            {service.label}
          </span>
        </div>

        {/* Date */}
        {selectedDate && (
          <div className="flex justify-between items-center py-2 border-b border-blue-100">
            <span className="flex items-center gap-2 text-sm text-[#64748B]">
              <CalendarCheck size={14} /> Date
            </span>
            <span className="font-semibold text-sm text-[#0F172A]">
              {selectedDate}
            </span>
          </div>
        )}

        {/* Time */}
        {selectedTime && (
          <div className="flex justify-between items-center py-2 border-b border-blue-100">
            <span className="flex items-center gap-2 text-sm text-[#64748B]">
              <Clock size={14} /> Time
            </span>
            <span className="font-semibold text-sm text-[#0F172A]">
              {selectedTime}
            </span>
          </div>
        )}

        {/* Address */}
        {address && (
          <div className="flex justify-between items-center py-2 border-b border-blue-100">
            <span className="flex items-center gap-2 text-sm text-[#64748B]">
              <MapPin size={14} /> Address
            </span>
            <span className="font-semibold text-sm text-[#0F172A] text-right max-w-xs">
              {address}
            </span>
          </div>
        )}

        {/* Price - highlighted */}
        <div className="flex justify-between items-center py-2">
          <span className="flex items-center gap-2 text-sm text-[#64748B]">
            <DollarSign size={14} /> Estimated Rate
          </span>
          <span className="font-bold text-[#2563EB] text-base">
            {service.price}
          </span>
        </div>
      </div>
    </div>
  );
}
