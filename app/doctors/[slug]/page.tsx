import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  DOCTORS, 
  DOCTOR_TREATMENTS_MAP
} from '@/data/doctorsData';
import { 
  Check, 
  ArrowRight, 
  Lock, 
  Clock, 
  CheckCircle2, 
  Stethoscope 
} from 'lucide-react';

interface DoctorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return DOCTORS.map((d) => ({
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);
  if (!doctor) return {};

  return {
    title: `${doctor.name} | Your Medicare Trip`,
    description: `${doctor.name}, ${doctor.specialty} specialist with ${doctor.years} years of experience in Mohali, Punjab. Video consultations and surgery coordination for international patients.`,
  };
}

export default async function DoctorDetailPage({ params }: DoctorPageProps) {
  const { slug } = await params;
  const doctor = DOCTORS.find((d) => d.slug === slug);

  if (!doctor) {
    notFound();
  }

  // Treatments mapped
  const treatments = doctor.treatments
    .map((tSlug) => DOCTOR_TREATMENTS_MAP[tSlug])
    .filter(Boolean);

  const heroFacts = [
    `${doctor.years} experience`,
    'Video consultations',
    'Mohali, Punjab',
  ];

  return (
    <main id="main" className="min-h-screen bg-[#fafcfb]">
      {/* ======================================================== */}
      {/* 1. COMPACT SPLIT HERO (Matches dist/doctors/*.html)       */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden text-white bg-[#0b383e] pt-[140px] sm:pt-[150px] pb-14 sm:pb-16 isolate">
        {/* Subtle radial ambient highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 420px at 85% 0%, rgba(139, 210, 234, 0.22), transparent 60%), linear-gradient(180deg, rgba(7, 43, 46, 0.70) 0%, rgba(11, 56, 62, 0.86) 70%, rgba(11, 56, 62, 0.96) 100%)',
          }}
        />

        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-end">
            
            {/* Left Content */}
            <div>
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-white/65 mb-5 sm:mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="opacity-50">/</span>
                <Link href="/doctors" className="hover:text-white transition-colors">
                  Doctors
                </Link>
                <span className="opacity-50">/</span>
                <span className="text-white font-medium" aria-current="page">
                  {doctor.name}
                </span>
              </nav>

              {/* Eyebrow */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/12 text-[#d5f1fa] border border-white/22">
                  <Stethoscope className="w-3.5 h-3.5 text-[#8bd2ea]" />
                  <span>{doctor.specialty}</span>
                </span>
              </div>

              {/* Display Title */}
              <h1 className="text-[34px] sm:text-[46px] lg:text-[54px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white text-balance">
                {doctor.name}
              </h1>

              {/* Lede */}
              <p className="mt-3 text-base sm:text-lg text-white/85 font-normal">
                {doctor.role}
              </p>

              {/* Hero Facts */}
              <ul className="flex flex-wrap gap-2.5 mt-6">
                {heroFacts.map((fact, idx) => (
                  <li
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/18 text-xs sm:text-[13px] font-bold text-white shadow-xs"
                  >
                    {fact}
                  </li>
                ))}
              </ul>

              {/* Action CTA */}
              <div className="mt-8">
                <Link
                  href="/#consultation"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-md"
                >
                  <span>Book a consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Split Photo */}
            <div className="flex justify-start lg:justify-end">
              <div className="relative w-full max-w-[400px] aspect-[4/4.2] rounded-[24px] overflow-hidden shadow-2xl border border-white/20 bg-gray-900">
                <Image
                  src={doctor.img}
                  alt={doctor.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. DETAIL SECTION: PROSE + ASIDE                          */}
      {/* ======================================================== */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#eef2f1]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Clean Prose Flow */}
            <div className="prose max-w-none">
              
              {/* About */}
              <h2 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] mb-3">
                About
              </h2>
              <div className="space-y-4 mb-10 text-[16px] text-gray-700 leading-[1.75] font-normal">
                {doctor.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Highlights */}
              <h2 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] mb-4">
                Highlights
              </h2>
              <ul className="space-y-2.5 mb-10">
                {doctor.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="grid grid-cols-[22px_1fr] gap-2.5 text-[16px] text-gray-700 leading-[1.7]"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Qualifications */}
              <h2 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] mb-4">
                Qualifications
              </h2>
              {doctor.quals.length > 0 ? (
                <ul className="space-y-2.5 mb-10">
                  {doctor.quals.map((qual, idx) => (
                    <li
                      key={idx}
                      className="grid grid-cols-[22px_1fr] gap-2.5 text-[16px] text-gray-700 leading-[1.7]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </span>
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[16px] text-gray-500 mb-10 font-normal leading-[1.75]">
                  Qualifications and medical council registration details are shared with your treatment plan.
                </p>
              )}

              {/* Treatments (Rendered when doctor has associated treatments) */}
              {treatments.length > 0 && (
                <>
                  <h2 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] mb-4">
                    Treatments
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                    {treatments.map((treatment) => (
                      <Link
                        key={treatment.slug}
                        href={`/treatments/${treatment.slug}`}
                        className="group bg-white border border-[#e6ecea] rounded-[22px] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg hover:-translate-y-1 hover:border-[#d3dcdb] transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Image Media Top */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                            <Image
                              src={treatment.img}
                              alt={treatment.name}
                              fill
                              sizes="(max-width: 768px) 100vw, 360px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3.5 left-3.5">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                                {treatment.tag}
                              </span>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-5 flex flex-col gap-1.5">
                            <h3 className="text-[18px] font-bold text-[#0b383e] group-hover:text-[#095458] transition-colors leading-snug">
                              {treatment.name}
                            </h3>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-normal">
                              {treatment.summary}
                            </p>
                          </div>
                        </div>

                        {/* Arrow Link */}
                        <div className="px-5 pb-5 pt-2 flex items-center justify-between text-xs font-bold text-[#0b383e] group-hover:text-[#095458]">
                          <span>{treatment.priceNote || 'See details'}</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* How a consultation works */}
              <h2 className="text-[26px] sm:text-[28px] font-bold tracking-tight text-[#0b383e] mb-4">
                How a consultation works
              </h2>
              <ol className="list-decimal pl-5 space-y-2 text-[16px] text-gray-700 leading-[1.75]">
                <li>Send your reports and scans through your coordinator.</li>
                <li>The doctor reviews them before the call.</li>
                <li>A video call of around 30 minutes, with an interpreter if you need one.</li>
                <li>A written plan and itemised quote follow within 48 hours.</li>
              </ol>

            </div>

            {/* Right Column: Sticky Aside */}
            <aside className="space-y-5 lg:sticky lg:top-28">
              
              {/* At a glance Card */}
              <div className="bg-white border border-[#e6ecea] rounded-[22px] p-6 shadow-xs">
                <h3 className="text-[17px] font-extrabold text-[#0b383e] mb-3">
                  At a glance
                </h3>
                <dl className="divide-y divide-dashed divide-[#e6ecea] text-sm">
                  <div className="flex justify-between py-2.5">
                    <dt className="text-gray-500 font-normal">Specialty</dt>
                    <dd className="font-bold text-[#0b383e] text-right">{doctor.specialty}</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-gray-500 font-normal">Experience</dt>
                    <dd className="font-bold text-[#0b383e] text-right">{doctor.years} years</dd>
                  </div>
                  <div className="flex justify-between py-2.5">
                    <dt className="text-gray-500 font-normal">Consultations</dt>
                    <dd className="font-bold text-[#0b383e] text-right">Video &amp; in person</dd>
                  </div>
                </dl>
              </div>

              {/* Speak to Doctor Card (Dark) */}
              <div className="bg-[#0b383e] text-white rounded-[22px] p-6 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-extrabold mb-1.5 text-white">
                    Speak to {doctor.shortName}
                  </h3>
                  <p className="text-[14px] text-white/80 leading-relaxed font-normal mb-5">
                    Book a free 30-minute video consultation through our care team.
                  </p>
                </div>
                <Link
                  href="/#consultation"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-sm"
                >
                  <span>Book consultation</span>
                </Link>
              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CTA BAND (Matches dist/doctors/*.html)                 */}
      {/* ======================================================== */}
      <section className="py-20 sm:py-24 bg-[#eef6f5] text-center border-t border-[#e2ece9]">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6">
          <h2 className="text-[32px] sm:text-[40px] font-bold text-[#0b383e] tracking-tight leading-tight">
            Ready to plan{' '}
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.35)] font-semibold">
              your treatment?
            </span>
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto font-normal leading-relaxed">
            Book a free 30-minute video consultation. A coordinator and a doctor go through your case and tell you honestly whether travelling for treatment makes sense.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[640px] mx-auto mt-9 text-left">
            {/* Tile 1: Dark Video Appointment */}
            <Link
              href="/#consultation"
              className="group flex flex-col justify-between p-6 rounded-[22px] bg-[#0b383e] text-white shadow-md hover:-translate-y-1 transition-all min-h-[160px]"
            >
              <div>
                <small className="text-xs text-white/70 block mb-1 font-normal">
                  Free, 30 minutes
                </small>
                <strong className="text-base sm:text-lg font-bold text-white">
                  Video consultation
                </strong>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-white mt-4">
                <span>Book your video appointment</span>
                <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Tile 2: Light WhatsApp Chat */}
            <a
              href="https://wa.me/447587399811?text=Hello%2C%20I%27d%20like%20to%20know%20more%20about%20treatment%20in%20India."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-6 rounded-[22px] bg-white border border-[#e6ecea] text-[#0b383e] shadow-xs hover:-translate-y-1 transition-all min-h-[160px]"
            >
              <div>
                <small className="text-xs text-gray-500 block mb-1 font-normal">
                  Usually replies in minutes
                </small>
                <strong className="text-base sm:text-lg font-bold text-[#0b383e]">
                  WhatsApp our care team
                </strong>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-[#0b383e] mt-4">
                <span>Start WhatsApp conversation</span>
                <span className="w-8 h-8 rounded-full bg-[#e8f8ee] text-[#008329] flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          </div>

          {/* Trust Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-9 pt-7 border-t border-[#d8e5e1] text-xs sm:text-[13px] text-gray-600 font-medium">
            <span className="inline-flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#008329]" />
              <span>Confidential consultation</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#008329]" />
              <span>No waiting lists</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008329]" />
              <span>No GP referral needed</span>
            </span>
          </div>
        </div>
      </section>

    </main>
  );
}
