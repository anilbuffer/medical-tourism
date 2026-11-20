import React from 'react';
import { ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { CONTACT_CTA } from '@/data/contactData';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';

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
          <VideoConsultationCard
            variant="elevated"
            badge={CONTACT_CTA.actions[0]?.badge || 'FREE'}
            title={CONTACT_CTA.actions[0]?.title || 'Schedule 30-min video call'}
          />
          <WhatsAppCard variant="elevated" />
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
