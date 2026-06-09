import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import heroImg from '../assets/hero.png';

// ── BLOG DATA ──
const blogPosts = [
  {
    id: 1,
    title: '10 Signs You Need Emergency Plumbing Service',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    category: 'Emergency',
    author: 'John Smith',
    date: 'May 15, 2026',
    readTime: '5 min read',
    categoryColor: 'bg-red-100 text-[#DC2626]',
  },
  {
    id: 2,
    title: 'How to Prevent Drain Blockages in Your Home',
    excerpt: 'Lorem ipsum dolor sit amet...',
    category: 'Tips',
    author: 'Mike Johnson',
    date: 'May 12, 2026',
    readTime: '4 min read',
    categoryColor: 'bg-blue-100 text-[#2563EB]',
  },
  {
    id: 3,
    title: 'Water Heater Installation: What You Need to Know',
    excerpt: 'Lorem ipsum dolor sit amet...',
    category: 'Installation',
    author: 'David Lee',
    date: 'May 10, 2026',
    readTime: '6 min read',
    categoryColor: 'bg-green-100 text-[#10B981]',
  },
  {
    id: 4,
    title: 'DIY Plumbing Tips Every Homeowner Should Know',
    excerpt: 'Lorem ipsum dolor sit amet...',
    category: 'DIY',
    author: 'Ali Hassan',
    date: 'May 8, 2026',
    readTime: '7 min read',
    categoryColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 5,
    title: 'How to Choose the Right Plumber for Your Home',
    excerpt: 'Lorem ipsum dolor sit amet...',
    category: 'Guide',
    author: 'John Smith',
    date: 'May 5, 2026',
    readTime: '3 min read',
    categoryColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 6,
    title: 'Top 5 Common Plumbing Problems and How to Fix Them',
    excerpt: 'Lorem ipsum dolor sit amet...',
    category: 'Tips',
    author: 'Mike Johnson',
    date: 'May 2, 2026',
    readTime: '5 min read',
    categoryColor: 'bg-blue-100 text-[#2563EB]',
  },
];

const categories = ['All', 'Emergency', 'Tips', 'Installation', 'DIY', 'Guide'];

export default function Blog() {
  const [activeCat, setActiveCat] = useState('All');

  // FILTER LOGIC
  const filteredPosts =
    activeCat === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCat);

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO (LOGIN STYLE) ── */}
      <div className="min-h-[200px] flex items-center justify-center px-4 py-10 bg-white">
        <div className="w-full max-w-8xl rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
          {/* LEFT */}
          <div className="hidden md:flex w-[40%] bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] relative">
            <div className="absolute -left-24 top-0 w-64 h-64 rotate-45 bg-white/10" />
            <div className="absolute -left-20 bottom-0 w-64 h-64 rotate-45 bg-pink-400/20" />

            <div className="relative z-10 flex flex-col justify-center items-center text-center px-6">
              <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest">
                Our Blog
              </p>
              <h1 className="text-white text-3xl font-black mt-2">
                PLUMBING BLOG
              </h1>
              <p className="text-blue-100 text-[11px] mt-2">
                Tips & expert guides
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex-1 bg-white p-6 md:p-10 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-black text-[#0F172A]">
              Latest Articles
            </h2>

            <p className="text-xs text-[#64748B] mt-1">
              Learn plumbing tips and DIY fixes
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT (REDUCED GAP FIX) ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-6">
        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition
              ${
                activeCat === cat
                  ? 'bg-[#2563EB] text-white'
                  : 'bg-[#F1F5F9] text-[#64748B] hover:bg-[#2563EB] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FEATURED POST */}
        {filteredPosts.length > 0 && (
          <div className="bg-[#F1F5F9] rounded-3xl overflow-hidden grid md:grid-cols-2 mb-10 group">
            <div className="h-64 md:h-auto overflow-hidden">
              <img
                src={heroImg}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            <div className="p-8 flex flex-col justify-center">
              <h2 className="text-2xl font-black text-[#0F172A] mb-3">
                {filteredPosts[0].title}
              </h2>

              <p className="text-sm text-[#64748B] mb-4">
                {filteredPosts[0].excerpt}
              </p>

              <Link to={`/blog/${filteredPosts[0].id}`}>
                <button className="bg-[#2563EB] text-white px-6 py-2 rounded-lg text-xs font-bold">
                  READ MORE
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── CARD ──
function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border hover:shadow-lg transition overflow-hidden">
      <div className="h-48">
        <img src={heroImg} className="w-full h-full object-cover" />
      </div>

      <div className="p-5">
        <span
          className={`text-xs px-3 py-1 rounded-full ${post.categoryColor}`}
        >
          {post.category}
        </span>

        <h3 className="font-bold text-[#0F172A] mt-3">{post.title}</h3>

        <p className="text-xs text-[#64748B] mt-2">{post.excerpt}</p>

        <div className="flex justify-between mt-4 text-xs text-[#64748B]">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>

        <Link to={`/blog/${post.id}`}>
          <div className="mt-4 text-[#2563EB] font-bold text-xs">
            Read More →
          </div>
        </Link>
      </div>
    </div>
  );
}
