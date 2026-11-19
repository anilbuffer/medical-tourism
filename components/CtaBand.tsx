'use client';

import React from 'react';
import { Lock, Clock, CheckCircle2 } from 'lucide-react';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';

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
          <VideoConsultationCard variant="dark" />
          <WhatsAppCard variant="bordered" />
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
