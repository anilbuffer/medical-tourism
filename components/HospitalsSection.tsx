'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { HOSPITALS_SECTION } from '@/data/originalData';

interface HospitalsSectionProps {
  onOpenConsultation?: (hospitalName?: string) => void;
}

export const HospitalsSection: React.FC<HospitalsSectionProps> = ({ onOpenConsultation }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(1200);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Mouse drag navigation state
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState<number>(0);
  const hasDraggedRef = useRef<boolean>(false);

  const prevOffsetsRef = useRef<{ [id: string]: number }>({});
  const touchStartXRef = useRef<number | null>(null);

  const filteredCards = selectedCountry === 'all'
    ? HOSPITALS_SECTION.cards
    : HOSPITALS_SECTION.cards.filter(c => c.country === selectedCountry);

  const total = filteredCards.length;

  // Window resize listener for responsive overlap math
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Circular navigation functions (never ends)
  const scrollNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const scrollPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay with hover/drag pause
  useEffect(() => {
    if (isHovered || isMouseDown || total <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total, isHovered, isMouseDown]);

  // Touch Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchStartXRef.current - touchEndX;
    if (distance > 40) {
      scrollNext();
    } else if (distance < -40) {
      scrollPrev();
    }
    touchStartXRef.current = null;
  };

  // Mouse Drag handlers (enables moving between items with the mouse)
  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setDragStartX(e.clientX);
    setDragDeltaX(0);
    hasDraggedRef.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || dragStartX === null) return;
    const delta = e.clientX - dragStartX;
    setDragDeltaX(delta);
    if (Math.abs(delta) > 8) {
      hasDraggedRef.current = true;
    }
  };

  const onMouseUp = () => {
    if (isMouseDown && dragStartX !== null) {
      if (dragDeltaX < -45) {
        scrollNext();
      } else if (dragDeltaX > 45) {
        scrollPrev();
      }
    }
    setIsMouseDown(false);
    setDragStartX(null);
    setDragDeltaX(0);
  };

  const onMouseLeaveStage = () => {
    if (isMouseDown) {
      onMouseUp();
    }
    setIsHovered(false);
  };

  // Compute 3D stage properties for each card offset
  const getCardStyle = (offset: number) => {
    const isMobile = windowWidth < 640;
    const isTablet = windowWidth >= 640 && windowWidth < 1024;

    // Tight horizontal steps that guarantee overlap (negative gap)
    let x = 0;
    if (isMobile) {
      x = Math.round(offset * 115);
    } else if (isTablet) {
      x = Math.round(offset * 170);
    } else {
      x = Math.round(offset * 225);
    }

    const isActive = offset === 0;
    const absOffset = Math.abs(offset);

    // Stacking order: Active center is in front (z: 50), immediate neighbors tuck behind (z: 38), outer tuck behind them (z: 28)
    const zIndex = isActive ? 50 : Math.max(10, 38 - absOffset * 10);
    const scale = isActive ? 1 : Math.max(0.76, 0.88 - (absOffset - 1) * 0.08);
    const rotateY = isActive ? 0 : offset < 0 ? 18 + (absOffset - 1) * 5 : -18 - (absOffset - 1) * 5;
    // Active card sits at translateZ 0 to avoid 3D perspective texture magnification blur
    const translateZ = isActive ? 0 : -50 - (absOffset - 1) * 40;

    // ALL images (both in focus and non-focus) are visible clearly at 100% opacity
    const opacity = 1;

    return {
      x,
      zIndex,
      scale,
      rotateY,
      translateZ,
      opacity,
    };
  };

  const activeHospital = filteredCards[activeIndex] || filteredCards[0];

  return (
    <section id="hospitals" className="py-20 lg:py-28 bg-surface-base overflow-hidden">
      
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
              {HOSPITALS_SECTION.headingLine1}{" "}
              <span 
                className="px-2.5 py-0.5 rounded-xl inline-block font-medium"
                style={{
                  backgroundColor: 'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
                  color: 'var(--color-primary)',
                }}
              >
                {HOSPITALS_SECTION.headingLine2}
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-6 text-medium font-normal max-w-xl">
              {HOSPITALS_SECTION.subtitle} JCI & NABH accredited premier institutions featuring robotic surgical suites and dedicated international patient care.
            </p>
          </div>

          {/* Right Controls: Country Tabs & View All */}
          <div className="flex items-center gap-2.5 flex-wrap self-start md:self-end">
            <Link
              href="/hospitals"
              className="h-[38px] px-4 rounded-full text-sm font-semibold inline-flex items-center justify-center transition-all border border-gray-300 hover:border-gray-900 text-gray-800 hover:text-gray-950 bg-white shadow-2xs"
            >
              View all &rarr;
            </Link>
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-full border border-gray-200 flex-shrink-0">
              {HOSPITALS_SECTION.countries.map(c => {
              const isSelected = selectedCountry === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCountry(c.id);
                    setActiveIndex(0);
                  }}
                  type="button"
                  className={`h-[38px] px-5 rounded-full text-sm sm:text-base font-medium inline-flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'shadow-sm text-white'
                      : 'text-gray-700 hover:text-gray-950'
                  }`}
                  style={{
                    backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
                  }}
                >
                  {c.label}
                </button>
              );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3D Overlapping Circular Stage with Mouse Drag & Touch Support */}
      <div 
        className="w-full relative py-6 select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={onMouseLeaveStage}
      >
        <div 
          className={`relative w-full h-[500px] sm:h-[540px] md:h-[580px] flex items-center justify-center overflow-hidden transition-cursor ${
            isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ perspective: '1600px' }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          {filteredCards.map((hospital, idx) => {
            // Circular offset around activeIndex
            let offset = idx - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isActive = offset === 0;
            const style = getCardStyle(offset);

            // Real-time tracking during mouse drag (rounded to nearest integer pixel to prevent subpixel antialiasing blur)
            const animatedX = Math.round(style.x + (isMouseDown ? dragDeltaX * 0.25 : 0));

            // Avoid long cross-screen animations when items wrap across the far edges
            const prevOffset = prevOffsetsRef.current[hospital.id];
            const isWrapping = 
              (prevOffset !== undefined && Math.abs(prevOffset - offset) > 2);
            prevOffsetsRef.current[hospital.id] = offset;

            return (
              <motion.div
                key={hospital.id}
                animate={{
                  x: animatedX,
                  scale: style.scale,
                  rotateY: style.rotateY,
                  z: style.translateZ,
                  opacity: style.opacity,
                }}
                transition={
                  isWrapping
                    ? { duration: 0 }
                    : isMouseDown
                    ? { duration: 0.05, ease: 'linear' }
                    : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
                }
                style={{
                  zIndex: style.zIndex,
                  transformStyle: 'flat',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
                onClick={(e) => {
                  if (hasDraggedRef.current) {
                    e.preventDefault();
                    return;
                  }
                  if (!isActive) {
                    setActiveIndex(idx);
                  } else if (onOpenConsultation) {
                    onOpenConsultation(hospital.name);
                  }
                }}
                className={`absolute w-[290px] sm:w-[350px] md:w-[400px] lg:w-[430px] h-[470px] sm:h-[510px] md:h-[540px] rounded-[28px] sm:rounded-[32px] overflow-hidden cursor-pointer flex flex-col justify-between bg-white ${
                  isActive 
                    ? 'border-2 border-gray-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22)]' 
                    : 'border border-gray-200/90 shadow-xl'
                }`}
              >
                {/* Top Image Section (Image is NOT full height, zero blur, 100% clearly visible) */}
                <div className="relative w-full h-[320px] sm:h-[355px] md:h-[380px] overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={hospital.image.src}
                    alt={hospital.name}
                    fill
                    draggable={false}
                    className="object-cover pointer-events-none transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 290px, (max-width: 1024px) 400px, 430px"
                    priority={isActive}
                  />

                  {/* Subtle top vignette for badge readability */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

                  {/* Top Bar: Badge & Counter (Active Card Only) */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between w-full pointer-events-none transition-opacity duration-300">
                    {isActive && hospital.badge ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide bg-black/60 text-white border border-white/20 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8bd2ea] animate-pulse" />
                        {hospital.badge}
                      </span>
                    ) : <span />}

                    {isActive && (
                      <span className="bg-black/50 text-white/90 border border-white/15 px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider shadow-sm">
                        {idx + 1} / {total}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dedicated Bottom Text Section (White background, maximum legibility and crisp subpixel antialiasing) */}
                <div 
                  className="relative z-10 h-[150px] sm:h-[155px] md:h-[160px] bg-white border-t border-gray-100 p-5 sm:p-6 flex flex-col justify-center shrink-0 subpixel-antialiased"
                  style={{
                    WebkitFontSmoothing: 'subpixel-antialiased',
                    MozOsxFontSmoothing: 'auto',
                    textRendering: 'optimizeLegibility',
                  }}
                >
                  {isActive ? (
                    <>
                      <h3 
                        className="text-xl sm:text-2xl font-bold tracking-tight leading-snug line-clamp-1" 
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {hospital.name}
                      </h3>

                      <p 
                        className="mt-2 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2"
                        style={{ color: '#374151' }}
                      >
                        {hospital.description}
                      </p>

                      {hospital.location && (
                        <div className="mt-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                            <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span>{hospital.location}</span>
                          </div>
                          {hospital.href && (
                            <Link
                              href={hospital.href}
                              className="text-xs font-bold hover:underline inline-flex items-center gap-1"
                              style={{ color: 'var(--color-primary)' }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <span>View details</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className={offset < 0 ? 'pr-20 text-left' : 'pl-20 text-left'}>
                      <h3 
                        className="text-base sm:text-lg font-bold truncate" 
                        style={{ color: 'var(--color-primary)' }}
                      >
                        {hospital.name}
                      </h3>
                      {hospital.location && (
                        <p 
                          className="text-xs font-medium text-gray-600 truncate mt-1.5"
                        >
                          {hospital.location}
                        </p>
                      )}
                    </div>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Floating Bottom Controller (Reference Design) */}
        <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 gap-4">
          <div className="grid grid-cols-[36px_1fr_36px] items-center w-[300px] sm:w-[340px] md:w-[360px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-xl bg-black/60 border border-white/20 shadow-2xl text-white">
            {/* Previous Slide Button (Anchored Left) */}
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous hospital"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer justify-self-start"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Center Thumbnail + Active Hospital Info (Combination centered as a single unit) */}
            {activeHospital && (
              <div 
                className="flex items-center justify-center gap-2.5 px-1 cursor-pointer select-none mx-auto max-w-full min-w-0"
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation(activeHospital.name);
                  }
                }}
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/30 shrink-0">
                  <Image
                    src={activeHospital.image.src}
                    alt={activeHospital.name}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <div className="text-left min-w-0 max-w-[140px] sm:max-w-[190px]">
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate leading-tight">
                    {activeHospital.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-white/60 truncate leading-tight">
                    {activeHospital.location || activeHospital.badge}
                  </p>
                </div>
              </div>
            )}

            {/* Next Slide Button (Anchored Right) */}
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next hospital"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer justify-self-end"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Pagination Dots (Directly beneath controller, matching reference) */}
          {total > 1 && (
            <div className="flex items-center gap-1.5">
              {filteredCards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === activeIndex
                      ? 'w-6 bg-gray-900 shadow-sm'
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
