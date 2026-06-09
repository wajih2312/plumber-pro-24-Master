// Admin Panel Layout - Sidebar + Header + Content
// Author: Minahil Jehanzaib | TechNexus Internship

import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Wrench,
  ClipboardList,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import logo from '../assets/logo.png';

const navItems = [
  { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
  {
    to: '/admin/plumbers',
    icon: <Wrench size={20} />,
    label: 'Plumber Management',
  },
  {
    to: '/admin/bookings',
    icon: <ClipboardList size={20} />,
    label: 'Booking Assignment',
  },
  { to: '/admin/users', icon: <Users size={20} />, label: 'All Users' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      {/* ══ MOBILE OVERLAY ══ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ══ SIDEBAR ══ */}

      <aside
        className={`
  fixed top-0 left-0 h-screen w-64 z-30
  flex flex-col
  transform transition-transform duration-300
  ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:translate-x-0
  bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#60A5FA]
  overflow-hidden
`}
      >
        {/* ── Decorative shapes like login ── */}
        <div
          className="absolute -left-16 top-0 w-48 h-48
          rotate-45 bg-white/10 pointer-events-none"
        />
        <div
          className="absolute -left-12 top-20 w-48 h-48
          rotate-45 bg-white/10 pointer-events-none"
        />
        <div
          className="absolute -left-10 bottom-20 w-40 h-40
          rotate-45 bg-pink-400/20 pointer-events-none"
        />
        <div
          className="absolute right-0 bottom-0 w-32 h-32
          rotate-45 bg-white/5 pointer-events-none"
        />

        {/* ── Logo ── */}
        <div
          className="relative z-10 p-5 border-b border-white/20
          flex items-center justify-between"
        >
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img
              src={logo}
              alt="Logo"
              className="h-12 w-auto object-contain
                hover:opacity-80 transition cursor-pointer
                brightness-0 invert"
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Admin Badge ── */}
        <div
          className="relative z-10 px-5 py-4
          border-b border-white/20"
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-white/20
              border-2 border-white/40 flex items-center
              justify-center text-white font-bold text-sm"
            >
              A
            </div>
            <div>
              <p className="text-white font-bold text-sm">{user?.name}</p>
              <p className="text-blue-100 text-xs">Administrator</p>
            </div>
          </div>
        </div>

        {/* ── Nav Links ── */}
        <nav className="relative z-10 flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 text-sm
                ${
                  isActive
                    ? 'bg-white text-[#2563EB] font-bold shadow-md'
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* ── Logout ── */}
        <div className="relative z-10 p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full
              text-white/70 hover:text-white hover:bg-white/20
              rounded-xl transition-all text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ══ MAIN CONTENT ══ */}
      <div
        className="flex-1 flex flex-col min-w-0 bg-[#F1F5F9]
  lg:ml-64"
      >
        {/* ── Header ── */}
        <header
          className="bg-white shadow-sm px-4 md:px-8 py-4
          flex items-center justify-between sticky top-0 z-10"
        >
          <div className="flex items-center gap-3">
            {/* Hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#0F172A]
                hover:text-[#2563EB]"
            >
              <Menu size={24} />
            </button>
            <h2
              className="text-base md:text-lg font-bold
              font-poppins text-[#0F172A]"
            >
              Admin Panel
            </h2>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#64748B] hidden md:block">
              {user?.email}
            </span>

            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full
              bg-gradient-to-br from-[#2563EB] to-pink-500
              text-white flex items-center justify-center
              font-bold text-sm shadow-md"
            >
              A
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2
                px-4 py-2 bg-[#2563EB] text-white rounded-lg
                text-xs font-bold uppercase hover:bg-blue-700
                transition"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
