import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { 
  Plane, 
  FileText, 
  BookOpen, 
  Video, 
  AlertTriangle, 
  Check, 
  ArrowRight, 
  Lock, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export const metadata = {
  title: 'Aftercare: Support After You Return Home | Your Medicare Trip',
  description:
    'What happens after treatment abroad: fit-to-fly checks, English discharge records, scheduled follow-ups and a named contact once you’re home.',
};

const BEFORE_FLYING_CARDS = [
  {
    icon: Plane,
    title: 'Fit-to-fly review',
    description:
      'Your specialist examines you before you leave and confirms you’re ready to travel, with advice on the flight itself, such as compression stockings or extra legroom.',
    chipBg: 'bg-[#dcf1f8] text-[#0b383e]',
  },
  {
    icon: FileText,
    title: 'Complete records',
    description:
      'Discharge summary, operation notes, implant details, scans and reports, in English, on paper and digitally, ready for your doctor at home.',
    chipBg: 'bg-[#dcf1f8] text-[#0b383e]',
  },
  {
    icon: BookOpen,
    title: 'A written plan',
    description:
      'Medication, wound care, exercises, warning signs to look out for, and the dates of your follow-up calls.',
    chipBg: 'bg-[#eef6f5] text-[#008329]',
  },
];

const FOLLOWUP_STEPS = [
  {
    number: '01',
    period: 'First week',
    description:
      'A check-in call from your coordinator to see how the journey went and how you’re managing.',
  },
  {
    number: '02',
    period: 'Early weeks',
    description:
      'A video review with your specialist. Bring photos of the wound or questions about pain and progress.',
  },
  {
    number: '03',
    period: 'Later reviews',
    description:
      'Further reviews at intervals your specialist sets for your treatment, with your local doctor included if you’d like.',
  },
];

export default function AftercarePage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      {/* Signature Top Hero */}
      <PageHero
        bgImage="/images/hero/hills.jpg"
        breadcrumbs={[{ label: 'Aftercare' }]}
        title={
          <>
            Doctor-led care,{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              all the way home
            </span>
          </>
        }
        lede="“What happens if something goes wrong, and who looks after me at home?” It's the question every patient asks, and the part we plan most carefully."
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* ======================================================== */}
        {/* SECTION 1: BEFORE YOU FLY HOME (3 CARDS)                 */}
        {/* ======================================================== */}
        <section>
          <div className="mb-10 sm:mb-12">
            <h2
              className="text-[30px] sm:text-[40px] font-bold tracking-tight leading-tight"
              style={{ color: 'var(--color-primary)' }}
            >
              Before you{' '}
              <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                fly home
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {BEFORE_FLYING_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#e6ecea] rounded-[24px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${card.chipBg}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3
                      className="text-[20px] font-bold tracking-tight mb-2.5"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-[16px] leading-[26px] text-medium font-normal">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: ONCE YOU'RE HOME / FOLLOW-UP THAT HAPPENS     */}
        {/* ======================================================== */}
        <section className="bg-white border border-[#e6ecea] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Header Column */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e] mb-4">
                <Video className="w-3.5 h-3.5 text-[#095458]" />
                Once you&apos;re home
              </span>
              <h2
                className="text-[28px] sm:text-[38px] font-bold tracking-tight text-balance leading-[1.15] mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                Follow-up that{' '}
                <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                  actually happens
                </span>
              </h2>
              <p className="text-[16px] sm:text-lg leading-relaxed text-medium font-normal">
                Your coordinator books the follow-up video calls before you leave India, so they&apos;re in your calendar, not left to chance.
              </p>
            </div>

            {/* Right Steps Column */}
            <div className="lg:col-span-7">
              <ol className="grid gap-4 list-none p-0 m-0">
                {FOLLOWUP_STEPS.map((step) => (
                  <li
                    key={step.number}
                    className="grid grid-cols-[50px_1fr] sm:grid-cols-[56px_1fr] gap-4 sm:gap-5 p-5 sm:p-6 bg-[#fafcfb] border border-[#eef2f1] rounded-[20px] hover:border-[#8bd2ea] transition-colors items-start"
                  >
                    <div
                      className="w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-[16px] flex items-center justify-center font-extrabold text-sm sm:text-base shrink-0 shadow-xs"
                      style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-secondary)',
                      }}
                    >
                      {step.number}
                    </div>
                    <div>
                      <h3
                        className="text-[18px] sm:text-[19px] font-extrabold leading-snug"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {step.period}
                      </h3>
                      <p className="mt-1.5 text-[16px] text-medium leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: WHO TO CALL, AND WHAT HAPPENS NEXT (FIXED UI) */}
        {/* ======================================================== */}
        <section className="bg-white border border-[#e6ecea] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Split Image on Left (Desktop) */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[420px] aspect-[4/3.4] rounded-[22px] overflow-hidden shadow-lg border border-gray-100 bg-gray-100">
                <Image
                  src="/images/hero/doctor.jpg"
                  alt="Doctor consultation review for patient aftercare"
                  fill
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 px-4 shadow-sm flex items-center justify-between border border-white/50">
                  <span className="text-xs font-bold text-[#0b383e]">Direct Specialist Line</span>
                  <span className="text-xs font-semibold text-[#008329]">24/7 Coordinator</span>
                </div>
              </div>
            </div>

            {/* Split Content on Right */}
            <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#fef7ee] text-[#b45309] border border-[#fed7aa] mb-4">
                <AlertTriangle className="w-3.5 h-3.5 text-[#b45309]" />
                If something worries you
              </span>

              <h2
                className="text-[28px] sm:text-[38px] font-bold tracking-tight text-balance leading-[1.15] mb-6"
                style={{ color: 'var(--color-primary)' }}
              >
                Who to call,{' '}
                <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                  and what happens next
                </span>
              </h2>

              {/* Fixed Checklist: text flows properly without grid anonymous item wrapping */}
              <ul className="space-y-4 w-full">
                <li className="flex items-start gap-3.5 text-[16px] text-medium leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <p className="text-[16px] text-medium leading-relaxed">
                    <strong className="text-high font-bold text-[#0b383e]">Message your coordinator</strong> on WhatsApp, any time. They log it and involve your specialist the same day.
                  </p>
                </li>

                <li className="flex items-start gap-3.5 text-[16px] text-medium leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <p className="text-[16px] text-medium leading-relaxed">
                    <strong className="text-high font-bold text-[#0b383e]">Your specialist reviews</strong> photos, symptoms or local test results and advises.
                  </p>
                </li>

                <li className="flex items-start gap-3.5 text-[16px] text-medium leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <p className="text-[16px] text-medium leading-relaxed">
                    <strong className="text-high font-bold text-[#0b383e]">We work with your local doctor</strong>, sharing your records and the specialist&apos;s advice so they can see you in person.
                  </p>
                </li>

                <li className="flex items-start gap-3.5 text-[16px] text-medium leading-relaxed p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                  <p className="text-[16px] text-[#5b4a17] leading-relaxed">
                    <strong className="font-bold text-[#5b4a17]">In an emergency</strong>, go to your nearest emergency department first, then let us know. Take your discharge summary with you.
                  </p>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: BEING CLEAR ABOUT LIMITS CALLOUT & GUIDE LINK */}
        {/* ======================================================== */}
        <section className="space-y-6">
          <div className="p-6 sm:p-7 rounded-[22px] bg-[#fff8e8] border border-[#f2e2b8] text-[#5b4a17]">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-[#8c6b1b] shrink-0 mt-0.5" />
              <div>
                <strong className="block text-[17px] font-bold text-[#45360e] mb-1.5">
                  Being clear about limits
                </strong>
                <p className="text-[16px] leading-relaxed text-[#5b4a17]">
                  We can&apos;t provide hands-on care in your home country, and follow-up calls don&apos;t replace an examination by a local doctor. What we can do is make sure your local doctor has everything they need, and that your specialist in India stays involved.
                </p>
              </div>
            </div>
          </div>

          <div>
            <Link
              href="/guides/recovering-after-surgery-abroad"
              className="inline-flex items-center gap-2 text-[16px] font-bold text-[#095458] hover:text-[#0b383e] hover:underline transition-colors"
            >
              <span>Read the guide: recovering after surgery abroad</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: CTA BAND                                      */}
        {/* ======================================================== */}
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

            <p className="mt-4 text-[16px] sm:text-lg text-white/80 leading-relaxed font-normal">
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

