// Booking page constants - services and time slots
// Author: Taimoor Amin | TechNexus Internship | 25 May 2026

export const SERVICES = [
  {
    id: 'emergency',
    label: 'Emergency',
    icon: 'AlertTriangle',
    desc: 'Burst pipes, floods, gas leaks',
    price: '$150/hr',
    color: '#DC2626',
    bg: 'bg-red-50',
    border: 'border-red-500',
    textColor: 'text-[#DC2626]',
  },
  {
    id: 'routine',
    label: 'Routine',
    icon: 'Wrench',
    desc: 'Leaks, blockages, maintenance',
    price: '$80/hr',
    color: '#2563EB',
    bg: 'bg-blue-50',
    border: 'border-[#2563EB]',
    textColor: 'text-[#2563EB]',
  },
  {
    id: 'installation',
    label: 'Installation',
    icon: 'Hammer',
    desc: 'New fixtures, water heaters',
    price: '$120/hr',

    color: '#2563EB',
    bg: 'bg-blue-50',
    border: 'border-[#2563EB]',
    textColor: 'text-[#2563EB]',
  },
];

export const TIME_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];
