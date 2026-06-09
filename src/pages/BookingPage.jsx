// Main Booking Page - Professional UI Revamp
// Author: TechNexus Internship

import { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  CalendarCheck,
  FileText,
  AlertTriangle,
  Loader,
} from 'lucide-react';

import ServiceCard from '../components/ServiceCard';
import TimeSlotPicker from '../components/TimeSlotPicker';
import BookingSummary from '../components/BookingSummary';
import SuccessScreen from '../components/SuccessScreen';
import { SERVICES } from '../data/bookingData';

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Required';
    if (!phone.trim()) e.phone = 'Required';
    if (!selectedService) e.service = 'Select service';
    if (!selectedDate) e.date = 'Select date';
    if (!selectedTime) e.time = 'Select time';
    if (!address.trim()) e.address = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep(2);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setAddress('');
    setName('');
    setPhone('');
    setNotes('');
    setErrors({});
  };

  if (step === 2) {
    return (
      <SuccessScreen
        name={name}
        phone={phone}
        selectedService={selectedService}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        address={address}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER (Modern Blue Hero Style) */}
      <div className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#60A5FA] py-10 px-4 text-center relative overflow-hidden">
        {/* decorative shapes */}
        <div className="absolute -left-20 top-0 w-72 h-72 bg-white/10 rotate-45" />
        <div className="absolute -right-20 bottom-0 w-72 h-72 bg-white/10 rotate-45" />

        <div className="relative z-10">
          <p className="text-white/80 text-[11px] font-semibold tracking-widest uppercase">
            24/7 Fast Booking System
          </p>

          <h1 className="text-white text-3xl md:text-4xl font-black mt-2">
            BOOK A PLUMBER
          </h1>

          <p className="text-blue-100 text-xs mt-2 max-w-md mx-auto leading-relaxed">
            Quick, reliable and professional plumbing service at your doorstep
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-7">
          {/* SECTION 1 */}
          <SectionTitle icon={<User size={16} />} title="Personal Info" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            <Input
              label="Full Name"
              value={name}
              onChange={setName}
              placeholder="John Smith"
              error={errors.name}
            />
            <Input
              label="Phone"
              value={phone}
              onChange={setPhone}
              placeholder="+1 555 000"
              error={errors.phone}
            />
          </div>

          <Divider />

          {/* SECTION 2 */}
          <SectionTitle icon={<FileText size={16} />} title="Service Type" />
          {errors.service && <ErrorText text={errors.service} />}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
            {SERVICES.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                isSelected={selectedService === s.id}
                onSelect={() => setSelectedService(s.id)}
              />
            ))}
          </div>

          <Divider />

          {/* SECTION 3 */}
          <SectionTitle icon={<CalendarCheck size={16} />} title="Schedule" />

          <Input
            type="date"
            label="Date"
            value={selectedDate}
            onChange={setSelectedDate}
            min={today}
            error={errors.date}
          />

          <div className="mt-3">
            <TimeSlotPicker
              selected={selectedTime}
              onSelect={setSelectedTime}
            />
            {errors.time && <ErrorText text={errors.time} />}
          </div>

          <Divider />

          {/* SECTION 4 */}
          <SectionTitle icon={<MapPin size={16} />} title="Address" />

          <Input
            label="Full Address"
            value={address}
            onChange={setAddress}
            placeholder="Street, City"
            error={errors.address}
          />

          <textarea
            className="w-full mt-3 border border-gray-200 rounded-xl px-3 py-2 text-xs text-[#0F172A] focus:outline-none focus:ring-1 focus:ring-[#2563EB]"
            rows={3}
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {/* SUMMARY */}
          {selectedService && (
            <div className="mt-4">
              <BookingSummary
                selectedService={selectedService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                address={address}
              />
            </div>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-5 py-3 rounded-xl bg-[#2563EB] text-white text-sm font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            {loading ? <Loader size={16} className="animate-spin" /> : null}
            Confirm Booking
          </button>

          {/* EMERGENCY */}
          <a
            href="tel:+18005551234"
            className="w-full mt-3 py-2 rounded-xl bg-red-500 text-white text-xs font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition"
          >
            <AlertTriangle size={14} />
            Emergency Call
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function SectionTitle({ icon, title }) {
  return (
    <h2 className="flex items-center gap-2 text-sm font-semibold text-[#0F172A] mb-3">
      <span className="text-[#2563EB]">{icon}</span>
      {title}
    </h2>
  );
}

function Divider() {
  return <div className="my-5 border-t border-gray-100" />;
}

function Input({ label, error, ...props }) {
  return (
    <div>
      {label && <label className="text-xs text-[#64748B]">{label}</label>}
      <input
        {...props}
        className={`w-full mt-1 border rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#2563EB]
        ${error ? 'border-red-400' : 'border-gray-200'}`}
      />
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
    </div>
  );
}

function ErrorText({ text }) {
  return <p className="text-red-500 text-[10px] mt-2">{text}</p>;
}
