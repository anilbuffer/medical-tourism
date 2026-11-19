import React from 'react';
import { ArrowRight, ArrowUpRight, MessageSquare } from 'lucide-react';

export type WhatsAppCardVariant = 'banner' | 'dark' | 'bordered' | 'elevated';

export interface WhatsAppCardProps {
  variant?: WhatsAppCardVariant;
  className?: string;
}

export const WhatsAppCard: React.FC<WhatsAppCardProps> = ({
  variant = 'banner',
  className = '',
}) => {
  // 1. Elevated variant (ContactSection on home page)
  if (variant === 'elevated') {
    return (
      <a
        href="#"
        className={`group relative flex flex-col justify-between p-7 sm:p-9 rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer bg-white border shadow-sm hover:shadow-2xl text-left w-full ${className}`}
        style={{
          borderColor: 'var(--color-surface-outline)',
          background: 'linear-gradient(145deg, #ffffff 0%, #f9fbfb 100%)',
        }}
      >
        <div className="flex items-center justify-between gap-3 relative z-10 mb-6 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Typically replies in &lt;15 mins</span>
          </div>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-emerald-50 border border-emerald-100 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent group-hover:shadow-md">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center my-3">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-950 group-hover:text-emerald-900 tracking-tight leading-snug transition-colors">
            Start WhatsApp conversation
          </h3>
        </div>

        <div className="relative z-10 mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors w-full">
          <span>Start WhatsApp conversation</span>
          <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center transition-all duration-300 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    );
  }

  // 2. Dark / Bordered variant (CtaBand & doctors detail page)
  if (variant === 'dark' || variant === 'bordered') {
    return (
      <a
        href="#"
        className={`group flex flex-col justify-between p-6 rounded-[22px] bg-white text-[#0b383e] border border-[#d6e3df] shadow-sm hover:-translate-y-1 hover:border-[#8bd2ea] transition-all min-h-[160px] w-full text-left ${className}`}
      >
        <div>
          <small className="text-xs text-[#008329] block mb-1 font-semibold">
            Usually replies in minutes
          </small>
          <strong className="text-base sm:text-lg font-bold text-[#0b383e]">
            WhatsApp our care team
          </strong>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0b383e] pt-4 border-t border-gray-100 mt-4 w-full">
          <span>Start WhatsApp conversation</span>
          <span className="w-8 h-8 rounded-full bg-[#eef6f5] flex items-center justify-center text-[#0b383e] group-hover:bg-[#0b383e] group-hover:text-white transition-colors">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </a>
    );
  }

  // 3. Banner / Default variant (Standard in all page dark bands)
  return (
    <a
      href="#"
      className={`group flex flex-col justify-between p-5 rounded-2xl bg-white text-[#0b383e] hover:bg-white/95 transition-all text-left shadow-lg w-full ${className}`}
    >
      <div>
        <span className="text-xs font-bold text-[#008329]">
          Usually replies in minutes
        </span>
        <strong className="block text-base sm:text-lg font-bold text-[#0b383e] mt-1">
          WhatsApp our care team
        </strong>
      </div>
      <div className="flex items-center gap-2 text-xs font-bold text-[#095458] mt-4">
        <span>Start WhatsApp chat</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </a>
  );
};

export const WhatsAppRedirectCard = WhatsAppCard;
