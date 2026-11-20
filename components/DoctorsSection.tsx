'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Stethoscope, Sparkles, User, HeartPulse, Smile, Scissors, Flower2, Eye, Building2 } from 'lucide-react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DOCTORS_SECTION, DoctorMember } from '@/data/doctorsData';

const HOSPITAL_LABELS: Record<string, string> = {
  'ace-heart-institute': 'ACE Heart Institute',
  'fortis-mohali': 'Fortis Hospital',
  'max-super-speciality-mohali': 'Max Super Speciality',
  'landmark-chandigarh': 'Landmark Hospital',
  'livasa-mohali': 'Livasa Hospital',
};

const formatExperience = (years: string | null | undefined): string => {
  if (!years) return 'Senior Specialist';
  const cleanYears = years.trim();
  if (/experience/i.test(cleanYears)) return cleanYears;
  if (/years?/i.test(cleanYears)) return `${cleanYears} Experience`;
  return `${cleanYears} Years Experience`;
};

export const DoctorsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);

  // Initialize Embla Carousel with responsive alignments
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      dragFree: false,
      loop: false,
      duration: 30,
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const categories = DOCTORS_SECTION.categories;
  const allMembers = DOCTORS_SECTION.members;

  const filteredMembers = useMemo(() => {
    return selectedCategory === 'all'
      ? allMembers
      : allMembers.filter((m: DoctorMember) => m.group === selectedCategory || m.type === selectedCategory);
  }, [allMembers, selectedCategory]);

  // Featured doctors for homepage (limit to 8 to avoid DOM bloat while keeping carousel responsive)
  const displayMembers = useMemo(() => {
    return filteredMembers.slice(0, 8);
  }, [filteredMembers]);

  const onSelect = useCallback((api: UseEmblaCarouselType[1]) => {
    if (!api) return;
    const canScroll = api.scrollSnapList().length > 1;
    // Single direction: Previous is disabled at the start (index 0) or when there is nowhere to scroll
    setPrevBtnDisabled(!canScroll || !api.canScrollPrev());
    // Next: enabled when scrolling is needed (cycles to start from the end); disabled when all items fit
    setNextBtnDisabled(!canScroll);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    queueMicrotask(() => {
      onSelect(emblaApi);
    });
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('resize', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('resize', onSelect);
    };
  }, [emblaApi, onSelect, displayMembers]);

  const scrollPrev = useCallback(() => {
    if (emblaApi && emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
      emblaApi.plugins()?.autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        // Complete first cycle -> restart from starting point
        emblaApi.scrollTo(0);
      }
      emblaApi.plugins()?.autoplay?.reset();
    }
  }, [emblaApi]);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'ortho':
        return <Stethoscope className="w-3.5 h-3.5" />;
      case 'cardiac':
        return <HeartPulse className="w-3.5 h-3.5" />;
      case 'dental':
        return <Smile className="w-3.5 h-3.5" />;
      case 'cosmetic':
        return <Scissors className="w-3.5 h-3.5" />;
      case 'fertility':
        return <Flower2 className="w-3.5 h-3.5" />;
      case 'eye':
        return <Eye className="w-3.5 h-3.5" />;
      case 'doctor':
      case 'Doctors':
        return <Stethoscope className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="doctors" className="py-20 lg:py-28 bg-surface-base overflow-hidden border-t border-gray-100">
      
      {/* Top Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="pb-6 border-b" 
          style={{ borderColor: 'var(--color-surface-outline)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Clinical Excellence</span>
              </div>
              <h2 className="text-v2-title font-semibold tracking-[-1px] lg:tracking-[-2px] leading-[40px] lg:leading-[1.1] text-balance text-left" style={{ color: 'var(--color-primary)' }}>
                {DOCTORS_SECTION.headingLine1}{" "}
                <span 
                  className="px-2.5 py-0.5 rounded-xl inline-block font-semibold whitespace-nowrap"
                  style={{
                    backgroundColor: 'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                    color: 'var(--color-primary)',
                  }}
                >
                  {DOCTORS_SECTION.headingLine2}
                </span>
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-6 text-medium font-normal max-w-xl">
                {DOCTORS_SECTION.subtitle}
              </p>
            </div>

            {/* Right Controls: View All & Carousel Navigation */}
            <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
              <Link
                href="/doctors"
                className="h-[40px] px-5 rounded-full text-sm font-semibold inline-flex items-center justify-center transition-all border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-gray-950 bg-white shadow-2xs hover:shadow-xs"
              >
                View all &rarr;
              </Link>

              {/* Carousel Previous / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <motion.button
                  type="button"
                  onClick={scrollPrev}
                  disabled={prevBtnDisabled}
                  whileHover={!prevBtnDisabled ? { scale: 1.08 } : {}}
                  whileTap={!prevBtnDisabled ? { scale: 0.95 } : {}}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    !prevBtnDisabled
                      ? 'border-gray-300 bg-white text-gray-900 shadow-xs hover:border-gray-900 hover:bg-gray-50'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
                  }`}
                  aria-label="Previous specialist"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <motion.button
                  type="button"
                  onClick={scrollNext}
                  disabled={nextBtnDisabled}
                  whileHover={!nextBtnDisabled ? { scale: 1.08 } : {}}
                  whileTap={!nextBtnDisabled ? { scale: 0.95 } : {}}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    !nextBtnDisabled
                      ? 'border-gray-300 bg-white text-gray-900 shadow-xs hover:border-gray-900 hover:bg-gray-50'
                      : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-40'
                  }`}
                  aria-label="Next specialist"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Tabs Bar (Dedicated Row Below Header) */}
        {categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 flex items-center overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            <div className="inline-flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-full border border-gray-200 shrink-0">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      if (emblaApi) emblaApi.scrollTo(0);
                    }}
                    className={`h-[38px] px-4 sm:px-5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'shadow-xs text-white'
                        : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200/60'
                    }`}
                    style={isSelected ? { backgroundColor: 'var(--color-primary)' } : {}}
                  >
                    {getCategoryIcon(cat.value)}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Full-Width Embla Slider Viewport */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="w-full relative"
      >
        <div 
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing px-4 sm:px-6 lg:px-8 xl:px-[calc((100vw-80rem)/2+2rem)] py-3" 
          ref={emblaRef}
        >
          <div className="flex -ml-6 touch-pan-y items-stretch">
            {displayMembers.map((member: DoctorMember, idx: number) => {
              const isDoctor = member.type === 'doctor';
              const experienceText = formatExperience(member.years);
              const CardContent = (
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="h-full w-full group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between select-none"
                  style={{ borderColor: 'var(--color-surface-outline)' }}
                >
                  {/* Photo Section */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gray-100 shrink-0">
                    {member.img ? (
                      <Image
                        src={member.img}
                        alt={member.name}
                        fill
                        draggable={false}
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                        sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 26vw"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf4f6] via-[#d6edf2] to-[#b8e0ea] group-hover:scale-105 transition-transform duration-700 select-none">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/75 border-2 border-[#8bd2ea]/50 flex items-center justify-center shadow-sm">
                          <User className="w-14 h-14 sm:w-16 sm:h-16 text-[#0b383e]/60 stroke-[1.5]" />
                        </div>
                        {member.initials && (
                          <span className="mt-2 text-xs font-bold tracking-widest text-[#0b383e]/55 uppercase">
                            {member.initials}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Hospital Badge at Top Left */}
                    {member.hospital && (
                      <div className="absolute top-3.5 left-3.5 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                          {HOSPITAL_LABELS[member.hospital] || member.hospital}
                        </span>
                      </div>
                    )}

                    {/* Doctor Name on Photo at Bottom Left */}
                    <div className="absolute inset-x-0 bottom-0 pt-16 pb-3.5 px-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none">
                      <span className="text-white text-lg sm:text-xl font-bold drop-shadow-sm block leading-tight">
                        {member.name}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Info Below Image: Description & Experience */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between items-start gap-3 bg-white w-full border-t border-gray-100">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed line-clamp-2 min-h-[2.5rem] sm:min-h-[2.75rem]">
                      {member.role}
                    </p>

                    <div className="mt-auto w-full pt-1 flex items-center justify-start">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span>{experienceText}</span>
                      </span>
                    </div>
                  </div>

                </motion.div>
              );

              return (
                <div
                  key={`${member.slug || member.name}-${idx}`}
                  className="pl-6 min-w-0 flex-[0_0_88%] sm:flex-[0_0_52%] md:flex-[0_0_38%] lg:flex-[0_0_30%] xl:flex-[0_0_26%] flex flex-col"
                >
                  {isDoctor && member.slug ? (
                    <Link href={`/doctors/${member.slug}`} className="flex flex-col h-full focus:outline-hidden">
                      {CardContent}
                    </Link>
                  ) : (
                    CardContent
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Explore Full Doctors Directory CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-2 sm:p-2.5 sm:pr-6 rounded-2xl sm:rounded-full bg-emerald-50/80 border border-emerald-200/60 shadow-2xs">
          <span className="text-xs sm:text-sm font-medium text-emerald-950 px-3">
            Looking for a specific specialist or second opinion?
          </span>
          <Link
            href="/doctors"
            className="h-[38px] px-5 rounded-full text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-all bg-[#0b383e] hover:bg-[#072529] text-white shadow-xs"
          >
            Explore all 90+ surgeons & specialists &rarr;
          </Link>
        </div>
      </div>

    </section>
  );
};
