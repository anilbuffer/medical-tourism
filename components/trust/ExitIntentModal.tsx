"use client";

import React, { useState, useEffect } from "react";
import { useCare } from "@/context/CareContext";
import { X, Download, FileText, Send } from "lucide-react";

export const ExitIntentModal = () => {
  const { t, language } = useCare();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Only set up on desktop to avoid weird mobile behavior for mouseout
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 || e.clientY < 5) {
        const hasSeen = sessionStorage.getItem("vedara_exit_intent");
        if (!hasSeen) {
          setIsOpen(true);
          sessionStorage.setItem("vedara_exit_intent", "true");
        }
      }
    };

    // For mobile, we can trigger on rapid scroll up near the top after scrolling down
    let lastScrollY = window.scrollY;
    let maxScrollY = 0;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      maxScrollY = Math.max(maxScrollY, currentScrollY);
      
      // If user has scrolled down at least 800px, and is now rapidly scrolling back to top (near < 100px)
      if (maxScrollY > 800 && currentScrollY < 100 && (lastScrollY - currentScrollY) > 20) {
        const hasSeen = sessionStorage.getItem("vedara_exit_intent");
        if (!hasSeen) {
          setIsOpen(true);
          sessionStorage.setItem("vedara_exit_intent", "true");
        }
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && contact) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
      }, 4000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 z-10">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-8 h-8 rounded-full bg-white/20 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left/Top Image Section */}
          <div className="md:w-5/12 bg-gradient-to-br from-[#0C2338] via-[#0B5D68] to-[#0C2338] relative p-8 flex flex-col justify-center items-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600')] opacity-20 bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2338] via-[#0B5D68]/80 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 border border-white/20 shadow-[0_0_30px_rgba(240,161,38,0.25)]">
                <FileText className="w-8 h-8 text-[#F0A126]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 leading-tight font-heading">2026 Medical Travel Guide</h3>
              <p className="text-xs text-white/80 font-body">Includes hospital comparison dossier & visa requirements.</p>
            </div>
          </div>

          {/* Right/Bottom Form Section */}
          <div className="md:w-7/12 p-8 sm:p-10">
            <h2 className="text-2xl font-black text-[#0C2338] mb-2 font-heading">{t.exitIntent.heading}</h2>
            <p className="text-sm text-[#6B7C88] mb-8 leading-relaxed font-body">
              {t.exitIntent.subheading}
            </p>

            {isSubmitted ? (
              <div className="bg-[#ECF4F7] border border-[#DCE6EB] rounded-2xl p-6 text-center animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-[#0B5D68]/15 flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-[#0B5D68]" />
                </div>
                <h4 className="font-bold text-[#0C2338] mb-1 font-heading">{t.exitIntent.successMessage}</h4>
                <p className="text-xs text-[#6B7C88]">Check your email or WhatsApp shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0C2338] uppercase tracking-wider mb-1.5 font-heading">
                    {t.exitIntent.nameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.exitIntent.namePlaceholder}
                    className="w-full bg-[#FCFDFD] border border-[#DCE6EB] rounded-xl px-4 py-3 text-sm text-[#0C2338] focus:ring-2 focus:ring-[#0B5D68] outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0C2338] uppercase tracking-wider mb-1.5 font-heading">
                    {t.exitIntent.contactLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.exitIntent.contactPlaceholder}
                    className="w-full bg-[#FCFDFD] border border-[#DCE6EB] rounded-xl px-4 py-3 text-sm text-[#0C2338] focus:ring-2 focus:ring-[#0B5D68] outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-extrabold text-white bg-[#0B5D68] hover:bg-[#0C2338] shadow-lg shadow-[#0B5D68]/25 transition-all cursor-pointer font-heading"
                >
                  <Download className="w-4 h-4 text-[#F0A126]" />
                  <span>{t.exitIntent.downloadBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
