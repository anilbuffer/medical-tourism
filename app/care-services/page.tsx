import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  BedDouble, 
  UserCheck, 
  UtensilsCrossed, 
  Car, 
  Activity, 
  Stethoscope, 
  FileText, 
  Languages, 
  Receipt, 
  HeartHandshake, 
  ArrowRight, 
  Lock, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Check
} from 'lucide-react';

export const metadata = {
  title: 'Care Services: Everything Handled | Your Medicare Trip',
  description:
    'Recovery suites, a dedicated patient care manager, nutrition, transfers, daily physiotherapy and a doctor on call: what we arrange for every patient.',
};

const INCLUDED_SERVICES = [
  {
    title: 'Recovery Stay',
    icon: BedDouble,
    imageSrc: '/images/services/recovery-stay.jpg',
    imageAlt: 'Private deluxe hospital recovery suite with scenic views',
    description:
      'Private deluxe en-suite recovery suites with 24/7 nursing, close to the hospital. You leave the ward for somewhere quiet, clean and set up for recovery, not a busy hotel.',
    pills: ['En-suite room', 'Nursing on call day and night', 'Housekeeping and laundry'],
  },
  {
    title: 'Patient Care Manager',
    icon: UserCheck,
    imageSrc: '/images/services/care-manager.jpg',
    imageAlt: 'Patient care manager assisting international patient',
    description:
      'One named coordinator from your first enquiry to your last follow-up call. They book appointments, sit in on consultations if you want, and speak up for you.',
    pills: ['Single point of contact', 'English-speaking', 'Interpreters on request'],
  },
  {
    title: 'Curated Nutrition',
    icon: UtensilsCrossed,
    imageSrc: '/images/services/nutrition.jpg',
    imageAlt: 'Fresh chef-prepared post-operative recovery meal',
    description:
      "Meals prepared to your doctor's instructions and your own preferences, whether that's halal, vegetarian, diabetic or simply food that tastes like home.",
    pills: ['Doctor-approved menus', 'Halal and vegetarian', 'Family meals on request'],
  },
  {
    title: 'Chauffeur Transfers',
    icon: Car,
    imageSrc: '/images/services/transfers.jpg',
    imageAlt: 'Private VIP airport transfer vehicle',
    description:
      'Met at arrivals and driven to your accommodation. Every journey between hospital, recovery suite and airport is arranged, with someone to help with bags and wheelchairs.',
    pills: ['Airport meet and greet', 'Hospital transfers', 'Wheelchair assistance'],
  },
  {
    title: 'Daily Physiotherapy',
    icon: Activity,
    imageSrc: '/images/services/physio.jpg',
    imageAlt: 'Certified physical therapist guiding patient mobility session',
    description:
      'One-to-one sessions with certified physiotherapists, in hospital and then at your recovery suite. You fly home with a written exercise plan.',
    pills: ['Daily sessions', 'Home exercise plan', 'Notes for your physio at home'],
  },
  {
    title: '24/7 Doctor on Call',
    icon: Stethoscope,
    imageSrc: '/images/services/doctor-on-call.jpg',
    imageAlt: 'Doctor reviewing medical health chart',
    description:
      'Round-the-clock access to a doctor during your stay, with direct escalation to your treating specialist if something needs attention.',
    pills: ['Available day and night', 'Direct line to your specialist', 'Hospital re-admission if needed'],
  },
];

const PRACTICAL_DETAILS = [
  {
    title: 'Visa support',
    icon: FileText,
    description: 'Hospital invitation letter and help with your India e-Medical Visa, plus attendant visas for family.',
  },
  {
    title: 'Interpreters',
    icon: Languages,
    description: 'Arabic, Bengali and Russian interpreters on request, alongside English, Hindi and Punjabi.',
  },
  {
    title: 'Clear billing',
    icon: Receipt,
    description: 'One itemised quote, staged payments and a final statement that matches it.',
  },
  {
    title: 'Family support',
    icon: HeartHandshake,
    description: 'Rooms, meals and transport for the family member travelling with you.',
  },
];

export default function CareServicesPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      <PageHero
        bgImage="/images/hero/care-services-hero.jpg"
        breadcrumbs={[{ label: 'Care services' }]}
        title={
          <>
            Every part of your trip,{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              handled
            </span>
          </>
        }
        lede="The small things that make you feel looked after, as well as the big ones. Treatment is only part of the trip; we organise everything around it."
        actions={
          <>
            <OpenConsultationButton
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] shadow-md hover:bg-[#a2ddf0] transition-colors cursor-pointer"
            >
              <span>Book a free consultation</span>
              <ArrowRight className="w-4 h-4" />
            </OpenConsultationButton>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-transparent text-white border border-white/30 hover:bg-white/10 transition-colors"
            >
              How it works
            </Link>
          </>
        }
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* ======================================================== */}
        {/* SECTION 1: INCLUDED IN YOUR CARE (6 CARDS)               */}
        {/* ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="max-w-2xl mb-10 sm:mb-12">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
              style={{ color: 'var(--color-primary)' }}
            >
              Included in{' '}
              <span
                className="px-2.5 py-0.5 rounded-lg inline-block font-semibold"
                style={{
                  backgroundColor: 'var(--color-lime-tint, #dcf1f8)',
                  color: 'var(--color-primary, #0b383e)',
                }}
              >
                your care
              </span>
            </h2>
            <p className="mt-3 text-base text-medium leading-relaxed">
              Exactly what&apos;s in your plan is listed in your quote. These are the services our patients use most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {INCLUDED_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#e6ecea] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image Banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                          style={{
                            backgroundColor: 'var(--color-lime-tint, #dcf1f8)',
                            color: 'var(--color-primary, #0b383e)',
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <h3 className="text-xl font-bold tracking-tight text-[#0b383e]">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-base text-medium leading-relaxed mt-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Pill List */}
                    <div className="mt-6 pt-5 border-t border-[#f0f4f3] flex flex-wrap gap-2">
                      {service.pills.map((pill) => (
                        <span
                          key={pill}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f0f6f5] text-[#0b383e]"
                        >
                          <Check className="w-3 h-3 text-[#059669]" />
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: AND THE PRACTICAL DETAILS (4 CARDS)           */}
        {/* ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
              style={{ color: 'var(--color-primary)' }}
            >
              And the{' '}
              <span
                className="px-2.5 py-0.5 rounded-lg inline-block font-semibold"
                style={{
                  backgroundColor: 'var(--color-lime-tint, #dcf1f8)',
                  color: 'var(--color-primary, #0b383e)',
                }}
              >
                practical details
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRACTICAL_DETAILS.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.title}
                  className="bg-white rounded-2xl p-6 border border-[#e6ecea] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: 'rgba(139, 210, 234, 0.22)',
                        color: 'var(--color-primary, #0b383e)',
                      }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0b383e] mb-2 tracking-tight">
                      {detail.title}
                    </h3>
                    <p className="text-base text-medium leading-relaxed">
                      {detail.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: SPLIT PANEL - WHAT MAKES US DIFFERENT         */}
        {/* ======================================================== */}
        <section className="mb-20 sm:mb-28">
          <div className="bg-white rounded-3xl border border-[#e6ecea] overflow-hidden p-8 sm:p-12 lg:p-14 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#dcf1f8] text-[#0b383e] mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#0b383e]" />
                  What makes us different
                </span>
                
                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.15]"
                  style={{ color: 'var(--color-primary)' }}
                >
                  We stay with you{' '}
                  <span
                    className="px-2.5 py-0.5 rounded-lg inline-block font-semibold"
                    style={{
                      backgroundColor: 'var(--color-lime-tint, #dcf1f8)',
                      color: 'var(--color-primary, #0b383e)',
                    }}
                  >
                    after you fly home
                  </span>
                </h2>

                <p className="mt-4 text-base text-medium leading-relaxed">
                  Most services stop at discharge. Ours carries on: follow-up calls with your specialist, a contact for any worries, and help coordinating with your doctor at home.
                </p>

                <div className="mt-8">
                  <Link
                    href="/aftercare"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white shadow-md hover:opacity-95 transition-opacity"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    How aftercare works
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="relative h-72 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/split/split-home.jpg"
                  alt="Scenic recovery representing peaceful follow-up care"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 px-4 shadow-sm flex items-center justify-between border border-white/40">
                  <span className="text-xs font-bold text-[#0b383e]">Continuous post-discharge care</span>
                  <span className="text-xs font-semibold text-[#059669]">Home follow-up</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: CTA BAND                                      */}
        {/* ======================================================== */}
        <section className="rounded-3xl p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-xl" style={{ backgroundColor: 'var(--color-primary)' }}>
          <div
            aria-hidden="true"
            className="absolute top-0 right-0 w-96 h-96 bg-[#8bd2ea]/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Ready to plan{' '}
              <span className="text-[#8bd2ea]">your treatment?</span>
            </h2>
            <p className="mt-3 text-base text-white/80 leading-relaxed font-normal max-w-2xl">
              Book a free 30-minute video consultation. A coordinator and a doctor go through your case and tell you honestly whether travelling for treatment makes sense.
            </p>

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

