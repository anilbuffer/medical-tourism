import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PATIENT_GUIDES } from '@/data/contentData';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Patient Guides | Your Medicare Trip',
  description:
    'Plain-English answers on treatment, costs, travel and recovery in India, written by our care team.',
};

export default function GuidesPage() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-28 sm:pt-32 pb-24 bg-[#fafcfb] overflow-hidden">
        {/* Soft Ambient Radial Background Glows matching CareServicesSection */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-emerald-100/35 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -left-20 w-[450px] h-[450px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-24 -right-20 w-[500px] h-[450px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-low mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-low">/</span>
            <span className="text-high font-semibold">Patient Guides</span>
          </nav>

          {/* Heading */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h1
              className="text-[39px] lg:text-[72px] font-semibold tracking-[-1.5px] lg:tracking-[-1.75px] leading-[1.1] lg:leading-none text-balance"
              style={{ color: 'var(--color-primary)' }}
            >
              Patient{' '}
              <span
                className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                style={{
                  backgroundColor:
                    'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                  color: 'var(--color-primary)',
                }}
              >
                guides
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-medium font-normal max-w-2xl">
              Plain-English answers on treatment, costs, travel and recovery, written by our care team. Everything you&apos;d want to know before travelling to India for care.
            </p>
          </div>

          {/* Grid of guides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {PATIENT_GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group flex flex-col overflow-hidden bg-white border border-[#e6ecea] rounded-[20px] shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_12px_32px_rgba(16,24,40,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Cover */}
                <div className="relative h-48 sm:h-52 overflow-hidden flex items-end">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <span
                    className="relative mb-3.5 ml-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold shadow-sm"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {guide.categoryLabel}
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex-1 flex flex-col gap-2 p-5 sm:p-6">
                  <h3 className="text-[18px] sm:text-[19px] font-bold text-[#14262b] group-hover:text-[#059669] tracking-normal leading-[1.35] line-clamp-2 transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-[14px] text-[#6b7a80] leading-[1.5] tracking-normal line-clamp-2 font-normal">
                    {guide.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="mt-auto pt-4 flex items-center justify-between text-[13px] text-[#8a979c] font-medium tracking-normal border-t border-[#e6ecea]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {guide.readMins} min read
                    </span>
                    <span className="inline-flex items-center gap-1 text-[#059669] font-bold tracking-normal group-hover:translate-x-1 transition-transform">
                      Read
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
