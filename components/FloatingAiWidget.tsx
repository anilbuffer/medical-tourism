'use client';

import React, { useState } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useChat } from '@/components/providers/ChatProvider';

export const FloatingAiWidget: React.FC = () => {
  const { isOpen, openChat, heroBarVisible } = useChat();
  const [waHovered, setWaHovered] = useState(false);

  // Floating Ask AI button is visible ONLY when chat is closed AND hero search bar is NOT visible
  const showAiPill = !isOpen && !heroBarVisible;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[900] transition-opacity duration-200 ${
        isOpen ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden={isOpen}
    >
      {/* Floating "Ask AI" Pill */}
      <button
        type="button"
        onClick={() => openChat()}
        aria-label="Ask our AI assistant"
        tabIndex={showAiPill ? 0 : -1}
        aria-hidden={!showAiPill}
        data-tip="AI assistant · instant answers, 24/7"
        className={`group fixed left-4 sm:left-auto sm:right-[96px] bottom-5 sm:bottom-[30px] z-[900] flex items-center gap-2.5 py-1.5 pr-4.5 pl-1.5 rounded-full bg-[#0e2433] hover:bg-[#13324a] text-white text-[14.5px] font-bold shadow-[0_10px_28px_rgba(9,22,34,0.3)] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] cursor-pointer ${
          showAiPill
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
        }`}
      >
        <span className="w-[30px] h-[30px] rounded-full grid place-items-center bg-gradient-to-br from-[#5cc8e6] to-[#2c9c8c] text-white shadow-sm flex-none">
          <Sparkles className="w-4 h-4" />
        </span>
        <span className="tracking-wide">Ask AI</span>

        {/* Desktop Tooltip */}
        <span className="absolute right-0 bottom-[calc(100%+10px)] hidden sm:block whitespace-nowrap py-1.5 px-3 rounded-lg bg-[#0e2433] text-white text-xs font-normal opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-md">
          AI assistant · instant answers, 24/7
        </span>
      </button>

      {/* WhatsApp Floating Action Button */}
      <a
        href="https://wa.me/447587399811?text=Hi%2C%20I%27d%20like%20to%20talk%20to%20your%20care%20team."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with our care team on WhatsApp"
        tabIndex={isOpen ? -1 : 0}
        onMouseEnter={() => setWaHovered(true)}
        onMouseLeave={() => setWaHovered(false)}
        onFocus={() => setWaHovered(true)}
        onBlur={() => setWaHovered(false)}
        className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-[901] w-[58px] h-[58px] rounded-full grid place-items-center bg-[#25D366] text-white shadow-[0_10px_26px_rgba(37,211,102,0.38)] hover:-translate-y-0.5 hover:scale-105 active:scale-95 transition-all duration-200 ${
          isOpen ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
      >
        <MessageCircle className="w-[30px] h-[30px]" strokeWidth={2} />
      </a>

      {/* WhatsApp Floating Tooltip */}
      <div
        role="tooltip"
        className={`fixed right-6 bottom-[94px] z-[901] hidden sm:flex items-center gap-3 py-2.5 px-3.5 bg-white border border-[#e6ecea] rounded-[14px_14px_4px_14px] shadow-[0_12px_32px_rgba(16,24,40,0.12)] text-left transition-all duration-200 pointer-events-none ${
          !isOpen && waHovered
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-2'
        }`}
      >
        <span className="w-8 h-8 rounded-full flex-none grid place-items-center bg-[#25D366] text-white">
          <MessageCircle className="w-4 h-4" strokeWidth={2} />
        </span>
        <span className="flex flex-col">
          <b className="text-[13.5px] font-bold text-[#1f1f1f] leading-snug">
            Chat with our care team
          </b>
          <small className="text-[11.5px] text-[#6b7a80] leading-snug">
            Real people on WhatsApp · replies in ~5 min
          </small>
        </span>
      </div>
    </div>
  );
};

export default FloatingAiWidget;
