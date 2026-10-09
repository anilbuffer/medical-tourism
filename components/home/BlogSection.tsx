"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const BlogSection = () => {
  const blogs = [
    {
      id: "nhs-quaternary-care",
      title: "Why NHS Patients Are Choosing India for Quaternary Joint & Heart Surgery",
      excerpt:
        "Understanding the clinical safeguards, JCI accreditation, and how UK patients save up to 70% while skipping 18-month NHS queues.",
      category: "NHS Patients",
      date: "January 28, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    },
    {
      id: "indian-medical-visas-guide",
      title: "Complete Guide to Indian Medical Visas (e-Med Visa) in 2026",
      excerpt:
        "Everything you need to know about eligibility, hospital invitation letters, attendant visas, and fast-track 48-hour approvals.",
      category: "Visa & Logistics",
      date: "January 28, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    },
    {
      id: "hospital-accreditation-standards",
      title: "How to Evaluate Hospital Accreditation: JCI vs NABH Standards",
      excerpt:
        "What clinical accreditation actually means for infection rates, nurse-to-patient ratios, and surgical outcomes.",
      category: "Hospital Standards",
      date: "January 20, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80",
    },
    {
      id: "robotic-knee-vs-traditional",
      title: "Robotic Knee Surgery vs Traditional Arthroplasty: What the Data Shows",
      excerpt:
        "Comparing MAKO CT-guided navigation, implant longevity, muscle-sparing recovery times, and day-one ambulation.",
      category: "Orthopaedics",
      date: "January 10, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FCFDFD] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#0B5D68]" />
              <span>CLINICAL GUIDES &amp; PATIENT EDUCATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-[#0C2338] leading-[1.15] tracking-tight">
              Latest Insights &amp;{" "}
              <span className="text-[#0B5D68]">Preparation Guides.</span>
            </h2>
          </div>
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-xs uppercase font-heading font-bold tracking-wider text-[#0B5D68] hover:text-[#0C2338] hover:underline transition-colors group"
          >
            <span>View All Guides &amp; Articles</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Two-Column Cards Grid Matching Reference Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {blogs.map((blog, idx) => (
            <Link
              key={blog.id || idx}
              href="/guides"
              className="group cursor-pointer flex flex-col focus:outline-none"
            >
              {/* Image Container with Inverted Bottom-Right Corner Notch */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-slate-100 border border-[#DCE6EB] mb-5 shadow-sm group-hover:shadow-md transition-shadow">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Category Pill on Top-Left */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0C2338]/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-heading font-medium tracking-wider uppercase shadow-sm border border-white/20">
                    {blog.category}
                  </span>
                </div>

                {/* Signature Bottom-Right Corner Notch with Circular Arrow Button */}
                <div className="absolute -bottom-1 -right-1 bg-[#FCFDFD] pt-3 pl-3 rounded-tl-[28px] z-10">
                  {/* Top Concave Inverted Fillet */}
                  <svg
                    className="absolute -top-6 right-0 w-6 h-6 text-[#FCFDFD] pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 0 A 24 24 0 0 0 0 24 H 24 V 0 Z" />
                  </svg>

                  {/* Left Concave Inverted Fillet */}
                  <svg
                    className="absolute bottom-0 -left-6 w-6 h-6 text-[#FCFDFD] pointer-events-none"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M0 24 A 24 24 0 0 0 24 0 V 24 H 0 Z" />
                  </svg>

                  {/* Floating Action Button */}
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md ${
                      idx % 2 === 0
                        ? "bg-[#ECF4F7] text-[#0B5D68] border border-[#DCE6EB] group-hover:bg-[#0B5D68] group-hover:text-white group-hover:border-[#0B5D68]"
                        : "bg-white text-[#0C2338] border border-[#DCE6EB] group-hover:bg-[#0B5D68] group-hover:text-white group-hover:border-[#0B5D68]"
                    }`}
                  >
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Meta Date & Read Time */}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7C88] uppercase tracking-wider mb-2.5">
                <span>{blog.date}</span>
                <span>·</span>
                <span>{blog.readTime.toUpperCase()}</span>
              </div>

              {/* Title */}
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl lg:text-[25px] text-[#0C2338] leading-snug group-hover:text-[#0B5D68] transition-colors mb-2.5 line-clamp-2">
                {blog.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed line-clamp-2">
                {blog.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
