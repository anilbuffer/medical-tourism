import React from 'react';
import { 
  Video, 
  MessageSquare, 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { CONTACT_CTA } from '@/data/originalData';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';

export const ContactSection: React.FC = () => {
  return (
    <section id="consultation" className="py-20 lg:py-28 bg-surface-dim">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Heading */}
        <h2 
          className="text-v2-title font-semibold tracking-[-1px] lg:tracking-[-2px] leading-[40px] lg:leading-[1.1] text-balance mb-12 sm:mb-14" 
          style={{ color: 'var(--color-primary)' }}
        >
          <span>{CONTACT_CTA.headingBefore}</span>{" "}
          <span 
            className="px-3 py-0.5 rounded-2xl inline-block font-medium"
            style={{
              backgroundColor: 'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
              color: 'var(--color-primary)',
            }}
          >
            {CONTACT_CTA.headingAccent}
          </span>
        </h2>

        {/* 2 Action Cards - Elevated Pair */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left items-stretch">
          
          {/* Schedule 30-min Call Card */}
          <OpenConsultationButton
            className="group relative flex flex-col justify-between p-7 sm:p-9 rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-white shadow-lg hover:shadow-2xl text-left border"
            style={{
              background: 'linear-gradient(145deg, #082d32 0%, #051e22 100%)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            {/* Top Row: Badge & Video Icon */}
            <div className="flex items-center justify-between gap-3 relative z-10 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-xs">
                  {CONTACT_CTA.actions[0].badge || 'FREE'}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/80 font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Free 30-min video call</span>
                </span>
              </div>

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/15 text-white/90 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white group-hover:shadow-md">
                <Video className="w-6 h-6" />
              </div>
            </div>

            {/* Title */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
                {CONTACT_CTA.actions[0].title}
              </h3>
            </div>

            {/* Action Cue */}
            <div className="relative z-10 mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
              <span>Book your video appointment</span>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/25 group-hover:text-white group-hover:translate-x-1">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </OpenConsultationButton>

          {/* WhatsApp Card */}
          <a
            href={CONTACT_CTA.actions[1].href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between p-7 sm:p-9 rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer bg-white border shadow-sm hover:shadow-2xl text-left"
            style={{
              borderColor: 'var(--color-surface-outline)',
              background: 'linear-gradient(145deg, #ffffff 0%, #f9fbfb 100%)',
            }}
          >
            {/* Top Row: Live Response Pill & WhatsApp Icon */}
            <div className="flex items-center justify-between gap-3 relative z-10 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{CONTACT_CTA.actions[1].description}</span>
              </div>

              <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-emerald-50 border border-emerald-100 text-emerald-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent group-hover:shadow-md">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>

            {/* Title */}
            <div className="relative z-10 flex-1 flex flex-col justify-center my-3">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-950 group-hover:text-emerald-900 tracking-tight leading-snug transition-colors">
                {CONTACT_CTA.actions[1].title}
              </h3>
            </div>

            {/* Action Cue */}
            <div className="relative z-10 mt-6 pt-5 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-emerald-800 group-hover:text-emerald-900 transition-colors">
              <span>Start WhatsApp conversation</span>
              <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center transition-all duration-300 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </a>

        </div>

        {/* Medical Trust Footnote */}
        <div 
          className="mt-12 sm:mt-14 pt-7 border-t flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-gray-500"
          style={{ borderColor: 'var(--color-surface-outline)' }}
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Confidential Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Zero Waiting Lists</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>No GP Referral Required</span>
          </div>
        </div>

      </div>
    </section>
  );
};
