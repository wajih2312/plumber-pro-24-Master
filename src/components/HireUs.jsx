// HireUs Bar - Light gray outer, white inner box
// Author: Wajeeha Habib | TechNexus Internship

export default function HireUs() {
  return (
    <section className="bg-[#F1F5F9] py-6 px-4 md:px-10">
      {/* ── Inner white box with shadow ── */}
      <div
        className="max-w-5xl mx-auto bg-white rounded-2xl
        shadow-md px-6 md:px-10 py-5
        flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Left - Hire Us Text */}
        <div className="flex-shrink-0 text-left">
          <p
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="text-[#0F172A] font-black text-2xl leading-tight"
          >
            Hire <span className="text-[#2563EB]">Us</span>
          </p>
          <p
            className="text-[#64748B] text-xs font-bold
            tracking-widest uppercase mt-0.5"
          >
            Plumber
          </p>
        </div>

        {/* Center - Input Fields */}
        <div
          className="flex flex-col md:flex-row gap-3 flex-1
          max-w-2xl w-full"
        >
          <input
            type="text"
            placeholder="NAME"
            className="flex-1 border border-gray-200 rounded-lg
              px-4 py-3 text-xs text-[#0F172A] focus:outline-none
              focus:ring-2 focus:ring-[#2563EB]
              placeholder:text-[#64748B] placeholder:tracking-widest"
          />

          <input
            type="email"
            placeholder="EMAIL"
            className="flex-1 border border-gray-200 rounded-lg
              px-4 py-3 text-xs text-[#0F172A] focus:outline-none
              focus:ring-2 focus:ring-[#2563EB]
              placeholder:text-[#64748B] placeholder:tracking-widest"
          />

          <input
            type="text"
            placeholder="SUBJECT"
            className="flex-1 border border-gray-200 rounded-lg
              px-4 py-3 text-xs text-[#0F172A] focus:outline-none
              focus:ring-2 focus:ring-[#2563EB]
              placeholder:text-[#64748B] placeholder:tracking-widest"
          />
        </div>

        {/* Right - Submit Button */}
        <button
          className="flex-shrink-0 px-8 py-3 bg-[#2563EB]
          text-white rounded-lg font-bold text-xs tracking-widest
          uppercase hover:bg-blue-700 transition
          shadow-lg shadow-blue-200 whitespace-nowrap"
        >
          SUBMIT NOW
        </button>
      </div>
    </section>
  );
}
