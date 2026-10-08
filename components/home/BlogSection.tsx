"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export const BlogSection = () => {
  const blogs = [
    {
      title: "Why NHS Patients Are Choosing India for Quaternary Joint & Heart Surgery",
      excerpt: "Understanding the clinical safeguards, JCI accreditation, and how UK patients save up to 70% while skipping 18-month NHS queues.",
      category: "NHS Patients",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    },
    {
      title: "Complete Guide to Indian Medical Visas (e-Med Visa) in 2026",
      excerpt: "Everything you need to know about eligibility, hospital invitation letters, attendant visas, and fast-track 48-hour approvals.",
      category: "Visa & Logistics",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    },
    {
      title: "How to Evaluate Hospital Accreditation: JCI vs NABH Standards",
      excerpt: "What clinical accreditation actually means for infection rates, nurse-to-patient ratios, and surgical outcomes.",
      category: "Hospital Standards",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80",
    },
    {
      title: "Robotic Knee Surgery vs Traditional Arthroplasty: What the Data Shows",
      excerpt: "Comparing MAKO CT-guided navigation, implant longevity, muscle-sparing recovery times, and day-one ambulation.",
      category: "Orthopaedics",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-[#e2eaeb] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f0f8f9] border border-[#dbeff0] text-[#0b5d63] text-xs font-heading font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#0b5d63]" />
              <span>CLINICAL GUIDES & PATIENT EDUCATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-slate-900 leading-tight">
              Latest Insights & Preparation Guides
            </h2>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-xs uppercase font-heading font-bold tracking-wider text-[#0b5d63] hover:underline transition-colors group"
          >
            <span>View All Guides & Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, idx) => (
            <div key={idx} className="group cursor-pointer flex flex-col justify-between">
              <div>
                <div className="relative h-52 rounded-2xl overflow-hidden mb-4 bg-slate-100 border border-[#e2eaeb]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-heading font-medium tracking-wider uppercase shadow-sm border border-white/20">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-[#0b5d63] transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-xs font-heading font-bold text-[#0b5d63] group-hover:text-[#073f43] transition-colors">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
