'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TREATMENTS, SPECIALTIES } from '@/data/treatmentsData';

export const TreatmentsFilterGrid: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredTreatments =
    activeFilter === 'all'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.spec === activeFilter);

  return (
    <div>
      {/* Section Header with Filter Chips */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#e6ecea]">
        <div>
          <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e] leading-tight">
            Clear starting prices,
            <br />
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
              itemised before you travel
            </span>
          </h2>
          <p className="mt-3 text-[16px] text-gray-700 max-w-2xl font-normal leading-relaxed">
            Starting prices for patients travelling from{' '}
            <strong className="text-[#0b383e] font-semibold">Saudi Arabia</strong>, in US dollars.
            Your final quote depends on your reports and is fixed in writing before you travel.
          </p>
        </div>

        {/* Specialty Filter Chips */}
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

      {/* Grid of Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTreatments.map((t) => (
          <article
            key={t.slug}
            className="group flex flex-col justify-between p-7 rounded-[24px] bg-white border border-[#e6ecea] shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg hover:-translate-y-1 hover:border-[#8bd2ea] transition-all"
          >
            <div>
              {/* Category Tag */}
              <span className="text-[12px] font-bold uppercase tracking-wider text-gray-600 block mb-2">
                {t.specName}
              </span>

              {/* Title */}
              <h3 className="text-[20px] font-bold text-[#0b383e] tracking-tight mb-4">
                {t.name}
              </h3>

              {/* Price Row */}
              {t.priceFrom !== null ? (
                <div className="mb-2">
                  <div className="flex items-baseline justify-between py-2 border-b border-[#eef2f1]">
                    <span className="text-xs text-gray-600 font-normal">
                      {t.addon ? 'Add-on from' : 'Starting from'}
                    </span>
                    <span className="text-[24px] font-black text-[#0b383e]">
                      ${t.priceFrom.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 pt-2 font-normal">
                    <span>
                      {t.priceTo
                        ? `Up to $${t.priceTo.toLocaleString()} USD`
                        : 'Per cycle, USD'}
                    </span>
                    {t.saving && (
                      <span className="px-2 py-0.5 rounded-md bg-[#eef6f5] text-[#008329] font-bold">
                        Save {t.saving}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-2">
                  <div className="flex items-baseline justify-between py-2 border-b border-[#eef2f1]">
                    <span className="text-xs text-gray-600 font-normal">Price</span>
                    <span className="text-[18px] font-bold text-[#0b383e]">
                      Quoted after review
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 pt-2 font-normal">
                    <span>Itemised quote within 48 hours</span>
                    <span />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-6 mt-6 border-t border-[#f0f4f3]">
              <Link
                href={`/treatments/${t.slug}`}
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#fafcfb] text-[#0b383e] border border-[#d6e3df] hover:bg-[#0b383e] hover:text-white hover:border-[#0b383e] transition-all text-center"
              >
                Details
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* How We Price Callout */}
      <div className="mt-10 p-6 sm:p-7 rounded-[22px] bg-[#eef6f5] border border-[#d6e9e4] text-[#0b383e]">
        <p className="text-[16px] leading-[1.7] text-gray-800">
          <strong className="block sm:inline font-bold text-[#0b383e] mr-3">
            How we price:
          </strong>
          Hospital packages, specialist fees and recovery care are itemised line by line.
          If your doctor recommends something different once you arrive, nothing changes until you have seen the revised figure and agreed to it.
        </p>
      </div>
    </div>
  );
};

