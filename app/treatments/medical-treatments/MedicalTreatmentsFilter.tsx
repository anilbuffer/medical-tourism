'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { TREATMENTS, SPECIALTIES } from '@/data/treatmentsData';

export const MedicalTreatmentsFilter: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredTreatments =
    activeFilter === 'all'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.spec === activeFilter);

  return (
    <div>
      {/* Head with Chips */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#e6ecea]">
        <div>
          <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e] leading-tight">
            Choose a{' '}
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
              specialty
            </span>
          </h2>
          <p className="mt-3 text-[16px] text-gray-700 max-w-2xl font-normal leading-relaxed">
            We focus on planned, elective treatment, where travelling makes sense and there&apos;s time to prepare properly.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#0b383e] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-[#eef6f5] border border-[#d6e3df]'
            }`}
          >
            All
          </button>
          {SPECIALTIES.map((spec) => (
            <button
              key={spec.id}
              type="button"
              onClick={() => setActiveFilter(spec.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === spec.id
                  ? 'bg-[#0b383e] text-white shadow-sm'
                  : 'bg-white text-gray-700 hover:bg-[#eef6f5] border border-[#d6e3df]'
              }`}
            >
              {spec.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 9 Media Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.map((t) => (
          <Link
            key={t.slug}
            href={`/treatments/${t.slug}`}
            className="group flex flex-col justify-between rounded-[24px] bg-white border border-[#e6ecea] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-xl hover:-translate-y-1 hover:border-[#8bd2ea] transition-all"
          >
            <div>
              {/* Media Image with Tag Dot */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                    {t.specName}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <h3 className="text-[20px] font-bold text-[#0b383e] tracking-tight mb-2 group-hover:text-[#0e484f] transition-colors">
                  {t.name}
                </h3>
                <p className="text-[14px] text-gray-600 font-normal leading-[1.6] line-clamp-3">
                  {t.summary}
                </p>
              </div>
            </div>

            {/* Bottom Arrow / Price Link */}
            <div className="px-6 pb-6 pt-2">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[#0b383e] group-hover:text-[#008329] transition-colors">
                <span>
                  {t.priceFrom !== null
                    ? `From $${t.priceFrom.toLocaleString()}`
                    : 'See details'}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

