import { PageHero } from '@/components/PageHero';
import { 
  ShieldCheck, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Info
} from 'lucide-react';

export const metadata = {
  title: 'Grievance Redressal | Your Medicare Trip',
  description:
    'How to raise a complaint or data protection grievance with Your Medicare Trip, and how we handle it.',
};

export default function GrievancePage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-20">
      <PageHero
        compact
        breadcrumbs={[{ label: 'Grievance Redressal' }]}
        title={
          <>
            Grievance{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              redressal
            </span>
          </>
        }
      />

      <div className="relative z-10 max-w-[920px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8">
        {/* Legal Document Card */}
        <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)]">
          
          {/* Meta Tags Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-8 border-b border-[#eef2f1]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e]">
              <Calendar className="w-3.5 h-3.5 text-[#095458]" />
              Last updated: 17 November 2026
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#008329]">
              <ShieldCheck className="w-4 h-4 text-[#008329]" />
              DPDP Act, 2023 Compliant Process
            </span>
          </div>

          {/* Counsel Notice */}
          <div className="mb-8 p-4 rounded-xl bg-[#f8fafa] border border-[#e1e6e5] flex items-start gap-3 text-[16px] text-medium leading-[26px]">
            <Info className="w-5 h-5 text-[#095458] shrink-0 mt-0.5" />
            <p>
              <strong className="font-semibold text-high">Legal Notice:</strong> Your Medicare Trip is committed to fair, timely, and transparent complaint resolution. If you have concerns about your healthcare coordination or personal data, our designated Grievance Officer is here to assist.
            </p>
          </div>

          {/* Document Sections */}
          <div className="space-y-10 text-[16px] text-medium leading-[28px]">
            
            {/* Section 1 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                1. Grievance Officer
              </h2>
              <p>
                In compliance with the Digital Personal Data Protection Act, 2023 and relevant customer service regulations, our designated Grievance Officer details are set out below:
              </p>

              <div className="mt-4 p-5 rounded-2xl bg-[#fafcfb] border border-[#e6ecea] space-y-2.5">
                <div className="font-bold text-[#0b383e] text-lg">
                  [Grievance Officer Name]
                </div>
                <div className="text-sm font-semibold text-medium">
                  Designated Grievance &amp; Data Protection Officer
                </div>
                <div className="pt-2 border-t border-[#f0f4f3] flex flex-col gap-2 text-sm text-medium">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#095458] shrink-0" />
                    <a 
                      href="mailto:grievance@yourmedicaretrip.com"
                      className="text-[#095458] font-bold hover:underline"
                    >
                      grievance@yourmedicaretrip.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#095458] shrink-0" />
                    <span>[Grievance contact number]</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#095458] shrink-0 mt-0.5" />
                    <span>[Registered legal entity name], [Registered office address], Mohali, Punjab, India</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                2. What you can raise
              </h2>
              <p>
                You may raise grievances regarding any aspect of our service, including:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Concerns about our coordination services, communication, scheduling, or billing.</li>
                <li>Requests, objections, or complaints concerning your personal and health data under the Digital Personal Data Protection Act, 2023.</li>
                <li>Concerns or corrections regarding medical and informational content on this website.</li>
              </ul>
              <div className="mt-4 p-4 rounded-xl bg-[#f0f6f5] border border-[#d8ebe7] text-[15px] sm:text-[16px] text-[#0b383e]">
                <strong className="font-bold">Clinical Care Note:</strong> Concerns about clinical decisions, hospital nursing, or surgical outcomes are forwarded to the treating hospital&apos;s own clinical grievance committee, and our patient advocacy team will actively support you through that process.
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                3. How to raise a grievance
              </h2>
              <p>
                To help us investigate and resolve your issue quickly, please email the Grievance Officer at{' '}
                <a 
                  href="mailto:grievance@yourmedicaretrip.com"
                  className="text-[#095458] font-bold underline"
                >
                  grievance@yourmedicaretrip.com
                </a>{' '}
                with:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2">
                <li>Your full name and contact phone number.</li>
                <li>Your patient itinerary or enquiry reference number (if applicable).</li>
                <li>A clear description of the grievance, dates of occurrence, and any relevant correspondence.</li>
              </ul>
              <p className="mt-3">
                You can also message your dedicated Patient Care Manager via WhatsApp, who will formally log your ticket with the Grievance Officer.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                4. What happens next
              </h2>
              <p>
                Our structured grievance redressal workflow follows defined service-level timelines:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-[#e6ecea]">
                  <div className="flex items-center gap-2 text-[#0b383e] font-bold text-sm mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#dcf1f8] flex items-center justify-center text-xs font-black">1</span>
                    Acknowledgment
                  </div>
                  <p className="text-[16px] text-medium leading-relaxed">
                    We acknowledge receipt of your grievance within <strong className="text-high">24 hours</strong> with a unique tracking reference.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fafcfb] border border-[#e6ecea]">
                  <div className="flex items-center gap-2 text-[#0b383e] font-bold text-sm mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#dcf1f8] flex items-center justify-center text-xs font-black">2</span>
                    Investigation
                  </div>
                  <p className="text-[16px] text-medium leading-relaxed">
                    We conduct an internal review with the relevant coordinators or hospital liaisons and keep you regularly updated.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#fafcfb] border border-[#e6ecea]">
                  <div className="flex items-center gap-2 text-[#0b383e] font-bold text-sm mb-1">
                    <span className="w-6 h-6 rounded-full bg-[#dcf1f8] flex items-center justify-center text-xs font-black">3</span>
                    Resolution
                  </div>
                  <p className="text-[16px] text-medium leading-relaxed">
                    We aim to fully resolve your grievance within <strong className="text-high">15 days</strong>. If more time is required, we inform you in writing.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2
                className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-3 pb-2 border-b border-[#f1f4f4]"
                style={{ color: 'var(--color-primary)' }}
              >
                5. If you&apos;re not satisfied
              </h2>
              <p>
                For data protection grievances under the DPDP Act, 2023, if you are not satisfied with our resolution or response, you have the statutory right to escalate your complaint directly to the Data Protection Board of India.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}

