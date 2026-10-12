"use client";

import React, { useState, useEffect } from "react";
import { useCare } from "@/context/CareContext";
import { MessageCircle, FileText, Phone } from "lucide-react";

export const FloatingQuickBar = () => {
  const { t, openIntake } = useCare();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCE6EB] shadow-[0_-4px_20px_-10px_rgba(12,35,56,0.15)] transform transition-transform duration-300 translate-y-0 font-sans">
      <div className="max-w-7xl mx-auto px-2 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-around sm:justify-center sm:gap-6">
          {/* WhatsApp Us */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 hover:bg-[#ECF4F7] rounded-xl transition-colors group flex-1 sm:flex-none justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-heading font-bold text-[#0C2338] whitespace-nowrap">
              {t.floatingBar.whatsapp}
            </span>
          </a>

          <div className="w-px h-8 bg-[#DCE6EB] hidden sm:block"></div>

          {/* Free Report Review */}
          <button
            onClick={() => openIntake()}
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 hover:bg-[#ECF4F7] rounded-xl transition-colors group flex-1 sm:flex-none justify-center cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0B5D68]/10 flex items-center justify-center text-[#0B5D68] group-hover:bg-[#0B5D68] group-hover:text-white transition-colors shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-heading font-bold text-[#0C2338] whitespace-nowrap">
              {t.floatingBar.reportReview}
            </span>
          </button>

          <div className="w-px h-8 bg-[#DCE6EB] hidden sm:block"></div>

          {/* Call Desk */}
          <a
            href="tel:+919876543210"
            className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 hover:bg-[#ECF4F7] rounded-xl transition-colors group flex-1 sm:flex-none justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-[#0C2338]/10 flex items-center justify-center text-[#0C2338] group-hover:bg-[#0C2338] group-hover:text-white transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[10px] sm:text-xs font-heading font-bold text-[#0C2338] whitespace-nowrap">
              {t.floatingBar.callDesk}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
