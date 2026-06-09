import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png'; // ✅ YOUR LOGO IMAGE

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, adminLogin } = useAuth();

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Enter email';
    if (!password.trim()) e.password = 'Enter password';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));

    // ── Check 1: Admin login ──
    const isAdmin = adminLogin(email, password);
    if (isAdmin) {
      setLoading(false);
      navigate('/admin');
      return;
    }

    // ── Check 2: Registered client login ──
    const registered = localStorage.getItem('plumber_registered');
    const userData = registered ? JSON.parse(registered) : null;

    if (!userData || userData.email !== email) {
      setErrors({ email: 'Invalid email or not registered' });
      setLoading(false);
      return;
    }

    // ── Client login ──
    login({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: 'client',
    });

    localStorage.removeItem('plumber_registered');
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-2">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden flex min-h-[500px]">
        {/* LEFT SIDE */}
        <div className="hidden md:flex w-[38%] relative overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA]">
          <div className="absolute -left-28 top-0 w-72 h-72 rotate-45 bg-white/10" />
          <div className="absolute -left-20 top-24 w-72 h-72 rotate-45 bg-white/10" />
          <div className="absolute -left-16 bottom-0 w-64 h-64 rotate-45 bg-pink-400/20" />

          <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center">
            <div className="bg-white text-[#2563EB] px-5 py-1.5 rounded-r-full font-bold text-[11px] shadow">
              LOGIN
            </div>

            <h2 className="text-white text-2xl font-black mt-4">Plumber Pro</h2>

            <p className="text-blue-100 mt-1 text-[11px] leading-snug px-2">
              Login and manage bookings easily.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex items-center justify-center px-5 py-5">
          <div className="w-full max-w-sm">
            {/* LOGO IMAGE */}
            <div className="text-center mb-5">
              <img
                src={logo}
                alt="logo"
                className="w-20 h-20 mx-auto object-contain drop-shadow-md"
              />

              <h1 className="text-xl font-black text-[#0F172A] mt-2">LOGIN</h1>

              <p className="text-[11px] text-[#64748B]">Access your account</p>
            </div>

            {/* EMAIL */}
            <div className="mb-4">
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[#64748B]"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-7 py-2 border-b border-gray-300 focus:border-[#2563EB] outline-none text-xs"
                />
              </div>

              {errors.email && (
                <p className="text-pink-500 text-[10px] mt-1">{errors.email}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[#64748B]"
                />

                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-7 pr-8 py-2 border-b border-gray-300 focus:border-[#2563EB] outline-none text-xs"
                />

                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#64748B]"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {errors.password && (
                <p className="text-pink-500 text-[10px] mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* FORGOT */}
            <div className="flex justify-end mb-4">
              <a
                href="#"
                className="text-[10px] text-pink-500 hover:text-[#2563EB]"
              >
                Forgot Password?
              </a>
            </div>

            {/* BUTTON */}
            <div className="flex justify-center mb-5">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2563EB] to-pink-500 text-white text-[11px] font-bold tracking-wide hover:scale-105 transition"
              >
                {loading ? 'LOGGING IN...' : 'LOGIN'}
              </button>
            </div>

            {/* SOCIAL */}
            <div className="border-t pt-4">
              <p className="text-center text-[10px] text-gray-500 mb-2">
                Or Login With
              </p>

              <div className="flex justify-center gap-5 text-xs">
                <button className="text-gray-700 hover:text-[#2563EB]">
                  Google
                </button>
                <button className="text-gray-700 hover:text-[#2563EB]">
                  Facebook
                </button>
              </div>
            </div>

            {/* REGISTER */}
            <p className="text-center text-[11px] text-gray-500 mt-4">
              Don't have account?{' '}
              <Link
                to="/register"
                className="text-[#2563EB] font-semibold hover:text-pink-500"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
