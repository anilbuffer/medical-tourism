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
      title: "Understanding the t... Treatment in India",
      excerpt: "After a difficult journey throu...",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#a58d34] font-bold text-xs uppercase tracking-widest mb-3">
            OUR BLOGS
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1340]">
            Latest news & stories
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#a58d34] transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2">
                {blog.excerpt}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center">
          <button className="px-6 py-3 rounded-xl bg-[#e5ca76] hover:bg-[#d6b754] text-slate-900 text-sm font-bold shadow-md flex items-center gap-2 transition-colors">
            <span>View more</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
