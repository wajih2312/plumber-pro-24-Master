// Footer - Exact match to design
// Author: Wajeeha Habib | TechNexus Internship

import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
// ✅ Add karo
import logo from '../assets/13.png';

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .footer-heading {
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 3px;
        }
      `}</style>

      <footer style={{ background: '#000000' }} className="text-white">
        {/* ══ TOP SECTION ══ */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-10
  pt-8 pb-6
  grid md:grid-cols-2 gap-6 items-start"
        >
          {/* ── LEFT - Big Text ── */}
          <div>
            {/* White circle email icon */}
            <div
              className="w-10 h-10 bg-white rounded-full
  flex items-center justify-center mb-3 shadow-lg"
            >
              <Mail size={16} className="text-black" />
            </div>

            {/* Big heading - Bebas Neue */}
            <h2
              className="footer-heading text-white leading-none
  text-3xl md:text-4xl lg:text-5xl mb-4"
            >
              TAKE A CHANCE &<br />
              BE YOUR OWN BOSS
            </h2>
          </div>

          {/* ── RIGHT - Subscribe ── */}
          <div className="md:pt-8">
            {/* Stay Up To Date */}
            <p
              className="footer-heading text-white text-lg
  tracking-widest mb-3"
            >
              STAY UP TO DATE
            </p>

            {/* Email Input + Subscribe Button */}
            <div className="flex">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="flex-1 bg-[#111111] border border-[#333333]
                  rounded-l-lg px-5 py-4 text-sm text-white
                  placeholder:text-[#555555]
                  placeholder:tracking-widest
                  focus:outline-none focus:border-[#2563EB]"
              />
              <button
                className="px-6 py-4 bg-[#2563EB] text-white
                rounded-r-lg font-bold text-sm tracking-widest
                uppercase hover:bg-blue-700 transition flex-shrink-0"
              >
                SUBSCRIBE
              </button>
            </div>

            {/* Privacy note */}
            <p className="text-[#555555] text-xs mt-4 tracking-wide">
              BY SUBSCRIBING YOU AGREE TO WITH OUR{' '}
              <a
                href="#"
                className="text-white font-bold hover:text-[#2563EB]
                  transition"
              >
                PRIVACY POLICY!
              </a>
            </p>
          </div>
        </div>

        {/* ══ HORIZONTAL DIVIDER ══ */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <hr className="border-[#222222]" />
        </div>

        {/* ══ BOTTOM 4 COLUMNS ══ */}
        <div
          className="max-w-7xl mx-auto px-6 md:px-10
  py-6 grid grid-cols-2 md:grid-cols-4 gap-6 items-start"
        >
          {/* Column 1 - Logo + About + Social */}
          <div>
            {/* Logo placeholder box */}

            <div className="mb-4">
              <img
                src={logo}
                alt="Plumb & Plumbing Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            {/* About heading */}
            <p
              className="footer-heading text-white text-base
  tracking-widest mb-3"
            >
              ABOUT
            </p>
            {/* About links */}
            <ul className="space-y-3 mb-6">
              <li>
                <a
                  href="#"
                  className="text-[#666666] text-xs tracking-wider
                    hover:text-white transition uppercase"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
            {/* Social Icons */}
            {/* Facebook */}
            <a
              href="#"
              className="w-9 h-9 border border-[#333333] rounded-full
    flex items-center justify-center
    hover:bg-[#2563EB] hover:border-[#2563EB] transition p-2"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                className="w-4 h-4 filter invert"
              />
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-9 h-9 border border-[#333333] rounded-full
    flex items-center justify-center
    hover:bg-pink-500 hover:border-pink-500 transition p-2"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                className="w-4 h-4 filter invert"
              />
            </a>
          </div>

          {/* Column 2 - Quick Link */}
          <div>
            <p
              className="footer-heading text-white text-base
  tracking-widest mb-3"
            >
              QUICK LINK
            </p>
            <ul className="space-y-3">
              {[
                { name: 'HOME', path: '/' },
                { name: 'ABOUT US', path: '/about' },
                { name: 'SERVICE', path: '/services' },
                { name: 'BLOG', path: '/blog' },
                { name: 'CONTACT US', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-[#666666] text-xs tracking-wider
                      hover:text-white transition uppercase"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - FAQ's */}
          <div>
            <p
              className="footer-heading text-white text-base
  tracking-widest mb-3"
            >
              FAQ'S
            </p>
            <ul className="space-y-3">
              {[
                'WHO IS THIS FOR?',
                'CAN NON MEDICS GET INSURED?',
                'HOW LONG DOES BOTOX TRAINING TAKE?',
                'HOW MUCH DOES AESTHETICS TRAINING COST?',
                'BOTOX TRAINING FOR NON MEDICS',
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[#666666] text-xs tracking-wider
                      hover:text-white transition leading-relaxed
                      block uppercase"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Us */}
          <div>
            <p
              className="footer-heading text-white text-base
  tracking-widest mb-3"
            >
              CONTACT US
            </p>
            <ul className="space-y-4">
              {/* Address */}
              <li
                className="text-[#666666] text-xs tracking-wider
                uppercase leading-relaxed"
              >
                23 PORTLAND STREET
              </li>

              <li
                className="text-[#666666] text-xs tracking-wider
                uppercase leading-relaxed"
              >
                KILMARNOCK KA1 1JN
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:info@scottishschoolofaesthetics.co.uk"
                  className="text-[#666666] text-xs tracking-wider
                    hover:text-white transition break-all uppercase"
                >
                  INFO@SCOTTISHSCHOOLOFAESTHETICS.CO.UK
                </a>
              </li>

              {/* Phone */}
              <li>
                <a
                  href="tel:01414714025"
                  className="text-[#666666] text-xs tracking-wider
                    hover:text-white transition uppercase"
                >
                  0141 471 4025
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ══ HORIZONTAL DIVIDER ══ */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <hr className="border-[#222222]" />
        </div>

        {/* ══ COPYRIGHT BAR ══ */}
        <div className="py-3 px-6 md:px-10 text-center">
          <p className="text-[#555555] text-xs tracking-widest uppercase">
            COPYRIGHT BY PLUMB AND PLUMBING 2024!
          </p>
        </div>
      </footer>
    </>
  );
}
