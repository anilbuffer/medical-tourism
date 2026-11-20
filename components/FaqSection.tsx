import React from 'react';
import { ChevronDown } from 'lucide-react';
import { EXPERT_QA } from '@/data/faqData';

export const FaqSection: React.FC = () => {
  // NOTE: FAQPage JSON-LD is NOT added here.
  // The homepage FaqSection uses EXPERT_QA data (a small curated set).
  // The dedicated /faqs page carries the full FAQPage schema with all question groups.
  // Adding a competing FAQPage entity on the homepage would cause two conflicting
  // FAQPage schemas on the same domain — Google ignores or penalises duplicates.

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-surface-base">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-balance text-center text-v2-title font-bold text-high lg:text-fgxl-semibold lg:font-bold lg:leading-[60px] lg:tracking-[-0.02em]" style={{ color: 'var(--color-primary)' }}>
            {EXPERT_QA.headingLine1}{" "}
            <span 
              className="px-2.5 py-0.5 rounded-xl inline-block font-medium"
              style={{
                backgroundColor: 'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                color: 'var(--color-primary)',
              }}
            >
              {EXPERT_QA.headingLine2}
            </span>
          </h2>
        </div>

        {/* FAQs: Semantic details & summary for maximum SEO crawlers visibility & zero JS required */}
        <div className="flex flex-col gap-4">
          {EXPERT_QA.cards.map((card, idx: number) => (
            <details
              key={card.id}
              open={idx === 0}
              className="group rounded-2xl border transition-colors overflow-hidden bg-white open:border-emerald-700"
              style={{
                borderColor: 'var(--color-surface-outline)',
              }}
            >
              <summary
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/60 transition-colors list-none select-none [&::-webkit-details-marker]:hidden"
                style={{ color: 'var(--color-high)' }}
              >
                <span className="min-w-0 flex-1 text-lg font-bold leading-7 text-high lg:text-xl">{card.question}</span>
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-open:rotate-180 bg-[var(--color-surface-dim)] group-open:bg-[var(--color-primary)] group-open:text-[var(--color-secondary)]"
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </summary>

              <div 
                className="px-5 pb-6 sm:px-6 border-t pt-4" 
                style={{ borderColor: 'var(--color-surface-outline)' }}
              >
                <p className="text-base leading-6 text-medium">{card.answer}</p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
  );
};
