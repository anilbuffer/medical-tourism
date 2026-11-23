import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { TreatmentsFilterGrid } from './TreatmentsFilterGrid';

export const metadata = {
  title: 'Treatment Costs in India | Clear Starting Prices | Your Medicare Trip',
  description:
    'Clear starting prices and itemised quotes for specialist medical surgery and procedures in India, transparently compared against international costs before you travel.',
  alternates: { canonical: 'https://www.yourmedicaretrip.com/treatment-costs' },
  openGraph: {
    title: 'Treatment Costs in India | Clear Starting Prices | Your Medicare Trip',
    description:
      'Clear starting prices and itemised quotes for specialist medical surgery and procedures in India, transparently compared against international costs before you travel.',
    url: 'https://www.yourmedicaretrip.com/treatment-costs',
    type: 'website',
    images: [{ url: '/images/hero/treatments-hero.jpg', width: 1200, height: 630, alt: 'Treatment Costs in India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Treatment Costs in India | Clear Starting Prices | Your Medicare Trip',
    description:
      'Clear starting prices and itemised quotes for specialist medical surgery and procedures in India, transparently compared against international costs before you travel.',
    images: ['/images/hero/treatments-hero.jpg'],
  },
};

export default function TreatmentCostsPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb]">
      {/* 1. Page Hero */}
      <PageHero
        bgImage="/images/hero/treatments-hero.jpg"
        breadcrumbs={[{ label: 'Treatment Costs' }]}
        title={
          <>
            Treatment costs &amp;{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              clear quotes
            </span>
          </>
        }
        lede="Transparent starting prices for planned medical procedures in India, itemised line by line. Every plan comes with a written, all-inclusive quote before you book a flight."
      />

      {/* 2. Filterable Starting Prices */}
      <section className="py-16 sm:py-24 bg-[#f4f7f6]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <TreatmentsFilterGrid />
        </div>
      </section>

      {/* 3. Bottom CTA Band */}
      <CtaBand />
    </main>
  );
}

