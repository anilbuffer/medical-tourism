'use client';

import React from 'react';
import HeroSlideshow, { HeroSlide, Market, HeroSlideshowProps } from './HeroSlideshow';
import { useConsultation, useCountry } from '@/components/providers/AppProviders';

export interface HeroSectionProps extends Partial<HeroSlideshowProps> {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation: propOnOpenConsultation,
  showHeader = false,
  slides,
  markets,
  slideDuration = 3500,
  rotatingLines,
  primaryCta,
  secondaryCta,
  nextSectionId = 'find-your-treatment',
  ...restProps
}) => {
  const { openConsultation } = useConsultation();
  const { selectedCountry } = useCountry();
  const handleOpenConsultation = propOnOpenConsultation || openConsultation;

  return (
    <HeroSlideshow
      showHeader={showHeader}
      slides={slides}
      markets={markets}
      slideDuration={slideDuration}
      rotatingLines={rotatingLines}
      onOpenConsultation={handleOpenConsultation}
      defaultMarketCode={selectedCountry?.code || 'SA'}
      primaryCta={{
        label: primaryCta?.label || 'Book a free consultation',
        onClick: primaryCta?.onClick || handleOpenConsultation,
        href: primaryCta?.href || '#consultation',
      }}
      secondaryCta={{
        label: secondaryCta?.label || 'How it works',
        onClick: secondaryCta?.onClick,
        href: secondaryCta?.href || '#how-it-works',
      }}
      nextSectionId={nextSectionId}
      {...restProps}
    />
  );
};

export default HeroSection;
