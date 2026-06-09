// CTA Section - Exact gradient match to design
// Author: Wajeeha Habib | TechNexus Internship

import { Link } from 'react-router-dom';

export default function Cta() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>

      <section
        className="py-20 px-6 md:px-16 mx-4 md:mx-10 my-10
          rounded-3xl overflow-hidden relative"
        style={{
          background: `
            radial-gradient(ellipse at 0% 50%,   #f4a261 0%, transparent 55%),
            radial-gradient(ellipse at 25% 50%,  #f9c6d0 0%, transparent 50%),
            radial-gradient(ellipse at 55% 30%,  #c4b5fd 0%, transparent 55%),
            radial-gradient(ellipse at 100% 50%, #818cf8 0%, transparent 55%),
            radial-gradient(ellipse at 50% 100%, #a5b4fc 0%, transparent 50%),
            #ddd6fe
          `,
        }}
      >
        {/* Left warm peach blob */}
        <div
          className="absolute -left-10 top-0 w-80 h-80
            rounded-full blur-3xl opacity-50 pointer-events-none"
          style={{ background: '#f4a261' }}
        />

        {/* Center purple blob */}
        <div
          className="absolute left-1/2 top-1/2
            -translate-x-1/2 -translate-y-1/2
            w-96 h-96 rounded-full blur-3xl opacity-35
            pointer-events-none"
          style={{ background: '#c4b5fd' }}
        />

        {/* Right blue/indigo blob */}
        <div
          className="absolute -right-10 bottom-0 w-80 h-80
            rounded-full blur-3xl opacity-55 pointer-events-none"
          style={{ background: '#818cf8' }}
        />

        {/* ── Content ── */}
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Heading - Bebas Neue like design */}
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: '2px',
            }}
            className="text-[#0F172A] text-5xl md:text-6xl
              leading-tight mb-6"
          >
            WATCH YOUR BUSINESS GROW?
          </h2>

          {/* Paragraph */}
          <p
            className="text-[#0F172A]/70 text-sm md:text-base
            leading-relaxed max-w-2xl mx-auto mb-8 uppercase
            tracking-wide font-semibold"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
            ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
            accumsan lacus vel facilisis.
          </p>

          {/* Book Now Button */}
          <Link to="/booking">
            <button
              className="px-14 py-4 bg-[#2563EB] text-white
                rounded-xl font-bold text-sm tracking-widest uppercase
                hover:bg-blue-700 transition shadow-xl"
            >
              BOOK NOW
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
