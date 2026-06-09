// Service Selection Card Component
// Shows Emergency / Routine / Installation options
// Author: Taimoor Amin | TechNexus Internship | 25 May 2026

import { AlertTriangle, Wrench, Hammer } from 'lucide-react';

// Map icon names to actual lucide components
const iconMap = {
  AlertTriangle: <AlertTriangle size={32} />,
  Wrench: <Wrench size={32} />,
  Hammer: <Hammer size={32} />,
};

export default function ServiceCard({ service, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={`
        cursor-pointer rounded-2xl p-5 border-2 flex flex-col items-center gap-2
        transition-all duration-200 hover:shadow-md
        ${
          isSelected
            ? `${service.bg} ${service.border} shadow-md`
            : 'bg-white border-gray-200 hover:border-gray-300'
        }
      `}
    >
      {/* Icon */}
      <div className={`${service.textColor}`}>{iconMap[service.icon]}</div>

      {/* Label */}
      <p
        className={`font-bold font-poppins text-base ${isSelected ? service.textColor : 'text-[#0F172A]'}`}
      >
        {service.label}
      </p>

      {/* Description */}
      <p className="text-xs text-[#64748B] text-center">{service.desc}</p>

      {/* Price */}
      <p className={`text-sm font-bold ${service.textColor}`}>
        {service.price}
      </p>

      {/* Selected indicator */}
      {isSelected && (
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs`}
          style={{ background: service.color }}
        >
          ✓
        </div>
      )}
    </div>
  );
}
