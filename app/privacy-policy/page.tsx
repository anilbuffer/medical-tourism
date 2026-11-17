import { PageHero } from '@/components/PageHero';
import { 
  ShieldCheck, 
  Calendar, 
  Mail, 
  Info
} from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Your Medicare Trip',
  description:
    'How Your Medicare Trip collects, uses and protects personal and health information under India’s Digital Personal Data Protection Act, 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-20">
      <PageHero
        compact
        breadcrumbs={[{ label: 'Privacy Policy' }]}
        title={
          <>
            Privacy{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              policy
            </span>
          </>
        }
      />

      <div className="relative z-10 max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        {/* Policy Document Card */}
        <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.06)]">
            
            {/* Meta Tags Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#eef2f1]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e]">
                <Calendar className="w-3.5 h-3.5 text-[#095458]" />
                Last updated: 17 November 2026
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008329]">
                <ShieldCheck className="w-4 h-4 text-[#008329]" />
                DPDP Act, 2023 Compliant
              </span>
            </div>

            {/* Counsel Notice */}
            <div className="mb-8 p-4 rounded-xl bg-[#f8fafa] border border-[#e1e6e5] flex items-start gap-3 text-[16px] text-medium leading-[26px]">
              <Info className="w-5 h-5 text-[#095458] shrink-0 mt-0.5" />
              <p>
                <strong className="font-semibold text-high">Legal Notice:</strong> This privacy policy sets out the data governance framework of Your Medicare Trip. If you have specific inquiries regarding healthcare privacy or medical records handling, please reach out directly to our Data Protection Officer.
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
                  1. Who we are
                </h2>
                <p>
                  This policy explains how [Registered legal entity name] (&ldquo;Your Medicare Trip&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), [Registered office address], Mohali, Punjab, India, handles your personal data. For the purposes of the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;), we are the Data Fiduciary for the personal data you share with us.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  2. What we collect
                </h2>
                <p className="mb-3">
                  To plan and coordinate your medical travel and treatment journey effectively, we collect the following categories of data:
                </p>
                <ul className="space-y-3 pl-1">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                    <div>
                      <strong className="font-semibold text-high">Contact details:</strong> name, email, phone or WhatsApp number, country of residence.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                    <div>
                      <strong className="font-semibold text-high">Health information:</strong> diagnoses, symptoms, reports, clinical scans and medical history you choose to share so that we and our partner medical specialists can assess your case.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                    <div>
                      <strong className="font-semibold text-high">Travel details:</strong> passport details needed for medical visa invitation letters, intended travel dates, companion details.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                    <div>
                      <strong className="font-semibold text-high">Payment records:</strong> amounts, transaction dates and reference IDs. We do not store complete card numbers or security codes.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                    <div>
                      <strong className="font-semibold text-high">Website data:</strong> basic technical information such as device type, browser, and pages visited, through essential cookies and, with your consent, anonymous analytics.
                    </div>
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  3. Why we use it
                </h2>
                <p className="mb-3">
                  We process your personal data on the basis of your explicit consent, for these specific purposes:
                </p>
                <ul className="space-y-2.5 pl-1">
                  {[
                    'Responding to your initial clinical enquiry and arranging virtual consultations',
                    'Sharing your medical information with specialist doctors and hospital panels involved in your care so they can review your case and prepare treatment plans',
                    'Preparing itemised quotes, medical visa invitation letters, travel logistics, and dedicated accommodation',
                    'Coordinating follow-up care after you return home, including liaising with your local general practitioner or specialist if requested',
                    'Meeting our legal, clinical accounting, and statutory regulatory obligations',
                    'Sending patient guides, recovery tips, or clinical updates, only if you explicitly opted in',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Section 4 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  4. Who we share it with
                </h2>
                <p>
                  We share your data only as strictly necessary to deliver your care: with partner doctors and accredited hospitals, with vetted travel and accommodation providers (contact and travel details only), and with secure service providers who host our clinical systems under strict data protection contracts. <strong className="font-semibold text-high">We never sell your data.</strong> We may disclose information where required by judicial or regulatory authorities under applicable law.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  5. International transfers
                </h2>
                <p>
                  Because our patients travel from across the UK, GCC, and worldwide, your data moves between your country of residence and India. We transfer personal and health data only in full compliance with the DPDP Act and any cross-border transfer guidelines notified by the Government of India.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  6. How long we keep it
                </h2>
                <p>
                  We keep your personal information for as long as needed to facilitate your treatment and comprehensive post-op follow-up, and afterwards only as long as required by statutory law (for example, for tax, financial, and clinical audit records). Medical records held directly by our partner hospital institutions are retained in accordance with hospital statutory retention rules.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  7. Your rights
                </h2>
                <p className="mb-3">
                  Under the DPDP Act, you are entitled to exercise the following rights regarding your personal information:
                </p>
                <ul className="space-y-2.5 pl-1 mb-4">
                  {[
                    'Ask for a summary of the personal data we hold about you and the processing activities undertaken',
                    'Ask us to correct inaccurate data, complete partial information, or erase your records',
                    'Withdraw your consent at any time. Withdrawal does not affect processing previously completed, though it may prevent us from continuing to arrange your care',
                    'Nominate another individual to exercise your rights in the event of incapacity',
                    'Raise a formal grievance with our Grievance Officer, and if unresolved, complain directly to the Data Protection Board of India',
                  ].map((right, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#8bd2ea] shrink-0" />
                      <span>{right}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  To exercise any of these statutory rights, please email our team at{' '}
                  <a
                    href="mailto:privacy@yourmedicaretrip.com"
                    className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    privacy@yourmedicaretrip.com
                  </a>.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  8. Security
                </h2>
                <p>
                  We use multi-layer access controls, AES-256 encrypted storage, TLS transit security, and strictly restrict data access to authorised care coordinators and clinical managers. In the rare event of a confirmed personal data breach, we will notify affected individuals and the Data Protection Board of India in accordance with statutory timeframes.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  9. Children
                </h2>
                <p>
                  If the patient receiving medical coordination is under 18 years of age, we process their medical information only upon receiving verifiable written consent from a parent or legal guardian.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  10. Cookies
                </h2>
                <p>
                  We utilize essential cookies to operate the site securely and remember your chosen preferences (such as the market or country you are travelling from). Performance or analytics cookies are deployed only with your prior consent.
                </p>
              </section>

              {/* Section 11 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  11. Grievances
                </h2>
                <p>
                  If you have concerns about how your data is handled, you may reach out to our designated Grievance Officer:
                </p>
                <div className="mt-3 p-4 rounded-xl bg-[#f8fafa] border border-[#e1e6e5]">
                  <p className="font-semibold text-high">Grievance Officer</p>
                  <p className="mt-1">
                    Email:{' '}
                    <a
                      href="mailto:grievance@yourmedicaretrip.com"
                      className="font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      grievance@yourmedicaretrip.com
                    </a>
                  </p>
                  <p className="text-xs text-low mt-1">
                    Your Medicare Trip · Registered Office, Mohali, Punjab, India
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section>
                <h2
                  className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  12. Changes
                </h2>
                <p>
                  We may periodically revise this policy to reflect statutory or operational updates. The date at the top indicates when modifications were last introduced. Material adjustments will be directly communicated to patients with an active treatment itinerary.
                </p>
              </section>

            </div>

            {/* Bottom Support Banner */}
            <div className="mt-12 pt-8 border-t border-[#eef2f1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-high text-base">Have privacy or data questions?</p>
                <p className="text-[16px] text-low mt-0.5">Our compliance team is here to assist you.</p>
              </div>
              <a
                href="mailto:privacy@yourmedicaretrip.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm text-white shadow-sm hover:opacity-95 transition-opacity"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                <Mail className="w-4 h-4" />
                Contact Privacy Team
              </a>
            </div>

          </div>
        </div>
      </main>
  );
}

