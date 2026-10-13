"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";

export const BlogSection: React.FC = () => {
  const articles = [
    {
      id: "medical-visa-guide",
      title: "Medical Visa to India: Complete 2026 Step-by-Step Guide",
      description: "Everything you need to know about the Indian e-Medical Visa, eligible companion visas, and embassy documentation.",
      readTime: "5 min read",
      category: "Travel & Visa",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80",
    },
    {
      id: "choosing-hospital",
      title: "How to Choose the Right Hospital in India for Complex Surgery",
      description: "A clinical guide to evaluating JCI and NABH accreditations, surgeon track records, and robotic infrastructure.",
      readTime: "6 min read",
      category: "Hospital Evaluation",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80",
    },
    {
      id: "post-op-recovery",
      title: "Planning Post-Operative Recovery & Flying Home Safely",
      description: "Understanding fit-to-fly timelines, hotel recovery periods, and coordinating handover with your local doctor.",
      readTime: "4 min read",
      category: "Recovery & Travel",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section id="guides" className="py-16 sm:py-20 lg:py-24 bg-[#EAF5F4] border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider block mb-2">
              PATIENT GUIDES &amp; INSIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
              Prepare for Your Medical Journey
            </h2>
          </div>

          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#087F79] hover:text-[#102B46] transition-colors group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] rounded p-1"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Three Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#DCE5EB] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102B46]/60 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#102B46] text-[11px] font-semibold shadow-xs border border-[#DCE5EB]/60">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#627486] mb-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#087F79]" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#102B46] group-hover:text-[#087F79] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#627486] mt-2.5 leading-relaxed font-normal">
                    {article.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE5EB] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#087F79] group-hover:text-[#102B46]">
                  <Link
                    href="/guides"
                    className="inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] rounded"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Level CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white hover:bg-[#EAF5F4] text-[#102B46] hover:text-[#087F79] border border-[#DCE5EB] hover:border-[#087F79]/40 font-semibold text-sm transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
          >
            <span>Explore All Guides &amp; Insights</span>
            <ArrowRight className="w-4 h-4 text-[#087F79]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
