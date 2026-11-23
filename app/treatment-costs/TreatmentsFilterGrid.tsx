'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe } from 'lucide-react';
import { TREATMENTS, SPECIALTIES } from '@/data/treatmentsData';
import { TREATMENT_COSTS } from '@/data/treatmentCosts';
import { useCountry } from '@/components/providers/AppProviders';
import { CountryFlag } from '@/components/CountryFlag';
import { COMPARISON_COUNTRIES } from '@/data/countriesData';

const CARD_THEMES = [
  {
    name: 'teal',
    color: '#136d78',
    lightBg: 'rgba(19, 109, 120, 0.12)',
  },
  {
    name: 'emerald',
    color: '#059669',
    lightBg: 'rgba(5, 150, 105, 0.12)',
  },
  {
    name: 'petrol',
    color: '#177a88',
    lightBg: 'rgba(23, 122, 136, 0.12)',
  },
];

export const TreatmentsFilterGrid: React.FC = () => {
  const { selectedCountry, otherComparisonCountry, setOtherComparisonCountry } = useCountry();
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredTreatments =
    activeFilter === 'all'
      ? TREATMENTS
      : TREATMENTS.filter((t) => t.spec === activeFilter);

  const isOtherSelected =
    selectedCountry?.code === 'OT' ||
    selectedCountry?.code === 'OTHER' ||
    selectedCountry?.market?.toLowerCase() === 'other' ||
    selectedCountry?.name?.toLowerCase() === 'other';

  const activeCompMarket = isOtherSelected
    ? otherComparisonCountry || 'Saudi Arabia'
    : selectedCountry?.market || selectedCountry?.name || 'Saudi Arabia';

  const activeCompCountryObj = COMPARISON_COUNTRIES.find(
    (c) => c.market.toLowerCase() === activeCompMarket.toLowerCase()
  );

  const targetMarket = activeCompMarket;

  return (
    <div>
      {/* Section Header with Filter Chips */}
      <div className="flex flex-col justify-between gap-6 mb-10 pb-6 border-b border-[#e6ecea]">
        <div>
          <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e] leading-tight">
            Clear starting prices,
            <br />
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
              itemised before you travel
            </span>
          </h2>
          <p className="mt-3 text-[16px] text-gray-700 max-w-2xl font-normal leading-relaxed">
            {isOtherSelected ? (
              <>
                Starting prices compared against{' '}
                <strong className="text-[#0b383e] font-semibold">
                  {activeCompCountryObj?.name || activeCompMarket}
                </strong>
                , in US dollars. Your final quote depends on your reports and is fixed in writing before you travel.
              </>
            ) : (
              <>
                Starting prices for patients travelling from{' '}
                <strong className="text-[#0b383e] font-semibold">
                  {selectedCountry?.name || 'Saudi Arabia'}
                </strong>
                , in US dollars. Your final quote depends on your reports and is fixed in writing before you travel.
              </>
            )}
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

        {/* Country Tabs when "Other" is selected */}
        {isOtherSelected && (
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-3 bg-[#e8f3f4]/75 p-3.5 sm:p-4 rounded-2xl border border-[#cbe4e8]">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0e3b3d] shrink-0">
              <Globe className="w-4 h-4 text-[#136d78]" />
              <span>Compare prices with:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
              {COMPARISON_COUNTRIES.map((c) => {
                const isTabActive = activeCompMarket.toLowerCase() === c.market.toLowerCase();
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setOtherComparisonCountry?.(c.market)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isTabActive
                        ? 'bg-[#0b383e] text-white shadow-sm ring-1 ring-[#0b383e]'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <CountryFlag code={c.code} market={c.market} className="w-4 h-3 rounded-[2px]" />
                    <span>{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Grid of Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-9">
        {filteredTreatments.map((t, index) => {
          const theme = CARD_THEMES[index % CARD_THEMES.length];
          const costData = TREATMENT_COSTS[t.slug];
          const locPrices = costData?.locationPrices;
          
          const indiaPrice = locPrices?.find((p) => p.market === 'India') || locPrices?.[0];
          
          const explicitMatch = locPrices?.find((p) => 
            p.market.toLowerCase() === targetMarket.toLowerCase() ||
            (!isOtherSelected && selectedCountry?.code && p.flagCode.toLowerCase() === selectedCountry.code.toLowerCase()) ||
            (p.market.toLowerCase() === 'uae' && (targetMarket.toLowerCase().includes('uae') || targetMarket.toLowerCase().includes('emirates')))
          );
          
          const comparisonPrice = explicitMatch || locPrices?.find((p) => !p.isPrimary && p.market !== 'India') || locPrices?.[1];
          const compMarketName = comparisonPrice?.market || targetMarket;
          const compCountryObj = COMPARISON_COUNTRIES.find(c => c.market.toLowerCase() === compMarketName.toLowerCase());
          const compFlagCode = compCountryObj?.code || comparisonPrice?.flagCode || (!isOtherSelected ? selectedCountry?.code : undefined);
          const compMinAmount = comparisonPrice?.amount || 0;
          const indMinAmount = indiaPrice?.amount ?? costData?.priceFrom ?? t.priceFrom ?? 0;
          
          const calculatedSavings = compMinAmount && compMinAmount > indMinAmount 
            ? Math.round(((compMinAmount - indMinAmount) / compMinAmount) * 100)
            : (costData?.savingsPercent || 0);

          const indiaRangeText = costData?.priceRange || indiaPrice?.range || (indiaPrice?.maxAmount ? `$${indMinAmount.toLocaleString()} – $${indiaPrice.maxAmount.toLocaleString()}` : `$${indMinAmount.toLocaleString()}`);

          const comparisonRangeText = comparisonPrice?.range 
            ? `${comparisonPrice.range} USD`
            : comparisonPrice?.maxAmount && comparisonPrice.maxAmount > compMinAmount
            ? `$${compMinAmount.toLocaleString()} – $${comparisonPrice.maxAmount.toLocaleString()} USD`
            : `$${compMinAmount.toLocaleString()} USD`;

          return (
            <article
              key={t.slug}
              className="group relative rounded-tl-[4px] rounded-tr-[76px] rounded-br-[4px] rounded-bl-[76px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_48px_rgba(11,56,62,0.12)] transition-all duration-300 pt-7 pb-8 px-6 sm:px-8 w-full flex flex-col justify-between"
            >
              <div>
                {/* Category Tag */}
                <span className="text-[12px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  {t.specName}
                </span>

                {/* Title */}
                <h3 
                  className="text-lg lg:text-xl font-bold tracking-tight mb-3 transition-colors leading-7 text-high"
                  style={{ color: 'var(--color-high)' }}
                >
                  {t.name}
                </h3>

                {/* Full-width Range Box */}
                <div className="relative mb-5 w-full">
                  <div 
                    className="h-13 w-full px-4 sm:px-5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between transition-transform group-hover:scale-[1.01]"
                    style={{ 
                      backgroundColor: theme.lightBg,
                      color: theme.color,
                    }}
                  >
                    <span className="text-sm sm:text-base font-semibold opacity-90">
                      Range
                    </span>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight">
                      {indiaRangeText}
                    </span>
                  </div>
                </div>

                {/* Feature Rows */}
                <div className="flex flex-col gap-2 my-2">
                  {/* Row 1: Comparison Country (Zebra Grey Background) */}
                  <div className="bg-[#f0f3f3] rounded-[4px] px-3.5 py-2.5 flex items-center justify-between text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <CountryFlag code={compFlagCode} market={compMarketName} />
                      <span className="font-medium text-gray-700">{compMarketName}</span>
                    </div>
                    <span className="font-semibold text-gray-600 shrink-0 text-right">
                      {comparisonRangeText}
                    </span>
                  </div>

                  {/* Row 2: Verified Savings */}
                  <div className="px-3.5 py-2.5 flex items-center justify-between text-sm text-gray-700">
                    <span className="font-medium text-gray-800">Verified Savings</span>
                    <span className="font-bold text-[#008329] shrink-0">
                      Save ~{calculatedSavings}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Details Button */}
              <div className="pt-6 mt-4 border-t border-[#f0f4f3]">
                <Link
                  href={`/treatments/${t.slug}`}
                  className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#fafcfb] text-[#0b383e] border border-[#d6e3df] hover:bg-[#0b383e] hover:text-white hover:border-[#0b383e] transition-all text-center shadow-xs"
                >
                  Details
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* How We Price Callout */}
      <div className="mt-12 p-6 sm:p-7 rounded-[22px] bg-[#eef6f5] border border-[#d6e9e4] text-[#0b383e]">
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
