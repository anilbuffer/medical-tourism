"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUp, Compass, Activity } from "lucide-react";

export const AltQuickNav = () => {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("specialties");

  const navLinks = [
    { id: "specialties", label: "Specialties" },
    { id: "hospitals", label: "Hospitals" },
    { id: "doctors", label: "Surgeons" },
    { id: "journey", label: "Journey" },
    { id: "cost", label: "Pricing" },
    { id: "connect", label: "Connect" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      // Check current section
      const sections = navLinks.map(l => document.getElementById(l.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#07132F]/90 text-white border-2 border-vedara-cyan/40 shadow-[0_0_35px_rgba(46,205,197,0.3)] backdrop-blur-2xl text-xs font-semibold"
        >
          <div className="flex items-center gap-2 pr-3 border-r border-white/20 text-vedara-cyan">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vedara-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-vedara-cyan" />
            </span>
            <span className="font-extrabold tracking-wide uppercase text-[11px]">Alt Experience</span>
          </div>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-3 py-1.5 rounded-full transition-all duration-300 font-bold ${
                  isActive
                    ? "text-vedara-deep font-black"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-gradient-to-r from-vedara-cyan to-teal-300 rounded-full -z-10 shadow-md shadow-cyan-500/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{link.label}</span>
              </a>
            );
          })}

          <div className="pl-2 border-l border-white/20 flex items-center gap-2">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-full bg-vedara-gold/20 text-vedara-gold hover:bg-vedara-gold hover:text-vedara-deep transition-all font-black text-[11px] shadow-xs"
            >
              Original /
            </Link>
            <button
              onClick={scrollToTop}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-110"
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
