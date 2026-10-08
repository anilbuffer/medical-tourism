"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const BlogSection = () => {
  const blogs = [
    {
      title: "Liver Cancer Treatment in India for UK Patients: Marie's...",
      excerpt: "After a difficult journey through the NHS...",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    },
    {
      title: "A Complete Guide to Medical Travel in India",
      excerpt: "After a difficult journey through the NHS...",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    },
    {
      title: "How to Choose the Right Hospital in India",
      excerpt: "After a difficult journey through the NHS...",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80",
    },
    {
      title: "Understanding the Treatment in India",
      excerpt: "After a difficult journey through...",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-[#E4E9ED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#0070E0] font-bold text-xs uppercase tracking-widest mb-3">
            OUR BLOGS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Latest news & stories
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-[#E4E9ED]">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#0070E0] transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-2">
                {blog.excerpt}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <button className="inline-flex items-center gap-2 text-sm font-bold text-[#0070E0] hover:text-[#007FFF] transition-colors group cursor-pointer">
            <span>View all articles & news</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

