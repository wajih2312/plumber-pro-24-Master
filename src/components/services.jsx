// Services Section - 4 service cards with custom icons
// Author: Wajeeha Habib | TechNexus Internship

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// ── Import your custom icon images here ──
import iconEmergency from '../assets/2.png';
import iconDrain from '../assets/3.png';
import iconPipe from '../assets/4.png';
import iconHeater from '../assets/5.png';

// Service cards data
const services = [
  {
    id: 1,
    icon: iconEmergency,
    title: 'Emergency',
    tags: ['24/7', '• FAST ARRIVAL'],
    desc: 'We offer both foundation and advanced training courses that will give you the necessary skills to provide anti wrinkle injections safely.',
    active: false,
  },
  {
    id: 2,
    icon: iconDrain,
    title: 'Drain Cleaning',
    tags: ['DRAINAGE BLOCKAGES', '• CLEAR'],
    desc: 'We offer both foundation and advanced training courses that will give you the necessary skills to provide anti wrinkle injections safely.',
    active: false,
  },
  {
    id: 3,
    icon: iconPipe,
    title: 'Pipe Repair',
    tags: ['DRAINAGE PIPES', '• FULL PIPE'],
    desc: 'We offer both foundation and advanced training courses that will give you the necessary skills to provide anti wrinkle injections safely.',
    active: false,
  },
  {
    id: 4,
    icon: iconHeater,
    title: 'Water Heater',
    tags: ['INSTALLATION', '• WATER SERVICE'],
    desc: 'We offer both foundation and advanced training courses that will give you the necessary skills to provide anti wrinkle injections safely.',
    active: false,
  },
];

export default function Services() {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* ── TOP ROW ── */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Left - Heading */}
          <div>
            <h2
              className="font-black font-poppins text-[#0F172A]
              uppercase leading-tight text-3xl md:text-4xl"
            >
              PLUMB & PLUMBING
              <br />
              OF SERVICES
            </h2>
          </div>

          {/* Right - Description + Button */}
          <div>
            <p className="text-[#64748B] text-sm leading-relaxed mb-6">
              A professional training academy specializing in botox and dermal
              filler certification, offering comprehensive, hands-on courses for
              healthcare professionals.
            </p>
            <Link to="/services">
              <button
                className="px-6 py-3 border border-[#0F172A]
                text-[#0F172A] text-xs font-bold tracking-wider
                uppercase rounded hover:bg-[#0F172A] hover:text-white
                transition"
              >
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>

        {/* ── SERVICE CARDS ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2
          lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl p-6 transition-all duration-300
                hover:shadow-xl hover:-translate-y-1 cursor-pointer
                ${
                  service.active
                    ? 'bg-[#2563EB] text-white shadow-lg shadow-blue-200'
                    : 'bg-[#F1F5F9] text-[#0F172A] hover:bg-[#2563EB] hover:text-white group'
                }`}
            >
              {/* ── Custom Icon Image ── */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center
                justify-center mb-4
                ${
                  service.active
                    ? 'bg-white/20'
                    : 'bg-white group-hover:bg-white/20'
                }`}
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-7 h-7 object-contain"
                />
              </div>

              {/* Title */}
              <h3
                className={`font-bold font-poppins text-lg mb-2
                ${
                  service.active
                    ? 'text-white'
                    : 'text-[#0F172A] group-hover:text-white'
                }`}
              >
                {service.title}
              </h3>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-xs font-semibold
                      ${
                        service.active
                          ? 'text-blue-100'
                          : 'text-[#64748B] group-hover:text-blue-100'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p
                className={`text-xs leading-relaxed mb-4
                ${
                  service.active
                    ? 'text-blue-100'
                    : 'text-[#64748B] group-hover:text-blue-100'
                }`}
              >
                {service.desc}
              </p>

              {/* Read More */}
              <div
                className={`flex items-center gap-1 text-xs font-bold
                ${
                  service.active
                    ? 'text-white'
                    : 'text-[#2563EB] group-hover:text-white'
                }`}
              >
                Read More <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
