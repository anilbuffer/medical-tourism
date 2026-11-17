import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { GUIDES } from '@/data/guidesData';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Patient Guides | Your Medicare Trip',
  description:
    'Clear, practical reading for anyone planning treatment, a check-up or recovery in India.',
};

export default function GuidesHubPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb]">
      {/* 1. Page Hero (Compact) */}
      <PageHero
        compact={true}
        breadcrumbs={[{ label: 'Patient guides' }]}
        title={
          <>
            Patient{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              guides
            </span>
          </>
        }
        lede="Clear, practical reading for anyone planning treatment, a check-up or recovery in India."
      />

      {/* 2. Grid of Guides */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col justify-between rounded-[24px] bg-white border border-[#e6ecea] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-xl hover:-translate-y-1 hover:border-[#8bd2ea] transition-all"
              >
                <div>
                  {/* Media Image with Tag Dot */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={guide.img}
                      alt={guide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                        {guide.cat}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-[19px] sm:text-[20px] font-bold text-[#0b383e] tracking-tight leading-snug mb-3 group-hover:text-[#0e484f] transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-[14px] text-gray-600 font-normal leading-[1.6]">
                      {guide.desc}
                    </p>
                  </div>
                </div>

                {/* Footer read time & arrow */}
                <div className="px-6 pb-6 pt-2">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b383e] group-hover:text-[#008329] transition-colors">
                    <span>{guide.mins} min read</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Band */}
      <CtaBand />
    </main>
  );
}
