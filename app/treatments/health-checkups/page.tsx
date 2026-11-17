import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { CHECKUPS } from '@/data/treatmentsData';
import { 
  ArrowRight, 
  FlaskConical, 
  Sparkles, 
  Check 
} from 'lucide-react';

export const metadata = {
  title: 'Health Check-ups & Diagnostics in India | Your Medicare Trip',
  description:
    'Comprehensive health check-up packages in Mohali and Chandigarh, with results explained by a physician. Plan one around your trip to India.',
};

const CHECKUP_STEPS = [
  {
    step: '1',
    title: 'Before you travel',
    text: 'Share your age, medical history and current medication. A doctor tailors the test list and tells you how to prepare (most packages need an overnight fast).',
  },
  {
    step: '2',
    title: 'Morning: tests',
    text: 'Blood tests first, then breakfast, then scans and cardiac tests. Your coordinator stays with you and handles the paperwork.',
  },
  {
    step: '3',
    title: 'Results',
    text: 'Most results are ready the same day; some take one to three days.',
  },
  {
    step: '4',
    title: 'Doctor review',
    text: 'A physician goes through every result with you. If something needs a specialist, we can arrange that appointment before you fly.',
  },
  {
    step: '5',
    title: 'Take it home',
    text: 'You leave with all reports and images in English, in print and digital form, ready for your own doctor.',
  },
];

export default function HealthCheckupsPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb]">
      {/* 1. Page Hero */}
      <PageHero
        bgImage="/images/treatments/checkup.jpeg"
        breadcrumbs={[
          { label: 'Treatments', href: '/treatments' },
          { label: 'Health check-ups' },
        ]}
        title={
          <>
            Health check-ups{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              &amp; diagnostics
            </span>
          </>
        }
        lede="A thorough assessment in a day, with a physician to go through every result with you before you leave. Many patients add one to a treatment trip; others come for the check-up alone."
        facts={[
          'Results within 1–3 days',
          'Physician review included',
          'Reports in English',
        ]}
      />

      {/* 2. Check-up Packages Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 pb-4 border-b border-[#e6ecea]">
            <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e] leading-tight">
              Check-up{' '}
              <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
                packages
              </span>
            </h2>
            <p className="mt-3 text-[16px] text-gray-700 max-w-2xl font-normal leading-relaxed">
              Starting points rather than fixed menus. Tell us your age, history and any concerns and a doctor will adjust the list of tests before you travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CHECKUPS.map((pkg, idx) => (
              <article
                key={idx}
                className="p-7 rounded-[24px] bg-white border border-[#e6ecea] shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg hover:-translate-y-1 hover:border-[#8bd2ea] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#dcf1f8] flex items-center justify-center mb-5 text-[#0b383e]">
                    <FlaskConical className="w-5 h-5" />
                  </div>

                  <h3 className="text-[20px] font-bold text-[#0b383e] tracking-tight mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-[14px] text-gray-600 font-normal leading-[1.6] mb-5">
                    {pkg.description}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-[#f0f4f3] pt-4">
                    {pkg.tests.map((test, tIdx) => (
                      <li
                        key={tIdx}
                        className="grid grid-cols-[18px_1fr] gap-2.5 text-[14px] text-gray-700 leading-[1.5]"
                      >
                        <span className="w-4 h-4 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                        <span>{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#f0f4f3] mt-auto">
                  <div className="flex justify-between items-center text-xs text-gray-600 py-1.5">
                    <span>Time needed</span>
                    <strong className="text-[#0b383e] font-semibold">{pkg.duration}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600 py-1.5">
                    <span>Price</span>
                    <strong className="text-[#0b383e] font-semibold">{pkg.price}</strong>
                  </div>

                  <Link
                    href="/enquiry?treatment=health-checkup"
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0b383e] text-white hover:bg-[#0e484f] transition-colors shadow-xs"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}

            {/* Something Specific? Card */}
            <article className="p-7 rounded-[24px] bg-[#0b383e] text-white shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/12 flex items-center justify-center mb-5 text-[#8bd2ea]">
                  <Sparkles className="w-5 h-5" />
                </div>

                <h3 className="text-[20px] font-bold text-white tracking-tight mb-2">
                  Something specific?
                </h3>

                <p className="text-[15px] sm:text-[16px] text-white/80 font-normal leading-[1.6]">
                  Individual scans such as MRI, CT or PET-CT can be arranged on their own with a specialist&apos;s referral.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-sm"
                >
                  <span>Ask us</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. Section Dim: How a Check-up Day Runs */}
      <section className="py-16 sm:py-24 bg-[#f4f7f6] border-t border-[#e2ece9]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 pb-4 border-b border-[#e6ecea]">
            <h2 className="text-[28px] sm:text-[38px] font-bold tracking-tight text-[#0b383e]">
              How a check-up{' '}
              <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.3)] font-semibold">
                day runs
              </span>
            </h2>
          </div>

          <ol className="space-y-4 max-w-3xl">
            {CHECKUP_STEPS.map((step) => (
              <li
                key={step.step}
                className="flex items-start gap-5 p-6 rounded-[20px] bg-white border border-[#e6ecea] shadow-xs"
              >
                <span className="w-9 h-9 rounded-full bg-[#0b383e] text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {step.step}
                </span>
                <div>
                  <h3 className="text-[18px] font-bold text-[#0b383e] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[16px] text-gray-700 font-normal leading-[1.65]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-base">
            <Link
              href="/guides/health-checkup-trip-india"
              className="inline-flex items-center gap-2 font-bold text-[#0b383e] hover:text-[#008329] transition-colors group"
            >
              <span>Read our guide: planning a check-up around your trip</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>
        </div>
      </section>

      {/* 4. Bottom CTA Band */}
      <CtaBand />
    </main>
  );
}

