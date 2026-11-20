import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { GUIDES } from '@/data/guidesData';
import { AlertCircle } from 'lucide-react';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: 'Guide Not Found | Your Medicare Trip',
    };
  }

  const title = `${guide.title} | Your Medicare Trip`;
  const description = guide.desc;
  const canonicalUrl = `https://www.yourmedicaretrip.com/guides/${guide.slug}`;
  const imageUrl = `https://www.yourmedicaretrip.com${guide.img}`;

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
      type: 'article',
      images: [
        {
          url: imageUrl,
          alt: guide.title,
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

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const otherGuides = GUIDES.filter((g) => g.slug !== guide.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.desc,
    image: `https://www.yourmedicaretrip.com${guide.img}`,
    // datePublished required for Google Article rich result eligibility
    datePublished: '2024-01-01',
    dateModified: '2026-11-01',
    author: {
      '@type': 'Organization',
      name: 'Your Medicare Trip',
      url: 'https://www.yourmedicaretrip.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Your Medicare Trip',
      url: 'https://www.yourmedicaretrip.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.yourmedicaretrip.com/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.yourmedicaretrip.com/guides/${guide.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-[#fafcfb]">
      {/* 1. Page Hero (Compact) */}
      <PageHero
        compact={true}
        breadcrumbs={[
          { label: 'Guides', href: '/guides' },
          { label: guide.cat },
        ]}
        title={guide.title}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-white/75 mt-4">
          <span className="font-semibold text-white/90">{guide.cat}</span>
          <span>·</span>
          <span>{guide.mins} min read</span>
          <span>·</span>
          <span>Reviewed by our clinical team</span>
        </div>
      </PageHero>

      {/* 2. Featured Image (Article Hero Image) */}
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 -mt-10 sm:-mt-14 relative z-20">
        <div className="relative aspect-[21/9] w-full rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-xl border border-gray-100 bg-gray-50">
          <Image
            src={guide.img}
            alt={guide.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover"
          />
        </div>
      </div>

      {/* 3. Main Article Content Flow */}
      <article className="max-w-[760px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-16">
        {/* Table of Contents */}
        <div className="p-5 sm:p-6 rounded-[20px] bg-[#eef6f5] border border-[#d6e9e4] mb-10">
          <strong className="text-xs font-bold uppercase tracking-wider text-[#0b383e] block mb-2">
            In this guide
          </strong>
          <ol className="list-decimal list-inside space-y-1.5 text-sm sm:text-[15px] font-bold text-[#0b383e]">
            {guide.sections.map((sec, idx) => (
              <li key={idx}>
                <a
                  href={`#s${idx + 1}`}
                  className="hover:underline hover:text-[#008329] transition-colors"
                >
                  {sec.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Sections */}
        <div className="space-y-10 prose-guide">
          {guide.sections.map((sec, idx) => (
            <section key={idx} id={`s${idx + 1}`} className="scroll-mt-28">
              <h2 className="text-[24px] sm:text-[28px] font-bold text-[#0b383e] tracking-tight mb-4">
                {sec.title}
              </h2>
              <div
                className="text-[16px] text-gray-700 leading-[1.75] font-normal"
                dangerouslySetInnerHTML={{ __html: sec.content }}
              />
            </section>
          ))}
        </div>

        {/* General Information Only Warning Callout */}
        <div className="mt-12 p-6 sm:p-7 rounded-[22px] bg-[#fffbf2] border border-[#f5e4ba] text-[#7a4c00]">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#b26b00] shrink-0 mt-0.5" />
            <p className="text-[15px] sm:text-[16px] leading-[1.7]">
              <strong className="font-bold text-[#7a4c00] mr-2">
                General information only:
              </strong>
              This guide is not medical advice. Decisions about your treatment should be made with a qualified doctor who knows your case.
            </p>
          </div>
        </div>
      </article>

      {/* 4. More Guides Section */}
      <section className="py-14 sm:py-18 bg-[#f4f7f6] border-t border-[#e2ece9]">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <h2 className="text-[22px] sm:text-[26px] font-bold text-[#0b383e] tracking-tight mb-6">
            More guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherGuides.map((other) => (
              <Link
                key={other.slug}
                href={`/guides/${other.slug}`}
                className="group flex flex-col justify-between rounded-[22px] bg-white border border-[#e6ecea] overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-[#8bd2ea] transition-all"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={other.img}
                      alt={other.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 480px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-gray-500 font-semibold block mb-1">
                      {other.cat} · {other.mins} min
                    </span>
                    <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0b383e] tracking-tight group-hover:text-[#008329] transition-colors leading-snug">
                      {other.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Band */}
      <CtaBand />

      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
