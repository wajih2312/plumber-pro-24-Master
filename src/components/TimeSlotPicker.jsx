// Time Slot Picker Component
// Shows clickable time slot buttons
// Author: Taimoor Amin | TechNexus Internship | 25 May 2026

import { Clock } from 'lucide-react';
import { TIME_SLOTS } from '../data/bookingData';

export default function TimeSlotPicker({ selected, onSelect }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-[#64748B] mb-3">
        <Clock size={16} className="text-[#2563EB]" />
        Preferred Time *
      </label>

      {/* Time slot grid */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`
              py-2 px-2 rounded-xl text-xs font-semibold border-2 transition-all
              ${
                selected === slot
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-gray-200 hover:border-[#2563EB] hover:text-[#2563EB]'
              }
            `}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
