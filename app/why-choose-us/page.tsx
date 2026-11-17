import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { 
  Stethoscope, 
  HeartHandshake, 
  Receipt, 
  UserCheck, 
  MapPin, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Lock, 
  Clock, 
  CheckCircle2
} from 'lucide-react';

export const metadata = {
  title: 'Why Choose Your Medicare Trip | Doctor-Led Medical Travel to India',
  description:
    'Doctor-led planning, itemised pricing, one coordinator, and follow-up after you return home: what makes Your Medicare Trip different.',
};

const PILLARS = [
  {
    icon: Stethoscope,
    title: 'Doctor-led, from the start',
    description:
      'A senior doctor reviews your case before a plan is sent, and you speak to your specialist before committing.',
  },
  {
    icon: HeartHandshake,
    title: 'All the way home',
    description:
      'Follow-up calls are booked before you leave India, and your coordinator stays your contact afterwards.',
  },
  {
    icon: Receipt,
    title: 'Itemised, written pricing',
    description:
      'Every cost in writing before you travel, with staged payments, not a single lump sum.',
  },
  {
    icon: UserCheck,
    title: 'One coordinator',
    description:
      'The same person from first message to last follow-up, reachable on WhatsApp.',
  },
  {
    icon: MapPin,
    title: 'A calmer destination',
    description:
      'The Chandigarh tricity: short drives, green streets, and recovery away from metro crowds.',
  },
  {
    icon: ShieldCheck,
    title: 'Honest advice',
    description:
      "If treatment abroad isn't right for you, or our partners aren't the best fit, we say so.",
  },
];

const COMPARISON_ROWS = [
  {
    question: 'Doctor reviews your reports before quoting',
    ymt: 'Yes',
    ymtHighlight: true,
    typical: 'Often a sales team',
  },
  {
    question: 'Video consultation with the specialist',
    ymt: 'Free, before you commit',
    ymtHighlight: true,
    typical: 'Varies',
  },
  {
    question: 'Written, itemised quote',
    ymt: 'Yes, with staged payments',
    ymtHighlight: true,
    typical: 'Often a package price',
  },
  {
    question: 'Named coordinator',
    ymt: 'One person throughout',
    ymtHighlight: true,
    typical: 'Shared desk',
  },
  {
    question: "Scheduled follow-up after you're home",
    ymt: 'Booked before you fly',
    ymtHighlight: true,
    typical: 'Often ends at discharge',
  },
];

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      <PageHero
        bgImage="/images/hero/doctor.jpg"
        breadcrumbs={[{ label: 'Why choose us' }]}
        title={
          <>
            Why patients{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              choose us
            </span>
          </>
        }
        lede="We're a new name, so we'd rather show you how we work than ask you to take our word for it."
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* 6 Key Pillars Grid */}
          <section className="mb-20 sm:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-[0_12px_32px_rgba(11,56,62,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform"
                        style={{
                          backgroundColor:
                            'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                          color: 'var(--color-primary)',
                        }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3
                        className="text-[20px] font-bold tracking-tight mb-2.5 leading-snug"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {pillar.title}
                      </h3>
                      <p className="text-[16px] leading-[26px] text-medium font-normal">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Comparison Table Section */}
          <section className="mb-20 sm:mb-28">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <h2
                className="text-[30px] sm:text-[40px] font-bold tracking-[-1px] leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                How we{' '}
                <span
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  compare
                </span>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-medium font-normal">
                What to ask any medical travel company, and how we answer.
              </p>
            </div>

            <div className="overflow-hidden bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] shadow-[0_2px_16px_rgba(11,56,62,0.04)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="border-b border-[#eef2f1] bg-[#f8fafa]">
                      <th className="py-4 sm:py-5 px-6 font-bold text-sm text-high w-[42%]">
                        What to ask
                      </th>
                      <th 
                        className="py-4 sm:py-5 px-6 font-bold text-sm w-[33%] text-white"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                      >
                        <div className="flex items-center gap-2">
                          <span>Your Medicare Trip</span>
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#8bd2ea] text-[#0b383e]">
                            Doctor-Led
                          </span>
                        </div>
                      </th>
                      <th className="py-4 sm:py-5 px-6 font-bold text-sm text-low w-[25%]">
                        Typical agency
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f4f4] text-[16px]">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr 
                        key={idx}
                        className={idx % 2 === 0 ? 'bg-white' : 'bg-[#fafcfb]'}
                      >
                        <td className="py-4 sm:py-5 px-6 font-semibold text-high">
                          {row.question}
                        </td>
                        <td 
                          className="py-4 sm:py-5 px-6 font-bold bg-emerald-50/40 text-high"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#008329] flex items-center justify-center shrink-0">
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            </span>
                            <span style={{ color: 'var(--color-primary)' }}>
                              {row.ymt}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 sm:py-5 px-6 text-low font-normal">
                          {row.typical}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Founding Clinical Partner Section */}
          <section className="mb-20 sm:mb-28">
            <div className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-7 flex flex-col items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e] mb-4">
                  <UserCheck className="w-3.5 h-3.5 text-[#095458]" />
                  Founding Clinical Partner
                </span>

                <h2
                  className="text-[28px] sm:text-[38px] font-bold tracking-tight text-balance leading-[1.15] mb-4"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Built around{' '}
                  <span
                    className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                    style={{
                      backgroundColor:
                        'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                      color: 'var(--color-primary)',
                    }}
                  >
                    a surgeon&apos;s standards
                  </span>
                </h2>

                <p className="text-base sm:text-lg leading-relaxed text-medium font-normal mb-6">
                  Dr. Jaswant Singh has more than 25 years of surgical practice in Punjab and has operated on over 5,000 patients. He reviews how every case is planned to ensure safe, ethical, and world-class care delivery.
                </p>

                {/* Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-8">
                  <div className="p-3.5 rounded-xl bg-[#f8fafa] border border-[#e1e6e5]">
                    <div className="text-lg font-black text-high">25+ Years</div>
                    <div className="text-xs text-low mt-0.5 font-medium">Surgical Practice</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fafa] border border-[#e1e6e5]">
                    <div className="text-lg font-black text-high">5,000+</div>
                    <div className="text-xs text-low mt-0.5 font-medium">Surgeries Completed</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f8fafa] border border-[#e1e6e5] col-span-2 sm:col-span-1">
                    <div className="text-lg font-black text-high">UK / India</div>
                    <div className="text-xs text-low mt-0.5 font-medium">Clinical Network</div>
                  </div>
                </div>

                <Link
                  href="/#consultation"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white shadow-sm hover:opacity-95 transition-opacity"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  <span>Speak with our care team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Doctor Image Column */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 aspect-[4/5] bg-gray-100">
                  <img
                    src="/img/dr-jaswant-singh.jpg"
                    alt="Dr. Jaswant Singh - Founding Clinical Partner"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                    <div className="font-bold text-lg leading-tight">Dr. Jaswant Singh</div>
                    <div className="text-xs text-white/80 font-medium mt-1">
                      MBBS, MS · Senior Surgeon & Clinical Director
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* CTA Band */}
          <section className="rounded-[28px] sm:rounded-[36px] overflow-hidden p-8 sm:p-12 lg:p-14 text-white relative"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {/* Background subtle decoration */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none"
            />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-[28px] sm:text-[40px] font-bold tracking-tight leading-[1.15] text-balance">
                Ready to plan{' '}
                <span
                  className="px-3 py-0.5 rounded-xl inline-block text-[#0b383e]"
                  style={{ backgroundColor: '#8bd2ea' }}
                >
                  your treatment?
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed font-normal">
                Book a free 30-minute video consultation. A coordinator and a doctor go through your case and tell you honestly whether travelling for treatment makes sense.
              </p>

              {/* Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <Link
                  href="/#consultation"
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-left"
                >
                  <div>
                    <span className="text-xs font-semibold text-[#8bd2ea]">Free, 30 minutes</span>
                    <strong className="block text-base sm:text-lg font-bold text-white mt-1">
                      Video consultation
                    </strong>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-white/90 mt-4 group-hover:text-white">
                    <span>Book your appointment</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <a
                  href="https://wa.me/447587399811?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20treatment%20in%20India."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-5 rounded-2xl bg-white text-[#0b383e] hover:bg-white/95 transition-all text-left shadow-lg"
                >
                  <div>
                    <span className="text-xs font-bold text-[#008329]">Usually replies in minutes</span>
                    <strong className="block text-base sm:text-lg font-bold text-[#0b383e] mt-1">
                      WhatsApp our care team
                    </strong>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#095458] mt-4">
                    <span>Start WhatsApp chat</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>

              {/* Trust Strip */}
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-white/15 text-xs text-white/80 font-medium">
                <span className="inline-flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#8bd2ea]" />
                  Confidential consultation
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#8bd2ea]" />
                  No waiting lists
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8bd2ea]" />
                  No GP referral needed
                </span>
              </div>
            </div>
          </section>

        </div>
      </main>
  );
}

