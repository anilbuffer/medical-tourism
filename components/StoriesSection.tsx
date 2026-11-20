'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, X, CheckCircle2 } from 'lucide-react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { STORIES_SECTION } from '@/data/storiesData';
import { CountryFlag } from './CountryFlag';

interface StoriesSectionProps {
  onOpenConsultation?: () => void;
}

export const StoriesSection: React.FC<StoriesSectionProps> = () => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  // Initialize Embla Carousel with one-directional navigation (loop: false, matching DoctorsSection)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      dragFree: false,
      loop: false,
      duration: 30,
    },
    [
      Autoplay({
        delay: 4500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const displayCards = STORIES_SECTION.cards;

  // Single direction selection callback matching DoctorsSection
  const onSelect = useCallback((api: UseEmblaCarouselType[1]) => {
    if (!api) return;
    const canScroll = api.scrollSnapList().length > 1;
    // Single direction: Previous is disabled at the start (index 0) or when there is nowhere to scroll back
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

  // Scroll Previous: only goes backward when possible, CANNOT go to last item from start
  const scrollPrev = useCallback(() => {
    if (emblaApi && emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev();
      emblaApi.plugins()?.autoplay?.reset();
    }
  }, [emblaApi]);

  // Scroll Next: advances in one direction, cycles to start from the end
  const scrollNext = useCallback(() => {
    if (emblaApi) {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        // Complete cycle -> restart from starting point
        emblaApi.scrollTo(0);
      }
      emblaApi.plugins()?.autoplay?.reset();
    }
  }, [emblaApi]);

  const isDirectVideo = (url: string) => {
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('/testimonials/videos/');
  };

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Patient Stories & Video Testimonials</span>
            </div>
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
              Watch genuine video testimonials from international travellers who chose India for world-class dental care.
            </p>
          </div>

          {/* Slider Navigation Arrows (One-directional matching DoctorsSection) */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-end">
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
            {displayCards.map((story) => (
              <div
                key={story.id}
                className="pl-6 min-w-0 flex-[0_0_88%] sm:flex-[0_0_50%] md:flex-[0_0_42%] lg:flex-[0_0_33.333%] xl:flex-[0_0_28%]"
              >
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => setActiveVideo({ url: story.videoUrl, title: `${story.treatment} — Patient Story` })}
                  className="relative h-[420px] sm:h-[460px] md:h-[500px] lg:h-[520px] w-full group rounded-3xl overflow-hidden border bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 select-none cursor-pointer"
                  style={{ borderColor: 'var(--color-surface-outline)' }}
                >
                  <Image
                    src={story.poster.src}
                    alt={`${story.treatment} patient video testimonial`}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 28vw"
                  />
                  
                  {/* Subtle top/bottom gradient scrims for pills and depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/35 pointer-events-none" />

                  {/* Country Flag Pill (Only show the flag of the testimonial) */}
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-semibold border border-white/10 shadow-md pointer-events-none">
                    <CountryFlag code={story.originFlagCode} />
                    <span>{story.originCountry}</span>
                  </div>

                  {/* Video Duration Pill */}
                  {story.videoDuration && (
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-semibold border border-white/10 pointer-events-none">
                      {story.videoDuration}
                    </div>
                  )}

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`relative w-full ${
                isDirectVideo(activeVideo.url) ? 'max-w-md sm:max-w-lg' : 'max-w-4xl'
              } bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/20`}
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

              {isDirectVideo(activeVideo.url) ? (
                <div className="relative w-full bg-black flex items-center justify-center p-0">
                  <video
                    src={activeVideo.url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full max-h-[75vh] object-contain bg-black"
                  />
                </div>
              ) : (
                <div className="relative pt-[56.25%] w-full bg-zinc-950">
                  <iframe
                    src={getYouTubeEmbedUrl(activeVideo.url)}
                    title={activeVideo.title}
                    className="absolute inset-0 w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
