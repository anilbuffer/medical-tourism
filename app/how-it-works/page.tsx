import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  Receipt, 
  UserCheck, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Clock, 
  ChevronDown
} from 'lucide-react';

export const metadata = {
  title: 'How It Works: Your Care Journey in 6 Steps | Your Medicare Trip',
  description:
    'From your first enquiry to follow-up at home: how Your Medicare Trip plans treatment in India, step by step.',
  alternates: { canonical: 'https://www.yourmedicaretrip.com/how-it-works' },
  openGraph: {
    title: 'How It Works: Your Care Journey in 6 Steps | Your Medicare Trip',
    description: 'From your first enquiry to follow-up at home: how Your Medicare Trip plans treatment in India, step by step.',
    url: 'https://www.yourmedicaretrip.com/how-it-works',
    type: 'website',
    images: [{ url: '/images/hero/how-it-works-hero.jpg', width: 1200, height: 630, alt: 'How Your Medicare Trip works' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How It Works: Your Care Journey in 6 Steps | Your Medicare Trip',
    description: 'From your first enquiry to follow-up at home: how Your Medicare Trip plans treatment in India, step by step.',
    images: ['/images/hero/how-it-works-hero.jpg'],
  },
};

const STEPS = [
  {
    step: '01',
    title: 'Tell us about your case',
    description:
      "Share what you need and, if you have them, recent reports and scans. Nothing is booked and there's no cost.",
    meta: 'Day 1',
  },
  {
    step: '02',
    title: 'Doctor review & free video consultation',
    description:
      'Your case is reviewed by a doctor, then you meet the specialist and your coordinator on a 30-minute video call. Bring your questions and your family.',
    meta: 'Within 2–3 days',
  },
  {
    step: '03',
    title: 'Your plan & itemised quote',
    description:
      'A written plan covering the procedure, hospital, length of stay and every cost, with a staged payment schedule. You decide in your own time.',
    meta: 'Within 48 hours of the call',
  },
  {
    step: '04',
    title: 'Visa, travel & arrival',
    description:
      "We send the hospital's visa letter, help with your e-Medical Visa and attendant visas, book transfers and meet you at the airport.",
    meta: '2–4 weeks before travel',
  },
  {
    step: '05',
    title: 'Treatment & recovery in India',
    description:
      'Your coordinator is with you at admission, surgery and discharge. Afterwards you recover in your suite with physiotherapy, meals and a doctor on call.',
    meta: 'Length agreed in your plan',
  },
  {
    step: '06',
    title: 'Home & follow-up',
    description:
      "A fit-to-fly check, your discharge summary and records in English, then scheduled follow-up calls once you're home.",
    meta: 'Weeks to months after',
  },
];

const PILLARS = [
  {
    title: 'No surprise costs',
    description:
      "Payments are staged at agreed points, each shown in your quote. If your doctor recommends a change once you arrive, nothing changes until you've seen the new figure and agreed to it.",
    icon: Receipt,
  },
  {
    title: 'One person to call',
    description:
      'The same coordinator from your first enquiry to your last follow-up call, reachable on WhatsApp.',
    icon: UserCheck,
  },
  {
    title: 'Honest advice',
    description:
      "If travelling isn't right for your case, or the treatment isn't something our partners do well, we'll tell you.",
    icon: ShieldCheck,
  },
];

const FAQS = [
  {
    question: 'Is the consultation really free?',
    answer:
      'Yes. The video consultation and your written quote cost nothing and do not commit you to anything.',
  },
  {
    question: 'What reports should I send?',
    answer:
      'Whatever you have: recent scans, X-rays, blood tests and letters from your doctor. Your coordinator will review them with our specialist doctors and tell you if any additional test is needed.',
  },
  {
    question: 'Can a family member come with me?',
    answer:
      'Yes, and we strongly recommend it for major surgeries. India issues e-Medical Attendant visas for family members travelling with a patient, and we coordinate their accommodation and meals as well.',
  },
  {
    question: 'How long will I need to stay?',
    answer:
      "It depends on the treatment: about 5 to 7 days for minor or cataract surgery, and two to four weeks for major joint replacement or spine surgery. Your plan specifies the exact expected length of stay, and your operating surgeon confirms when you are clinically fit to fly home.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      <PageHero
        bgImage="/images/hero/how-it-works-hero.jpg"
        breadcrumbs={[{ label: 'How it works' }]}
        title={
          <>
            How it{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              works
            </span>
          </>
        }
        lede="Six steps from your first message to your follow-up at home. You speak to a doctor before you commit to anything, and you know every cost before you book a flight."
        actions={
          <OpenConsultationButton
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] shadow-md hover:bg-[#a2ddf0] transition-colors cursor-pointer"
          >
            <span>Start with step one</span>
            <ArrowRight className="w-4 h-4" />
          </OpenConsultationButton>
        }
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Your Care Journey Section matching reference HTML */}
          <section className="mb-20 sm:mb-28">
            <div className="mb-8 sm:mb-10">
              <h2
                className="text-[30px] sm:text-[40px] font-bold tracking-[-1px] leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                Your care{' '}
                <span
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  journey
                </span>
              </h2>
            </div>

            {/* Stacked Step Cards matching .steps from reference HTML */}
            <ol className="grid gap-[18px] list-none p-0 m-0">
              {STEPS.map((step) => (
                <li
                  key={step.step}
                  className="grid grid-cols-[52px_1fr] sm:grid-cols-[64px_1fr] gap-4 sm:gap-5 p-5 sm:p-[26px] bg-white border border-[#e6ecea] rounded-[20px] shadow-[0_1px_3px_rgba(11,56,62,0.03)] hover:shadow-md transition-shadow items-start"
                >
                  {/* Step counter badge: 52px × 52px rounded-16px */}
                  <div
                    className="w-[52px] h-[52px] rounded-[16px] flex items-center justify-center font-extrabold text-base shrink-0 shadow-xs"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-secondary)',
                    }}
                  >
                    {step.step}
                  </div>

                  {/* Step body: h3, p, meta */}
                  <div>
                    <h3
                      className="text-[1.125rem] font-extrabold leading-snug"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[16px] text-medium leading-relaxed font-normal">
                      {step.description}
                    </p>
                    <p className="mt-2.5 text-[0.75rem] font-extrabold tracking-[0.08em] uppercase text-[#008329]">
                      {step.meta}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* "What you can count on" Section */}
          <section className="mb-20 sm:mb-28">
            <div className="mb-10 sm:mb-12">
              <h2
                className="text-[30px] sm:text-[40px] font-bold tracking-[-1px] leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                What you{' '}
                <span
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                  style={{
                    backgroundColor:
                      'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  can count on
                </span>
              </h2>
              <p className="mt-2 text-base sm:text-lg text-medium font-normal">
                Our promises for transparency, patient safety, and peace of mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {PILLARS.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg transition-shadow"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                      style={{
                        backgroundColor:
                          'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                        color: 'var(--color-primary)',
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3
                      className="text-[20px] font-bold tracking-tight mb-2.5"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {pillar.title}
                    </h3>
                    <p className="text-[16px] leading-[26px] text-medium font-normal">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Common Questions Section */}
          <section className="mb-20 sm:mb-28">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <h2
                  className="text-[30px] sm:text-[40px] font-bold tracking-[-1px] leading-tight"
                  style={{ color: 'var(--color-primary)' }}
                >
                  Common{' '}
                  <span
                    className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
                    style={{
                      backgroundColor:
                        'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                      color: 'var(--color-primary)',
                    }}
                  >
                    questions
                  </span>
                </h2>
                <p className="mt-2 text-base sm:text-lg text-medium font-normal">
                  Clear answers to frequently asked planning questions.
                </p>
              </div>

              <Link
                href="/faqs"
                className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline transition-all"
                style={{ color: 'var(--color-primary)' }}
              >
                <span>View all FAQs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4 max-w-4xl">
              {FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white border border-[#e6ecea] rounded-[20px] p-5 sm:p-6 shadow-sm open:shadow-md transition-all cursor-pointer"
                >
                  <summary className="flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-high list-none select-none">
                    <span style={{ color: 'var(--color-primary)' }}>
                      {faq.question}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#f8fafa] flex items-center justify-center shrink-0 transition-transform group-open:rotate-180">
                      <ChevronDown className="w-4 h-4 text-medium" />
                    </span>
                  </summary>
                  <div className="mt-4 pt-4 border-t border-[#f1f4f4] text-[16px] text-medium leading-relaxed font-normal">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA Band */}
          <section
            className="rounded-[28px] sm:rounded-[36px] overflow-hidden p-8 sm:p-12 lg:p-14 text-white relative shadow-2xl"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {/* Ambient decoration */}
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
                <VideoConsultationCard />
                <WhatsAppCard />
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

