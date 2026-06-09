// About Section - exact match to design
// Author: Wajeeha Habib | TechNexus Internship

import { Link } from 'react-router-dom';
import heroImg from '../assets/07.png';

export default function About() {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div
        className="max-w-7xl mx-auto grid lg:grid-cols-2
        gap-12 items-center"
      >
        {/* ── LEFT - Image ── */}
        <div className="relative">
          {/* Gray image box */}
          <div
            className="bg-[#F1F5F9] rounded-1xl overflow-hidden
            h-96 md:h-[480px] w-fit mx-auto flex items-end justify-center relative"
          >
            {/* Plumber image */}
            <img
              src={heroImg}
              alt="Expert Plumber"
              className="h-full object-contain object-bottom"
            />
          </div>
        </div>

        {/* ── RIGHT - Content ── */}
        <div className="pt-8 lg:pt-0">
          {/* About Us label */}
          <p
            className="text-[#2563EB] text-xs font-bold tracking-widest
            uppercase mb-3"
          >
            About Us
          </p>

          {/* Main Heading */}
          <h2
            className="font-black font-poppins text-[#0F172A] uppercase
            leading-tight text-3xl md:text-4xl mb-4"
          >
            Keeping Your Pipes
            <br />
            Flowing Smoothly
            <span className="text-pink-500">—24/7</span>
          </h2>

          {/* Paragraph */}
          <p className="text-[#64748B] text-sm leading-relaxed mb-8">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" by Cicero,
            written in 45 BC.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link to="/booking">
              <button
                className="px-8 py-3 bg-[#2563EB] text-white
                rounded-lg font-bold text-sm tracking-wider uppercase
                hover:bg-blue-700 transition shadow-lg shadow-blue-200"
              >
                BOOK NOW
              </button>
            </Link>

            <Link to="/about">
              <button
                className="px-8 py-3 bg-white text-[#0F172A]
                rounded-lg font-bold text-sm tracking-wider uppercase
                border border-gray-200 hover:border-[#2563EB]
                hover:text-[#2563EB] transition"
              >
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
