import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { PATIENT_GUIDES } from '@/data/contentData';

export const PatientGuidesSection: React.FC = () => {
  return (
    <section
      id="patient-guides"
      aria-labelledby="patient-guides-title"
      className="relative py-20 sm:py-24 lg:py-28 bg-[#fafcfb] overflow-hidden select-none transition-colors"
    >
      {/* Soft Ambient Radial Background Glows matching CareServicesSection */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-emerald-100/35 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -left-20 w-[450px] h-[450px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-24 -right-20 w-[500px] h-[450px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-20 max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="patient-guides-title"
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
          </h2>

          <p className="mt-4 text-base leading-6 text-medium font-normal max-w-xl mx-auto">
            Plain-English answers on treatment, costs, travel and recovery, written by our care team.
          </p>
        </div>

        {/* 3-Column Grid matching prototype */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PATIENT_GUIDES.map((guide) => (
            <div key={guide.slug} className="flex">
              <Link
                href={`/guides/${guide.slug}`}
                className="group flex flex-col w-full overflow-hidden bg-white border border-[#e6ecea] rounded-[20px] shadow-[0_1px_2px_rgba(16,24,40,0.04)] hover:shadow-[0_12px_32px_rgba(16,24,40,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Cover image with category tag */}
                <div className="relative h-48 sm:h-52 overflow-hidden flex items-end">
                  <img
                    src={guide.image}
                    alt={guide.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <span className="relative mb-3.5 ml-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#093939] text-xs font-bold shadow-sm">
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
                  <div className="mt-auto pt-3 flex items-center justify-between text-[13px] text-[#8a979c] font-medium tracking-normal border-t border-slate-100">
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
            </div>
          ))}
        </div>

        {/* Centered Outline Button */}
        <div className="flex justify-center mt-9 sm:mt-12">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-6 py-3 border-[1.5px] border-[#093939] rounded-full text-[#093939] font-bold text-sm sm:text-base hover:bg-[#093939] hover:text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            View all guides
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PatientGuidesSection;
