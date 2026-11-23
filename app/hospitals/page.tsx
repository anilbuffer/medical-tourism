import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { HOSPITALS } from '@/data/hospitalsData';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Globe, 
  Lock, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';

export const metadata = {
  title: 'Partner Hospitals in Mohali & Chandigarh | Your Medicare Trip',
  description:
    'The partner hospitals in the Chandigarh tricity where we arrange treatment for international patients: Max, Fortis, ACE Heart Institute, Livasa, Landmark, Sohana and Sangam Netralaya.',
  alternates: { canonical: 'https://www.yourmedicaretrip.com/hospitals' },
  openGraph: {
    title: 'Partner Hospitals in Mohali & Chandigarh | Your Medicare Trip',
    description: 'The partner hospitals in the Chandigarh tricity where we arrange treatment for international patients: Max, Fortis, ACE Heart Institute, Livasa, Landmark, Sohana and Sangam Netralaya.',
    url: 'https://www.yourmedicaretrip.com/hospitals',
    type: 'website',
    images: [{ url: '/img/hospitals/fortis-mohali.jpg', width: 1200, height: 630, alt: 'Partner Hospitals India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner Hospitals in Mohali & Chandigarh | Your Medicare Trip',
    description: 'JCI & NABH accredited hospital partners: Max, Fortis, ACE Heart Institute, Livasa, Landmark, Sohana and Sangam Netralaya — Mohali, India.',
    images: ['/img/hospitals/fortis-mohali.jpg'],
  },
};

const CRITERIA_CARDS = [
  {
    icon: ShieldCheck,
    title: 'Recognised standards',
    description:
      'We work with hospitals that hold national accreditation. Certificates are shared with your treatment plan.',
    chipBg: 'bg-[#dcf1f8] text-[#0b383e]',
  },
  {
    icon: Users,
    title: 'The right surgeon',
    description:
      'We start with the specialist, then the hospital where they operate and where your case is best supported.',
    chipBg: 'bg-[#dcf1f8] text-[#0b383e]',
  },
  {
    icon: Globe,
    title: 'International patients',
    description:
      'Hospitals used to international paperwork, interpreters and visa letters.',
    chipBg: 'bg-[#eef6f5] text-[#008329]',
  },
  {
    icon: MapPin,
    title: 'Close together',
    description:
      'All within the tricity, so your recovery suite, hospital and airport are short drives apart.',
    chipBg: 'bg-[#eef6f5] text-[#095458]',
  },
];

export default function HospitalListingPage() {
  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      {/* Signature Dark Teal Hero */}
      <PageHero
        bgImage="/img/hospitals/max-mohali.jpg"
        breadcrumbs={[{ label: 'Hospitals' }]}
        title={
          <>
            Partner hospitals,{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              in the Chandigarh tricity
            </span>
          </>
        }
        lede="Established hospitals in Mohali, all around half an hour from Chandigarh International Airport. Your doctor recommends where your treatment happens, based on your case."
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20 sm:space-y-28">
        
        {/* ======================================================== */}
        {/* SECTION 1: WHERE YOU'LL BE TREATED (HOSPITAL CARDS)      */}
        {/* ======================================================== */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12 pb-4 border-b border-[#e6ecea]">
            <div>
              <h2
                className="text-[30px] sm:text-[40px] font-bold tracking-tight leading-tight"
                style={{ color: 'var(--color-primary)' }}
              >
                Where you&apos;ll be{' '}
                <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                  treated
                </span>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-[#0b383e] text-white shadow-xs">
                All
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#eef6f5] text-medium border border-[#d6e3df]">
                Mohali (Chandigarh)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {HOSPITALS.map((hospital) => (
              <article
                key={hospital.slug}
                className="group bg-white border border-[#e6ecea] rounded-[24px] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Hospital Image Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={hospital.img}
                      alt={hospital.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                        Partner hospital
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3
                      className="text-[20px] sm:text-[22px] font-bold tracking-tight mb-1.5 group-hover:text-[#095458] transition-colors"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      <Link href={`/hospitals/${hospital.slug}`} className="hover:underline">
                        {hospital.name}
                      </Link>
                    </h3>
                    <p className="text-[16px] text-medium leading-relaxed font-normal mb-3">
                      {hospital.focus}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#008329]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{hospital.city}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-2 border-t border-[#f1f4f4] flex items-center justify-between">
                  <Link
                    href={`/hospitals/${hospital.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#095458] hover:text-[#0b383e] transition-colors"
                  >
                    <span>View hospital</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: HOW WE CHOOSE HOSPITALS                       */}
        {/* ======================================================== */}
        <section className="bg-white border border-[#e6ecea] rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_2px_16px_rgba(11,56,62,0.04)]">
          <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
            <h2
              className="text-[28px] sm:text-[38px] font-bold tracking-tight leading-tight"
              style={{ color: 'var(--color-primary)' }}
            >
              How we choose{' '}
              <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
                hospitals
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRITERIA_CARDS.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-[22px] bg-[#fafcfb] border border-[#eef2f1] hover:border-[#8bd2ea] transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${card.chipBg}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3
                      className="text-[19px] font-bold tracking-tight mb-2"
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

          <p className="small muted text-center mt-8 text-xs text-low">
            Your Medicare Trip is an independent care facilitator. Hospital names and logos belong to their respective owners.
          </p>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: CTA BAND                                      */}
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

