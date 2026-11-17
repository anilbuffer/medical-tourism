import { PageHero } from '@/components/PageHero';
import { 
  ShieldAlert, 
  Calendar, 
  AlertCircle
} from 'lucide-react';

export const metadata = {
  title: 'Medical Disclaimer | Your Medicare Trip',
  description:
    'Information on the Your Medicare Trip website is general and is not a substitute for advice from a qualified doctor.',
};

export default function MedicalDisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-20">
      {/* Signature Compact Hero */}
      <PageHero
        compact
        breadcrumbs={[{ label: 'Medical Disclaimer' }]}
        title={
          <>
            Medical{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              disclaimer
            </span>
          </>
        }
      />

      <div className="relative z-10 max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        {/* Document Card */}
        <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.06)]">
          
          {/* Meta Tags Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#eef2f1]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e]">
              <Calendar className="w-3.5 h-3.5 text-[#095458]" />
              Last updated: 17 November 2026
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-medium">
              <ShieldAlert className="w-4 h-4 text-[#095458]" />
              Clinical Information Notice
            </span>
          </div>

          {/* Legal Notice */}
          <div className="mb-8 p-4 rounded-xl bg-[#f8fafa] border border-[#e1e6e5] flex items-start gap-3 text-[16px] text-medium leading-[26px]">
            <AlertCircle className="w-5 h-5 text-[#095458] shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-high">Important Note:</strong> Your Medicare Trip is a medical travel and care facilitation service. All medical examinations, surgical procedures, and healthcare opinions are rendered independently by qualified, licensed physicians and partner hospitals.
            </p>
          </div>

          {/* Disclaimer Sections */}
          <div className="space-y-10 text-[16px] text-medium leading-[28px]">
            
            {/* Section 1 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                1. General information only
              </h2>
              <p>
                The content on this website, including treatment pages, guides and FAQs, is for general information. It is not medical advice, diagnosis or treatment, and should not be relied on as such.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                2. Talk to a qualified doctor
              </h2>
              <p>
                Always seek the advice of a qualified doctor about any medical condition or treatment. Don&apos;t ignore medical advice or delay seeking it because of something you&apos;ve read here.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                3. Results vary
              </h2>
              <p>
                Every patient is different. Timelines, recovery periods and outcomes described on this website are typical examples, not guarantees. All medical procedures carry risks, which your treating doctor will explain.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                4. Prices
              </h2>
              <p>
                Prices shown are indicative starting prices. Your actual cost is confirmed in a written quote after your case has been reviewed.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                5. Emergencies
              </h2>
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[#5b4a17]">
                <p className="font-medium">
                  We cannot respond to medical emergencies. If you need urgent help, contact your local emergency services or go to the nearest hospital immediately.
                </p>
              </div>
            </section>

          </div>

        </div>
      </div>
    </main>
  );
}

