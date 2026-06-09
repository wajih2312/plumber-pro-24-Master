// Contact Page - Exact design match
// Author: Wajeeha Habib | TechNexus Internship

import { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Replace with real emailjs or API call
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── PAGE HERO BANNER ── */}
      {/* ── PAGE HERO (LOGIN STYLE) ── */}
      <div className="min-h-[100px] flex items-center justify-center px-4 py-10 bg-white">
        <div className="w-full max-w-6xl rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          {/* LEFT GRADIENT SIDE (like login page) */}
          <div className="hidden md:flex w-[40%] bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] relative">
            <div className="absolute -left-24 top-0 w-64 h-64 rotate-45 bg-white/10" />
            <div className="absolute -left-20 bottom-0 w-64 h-64 rotate-45 bg-pink-400/20" />

            <div className="relative z-10 flex flex-col justify-center items-center text-center px-6">
              <p className="text-white/80 text-[11px] font-bold tracking-widest uppercase">
                Get In Touch
              </p>

              <h1 className="text-white text-3xl font-black mt-2">
                CONTACT US
              </h1>

              <p className="text-blue-100 text-[11px] mt-2 leading-snug">
                We are available 24/7 for emergencies and support.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex-1 bg-white p-6 md:p-10 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-black text-[#0F172A]">
              Need Help?
            </h2>

            <p className="text-xs text-[#64748B] mt-1">
              Plumbing emergency or quotation — we’re one click away.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5 justify-center md:justify-start">
              <a
                href="tel:+18005551234"
                className="bg-[#DC2626] text-white px-5 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition"
              >
                Emergency Call
              </a>

              <a
                href="https://wa.me/18005551234"
                className="bg-[#10B981] text-white px-5 py-2 rounded-full text-xs font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTACT INFO CARDS ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <Mail size={28} className="text-[#2563EB]" />,
              title: 'Email',
              value: 'support@plumberpro.com',
              href: 'mailto:support@plumberpro.com',
            },
            {
              icon: <Phone size={28} className="text-[#2563EB]" />,
              title: 'Phone',
              value: '+1 800 555 1234',
              href: 'tel:+18005551234',
            },
            {
              icon: <MapPin size={28} className="text-[#2563EB]" />,
              title: 'Address',
              value: '92 Bowery St, New York, NY 10013',
              href: '#',
            },
          ].map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="bg-[#F1F5F9] rounded-2xl p-6 text-center
                hover:shadow-lg hover:-translate-y-1 transition
                group cursor-pointer"
            >
              {/* Icon circle */}
              <div
                className="w-14 h-14 bg-white rounded-2xl
                flex items-center justify-center mx-auto mb-4
                shadow-sm group-hover:bg-[#2563EB] transition"
              >
                <div className="group-hover:text-white transition">
                  {card.icon}
                </div>
              </div>
              <h3
                className="font-bold font-poppins text-[#0F172A]
                text-lg mb-2"
              >
                {card.title}
              </h3>
              <p className="text-[#64748B] text-sm">{card.value}</p>
            </a>
          ))}
        </div>

        {/* ── BUSINESS HOURS + FORM + MAP ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* ── LEFT - Form ── */}
          <div className="bg-[#F1F5F9] rounded-3xl p-8">
            <h2
              className="font-black font-poppins text-[#0F172A]
              text-2xl mb-2"
            >
              Send Us a Message
            </h2>
            <p className="text-[#64748B] text-sm mb-6">
              Fill the form below and we'll get back to you shortly.
            </p>

            {/* Success Message */}
            {submitted ? (
              <div
                className="bg-green-50 border border-green-200
                rounded-2xl p-6 text-center"
              >
                <CheckCircle
                  size={48}
                  className="text-[#10B981] mx-auto mb-3"
                />
                <h3
                  className="font-bold font-poppins text-[#0F172A]
                  text-lg mb-2"
                >
                  Message Sent!
                </h3>
                <p className="text-[#64748B] text-sm">
                  Thank you! We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2 bg-[#2563EB] text-white
                    rounded-lg font-bold text-sm hover:bg-blue-700
                    transition"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    className="block text-sm font-semibold
                    text-[#64748B] mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. John Smith"
                    className="w-full border border-gray-200 bg-white
                      rounded-xl px-4 py-3 text-sm text-[#0F172A]
                      focus:outline-none focus:ring-2
                      focus:ring-[#2563EB]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    className="block text-sm font-semibold
                    text-[#64748B] mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="e.g. john@email.com"
                    className="w-full border border-gray-200 bg-white
                      rounded-xl px-4 py-3 text-sm text-[#0F172A]
                      focus:outline-none focus:ring-2
                      focus:ring-[#2563EB]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="block text-sm font-semibold
                    text-[#64748B] mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 555 000 1234"
                    className="w-full border border-gray-200 bg-white
                      rounded-xl px-4 py-3 text-sm text-[#0F172A]
                      focus:outline-none focus:ring-2
                      focus:ring-[#2563EB]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    className="block text-sm font-semibold
                    text-[#64748B] mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your plumbing issue..."
                    className="w-full border border-gray-200 bg-white
                      rounded-xl px-4 py-3 text-sm text-[#0F172A]
                      focus:outline-none focus:ring-2
                      focus:ring-[#2563EB] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`w-full py-4 bg-[#2563EB] text-white
                    rounded-xl font-bold text-sm uppercase tracking-wider
                    hover:bg-blue-700 transition flex items-center
                    justify-center gap-2
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={16} /> SEND MESSAGE
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT - Map + Hours ── */}
          <div className="flex flex-col gap-6">
            {/* Google Map */}
            <div
              className="bg-[#F1F5F9] rounded-3xl overflow-hidden
              flex-1 min-h-64"
            >
              <iframe
                title="New York Map"
                src="https://www.google.com/maps?q=92+Bowery+St,+New+York,+NY+10013&output=embed"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>

            {/* Business Hours */}
            <div className="bg-[#2563EB] rounded-3xl p-6">
              <h3
                className="font-bold font-poppins text-white
                text-lg mb-4 flex items-center gap-2"
              >
                <Clock size={20} className="text-[#f3f4f7]" />
                Business Hours
              </h3>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '8:00 AM - 8:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM - 6:00 PM' },
                  { day: 'Sunday', hours: 'Emergency Only' },
                  {
                    day: '24/7 Emergency',
                    hours: '+1 800 555 1234',
                    highlight: true,
                  },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between items-center
                      py-2 border-b border-slate-700"
                  >
                    <span className="text-[#ffffff] text-sm">{item.day}</span>
                    <span
                      className={`text-sm font-semibold
                      ${item.highlight ? 'text-[#2563EB]' : 'text-white'}`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
