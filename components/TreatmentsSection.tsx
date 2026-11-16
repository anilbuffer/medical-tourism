'use client';

import React, { useState, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { TREATMENTS_SECTION } from '@/data/originalData';
import { CountryOption } from '@/components/Navbar';
import { CountryFlag } from '@/components/CountryFlag';
import { useConsultation, useCountry } from '@/components/providers/AppProviders';

interface TreatmentsSectionProps {
  onOpenConsultation?: (treatmentTitle?: string) => void;
  selectedCountry?: CountryOption;
}

// Lighter tones derived directly from our brand color schema (Teal & Emerald)
const CARD_THEMES = [
  {
    name: 'teal',
    color: '#136d78', // Brand teal
    lightBg: 'rgba(19, 109, 120, 0.12)', // Lighter version of current background color
  },
  {
    name: 'emerald',
    color: '#059669', // Brand emerald/savings
    lightBg: 'rgba(5, 150, 105, 0.12)',
  },
  {
    name: 'petrol',
    color: '#177a88', // Soft petrol teal
    lightBg: 'rgba(23, 122, 136, 0.12)',
  },
];

// Staggered scroll animation variants
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 48, 
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ 
  onOpenConsultation: propOpenConsultation,
  selectedCountry: propSelectedCountry,
}) => {
  const { openConsultation: ctxOpenConsultation } = useConsultation();
  const { selectedCountry: ctxSelectedCountry } = useCountry();
  const handleOpenConsultation = propOpenConsultation || ctxOpenConsultation;
  const activeCountry = propSelectedCountry || ctxSelectedCountry;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = TREATMENTS_SECTION.categories;
  const allCards = TREATMENTS_SECTION.cards;

  // Exact 6 items (two rows of 3 columns)
  const filteredCards = (selectedCategory === 'all'
    ? allCards
    : allCards.filter(c => c.category === selectedCategory)
  ).slice(0, 6);

  const targetMarket = activeCountry?.market || activeCountry?.name || 'Saudi Arabia';

  return (
    <section ref={sectionRef} id="treatments" className="py-20 lg:py-28 bg-surface-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Viewport Scroll Entrance */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pb-8 border-b" 
          style={{ borderColor: 'var(--color-surface-outline)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h2 className="text-v2-title font-semibold tracking-[-1px] lg:tracking-[-2px] leading-[40px] lg:leading-[1.1] text-balance text-left" style={{ color: 'var(--color-primary)' }}>
                {TREATMENTS_SECTION.headingLine1}{" "}
                <span 
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor: 'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  {TREATMENTS_SECTION.headingLine2}
                </span>
              </h2>
              <p className="mt-3 text-base leading-6 text-medium font-normal max-w-xl">
                Transparent hospital packages, specialist consultant fees, and recovery care itemised with no hidden surprises.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenConsultation()}
              className="inline-flex items-center justify-center rounded-full text-center transition-colors cursor-pointer h-[42px] px-6 text-base font-medium bg-primary text-white hover:bg-primary-hover active:bg-primary-pressed shadow-sm shrink-0 self-start sm:self-auto"
            >
              {TREATMENTS_SECTION.viewAllLabel || 'Send Enquiry'}
            </button>
          </div>
        </motion.div>

        {/* Categories Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar"
        >
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.value;
            return (
              <motion.button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`relative h-[42px] px-5 rounded-full text-base font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  isSelected
                    ? 'text-white border-transparent shadow-sm'
                    : 'text-gray-700 bg-white border-gray-200 hover:bg-gray-50 hover:text-gray-900'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface-base)',
                  borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface-outline)',
                  color: isSelected ? '#ffffff' : 'var(--color-high)',
                }}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeTreatmentFilter"
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 text-base font-medium">{cat.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Cards Grid with Staggered Scroll Animation */}
        <motion.div 
          key={selectedCategory}
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 lg:gap-9"
        >
          {filteredCards.map((card, index) => {
            const theme = CARD_THEMES[index % CARD_THEMES.length];
            const indiaPrice = card.locationPrices?.find(p => p.market === 'India') || card.locationPrices?.[0];
            
            // 1 comparison country matching user's selected dropdown
            const isTargetUK = targetMarket.toLowerCase().includes('kingdom') || activeCountry?.code === 'GB';
            const explicitMatch = card.locationPrices?.find((p) => 
              p.market.toLowerCase() === targetMarket.toLowerCase()
            );
            const comparisonPrice = explicitMatch || (isTargetUK 
              ? (() => {
                  const dePrice = card.locationPrices?.find((p) => p.market.toLowerCase() === 'germany');
                  return {
                    amount: dePrice ? dePrice.amount : (card.locationPrices?.[1]?.amount || 5999),
                    isPrimary: false,
                    market: 'United Kingdom',
                    flagCode: 'gb',
                    currencyCode: 'USD',
                  };
                })()
              : (card.locationPrices?.find((p) => !p.isPrimary && p.market !== 'India') || card.locationPrices?.[1]));

            const compMarketName = comparisonPrice?.market || targetMarket;
            const compAmount = comparisonPrice?.amount;
            const indAmount = indiaPrice?.amount || 0;
            const calculatedSavings = compAmount && compAmount > indAmount 
              ? Math.round(((compAmount - indAmount) / compAmount) * 100)
              : card.savingsPercent;

            return (
              <motion.div
                key={card.id}
                variants={cardItemVariants}
                whileHover={{ y: -7, transition: { duration: 0.2, ease: 'easeOut' } }}
                onClick={() => handleOpenConsultation(card.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenConsultation(card.title);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details and book consultation for ${card.title}`}
                /* Leaf contour with full responsive width */
                className="group relative rounded-tl-[4px] rounded-tr-[76px] rounded-br-[4px] rounded-bl-[76px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_48px_rgba(11,56,62,0.12)] transition-all duration-300 pt-7 pb-8 px-6 sm:px-8 w-full flex flex-col justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#136d78]"
              >
                <div>
                  {/* Title: Direct at top left */}
                  <h3 
                    className="text-lg lg:text-xl font-bold tracking-tight mb-3 transition-colors leading-7 text-high"
                    style={{ color: 'var(--color-high)' }}
                  >
                    {card.title}
                  </h3>

                  {/* Full-width Starting Price Box */}
                  <div className="relative mb-5 w-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + (index % 3) * 0.08, duration: 0.4 }}
                      className="h-13 w-full px-4 sm:px-5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] flex items-center justify-between transition-transform group-hover:scale-[1.01]"
                      style={{ 
                        backgroundColor: theme.lightBg,
                        color: theme.color,
                      }}
                    >
                      <span className="text-sm sm:text-base font-semibold opacity-90">
                        Starting from
                      </span>
                      <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                        ${indiaPrice ? indiaPrice.amount.toLocaleString() : '2,999'}
                      </span>
                    </motion.div>
                  </div>

                  {/* Feature Rows (without tick icons, without medical specialty row) */}
                  <div className="flex flex-col gap-2 my-2">
                    
                    {/* Row 1: Comparison Country (Zebra Grey Background) */}
                    <div className="bg-[#f0f3f3] rounded-[4px] px-3.5 py-2.5 flex items-center justify-between text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <CountryFlag code={activeCountry?.code} market={compMarketName} />
                        <span className="font-medium text-gray-700">{compMarketName}</span>
                      </div>
                      <span className="font-semibold text-gray-600 shrink-0">
                        ${comparisonPrice?.amount.toLocaleString()} USD
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

              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
