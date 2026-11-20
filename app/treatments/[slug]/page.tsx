import Link from 'next/link';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { OpenConsultationButton } from '@/components/OpenConsultationButton';
import { TREATMENTS } from '@/data/treatmentsData';
import { DOCTORS } from '@/data/doctorsData';
import { HOSPITALS } from '@/data/hospitalsData';
import { 
  ArrowRight, 
  Check, 
  X,
  User
} from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({
    slug: t.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const effectiveSlug = SLUG_REDIRECTS[slug] ? SLUG_REDIRECTS[slug].split('/').pop()! : slug;
  const treatment = TREATMENTS.find((t) => t.slug === effectiveSlug);

  if (!treatment) {
    return {
      title: 'Treatment Not Found | Your Medicare Trip',
    };
  }

  const title = `${treatment.name} in India: Cost & Recovery | Your Medicare Trip`;
  const description = `${treatment.summary} Starting prices, what's included, and how long to plan in India.`;
  const canonicalUrl = `https://www.yourmedicaretrip.com/treatments/${treatment.slug}`;
  const imageUrl = treatment.img
    ? `https://www.yourmedicaretrip.com${treatment.img}`
    : 'https://www.yourmedicaretrip.com/images/hero/airport.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: treatment.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

const SLUG_REDIRECTS: Record<string, string> = {
  'spine-surgery': '/treatments/minimal-invasive-spine-surgery',
  'cosmetic-surgery': '/treatments/rhinoplasty',
};

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  if (SLUG_REDIRECTS[slug]) {
    redirect(SLUG_REDIRECTS[slug]);
  }
  const treatment = TREATMENTS.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  // Associated Doctors
  const doctors = DOCTORS.filter((d) => treatment.doctors.includes(d.slug));

  // Associated Hospitals
  const hospitals = HOSPITALS.filter((h) => treatment.hospitals.includes(h.slug));

  const isSurgical = ['orthopaedics', 'cosmetic', 'cardiac', 'fertility'].includes(treatment.spec);

  const treatmentJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: treatment.name,
    description: treatment.summary || treatment.intro,
    url: `https://www.yourmedicaretrip.com/treatments/${treatment.slug}`,
    // procedureType only set for genuinely surgical specialties
    ...(isSurgical && {
      procedureType: { '@type': 'MedicalProcedureType', name: 'Surgical Procedure' },
    }),
    bodyLocation: treatment.specName,
    ...(treatment.priceFrom && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: treatment.priceFrom,
        availability: 'https://schema.org/InStock',
        description: 'Estimated starting cost — includes procedure, hospital stay, and care coordination.',
        seller: {
          '@type': 'MedicalOrganization',
          '@id': 'https://www.yourmedicaretrip.com/#organization',
          name: 'Your Medicare Trip',
        },
      },
    }),
  };

  return (
    <main className="min-h-screen bg-[#fafcfb]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(treatmentJsonLd) }}
      />
      {/* 1. Page Hero */}
      <PageHero
        bgImage={treatment.img}
        breadcrumbs={[
          { label: 'Treatments', href: '/treatments' },
          { label: 'Medical treatments', href: '/treatments/medical-treatments' },
          { label: treatment.name },
        ]}
        eyebrow={treatment.specName}
        title={
          <>
            {treatment.name}{' '}
            <span className="px-2.5 py-0.5 rounded-lg inline-block bg-[rgba(139,210,234,0.28)]">
              in India
            </span>
          </>
        }
        lede={treatment.summary}
        actions={
          <div className="flex flex-wrap items-center gap-3 mt-6 sm:mt-8">
            <Link
              href={`/enquiry?treatment=${treatment.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-sm"
            >
              <span>Get my itemised quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <OpenConsultationButton
              treatmentTitle={treatment.name}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20 cursor-pointer"
            >
              <span>Free video consultation</span>
            </OpenConsultationButton>
          </div>
        }
      />

      {/* 2. Main Content Split */}
      <section className="py-16 sm:py-24">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Continuous Prose Flow */}
            <div className="lg:col-span-8 prose-content space-y-12">
              
              {/* Overview */}
              <div>
                <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0b383e] mb-4">
                  Overview
                </h2>
                <p className="text-[16px] text-gray-700 font-normal leading-[1.75]">
                  {treatment.intro}
                </p>

                {treatment.note && (
                  <div className="mt-6 p-5 rounded-[18px] bg-[#eef6f5] border border-[#d6e9e4] text-[#0b383e]">
                    <p className="text-[15px] sm:text-[16px] font-medium leading-[1.6]">
                      {treatment.note}
                    </p>
                  </div>
                )}
              </div>

              {/* Options */}
              {treatment.options.length > 0 && (
                <div>
                  <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0b383e] mb-5">
                    Options
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {treatment.options.map((opt, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-[22px] bg-white border border-[#e6ecea] shadow-[0_1px_3px_rgba(11,56,62,0.04)]"
                      >
                        <h3 className="text-[18px] font-bold text-[#0b383e] mb-2">
                          {opt.title}
                        </h3>
                        <p className="text-[14px] sm:text-[15px] text-gray-600 font-normal leading-[1.6]">
                          {opt.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Who it may suit */}
              {treatment.suited.length > 0 && (
                <div>
                  <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0b383e] mb-4">
                    Who it may suit
                  </h2>
                  <ul className="space-y-3">
                    {treatment.suited.map((item, idx) => (
                      <li
                        key={idx}
                        className="grid grid-cols-[22px_1fr] gap-3 text-[16px] text-gray-700 leading-[1.7]"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs sm:text-sm text-gray-500 font-normal">
                    Whether it&apos;s right for you is a decision for your specialist after reviewing your reports.
                  </p>
                </div>
              )}

              {/* Your time in India */}
              {treatment.timeline.length > 0 && (
                <div>
                  <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0b383e] mb-5">
                    Your time in India
                  </h2>
                  <ol className="space-y-4">
                    {treatment.timeline.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-4 p-5 rounded-[20px] bg-white border border-[#e6ecea] shadow-xs"
                      >
                        <span className="w-8 h-8 rounded-full bg-[#0b383e] text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <h3 className="text-[17px] font-bold text-[#0b383e] mb-1">
                            {step.period}
                          </h3>
                          <p className="text-[15px] sm:text-[16px] text-gray-700 font-normal leading-[1.65]">
                            {step.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  <p className="mt-4 text-xs sm:text-sm text-gray-500 font-normal">
                    Typical timings only. Your plan is agreed with your doctor and may be longer or shorter.
                  </p>
                </div>
              )}

              {/* What the price includes */}
              <div>
                <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0b383e] mb-5">
                  What the price includes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Usually Included */}
                  <div className="p-6 rounded-[22px] bg-white border border-[#e6ecea] shadow-xs">
                    <h3 className="text-[18px] font-bold text-[#0b383e] mb-4">
                      Usually included
                    </h3>
                    <ul className="space-y-3">
                      {treatment.included.map((item, idx) => (
                        <li
                          key={idx}
                          className="grid grid-cols-[20px_1fr] gap-2.5 text-[14px] sm:text-[15px] text-gray-700 leading-[1.6]"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Usually Not Included */}
                  <div className="p-6 rounded-[22px] bg-white border border-[#e6ecea] shadow-xs">
                    <h3 className="text-[18px] font-bold text-[#0b383e] mb-4">
                      Usually not included
                    </h3>
                    <ul className="space-y-3">
                      {treatment.excluded.map((item, idx) => (
                        <li
                          key={idx}
                          className="grid grid-cols-[20px_1fr] gap-2.5 text-[14px] sm:text-[15px] text-gray-700 leading-[1.6]"
                        >
                          <span className="w-4 h-4 rounded-full bg-[#fde8e8] text-[#c93b2b] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                            <X className="w-3 h-3 stroke-[2.5]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Where it's done (Hospitals) */}
              {hospitals.length > 0 && (
                <div>
                  <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0b383e] mb-4">
                    Where it&apos;s done
                  </h2>
                  <p className="text-[16px] text-gray-700 mb-4 font-normal">
                    We arrange this treatment at:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4 text-[16px] text-gray-700 font-medium">
                    {hospitals.map((hosp) => (
                      <li key={hosp.slug}>
                        <Link
                          href={`/hospitals/${hosp.slug}`}
                          className="text-[#0b383e] hover:text-[#008329] underline underline-offset-4 font-bold transition-colors"
                        >
                          {hosp.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal">
                    Your doctor recommends the hospital based on your case; you&apos;re welcome to ask for another partner.
                  </p>
                </div>
              )}

              {/* After you're home */}
              <div>
                <h2 className="text-[26px] sm:text-[30px] font-bold tracking-tight text-[#0b383e] mb-4">
                  After you&apos;re home
                </h2>
                <p className="text-[16px] text-gray-700 font-normal leading-[1.75]">
                  Before you fly, you get a discharge summary in English, your scans and reports, and a written plan for the weeks ahead.
                  Your coordinator schedules follow-up video calls with your specialist and stays your contact if anything worries you.{' '}
                  <Link
                    href="/aftercare"
                    className="text-[#0b383e] hover:text-[#008329] underline underline-offset-4 font-bold transition-colors"
                  >
                    How aftercare works
                  </Link>
                  .
                </p>
              </div>

              {/* Full Guide Link */}
              {treatment.guide && (
                <p className="text-base pt-2">
                  <Link
                    href={`/guides/${treatment.guide}`}
                    className="inline-flex items-center gap-2 font-bold text-[#0b383e] hover:text-[#008329] underline underline-offset-4 transition-colors group"
                  >
                    <span>Read our full guide to {treatment.name.toLowerCase()} in India</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform inline" />
                  </Link>
                </p>
              )}

            </div>

            {/* Right Column: Sticky Aside */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              
              {/* At a glance Card */}
              <div className="bg-white border border-[#e6ecea] rounded-[22px] p-6 shadow-xs">
                <h3 className="text-[18px] font-extrabold text-[#0b383e] mb-3">
                  At a glance
                </h3>
                <dl className="divide-y divide-dashed divide-[#e6ecea] text-sm">
                  {treatment.facts.map((fact, idx) => (
                    <div key={idx} className="flex justify-between py-2.5">
                      <dt className="text-gray-500 font-normal">{fact.label}</dt>
                      <dd className="font-bold text-[#0b383e] text-right">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Price Card */}
              <div className="bg-white border border-[#e6ecea] rounded-[22px] p-6 shadow-xs">
                {treatment.priceFrom !== null ? (
                  <div>
                    <div className="flex items-baseline justify-between py-1 border-b border-[#eef2f1]">
                      <span className="text-xs text-gray-500 font-normal">
                        {treatment.addon ? 'Add-on from' : 'Starting from'}
                      </span>
                      <span className="text-[26px] font-black text-[#0b383e]">
                        ${treatment.priceFrom.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 pt-2 font-normal">
                      <span>
                        {treatment.priceTo
                          ? `Up to $${treatment.priceTo.toLocaleString()}`
                          : 'USD'}
                      </span>
                      {treatment.saving && (
                        <span className="px-2 py-0.5 rounded-md bg-[#eef6f5] text-[#008329] font-bold">
                          Save {treatment.saving}
                        </span>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-baseline justify-between py-1 border-b border-[#eef2f1]">
                      <span className="text-xs text-gray-500 font-normal">Price</span>
                      <span className="text-[20px] font-bold text-[#0b383e]">
                        Quoted after review
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 pt-2 font-normal">
                      <span>Itemised quote within 48 hours</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4 leading-relaxed font-normal">
                  Starting price for patients from <strong className="text-[#0b383e] font-semibold">Saudi Arabia</strong>.
                  Your final quote is fixed in writing after review.
                </p>

                <Link
                  href={`/enquiry?treatment=${treatment.slug}`}
                  className="w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#0b383e] text-white hover:bg-[#0e484f] transition-colors shadow-xs"
                >
                  <span>Get my itemised quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Associated Doctor Cards */}
              {doctors.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/doctors/${doc.slug}`}
                  className="group flex items-center gap-3.5 p-4 rounded-[22px] bg-white border border-[#e6ecea] shadow-xs hover:border-[#8bd2ea] hover:shadow-md transition-all"
                >
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                    {doc.img ? (
                      <Image
                        src={doc.img}
                        alt={doc.name}
                        fill
                        sizes="56px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf4f6] to-[#b8e0ea] text-[#0b383e]">
                        <User className="w-7 h-7 text-[#0b383e]/60" />
                      </div>
                    )}
                  </div>
                  <div>
                    <strong className="block text-[15px] font-bold text-[#0b383e] group-hover:text-[#008329] transition-colors">
                      {doc.name}
                    </strong>
                    <span className="text-xs text-gray-500 font-normal block leading-tight">
                      {doc.role}
                    </span>
                  </div>
                </Link>
              ))}

              {/* Talk It Through First (Dark Card) */}
              <div className="bg-[#0b383e] text-white rounded-[22px] p-6 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-[18px] font-extrabold mb-1.5 text-white">
                    Talk it through first
                  </h3>
                  <p className="text-[14px] text-white/80 leading-relaxed font-normal mb-5">
                    A free 30-minute video call with a coordinator and a doctor.
                  </p>
                </div>
                <OpenConsultationButton
                  treatmentTitle={treatment.name}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-[#8bd2ea] text-[#0b383e] hover:bg-[#a2ddf0] transition-colors shadow-sm cursor-pointer"
                >
                  <span>Book consultation</span>
                </OpenConsultationButton>
              </div>

            </aside>

          </div>
        </div>
      </section>

      {/* 3. Bottom CTA Band */}
      <CtaBand />
    </main>
  );
}

