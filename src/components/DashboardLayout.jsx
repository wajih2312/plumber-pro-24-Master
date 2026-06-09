import { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import {
  UserCircle,
  CalendarCheck,
  FileText,
  Ticket,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const navItems = [
  { to: '/dashboard', icon: <UserCircle size={18} />, label: 'Profile' },
  {
    to: '/dashboard/bookings',
    icon: <CalendarCheck size={18} />,
    label: 'Bookings',
  },
  {
    to: '/dashboard/invoices',
    icon: <FileText size={18} />,
    label: 'Invoices',
  },
  { to: '/dashboard/tickets', icon: <Ticket size={18} />, label: 'Tickets' },
];

export default function DashboardLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-[#F1F5F9]">
      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
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
        {/* decorative shapes */}
        <div className="absolute -left-16 top-0 w-48 h-48 rotate-45 bg-white/10" />
        <div className="absolute -left-12 top-20 w-48 h-48 rotate-45 bg-white/10" />
        <div className="absolute -left-10 bottom-20 w-40 h-40 rotate-45 bg-pink-400/20" />
        <div className="absolute right-0 bottom-0 w-32 h-32 rotate-45 bg-white/5" />

        {/* LOGO */}
        <div className="relative z-10 p-5 border-b border-white/20 flex items-center justify-between">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img
              src={logo}
              alt="logo"
              className="h-12 object-contain brightness-0 invert hover:opacity-80 transition"
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/80 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* USER */}
        <div className="relative z-10 px-5 py-4 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>

            <div>
              <p className="text-white font-bold text-sm">{user?.name}</p>
              <p className="text-blue-100 text-xs">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* NAV */}
        <nav className="relative z-10 flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm
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

        {/* LOGOUT */}
        <div className="relative z-10 p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-white/80 hover:text-white hover:bg-white/20 rounded-xl text-sm transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* HEADER */}
        <header className="bg-white shadow-sm px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#2563EB]"
            >
              <Menu size={22} />
            </button>

            <h2 className="text-base md:text-lg font-bold text-[#0F172A]">
              Welcome Back {user?.name}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#64748B] hidden md:block">
              {user?.email}
            </span>

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB] to-pink-500 text-white flex items-center justify-center font-bold text-sm shadow">
              {user?.name?.charAt(0)}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
