import Link from 'next/link';
import type { Metadata } from 'next';
import { Compass, Home, Stethoscope, MessageSquare } from 'lucide-react';
import { WHATSAPP_URL } from '@/constants/whatsapp';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Your Medicare Trip',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fafcfb] flex flex-col justify-between selection:bg-[#8bd2ea]/30 selection:text-[#0b383e]">
      {/* 1. TOP NAVBAR BACKDROP BAND (Ensures fixed white navbar has crisp contrast) */}
      <div 
        aria-hidden="true" 
        className="w-full h-[115px] sm:h-[125px] bg-[#0b383e] shrink-0 border-b border-[#082a2f]"
        style={{
          background: 'radial-gradient(900px 200px at 85% 0%, rgba(139, 210, 234, 0.20), transparent 70%), linear-gradient(180deg, #072b2e 0%, #0b383e 100%)',
        }}
      />

      {/* 2. MAIN 404 CONTENT CANVAS (Clean, bright, trustworthy medical aesthetic) */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden isolate">
        {/* Soft, calming ambient tints */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(700px 350px at 50% 30%, rgba(139, 210, 234, 0.20), transparent 75%), radial-gradient(500px 300px at 80% 80%, rgba(185, 220, 213, 0.15), transparent 75%)',
          }}
        />

        {/* Subtle decorative grid dots */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #0b383e 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating White Card */}
        <div className="relative z-10 w-full max-w-xl mx-auto bg-white border border-[#e1e6e5] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-[0_8px_32px_rgba(11,56,62,0.06)] text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#dcf1f8] text-[#0b383e] border border-[#8bd2ea]/40 mb-4 shadow-xs">
            <Compass className="w-3.5 h-3.5 text-[#0b383e]" />
            <span>Error 404 • Page Not Found</span>
          </div>

          {/* Large 404 Graphic Number */}
          <div className="text-[88px] sm:text-[120px] font-black leading-none tracking-tight text-[#0b383e] select-none my-2 drop-shadow-xs">
            4<span className="text-[#8bd2ea]">0</span>4
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0b383e] mb-3">
            We couldn&apos;t find{' '}
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold text-[#0b383e]">
              this page
            </span>
          </h1>

          {/* Lede / Explanation */}
          <p className="text-sm sm:text-base text-[#404948] max-w-md font-normal leading-relaxed">
            The link you followed may be broken, or the treatment guide or doctor profile may have been moved or removed.
          </p>

          {/* Reassuring Handwritten Kalam Note */}
          <p className="font-kalam text-[#0b383e] text-lg sm:text-xl font-medium mt-3">
            Don&apos;t worry, you&apos;re in safe hands ✨
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 w-full">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0b383e] hover:bg-[#095458] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Home className="w-4 h-4 text-[#8bd2ea]" />
              <span>Return to Homepage</span>
            </Link>

            <Link
              href="/treatments"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#f8fafa] text-[#0b383e] font-semibold text-sm sm:text-base border border-[#d6e5e2] shadow-xs transition-all duration-200 hover:-translate-y-0.5"
            >
              <Stethoscope className="w-4 h-4 text-[#0b383e]" />
              <span>Browse Treatments</span>
            </Link>
          </div>

          {/* WhatsApp Direct Help Link */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#707978] hover:text-[#0b383e] transition-colors mt-8 group"
          >
            <MessageSquare className="w-4 h-4 text-[#008329] group-hover:scale-110 transition-transform" />
            <span>Need immediate medical assistance? Chat on WhatsApp &rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
