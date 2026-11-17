import { PageHero } from '@/components/PageHero';
import { 
  Calendar, 
  Scale, 
  Mail, 
  Info
} from 'lucide-react';

export const metadata = {
  title: 'Terms of Use | Your Medicare Trip',
  description:
    'The terms that apply to using the Your Medicare Trip website and our care facilitation services.',
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-20">
      <PageHero
        compact
        breadcrumbs={[{ label: 'Terms of Use' }]}
        title={
          <>
            Terms of{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              use
            </span>
          </>
        }
      />

      <div className="relative z-10 max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        {/* Terms Document Card */}
        <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.06)]">
            
            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#eef2f1]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e]">
                <Calendar className="w-3.5 h-3.5 text-[#095458]" />
                Last updated: 17 November 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-medium">
                <Scale className="w-4 h-4 text-[#095458]" />
                Care Facilitation Terms
              </span>
            </div>

            {/* Counsel Notice */}
            <div className="mb-8 p-4 rounded-xl bg-[#f8fafa] border border-[#e1e6e5] flex items-start gap-3 text-[16px] text-medium leading-[26px]">
              <Info className="w-5 h-5 text-[#095458] shrink-0 mt-0.5" />
              <p>
                <strong className="font-semibold text-high">Legal Notice:</strong> These general terms govern website browsing and initial enquiry facilitation. When proceeding with medical treatment, a personalised written care agreement will detail your custom procedure, hospital quotation, and schedule.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-10 text-[16px] text-medium leading-[28px]">
              
              {/* Section 1 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  1. About these terms
                </h2>
                <p>
                  These terms apply to your use of yourmedicaretrip.com and to enquiries made through it. The website is operated by [Registered legal entity name], [Registered office address], Mohali, Punjab, India. If you go ahead with treatment, a separate written agreement will set out the services, prices and payment terms for your plan; if that agreement conflicts with these terms, the agreement applies.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  2. Our role
                </h2>
                <p>
                  Your Medicare Trip is a care facilitator. We help you choose a specialist and hospital, coordinate travel, accommodation and support, and arrange follow-up. We are not a hospital or medical practitioner. Medical treatment is provided by independent registered doctors and hospitals, who are responsible for clinical decisions and the care they provide.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  3. No medical advice
                </h2>
                <p>
                  Information on this website is for general informational and educational guidance and is not personal medical advice. Always seek the advice of qualified healthcare professionals for diagnosis and medical treatment decisions.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  4. Prices and quotes
                </h2>
                <p>
                  Prices published on the website are indicative starting estimates in US dollars based on typical procedures. Your actual procedure price is set out in a detailed written quote after your clinical reports and imaging are evaluated by the specialist. A quote may be adjusted if the treating physician recommends an alternate or modified procedure following in-person clinical examination; any adjustment will be transparently explained and agreed with you prior to treatment.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  5. Payments, cancellations and refunds
                </h2>
                <p>
                  Payment schedules, deposit requirements, cancellation timelines, and refund terms are clearly detailed in your written quote and patient agreement. Amounts disbursed directly to partner hospitals, clinical diagnostic centers, or third-party accommodation providers are governed by their respective institutional policies.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  6. Your responsibilities
                </h2>
                <p className="mb-3">
                  To ensure a safe and successful medical journey, you agree to:
                </p>
                <ul className="space-y-2.5 pl-1">
                  {[
                    'Provide accurate, up-to-date, and complete medical records and history',
                    'Carefully heed the pre-operative and post-operative clinical advice of your treating physicians',
                    'Secure valid passports, medical visas, and appropriate travel or medical insurance',
                    'Respect the statutory laws and local guidelines of India throughout your stay',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 7 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  7. Liability
                </h2>
                <p>
                  We are committed to providing care coordination services with reasonable diligence, care, and professional skill. We are not liable for clinical outcomes or surgical risks, nor for the independent acts or omissions of hospitals, attending surgeons, airlines, or external transport providers. Nothing in these terms excludes liability that cannot lawfully be limited under Indian law.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  8. Website use
                </h2>
                <p>
                  You agree not to misuse this website, introduce malicious software, attempt unauthorized administrative access, or reproduce our proprietary content or photography for commercial purposes without prior written authorization. Hospital names, accreditations, and trademarks belong to their respective registered owners.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  9. Governing law
                </h2>
                <p>
                  These terms are governed by and construed in accordance with the laws of India. The courts located at Mohali / Chandigarh have exclusive jurisdiction over any disputes arising under or related to these website terms.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  10. Contact
                </h2>
                <p>
                  For questions or clarifications regarding these terms of use, please reach out to our team at{' '}
                  <a
                    href="mailto:care@yourmedicaretrip.com"
                    className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    care@yourmedicaretrip.com
                  </a>.
                </p>
              </section>

            </div>

            {/* Bottom Support Banner */}
            <div className="mt-12 pt-8 border-t border-[#eef2f1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-high text-base">Questions about our terms?</p>
                <p className="text-[16px] text-low mt-0.5">Our care support team is available 24/7.</p>
              </div>
              <a
                href="mailto:care@yourmedicaretrip.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white shadow-sm hover:opacity-95 transition-opacity"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Mail className="w-4 h-4" />
                Contact Care Team
              </a>
            </div>

          </div>
        </div>
      </main>
  );
}

