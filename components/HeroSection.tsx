'use client';

import React from 'react';
import HeroSlideshow, { HeroSlideshowProps } from './HeroSlideshow';
import { useCountry } from '@/components/providers/AppProviders';

export interface HeroSectionProps extends Partial<HeroSlideshowProps> {
  onOpenConsultation?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
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
  const { selectedCountry } = useCountry();

  return (
    <HeroSlideshow
      showHeader={showHeader}
      slides={slides}
      markets={markets}
      slideDuration={slideDuration}
      rotatingLines={rotatingLines}
      onOpenConsultation={onOpenConsultation}
      defaultMarketCode={selectedCountry?.code || 'SA'}
      primaryCta={{
        label: primaryCta?.label || 'Talk To Us',
        href: primaryCta?.href || '#',
        target: primaryCta?.target,
        rel: primaryCta?.rel,
        onClick: primaryCta?.onClick,
      }}
      secondaryCta={{
        label: secondaryCta?.label || 'How it works',
        href: secondaryCta?.href || '/how-it-works',
        onClick: secondaryCta?.onClick,
      }}
      nextSectionId={nextSectionId}
      {...restProps}
    />
  );
};

export default HeroSection;
