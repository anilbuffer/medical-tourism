import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PATIENT_GUIDES, getWhatsAppUrl } from '@/data/contentData';
import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PATIENT_GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = PATIENT_GUIDES.find((g) => g.slug === slug);
  if (!guide) return { title: 'Guide Not Found' };
  return {
    title: `${guide.title} | Your Medicare Trip`,
    description: guide.excerpt,
  };
}

export default async function SingleGuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = PATIENT_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const relatedGuides = PATIENT_GUIDES.filter((g) => g.slug !== guide.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen pt-28 sm:pt-32 pb-24 bg-[#fafcfb] overflow-hidden">
        {/* Soft Ambient Radial Background Glows */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-emerald-100/35 rounded-full blur-[120px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 -left-20 w-[450px] h-[450px] bg-amber-100/30 rounded-full blur-[100px] pointer-events-none"
        />

        <article className="relative z-10 max-w-[840px] mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="text-xs font-medium text-low mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-low">/</span>
            <Link href="/guides" className="hover:text-primary transition-colors">
              Patient Guides
            </Link>
            <span className="text-low">/</span>
            <span className="text-high font-semibold truncate max-w-[200px] sm:max-w-none">
              {guide.title}
            </span>
          </nav>

          {/* Category Tag & Read Time */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor:
                  'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                color: 'var(--color-primary)',
              }}
            >
              {guide.categoryLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-low font-medium">
              <Clock className="w-3.5 h-3.5 text-low" />
              {guide.readMins} min read
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-[32px] sm:text-[44px] lg:text-[54px] font-semibold tracking-[-1.2px] lg:tracking-[-1.5px] leading-[1.15] text-balance"
            style={{ color: 'var(--color-primary)' }}
          >
            {guide.title}
          </h1>

          {/* Excerpt */}
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-medium font-normal">
            {guide.excerpt}
          </p>

          {/* Featured Cover Image */}
          <div className="mt-8 rounded-[20px] overflow-hidden border border-[#e6ecea] shadow-[0_1px_2px_rgba(16,24,40,0.04)] max-h-[440px]">
            <img
              src={guide.image}
              alt={guide.title}
              className="w-full h-full object-cover max-h-[440px]"
            />
          </div>

          {/* Guide Content */}
          <div className="mt-10 space-y-6 text-high leading-relaxed">
            <p className="text-base sm:text-lg leading-relaxed text-medium">
              When travelling abroad for medical care, peace of mind comes from clear expectations, structured timelines, and attentive post-operative care. This guide covers everything you need to know before you fly, during your hospital stay, and all the way back home.
            </p>

            <h2
              className="text-2xl sm:text-3xl font-semibold tracking-[-0.75px] pt-4"
              style={{ color: 'var(--color-primary)' }}
            >
              What to expect from start to finish
            </h2>

            <ul className="space-y-3 list-none p-0">
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 flex-none mt-0.5"
                  style={{ color: 'var(--color-primary)' }}
                />
                <span className="text-sm sm:text-base text-medium leading-relaxed">
                  <strong className="text-high">Comprehensive Pre-Travel Assessment:</strong> Specialist case evaluation and digital consult prior to confirming your flight dates.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 flex-none mt-0.5"
                  style={{ color: 'var(--color-primary)' }}
                />
                <span className="text-sm sm:text-base text-medium leading-relaxed">
                  <strong className="text-high">Door-to-Door Coordination:</strong> VIP airport pick-up, dedicated hospital concierge, and language assistance.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 flex-none mt-0.5"
                  style={{ color: 'var(--color-primary)' }}
                />
                <span className="text-sm sm:text-base text-medium leading-relaxed">
                  <strong className="text-high">Safe Journey Home:</strong> Clearance-to-fly certificates, discharge medications, and digital follow-up consultations.
                </span>
              </li>
            </ul>

            {/* Assistance Callout Box */}
            <div
              className="p-6 sm:p-8 rounded-[20px] border border-[#e6ecea] mt-10 shadow-sm"
              style={{
                backgroundColor: 'rgba(232, 244, 242, 0.65)',
              }}
            >
              <h3
                className="text-lg sm:text-xl font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                Need personalised advice on your case?
              </h3>
              <p className="mt-2 text-sm sm:text-base text-medium leading-relaxed">
                Our clinical care coordinators can review your medical records and provide a fixed-price treatment package from top accredited hospitals.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={getWhatsAppUrl(`Hi, I'm reading the guide "${guide.title}" and would like to ask a question.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:brightness-105 transition-all shadow-sm"
                >
                  Ask us on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#e6ecea]">
              <h2
                className="text-2xl font-semibold tracking-tight mb-6"
                style={{ color: 'var(--color-primary)' }}
              >
                More patient guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedGuides.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/guides/${rel.slug}`}
                    className="group block p-5 bg-white border border-[#e6ecea] rounded-[18px] hover:shadow-[0_12px_32px_rgba(16,24,40,0.08)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {rel.categoryLabel}
                    </span>
                    <h3
                      className="font-bold text-base sm:text-lg mt-1 group-hover:text-[var(--color-primary)] transition-colors leading-snug"
                      style={{ color: 'var(--color-high)' }}
                    >
                      {rel.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-medium mt-2 line-clamp-2 leading-relaxed">
                      {rel.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
