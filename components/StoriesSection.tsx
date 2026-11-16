'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, ChevronLeft, ChevronRight, X } from 'lucide-react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { STORIES_SECTION } from '@/data/originalData';
import { CountryFlag } from './CountryFlag';

interface StoriesSectionProps {
  onOpenConsultation?: () => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = () => {
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(false);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  // Initialize Embla Carousel with responsive alignments
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      dragFree: false,
      loop: true,
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

  const categories = STORIES_SECTION.categories;
  const cards = STORIES_SECTION.cards;

  const filteredCards = selectedCat === 'all'
    ? cards
    : cards.filter(c => c.category === selectedCat);

  // Ensure enough items (at least 32) so Embla Carousel can loop infinitely without gaps at the right end
  const displayCards = useMemo(() => {
    if (filteredCards.length === 0) return [];
    const repeatCount = Math.ceil(32 / filteredCards.length);
    return Array.from({ length: repeatCount }, () => filteredCards).flat();
  }, [filteredCards]);

  const onSelect = useCallback((api: UseEmblaCarouselType[1]) => {
    if (!api) return;
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    queueMicrotask(() => {
      onSelect(emblaApi);
    });
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect, displayCards]);

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    if (activeVideo) {
      autoplay.stop();
    } else {
      autoplay.reset();
    }
  }, [activeVideo, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      emblaApi.plugins()?.autoplay?.reset();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      emblaApi.plugins()?.autoplay?.reset();
    }
  }, [emblaApi]);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  return (
    <section id="stories" className="py-20 lg:py-28 bg-surface-dim overflow-hidden">
      
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
            <h2 className="text-v2-title font-semibold tracking-[-1px] lg:tracking-[-2px] leading-[40px] lg:leading-[1.1] text-balance text-left" style={{ color: 'var(--color-primary)' }}>
              {STORIES_SECTION.headingLine1}{" "}
              <span 
                className="px-2.5 py-0.5 rounded-xl inline-block font-medium"
                style={{
                  backgroundColor: 'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                  color: 'var(--color-primary)',
                }}
              >
                {STORIES_SECTION.headingLine2}
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-6 text-medium font-normal max-w-xl">
              Watch genuine video testimonials from international patients who travelled to India for world-class medical procedures, specialized surgery, and post-operative wellness.
            </p>
          </div>

          {/* Right Controls: Category Filter Tabs & Carousel Navigation */}
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0 self-start md:self-end">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-full border border-gray-200 overflow-x-auto max-w-full">
              {categories.map(cat => {
                const isSelected = selectedCat === cat.value;
                return (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setSelectedCat(cat.value);
                      if (emblaApi) emblaApi.scrollTo(0);
                    }}
                    className={`h-[38px] px-5 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'shadow-xs text-white'
                        : 'text-gray-700 hover:text-gray-950'
                    }`}
                    style={{
                      backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Carousel Arrow Buttons */}
            <div className="flex items-center gap-2">
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
                aria-label="Previous story"
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
                aria-label="Next story"
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
            {displayCards.map((story, idx) => (
              <div
                key={`${story.id}-${idx}`}
                className="pl-6 min-w-0 flex-[0_0_88%] sm:flex-[0_0_50%] md:flex-[0_0_42%] lg:flex-[0_0_33.333%] xl:flex-[0_0_28%]"
              >
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="h-full group rounded-3xl overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between select-none"
                  style={{ borderColor: 'var(--color-surface-outline)' }}
                >
                  {/* Poster / Video Section with Increased Height */}
                  <div 
                    className="relative h-[380px] sm:h-[420px] md:h-[460px] lg:h-[480px] w-full bg-gray-100 overflow-hidden cursor-pointer"
                    onClick={() => setActiveVideo({ url: story.videoUrl, title: `${story.name} — ${story.treatment}` })}
                  >
                    <Image
                      src={story.poster.src}
                      alt={story.name}
                      fill
                      draggable={false}
                      className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 28vw"
                    />
                    
                    {/* Dark gradient scrims */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

                    {/* Country Flags & Route Pill */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold border border-white/10 shadow-md pointer-events-none">
                      <CountryFlag code={story.originFlagCode} />
                      <span>{story.originCountry}</span>
                      <span className="text-white/50 text-[10px]">➔</span>
                      <CountryFlag code={story.destinationFlagCode} />
                      <span>{story.destinationCountry}</span>
                    </div>

                    {/* Video Duration Pill (if available) */}
                    {story.videoDuration && (
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-semibold border border-white/10 pointer-events-none">
                        {story.videoDuration}
                      </div>
                    )}

                    {/* Play Button Overlay with Micro-Interactions */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform"
                        style={{
                          backgroundColor: 'var(--color-secondary)',
                          color: 'var(--color-primary)',
                        }}
                      >
                        <Play className="w-7 h-7 fill-current ml-1" />
                      </motion.div>
                    </div>

                    {/* Patient Name & Treatment Tag at bottom of Video Part */}
                    <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                      <span 
                        className="inline-block px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider mb-1.5"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }}
                      >
                        {story.treatment}
                      </span>
                      <h3 className="line-clamp-1 text-xl sm:text-2xl font-medium tracking-tight text-white">
                        {story.name}
                      </h3>
                    </div>
                  </div>

                  {/* Patient Quote & Rating Section */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <p className="text-xs sm:text-sm leading-relaxed font-normal text-gray-700 italic">
                      {story.quote}
                    </p>

                    <div className="mt-5 pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--color-surface-outline)' }}>
                      <div className="flex items-center gap-1" style={{ color: 'var(--color-secondary)' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="font-semibold flex items-center gap-1.5 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
                        Verified Patient
                      </span>
                    </div>
                  </div>

                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Video Modal Player with AnimatePresence */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800 text-white">
                <span className="text-sm font-bold truncate max-w-lg">{activeVideo.title}</span>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative pt-[56.25%] w-full bg-zinc-950">
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.url)}
                  title={activeVideo.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
