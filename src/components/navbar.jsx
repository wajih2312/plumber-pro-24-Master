// Navbar - Fixed with Auth Support
// Author: Wajeeha Habib | TechNexus Internship

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Clock, Mail } from 'lucide-react';
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/instagram.png';
import twitterIcon from '../assets/twitter.png';
import pinterestIcon from '../assets/pinterest.png';
import YoutubeIcon from '../assets/youtube (1).png';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT US', path: '/about' },
  { name: 'SERVICES', path: '/services' },
  { name: 'BLOG', path: '/blog' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50">
      {/* ── TOP INFO BAR ── */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-10 py-2 flex items-center justify-between text-xs text-[#64748B]">
        {/* Left */}
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#2563EB]" />
            92 Bowery St., New York, NY 10013
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-[#2563EB]" />
            Office Open: 9:00 AM – 8:00 PM
          </span>
          <span className="flex items-center gap-1">
            <Mail size={12} className="text-[#2563EB]" />
            plumb@plumbing.com
          </span>
        </div>

        {/* Right - Social Icons */}
        <div className="flex items-center gap-2 ml-auto">
          <a
            href="#"
            className="w-6 h-6 bg-[#F1F5F9] rounded flex items-center justify-center hover:bg-blue-50 transition"
          >
            <img src={facebookIcon} alt="Facebook" className="w-3 h-3" />
          </a>
          <a
            href="#"
            className="w-6 h-6 bg-[#F1F5F9] rounded flex items-center justify-center hover:bg-blue-50 transition"
          >
            <img src={instagramIcon} alt="Instagram" className="w-3 h-3" />
          </a>
          <a
            href="#"
            className="w-6 h-6 bg-[#F1F5F9] rounded flex items-center justify-center hover:bg-blue-50 transition"
          >
            <img src={twitterIcon} alt="Twitter" className="w-3 h-3" />
          </a>
          <a
            href="#"
            className="w-6 h-6 bg-[#F1F5F9] rounded flex items-center justify-center hover:bg-blue-50 transition"
          >
            <img src={pinterestIcon} alt="Pinterest" className="w-3 h-3" />
          </a>
          <a
            href="#"
            className="w-6 h-6 bg-[#F1F5F9] rounded flex items-center justify-center hover:bg-blue-50 transition"
          >
            <img src={YoutubeIcon} alt="Youtube" className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* ── MAIN NAVBAR ── */}
      <nav className="bg-white shadow-sm px-4 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src={logo}
            alt="Plumb & Plumbing Logo"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold tracking-wide transition-all
                ${isActive(link.path) ? 'text-[#2563EB]' : 'text-[#0F172A] hover:text-[#2563EB]'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Contact Us */}
          <Link
            to="/contact"
            className="px-5 py-2 border-2 border-pink-500 text-pink-500
              rounded-lg text-xs font-bold tracking-wider uppercase
              hover:bg-pink-500 hover:text-white transition"
          >
            CONTACT US
          </Link>

          {/* Logged In */}

          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="px-5 py-2 border-2 border-[#2563EB] text-[#2563EB]
              rounded-lg text-xs font-bold tracking-wider uppercase
              hover:bg-[#2563EB] hover:text-white transition"
              >
                LOGOUT
              </button>
              {/* Avatar circle - pink with first letter */}
              <Link
                to="/dashboard"
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <div
                  className="w-10 h-10 rounded-full bg-pink-500
        flex items-center justify-center text-white
        font-bold text-sm shadow-md"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </Link>

              {/* Logout - blue like login */}
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 border-2 border-[#2563EB] text-[#2563EB]
                  rounded-lg text-xs font-bold tracking-wider uppercase
                  hover:bg-[#2563EB] hover:text-white transition"
              >
                LOGIN
              </Link>
              <Link
                to="/booking"
                className="px-5 py-2 bg-[#2563EB] text-white
                  rounded-lg text-xs font-bold tracking-wider uppercase
                  hover:bg-blue-700 transition"
              >
                APPOINTMENT
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#0F172A] hover:text-[#2563EB] transition"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 pb-6 flex flex-col gap-3 shadow-lg">
          {/* Mobile Nav Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`py-3 px-4 rounded-lg text-sm font-semibold transition
                ${isActive(link.path) ? 'bg-[#2563EB] text-white' : 'text-[#0F172A] hover:bg-[#F1F5F9]'}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-2 mt-2">
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="py-3 text-center border-2 border-pink-500
                text-pink-500 rounded-lg text-xs font-bold uppercase
                hover:bg-pink-500 hover:text-white transition"
            >
              CONTACT US
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-center bg-[#10B981] text-white
                    rounded-lg text-xs font-bold uppercase
                    hover:bg-green-600 transition"
                >
                  MY DASHBOARD
                </Link>
                <button
                  onClick={handleLogout}
                  className="py-3 text-center bg-[#DC2626] text-white
                    rounded-lg text-xs font-bold uppercase
                    hover:bg-red-700 transition"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-center border-2 border-[#2563EB]
                    text-[#2563EB] rounded-lg text-xs font-bold uppercase
                    hover:bg-[#2563EB] hover:text-white transition"
                >
                  LOGIN
                </Link>
                <Link
                  to="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-center bg-[#2563EB] text-white
                    rounded-lg text-xs font-bold uppercase
                    hover:bg-blue-700 transition"
                >
                  APPOINTMENT
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
