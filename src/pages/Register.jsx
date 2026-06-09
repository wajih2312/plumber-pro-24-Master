import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo.png';

// ── Input Field (compact version like login) ──
const InputField = ({
  name,
  type = 'text',
  placeholder,
  icon,
  error,
  showToggle,
  onToggle,
  show,
  value,
  onChange,
}) => (
  <div className="mb-3">
    <div className="relative">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#64748B]">
        {icon}
      </div>

      <input
        type={showToggle ? (show ? 'text' : 'password') : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-7 pr-8 py-2 border-b text-xs outline-none transition bg-transparent
          ${
            error ? 'border-pink-400' : 'border-gray-300 focus:border-[#2563EB]'
          }`}
      />

      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#64748B]"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>

    {error && <p className="text-pink-500 text-[10px] mt-1">{error}</p>}
  </div>
);

export default function Register() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};

    if (!form.fullName.trim()) e.fullName = 'Enter name';
    if (!form.email.trim()) e.email = 'Enter email';
    if (!form.phone.trim()) e.phone = 'Enter phone';

    if (!form.password.trim()) e.password = 'Enter password';
    else if (form.password.length < 6) e.password = 'Min 6 chars';

    if (form.password !== form.confirm) e.confirm = 'Not matched';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    localStorage.setItem(
      'plumber_registered',
      JSON.stringify({
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password, // optional but useful
      })
    );
    setLoading(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-2">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden flex min-h-[500px]">
        {/* LEFT SIDE (same as login for consistency) */}
        <div className="hidden md:flex w-[38%] relative overflow-hidden bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA]">
          <div className="absolute -left-28 top-0 w-72 h-72 rotate-45 bg-white/10" />
          <div className="absolute -left-20 top-24 w-72 h-72 rotate-45 bg-white/10" />
          <div className="absolute -left-16 bottom-0 w-64 h-64 rotate-45 bg-pink-400/20" />

          <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 text-center">
            <div className="bg-white text-[#2563EB] px-5 py-1.5 rounded-r-full font-bold text-[11px] shadow">
              REGISTER
            </div>

            <h2 className="text-white text-2xl font-black mt-4">Plumber Pro</h2>

            <p className="text-blue-100 mt-1 text-[11px] leading-snug px-2">
              Create account and get started easily.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex items-center justify-center px-5 py-5">
          <div className="w-full max-w-sm">
            {/* HEADER */}
            <div className="text-center mb-5">
              <div className="text-center mb-5">
                <img
                  src={logo}
                  alt="logo"
                  className="w-20 h-20 mx-auto object-contain drop-shadow-md"
                />
              </div>

              <h1 className="text-xl font-black text-[#0F172A] mt-3">
                REGISTER
              </h1>

              <p className="text-[11px] text-[#64748B]">Create your account</p>
            </div>

            {/* FORM */}
            <InputField
              name="fullName"
              placeholder="Full Name"
              icon={<User size={16} />}
              error={errors.fullName}
              value={form.fullName}
              onChange={handleChange}
            />

            <InputField
              name="email"
              type="email"
              placeholder="Email"
              icon={<Mail size={16} />}
              error={errors.email}
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              name="phone"
              placeholder="Phone"
              icon={<Phone size={16} />}
              error={errors.phone}
              value={form.phone}
              onChange={handleChange}
            />

            <InputField
              name="password"
              placeholder="Password"
              icon={<Lock size={16} />}
              error={errors.password}
              showToggle
              show={showPass}
              onToggle={() => setShowPass(!showPass)}
              value={form.password}
              onChange={handleChange}
            />

            <InputField
              name="confirm"
              placeholder="Confirm Password"
              icon={<Lock size={16} />}
              error={errors.confirm}
              showToggle
              show={showConfirm}
              onToggle={() => setShowConfirm(!showConfirm)}
              value={form.confirm}
              onChange={handleChange}
            />

            {/* BUTTON */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2563EB] to-pink-500 text-white text-[11px] font-bold tracking-wide hover:scale-105 transition"
              >
                {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </div>

            {/* LOGIN LINK */}
            <p className="text-center text-[11px] text-gray-500 mt-4">
              Already have account?{' '}
              <Link
                to="/login"
                className="text-[#2563EB] font-semibold hover:text-pink-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
