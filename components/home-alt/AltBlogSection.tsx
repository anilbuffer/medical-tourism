"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Calendar, Sparkles } from "lucide-react";

export const AltBlogSection = () => {
  const blogs = [
    {
      title: "Liver Cancer Treatment in India for UK Patients: Marie's...",
      excerpt: "After a difficult journey through the NHS...",
      tag: "Case Study",
      readTime: "5 min read",
      date: "Oct 2026",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "A Complete Guide to Medical Travel in India",
      excerpt: "After a difficult journey through the NHS...",
      tag: "Patient Guide",
      readTime: "8 min read",
      date: "Sep 2026",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "How to Choose the Right Hospital in India",
      excerpt: "After a difficult journey through the NHS...",
      tag: "Hospital Selection",
      readTime: "6 min read",
      date: "Sep 2026",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Understanding the t... Treatment in India",
      excerpt: "After a difficult journey throu...",
      tag: "Clinical Explainer",
      readTime: "4 min read",
      date: "Aug 2026",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section id="blog" className="py-24 sm:py-32 bg-gradient-to-b from-[#040D26] via-[#061536] to-[#03081E] text-white relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-vedara-blue/20 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-10 bg-vedara-gold-muted" />
            <p className="text-vedara-gold-muted font-bold text-xs uppercase tracking-[0.25em]">
              OUR BLOGS
            </p>
            <div className="h-[2px] w-10 bg-vedara-gold-muted" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
            Latest news & stories
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light mt-3">
            Clinical insights, patient guides, and hospital accreditation deep dives.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.35 }}
              className="group cursor-pointer rounded-3xl overflow-hidden bg-gradient-to-b from-[#0A1630]/95 via-[#061024]/95 to-[#020713]/95 border-2 border-white/15 hover:border-vedara-cyan/50 shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020713] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-vedara-deep/90 backdrop-blur-xl text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {blog.tag}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                    <span className="flex items-center gap-1 text-vedara-cyan">
                      <Clock className="w-3.5 h-3.5" />
                      {blog.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {blog.date}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-white leading-snug mb-2 group-hover:text-amber-300 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-slate-300 line-clamp-2 font-light leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-white group-hover:text-vedara-gold transition-colors">
                  <span>Read article</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex justify-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-vedara-gold transition-colors group cursor-pointer"
          >
            <span>View all articles & news</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
