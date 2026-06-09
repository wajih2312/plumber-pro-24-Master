// Hero Section - Exact match to design
// Author: Wajeeha Habib | TechNexus Internship

import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import heroImg from '../assets/hero1.png';

import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import tiktokIcon from '../assets/tiktok.png';
export default function Hero() {
  return (
    <section
      className="relative bg-white overflow-hidden min-h-[85vh]
      flex items-center"
    >
      {/* ── Gradient Blobs Background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Pink blob top left */}
        <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full
          opacity-20 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #ec4899, #f97316)' }}
        />

        {/* Blue blob center right */}
        <div
          className="absolute top-10 right-0 w-80 h-80 rounded-full
          opacity-20 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #2563EB, #06b6d4)' }}
        />

        {/* Purple blob bottom */}
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full
          opacity-10 blur-3xl"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563EB)' }}
        />
      </div>

      <div
        className="max-w-7xl mx-auto px-6 md:px-10 py-16
        grid lg:grid-cols-2 gap-12 items-center w-full relative z-10"
      >
        {/* ── LEFT CONTENT ── */}
        <div>
          {/* Main Heading */}
          <h1 className="font-black font-poppins leading-[1.05] mb-6">
            {/* Line 1 */}
            <div className="text-3xl md:text-4xl lg:text-5xl uppercase">
              <span className="text-[#2563EB]">RELIABLE</span>{' '}
              <span className="text-[#0F172A]">PLUMBING</span>
            </div>

            {/* Line 2 */}
            <div className="text-3xl md:text-4xl lg:text-5xl text-[#0F172A] uppercase">
              SOLUTIONS WHEN YOU
            </div>

            {/* Line 3 */}
            <div className="text-3xl md:text-4xl lg:text-5xl uppercase">
              <span className="text-[#0F172A]">NEED THEM </span>
              <span className="text-pink-500">MOST</span>
            </div>
          </h1>
          {/* Description */}
          <p className="text-[#64748B] text-sm leading-relaxed max-w-md mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link to="/booking">
              <button
                className="px-8 py-3 bg-[#2563EB] text-white
                rounded-lg font-bold text-sm hover:bg-blue-700 transition
                shadow-lg shadow-blue-200"
              >
                BOOK NOW
              </button>
            </Link>

            <Link to="/about">
              <button
                className="px-8 py-3 bg-white text-[#0F172A]
                rounded-lg font-bold text-sm border border-gray-200
                hover:border-[#2563EB] hover:text-[#2563EB] transition"
              >
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>

        {/* ── RIGHT IMAGE ── */}
        <div className="relative flex justify-center items-center">
          {/* Circle background gradient */}
          <div
            className="relative w-[430px] h-[430px] rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #e0f2fe, #bfdbfe, #ddd6fe)',
            }}
          >
            {/* Plumber Image */}
            <img
              src={heroImg}
              alt="Professional Plumber"
              className="absolute left-1/2 -translate-x-1/2
  bottom-[-20px] h-[98%] w-auto object-contain z-10"
            />
          </div>
          {/* Facebook - LEFT top */}
          <div
            className="absolute top-10 left-6 w-10 h-10 bg-white
  rounded-full shadow-lg flex items-center justify-center
  hover:scale-110 transition"
          >
            <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
          </div>

          {/* TikTok - LEFT middle */}
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2
  -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg
  flex items-center justify-center hover:scale-110 transition"
          >
            <img src={tiktokIcon} alt="TikTok" className="w-5 h-5" />
          </div>

          {/* Instagram - TOP RIGHT */}
          <div
            className="absolute top-4 right-4 w-10 h-10 bg-white
  rounded-full shadow-lg flex items-center justify-center
  hover:scale-110 transition"
          >
            <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
          </div>

          {/* Rating Badge - bottom right */}
          <div
            className="absolute bottom-1 right-[40px]
  bg-white rounded-2xl shadow-xl p-4 w-40 z-20"
          >
            <p
              className="text-[#64748B] text-xs font-semibold uppercase
              tracking-wider mb-1"
            >
              GROWTH RATE
            </p>
            <p className="text-[#0F172A] font-black font-poppins text-sm">
              PLUMB &
            </p>
            <p className="text-[#0F172A] font-black font-poppins text-sm mb-2">
              PLUMBING
            </p>
            {/* Stars */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
