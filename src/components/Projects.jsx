// Latest Projects Section - photo grid
// Author: Wajeeha Habib | TechNexus Internship

import { Eye } from 'lucide-react';
import img1 from '../assets/10.png';
import img2 from '../assets/9.png';
import img3 from '../assets/011.png';
import img4 from '../assets/8.png';
import img5 from '../assets/012.png';

// Project items - using hero image as placeholder
// Replace with real project images when available
const projects = [
  { id: 1, title: 'Pipe Installation', category: 'Installation' },
  { id: 2, title: 'Drain Cleaning', category: 'Cleaning' },
  { id: 3, title: 'Emergency Repair', category: 'Emergency' },
  { id: 4, title: 'Water Heater Setup', category: 'Installation' },
  { id: 5, title: 'Leak Detection', category: 'Repair' },
];

export default function Projects() {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* ── Section Heading ── */}
        <div className="text-center mb-12">
          <h2
            className="font-black font-poppins text-[#0F172A] uppercase
            text-3xl md:text-4xl"
          >
            OUR LATEST PROJECT
          </h2>
        </div>

        {/* ── Project Grid ── */}
        {/* Layout matches design:
            [img1] [img2(big)] [img3]
            [img4] [img2(big)] [img5]  */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 h-auto
          md:h-[500px]"
        >
          {/* ── LEFT COLUMN - 2 small images ── */}
          <div className="flex flex-col gap-4">
            {/* Project 1 */}
            <ProjectCard project={projects[0]} img={img4} />

            {/* Project 2 */}
            <ProjectCard project={projects[3]} img={img1} />
          </div>

          {/* ── CENTER COLUMN - 1 big image ── */}
          <div className="hidden md:block">
            <ProjectCard project={projects[2]} img={img2} tall={true} />
          </div>

          {/* ── RIGHT COLUMN - 2 small images ── */}
          <div className="flex flex-col gap-4">
            {/* Project 4 */}
            <ProjectCard project={projects[1]} img={img3} />

            {/* Project 5 */}
            <ProjectCard project={projects[4]} img={img5} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Project Card Component ──────────────────────────────────────────
function ProjectCard({ project, img, tall = false }) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden group cursor-pointer
      bg-[#F1F5F9] ${tall ? 'h-full' : 'h-48 md:h-[235px]'}`}
    >
      {/* Image */}
      <img
        src={img}
        alt={project.title}
        className="w-full h-full object-cover object-center
          group-hover:scale-110 transition-transform duration-500"
      />

      {/* Dark overlay on hover */}
      <div
        className="absolute inset-0 bg-[#0F172A]/0
        group-hover:bg-[#0F172A]/60 transition-all duration-300
        flex items-center justify-center"
      >
        {/* Eye icon - shows on hover */}
        <div
          className="opacity-0 group-hover:opacity-100
          transition-all duration-300 transform
          translate-y-4 group-hover:translate-y-0
          bg-[#2563EB] w-12 h-12 rounded-full
          flex items-center justify-center shadow-lg"
        >
          <Eye size={20} className="text-white" />
        </div>
      </div>

      {/* Category badge */}
      <div
        className="absolute bottom-3 left-3 opacity-0
        group-hover:opacity-100 transition-all duration-300"
      >
        <span
          className="bg-[#2563EB] text-white text-xs
          font-semibold px-3 py-1 rounded-full"
        >
          {project.category}
        </span>
      </div>

      {/* Title badge */}
      <div
        className="absolute bottom-3 right-3 opacity-0
        group-hover:opacity-100 transition-all duration-300"
      >
        <span
          className="bg-white text-[#0F172A] text-xs
          font-semibold px-3 py-1 rounded-full"
        >
          {project.title}
        </span>
      </div>
    </div>
  );
}
