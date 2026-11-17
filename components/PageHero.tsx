import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  title: React.ReactNode;
  lede?: string;
  breadcrumbs: BreadcrumbItem[];
  bgImage?: string;
  compact?: boolean;
  actions?: React.ReactNode;
  facts?: string[];
  eyebrow?: string;
  rightImage?: { src: string; alt: string };
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  lede,
  breadcrumbs,
  bgImage,
  compact = false,
  actions,
  facts,
  eyebrow,
  rightImage,
  children,
}) => {
  return (
    <section
      className={`relative overflow-hidden text-white isolate ${
        compact ? 'pt-[140px] sm:pt-[150px] pb-14 sm:pb-16' : 'pt-[140px] sm:pt-[168px] pb-16 sm:pb-24'
      } bg-[#0b383e]`}
    >
      {/* Background Image Layer (when provided) */}
      {bgImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgImage}')` }}
        />
      )}

      {/* Signature Dark Teal Gradient Overlay matching site.css */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 420px at 85% 0%, rgba(139, 210, 234, 0.22), transparent 60%), linear-gradient(180deg, rgba(7, 43, 46, 0.70) 0%, rgba(11, 56, 62, 0.86) 70%, rgba(11, 56, 62, 0.96) 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className={rightImage ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-end' : ''}>
          <div className={rightImage ? 'lg:col-span-8' : ''}>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs sm:text-[13px] text-white/65 mb-5 sm:mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <span className="opacity-50">/</span>
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </nav>

            {/* Optional Eyebrow */}
            {eyebrow && (
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                  {eyebrow}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-[34px] sm:text-[46px] lg:text-[58px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white text-balance">
              {title}
            </h1>

            {/* Lede / Subtitle */}
            {lede && (
              <p className="mt-4 text-base sm:text-lg lg:text-[19px] leading-relaxed text-white/85 max-w-[680px] font-normal">
                {lede}
              </p>
            )}

            {/* Facts List */}
            {facts && facts.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {facts.map((fact, idx) => (
                  <li
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-[13px] font-bold text-white shadow-xs"
                  >
                    {fact}
                  </li>
                ))}
              </ul>
            )}

            {/* Hero Action Buttons */}
            {actions && (
              <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                {actions}
              </div>
            )}

            {children}
          </div>

          {/* Right Image (Split Hero) */}
          {rightImage && (
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="relative w-full max-w-[340px] aspect-[4/4.4] rounded-[24px] overflow-hidden shadow-2xl border-2 border-white/20 bg-white/10">
                <Image
                  src={rightImage.src}
                  alt={rightImage.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 340px"
                  className="object-cover object-top"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


