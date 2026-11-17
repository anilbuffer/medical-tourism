import React from 'react';
import Link from 'next/link';
import { ArrowRight, Lock, Clock, CheckCircle2 } from 'lucide-react';

export const CtaBand: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#eef6f5] text-center border-t border-[#e2ece9]">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
        <h2 className="text-[32px] sm:text-[40px] font-bold text-[#0b383e] tracking-tight leading-tight">
          Ready to plan{' '}
          <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.35)] font-semibold">
            your treatment?
          </span>
        </h2>

        <p className="mt-3.5 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto font-normal leading-relaxed">
          Book a free 30-minute video consultation. A coordinator and a doctor go through your case and tell you honestly whether travelling for treatment makes sense.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[640px] mx-auto mt-9 text-left">
          {/* Dark Tile: Video Appointment */}
          <Link
            href="/#consultation"
            className="group flex flex-col justify-between p-6 rounded-[22px] bg-[#0b383e] text-white shadow-md hover:-translate-y-1 transition-all min-h-[160px]"
          >
            <div>
              <small className="text-xs text-white/70 block mb-1 font-normal">
                Free, 30 minutes
              </small>
              <strong className="text-base sm:text-lg font-bold text-white">
                Video consultation
              </strong>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white/90 pt-4 border-t border-white/10 mt-4">
              <span>Book your video appointment</span>
              <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#8bd2ea] group-hover:bg-[#8bd2ea] group-hover:text-[#0b383e] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Light Tile: WhatsApp Care Team */}
          <a
            href="https://wa.me/447587399811?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20treatment%20in%20India."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between p-6 rounded-[22px] bg-white text-[#0b383e] border border-[#d6e3df] shadow-sm hover:-translate-y-1 hover:border-[#8bd2ea] transition-all min-h-[160px]"
          >
            <div>
              <small className="text-xs text-[#008329] block mb-1 font-semibold">
                Usually replies in minutes
              </small>
              <strong className="text-base sm:text-lg font-bold text-[#0b383e]">
                WhatsApp our care team
              </strong>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#0b383e] pt-4 border-t border-gray-100 mt-4">
              <span>Start WhatsApp conversation</span>
              <span className="w-8 h-8 rounded-full bg-[#eef6f5] flex items-center justify-center text-[#0b383e] group-hover:bg-[#0b383e] group-hover:text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </a>
        </div>

        {/* Trust Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10 text-xs sm:text-sm font-semibold text-gray-700">
          <span className="inline-flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#008329]" />
            Confidential consultation
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#008329]" />
            No waiting lists
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#008329]" />
            No GP referral needed
          </span>
        </div>
      </div>
    </section>
  );
};

