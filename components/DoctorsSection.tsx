'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Stethoscope, Sparkles, User } from 'lucide-react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { DOCTORS_SECTION, DoctorMember } from '@/data/originalData';

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
      : allMembers.filter((m: DoctorMember) => m.type === selectedCategory);
  }, [allMembers, selectedCategory]);

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
  }, [emblaApi, onSelect, filteredMembers]);

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
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b" 
          style={{ borderColor: 'var(--color-surface-outline)' }}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Clinical Excellence</span>
            </div>
            <h2 className="text-v2-title font-semibold tracking-[-1px] lg:tracking-[-2px] leading-[40px] lg:leading-[1.1] text-balance text-left" style={{ color: 'var(--color-primary)' }}>
              {DOCTORS_SECTION.headingLine1}{" "}
              <span 
                className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
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

          {/* Right Controls: View All, Category Filter Tabs & Carousel Navigation */}
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0 self-start md:self-end">
            <Link
              href="/doctors"
              className="h-[38px] px-4 rounded-full text-sm font-semibold inline-flex items-center justify-center transition-all border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-gray-950 bg-white shadow-2xs"
            >
              View all &rarr;
            </Link>

            {/* Category Filter Tabs (shown if multiple categories exist) */}
            {categories.length > 1 && (
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-full border border-gray-200 overflow-x-auto max-w-full">
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
                      className={`h-[38px] px-5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
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
            )}

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
        </motion.div>
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
          <div className="flex -ml-6 touch-pan-y">
            {filteredMembers.map((member: DoctorMember, idx: number) => {
              const isDoctor = member.type === 'doctor';
              const CardContent = (
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="h-full group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-start select-none"
                  style={{ borderColor: 'var(--color-surface-outline)' }}
                >
                  {/* Photo Section */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-gray-100">
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

                    {/* Doctor Name on Photo at Bottom Left */}
                    <div className="absolute inset-x-0 bottom-0 pt-16 pb-3.5 px-4 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none">
                      <span className="text-white text-lg sm:text-xl font-bold drop-shadow-sm block leading-tight">
                        {member.name}
                      </span>
                    </div>
                  </div>

                  {/* Doctor Info Below Image: Description & Experience */}
                  <div className="p-4 sm:p-5 flex flex-col items-start gap-2 bg-white">
                    <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">
                      {member.role}
                    </p>

                    <div className="mt-auto">
                      <span className="inline-block px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs">
                        {member.department || (member.years ? `${member.years} Experience` : member.groupLabel)}
                      </span>
                    </div>
                  </div>

                </motion.div>
              );

              return (
                <div
                  key={`${member.slug || member.name}-${idx}`}
                  className="pl-6 min-w-0 flex-[0_0_88%] sm:flex-[0_0_52%] md:flex-[0_0_38%] lg:flex-[0_0_30%] xl:flex-[0_0_26%]"
                >
                  {isDoctor && member.slug ? (
                    <Link href={`/doctors/${member.slug}`} className="block h-full">
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

    </section>
  );
};
