import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { TreatmentsFilterGrid } from './TreatmentsFilterGrid';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Treatments & Costs in India | Your Medicare Trip',
  description:
    'Medical treatments, health check-ups and wellness programmes in the Chandigarh tricity, with clear starting prices itemised before you travel.',
};

export default function TreatmentsPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb]">
      {/* 1. Page Hero */}
      <PageHero
        bgImage="/images/hero/treatments-hero.jpg"
        breadcrumbs={[{ label: 'Treatments' }]}
        title={
          <>
            Treatments &amp;{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              clear costs
            </span>
          </>
        }
        lede="Three ways we can help: planned surgery, a full health check-up, or a recovery and wellness stay. Every plan comes with a written, itemised quote before you book a flight."
      />

      {/* 2. Three Category Hub Tiles */}
      <section className="py-14 sm:py-20">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tile 1: Medical Treatments */}
            <Link
              href="/treatments/medical-treatments"
              className="group relative h-[340px] sm:h-[380px] rounded-[28px] overflow-hidden p-8 flex flex-col justify-between text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              style={{
                backgroundImage: "url('/images/treatments/cat-medical.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark Gradient Overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0b383e]/95 via-[#0b383e]/70 to-[#0b383e]/30 group-hover:from-[#0b383e] group-hover:via-[#0b383e]/75 transition-all"
              />

              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase text-white/75 block mb-2">
                  01 / 03
                </span>
                <h3 className="text-[24px] sm:text-[26px] font-bold text-white tracking-tight">
                  Medical Treatments
                </h3>
              </div>

              <div className="relative z-10">
                <p className="text-[15px] sm:text-[16px] text-white/85 font-normal leading-relaxed mb-6">
                  Specialist surgery at accredited hospitals, planned before you fly.
                </p>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#0b383e] shadow-sm group-hover:bg-[#8bd2ea] transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            {/* Tile 2: Health Check-ups & Diagnostics */}
            <Link
              href="/treatments/health-checkups"
              className="group relative h-[340px] sm:h-[380px] rounded-[28px] overflow-hidden p-8 flex flex-col justify-between text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              style={{
                backgroundImage: "url('/images/treatments/cat-checkups.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark Gradient Overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0b383e]/95 via-[#0b383e]/70 to-[#0b383e]/30 group-hover:from-[#0b383e] group-hover:via-[#0b383e]/75 transition-all"
              />

              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase text-white/75 block mb-2">
                  02 / 03
                </span>
                <h3 className="text-[24px] sm:text-[26px] font-bold text-white tracking-tight">
                  Health Check-ups &amp; Diagnostics
                </h3>
              </div>

              <div className="relative z-10">
                <p className="text-[15px] sm:text-[16px] text-white/85 font-normal leading-relaxed mb-6">
                  Full assessments in a day, with a doctor to explain the results.
                </p>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#0b383e] shadow-sm group-hover:bg-[#8bd2ea] transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            {/* Tile 3: Wellness */}
            <Link
              href="/treatments/wellness"
              className="group relative h-[340px] sm:h-[380px] rounded-[28px] overflow-hidden p-8 flex flex-col justify-between text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              style={{
                backgroundImage: "url('/images/treatments/cat-wellness.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Dark Gradient Overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#0b383e]/95 via-[#0b383e]/70 to-[#0b383e]/30 group-hover:from-[#0b383e] group-hover:via-[#0b383e]/75 transition-all"
              />

              <div className="relative z-10">
                <span className="text-xs font-bold tracking-widest uppercase text-white/75 block mb-2">
                  03 / 03
                </span>
                <h3 className="text-[24px] sm:text-[26px] font-bold text-white tracking-tight">
                  Wellness
                </h3>
              </div>

              <div className="relative z-10">
                <p className="text-[15px] sm:text-[16px] text-white/85 font-normal leading-relaxed mb-6">
                  Recovery stays, rehabilitation and time in the hills.
                </p>
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-white text-[#0b383e] shadow-sm group-hover:bg-[#8bd2ea] transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Section Dim: Filterable Starting Prices */}
      <section className="py-16 sm:py-24 bg-[#f4f7f6] border-t border-[#e2ece9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentsFilterGrid />
        </div>
      </section>

      {/* 4. Bottom CTA Band */}
      <CtaBand />
    </main>
  );
}

