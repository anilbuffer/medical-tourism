import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { VideoConsultationCard } from '@/components/VideoConsultationCard';
import { WhatsAppCard } from '@/components/WhatsAppCard';
import { 
  HOSPITALS, 
  TREATMENTS_MAP, 
  SPECIALISTS_LIST
} from '@/data/hospitalsData';
import { 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Clock, 
  Lock, 
  CheckCircle2,
  User
} from 'lucide-react';

interface HospitalPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return HOSPITALS.map((h) => ({
    slug: h.slug,
  }));
}

export async function generateMetadata({ params }: HospitalPageProps) {
  const { slug } = await params;
  const hospital = HOSPITALS.find((h) => h.slug === slug);
  if (!hospital) return {};

  return {
    title: `${hospital.name}, ${hospital.city} | Your Medicare Trip`,
    description: `Treatment at ${hospital.name}, ${hospital.city}, arranged for international patients: ${hospital.focus.toLowerCase()}.`,
  };
}

export default async function HospitalDetailPage({ params }: HospitalPageProps) {
  const { slug } = await params;
  const hospital = HOSPITALS.find((h) => h.slug === slug);

  if (!hospital) {
    notFound();
  }

  // Get treatments for this hospital
  const treatments = hospital.treatments
    .map((tSlug) => TREATMENTS_MAP[tSlug])
    .filter(Boolean);

  // Get specialists linked to these treatments
  const specialists = SPECIALISTS_LIST.filter((doc) =>
    doc.treatments.some((t) => hospital.treatments.includes(t))
  );

  // Other partner hospitals
  const otherHospitals = HOSPITALS.filter((h) => h.slug !== hospital.slug);

  return (
    <main className="min-h-screen bg-[#fafcfb] pb-24">
      {/* Signature Hospital Hero */}
      <PageHero
        bgImage={hospital.img}
        eyebrow="Partner hospital"
        breadcrumbs={[
          { label: 'Hospitals', href: '/hospitals' },
          { label: hospital.short },
        ]}
        title={hospital.name}
        lede={hospital.focus}
        facts={[
          hospital.city,
          'About 30 min from the airport',
          'International patient support',
        ]}
        actions={
          <OpenConsultationButton
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] shadow-md hover:bg-[#a2ddf0] transition-colors cursor-pointer"
          >
            <span>Enquire about treatment here</span>
            <ArrowRight className="w-4 h-4" />
          </OpenConsultationButton>
        }
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Detail Layout with Main Column and Sticky Aside */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-14">
            
            {/* 1. About the Hospital */}
            <section className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)]">
              <h2
                className="text-[24px] sm:text-[28px] font-bold tracking-tight mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                About the hospital
              </h2>
              <p className="text-[16px] text-medium leading-[28px] font-normal">
                {hospital.about}
              </p>
            </section>

            {/* 2. Treatments We Arrange Here */}
            {treatments.length > 0 && (
              <section>
                <div className="mb-6">
                  <h2
                    className="text-[24px] sm:text-[28px] font-bold tracking-tight"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Treatments we arrange here
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {treatments.map((treatment) => (
                    <div
                      key={treatment.slug}
                      className="bg-white border border-[#e6ecea] rounded-[20px] p-5 shadow-[0_1px_3px_rgba(11,56,62,0.03)] hover:border-[#8bd2ea] hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eef6f5] text-[#0b383e]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                            {treatment.tag}
                          </span>
                        </div>
                        <h3
                          className="text-[18px] font-bold tracking-tight mb-2"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {treatment.name}
                        </h3>
                        <p className="text-[16px] text-medium leading-relaxed font-normal mb-4">
                          {treatment.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#f1f4f4]">
                        <Link
                          href={`/treatments/${treatment.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#095458] hover:text-[#0b383e]"
                        >
                          <span>See details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Specialists Operating Here */}
            {specialists.length > 0 && (
              <section>
                <div className="mb-6">
                  <h2
                    className="text-[24px] sm:text-[28px] font-bold tracking-tight"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Specialists
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {specialists.map((doc) => (
                    <div
                      key={doc.slug}
                      className="bg-white border border-[#e6ecea] rounded-[20px] p-5 shadow-[0_1px_3px_rgba(11,56,62,0.03)] flex items-center gap-4 hover:border-[#8bd2ea] transition-all"
                    >
                      <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-gray-100 shrink-0 shadow-xs border border-gray-200 flex items-center justify-center">
                        {doc.img ? (
                          <Image
                            src={doc.img}
                            alt={doc.name}
                            fill
                            className="object-cover object-top"
                            sizes="72px"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf4f6] to-[#b8e0ea] text-[#0b383e]">
                            <User className="w-8 h-8 text-[#0b383e]/60" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3
                          className="text-[17px] sm:text-[18px] font-bold tracking-tight leading-snug"
                          style={{ color: 'var(--color-primary)' }}
                        >
                          {doc.name}
                        </h3>
                        <p className="text-xs text-medium font-semibold mt-0.5">
                          {doc.role}
                        </p>
                        <p className="text-xs text-[#008329] font-bold mt-1">
                          {doc.years} experience
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. What We Handle For You */}
            <section className="bg-white border border-[#e6ecea] rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_1px_3px_rgba(11,56,62,0.04)]">
              <h2
                className="text-[24px] sm:text-[28px] font-bold tracking-tight mb-4"
                style={{ color: 'var(--color-primary)' }}
              >
                What we handle for you
              </h2>

              <ul className="space-y-3.5">
                {[
                  'Sharing your reports with the hospital and specialist before you travel',
                  'Your written quote and the hospital\'s visa invitation letter',
                  'Admission paperwork, deposits and billing queries',
                  'A coordinator with you on admission, surgery day and discharge',
                  'Transfers between the hospital, your recovery suite and the airport',
                  'Your discharge summary, reports and images in English',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[16px] text-medium leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Accreditation Callout */}
              <div className="mt-8 p-4 rounded-xl bg-[#eef6f5] border border-[#d6e9e4] text-[#0b383e] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#008329] shrink-0 mt-0.5" />
                <p className="text-[16px] leading-relaxed">
                  <strong className="font-bold">Accreditation:</strong> Current accreditation certificates for this hospital are shared with your treatment plan.
                </p>
              </div>
            </section>

          </div>

          {/* Aside Sidebar (Sticky on Desktop) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Card 1: At a Glance */}
            <div className="bg-white border border-[#e6ecea] rounded-[22px] p-6 shadow-sm">
              <h3
                className="text-[19px] font-bold tracking-tight mb-4 pb-3 border-b border-[#f0f4f3]"
                style={{ color: 'var(--color-primary)' }}
              >
                At a glance
              </h3>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-2 py-1.5 border-b border-[#f5f8f7]">
                  <dt className="text-gray-500 font-medium">Location</dt>
                  <dd className="font-bold text-[#0b383e] text-right">{hospital.city}</dd>
                </div>
                <div className="flex justify-between items-start gap-2 py-1.5 border-b border-[#f5f8f7]">
                  <dt className="text-gray-500 font-medium">Focus</dt>
                  <dd className="font-bold text-[#0b383e] text-right max-w-[200px]">{hospital.focus}</dd>
                </div>
                <div className="flex justify-between items-start gap-2 py-1.5 border-b border-[#f5f8f7]">
                  <dt className="text-gray-500 font-medium">From airport</dt>
                  <dd className="font-bold text-[#0b383e] text-right">About 30 min</dd>
                </div>
                <div className="flex justify-between items-start gap-2 py-1.5">
                  <dt className="text-gray-500 font-medium">Languages</dt>
                  <dd className="font-bold text-[#0b383e] text-right">English, Hindi, Punjabi</dd>
                </div>
              </dl>
            </div>

            {/* Card 2: Consultation CTA (Dark) */}
            <div
              className="rounded-[22px] p-6 text-white shadow-lg relative overflow-hidden"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <h3 className="text-[19px] font-bold mb-2">
                Is this the right hospital for me?
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-normal">
                Send your reports and we&apos;ll tell you which hospital and specialist fit your case.
              </p>
              <OpenConsultationButton
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-sm cursor-pointer"
              >
                <span>Book a free consultation</span>
                <ArrowRight className="w-4 h-4" />
              </OpenConsultationButton>
            </div>

            {/* Card 3: Other Partner Hospitals */}
            <div className="bg-white border border-[#e6ecea] rounded-[22px] p-6 shadow-sm">
              <h3
                className="text-[19px] font-bold tracking-tight mb-4 pb-3 border-b border-[#f0f4f3]"
                style={{ color: 'var(--color-primary)' }}
              >
                Other partner hospitals
              </h3>

              <ul className="space-y-3">
                {otherHospitals.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/hospitals/${other.slug}`}
                      className="group flex items-center justify-between text-sm font-semibold text-medium hover:text-[#0b383e] transition-colors"
                    >
                      <span className="group-hover:underline">{other.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 group-hover:text-[#0b383e] transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>

        </div>

        {/* CTA Band at Bottom of Hospital Detail Page */}
        <section
          className="rounded-[28px] sm:rounded-[36px] overflow-hidden p-8 sm:p-12 lg:p-14 text-white relative shadow-2xl mt-20"
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

