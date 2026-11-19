'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Award, 
  MapPin, 
  Mountain, 
  Headphones, 
  Plane, 
  Video 
} from 'lucide-react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface ServiceCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  iconBg: string;
  imageSrc: string;
  imageAlt: string;
  tilt: number; // Resting tilt in degrees
}

const SERVICE_CARDS: ServiceCardData[] = [
  {
    id: 'senior-specialists',
    title: 'Senior Specialists',
    category: 'Clinical Excellence',
    description: 'Surgeons with decades in practice, matched to your procedure before you travel.',
    badge: "25+ Years' Experience",
    icon: Award,
    iconBg: 'bg-[#059669]',
    imageSrc: '/images/why-choose-us/specialists.jpg',
    imageAlt: 'Surgeons performing a procedure in an operating theatre',
    tilt: -4.5,
  },
  {
    id: 'why-chandigarh',
    title: 'Why Chandigarh',
    category: 'Calm, Planned City',
    description: 'Quieter than the big metros. Hospital, hotel and airport are all a short drive apart.',
    badge: 'Fewer Crowds, Less Stress',
    icon: MapPin,
    iconBg: 'bg-[#2563eb]',
    imageSrc: '/images/why-choose-us/chandigarh.jpg',
    imageAlt: 'Tree-lined road in Chandigarh',
    tilt: -2,
  },
  {
    id: 'recovery-hills',
    title: 'Recovery in the Hills',
    category: 'Optional Retreat',
    description: 'Once your doctor clears you, recover in fresh mountain air before your flight home.',
    badge: 'About 2 Hours Away',
    icon: Mountain,
    iconBg: 'bg-[#059669]',
    imageSrc: '/images/why-choose-us/hills.jpg',
    imageAlt: 'View of green hills and valley',
    tilt: -0.5,
  },
  {
    id: 'care-coordinator',
    title: 'Your Care Coordinator',
    category: 'Personal Support',
    description: 'One person handles your appointments, paperwork and day-to-day questions.',
    badge: 'One Point of Contact',
    icon: Headphones,
    iconBg: 'bg-[#ca8a04]',
    imageSrc: '/images/why-choose-us/coordinator.jpg',
    imageAlt: 'Care coordinator wearing a headset',
    tilt: 1,
  },
  {
    id: 'visa-arrival',
    title: 'Visa & Arrival Support',
    category: 'Door-to-Door',
    description: 'Help with your medical visa letter, then pickup and transfer once you land.',
    badge: 'Airport Pickup Arranged',
    icon: Plane,
    iconBg: 'bg-[#2563eb]',
    imageSrc: '/images/why-choose-us/arrival.jpg',
    imageAlt: 'Airport arrival hall',
    tilt: 3,
  },
  {
    id: 'follow-up-care',
    title: 'Care After You Fly Home',
    category: 'Follow-Up Included',
    description: "Follow-up calls with your doctor once you're home, so you're never left on your own.",
    badge: 'Video Follow-Ups',
    icon: Video,
    iconBg: 'bg-[#0b383e]',
    imageSrc: '/images/why-choose-us/followup.jpg',
    imageAlt: 'Doctor on a video follow-up call with a patient',
    tilt: 5,
  },
];

export const CareServicesSection: React.FC = () => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Initialize Embla Carousel with responsive alignments & Autoplay matching project conventions
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      loop: false,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const onSelect = useCallback((api: UseEmblaCarouselType[1]) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    queueMicrotask(() => {
      onSelect(emblaApi);
    });
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section 
      id="care-services" 
      className="relative py-20 sm:py-24 lg:py-28 bg-[#fafcfb] overflow-hidden select-none"
    >
      <div id="services" className="absolute -top-32" aria-hidden="true" />
      {/* Soft Ambient Radial Background Glows */}
      <div 
        aria-hidden="true" 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-emerald-100/35 rounded-full blur-[120px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-24 -left-20 w-[450px] h-[450px] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-24 -right-20 w-[500px] h-[450px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none" 
      />

      {/* Top Header Content Area: Restored to original site typography */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Main Heading with original typography and signature blue accent */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="v2-services-heading text-[39px] lg:text-[72px] font-semibold tracking-[-1.5px] lg:tracking-[-1.75px] leading-[1.1] lg:leading-none text-balance"
          style={{ color: 'var(--color-primary)' }}
        >
          Every part of your trip,{" "}
          <span 
            className="px-2.5 py-0.5 rounded-xl inline-block font-semibold"
            style={{
              backgroundColor: 'var(--color-heading-highlight, rgba(139, 210, 234, 0.25))',
              color: 'var(--color-primary)',
            }}
          >
            handled
          </span>
        </motion.h2>

        {/* Subtitle with clean muted gray typography */}
        <motion.p 
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-base leading-6 text-medium font-normal max-w-xl mx-auto"
        >
          The small things that make you feel looked after, far from home.
        </motion.p>
      </div>

      {/* Hanging Wire & Embla Carousel Section */}
      <div className="relative mt-14 sm:mt-18 w-full">

        {/* THE ONLY SUSPENSION WIRE (Single continuous line spanning edge-to-edge) */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-slate-300/90 shadow-[0_1px_2px_rgba(0,0,0,0.06)] pointer-events-none z-10" 
          style={{ top: '34px' }}
        />

        {/* Floating Carousel Navigation Buttons */}
        <div className="max-w-7xl mx-auto px-4 relative">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            aria-label="Previous service"
            className={`absolute left-2 sm:left-4 top-[54%] -translate-y-1/2 z-40 w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.12)] backdrop-blur-md ${
              !prevBtnDisabled
                ? 'border-slate-200 bg-white/95 text-slate-800 hover:scale-105 active:scale-95 hover:bg-white'
                : 'border-slate-200/60 bg-white/50 text-slate-300 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            aria-label="Next service"
            className={`absolute right-2 sm:right-4 top-[54%] -translate-y-1/2 z-40 w-11 h-11 rounded-full flex items-center justify-center border transition-all cursor-pointer shadow-[0_6px_20px_rgba(0,0,0,0.12)] backdrop-blur-md ${
              !nextBtnDisabled
                ? 'border-slate-200 bg-white/95 text-slate-800 hover:scale-105 active:scale-95 hover:bg-white'
                : 'border-slate-200/60 bg-white/50 text-slate-300 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Embla Viewport (Matching DoctorsSection / HospitalsSection pattern) */}
        <div 
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing px-4 sm:px-6 lg:px-8 xl:px-[calc((100vw-86rem)/2+2rem)] pt-4 pb-4"
          ref={emblaRef}
        >
          {/* Embla Container */}
          <div className="flex -ml-6 touch-pan-y items-start">
            {SERVICE_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="pl-6 min-w-0 flex-[0_0_86%] sm:flex-[0_0_50%] md:flex-[0_0_36%] lg:flex-[0_0_28%] xl:flex-[0_0_24%] relative pb-6"
                >
                  {/* Green Pin Clip clamped directly over the wire and into the card */}
                  <div 
                    className="absolute top-[7px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none drop-shadow-md"
                    style={{ transform: `translateX(-50%) rotate(${card.tilt * 0.4}deg)` }}
                  >
                    {/* Clip Body */}
                    <div className="w-6 h-9 rounded-md bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 shadow-[0_3px_6px_rgba(0,0,0,0.22)] flex flex-col items-center justify-between p-1 border border-emerald-400/40">
                      {/* Circular Eyelet Hole where the suspension wire threads through */}
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-100 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] border border-black/15 mt-0.5 flex items-center justify-center overflow-hidden">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300/80" />
                      </div>
                      {/* Horizontal clamp notch */}
                      <div className="w-full h-[1.5px] bg-emerald-700/60 shadow-[0_1px_0_rgba(255,255,255,0.3)] mb-0.5" />
                    </div>
                    {/* Shadow cast by clip onto card bezel */}
                    <div className="w-5 h-1.5 bg-black/15 rounded-full blur-[1px] -mt-0.5" />
                  </div>

                  {/* Hanging Polaroid Card Component */}
                  <motion.div
                    style={{ transformOrigin: 'top center' }}
                    initial={{ opacity: 0, y: 25, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: card.tilt }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 90, 
                      damping: 14, 
                      delay: 0.08 + index * 0.06 
                    }}
                    animate={{
                      rotate: [card.tilt, card.tilt - 0.75, card.tilt + 0.75, card.tilt],
                      transition: {
                        duration: 5.5 + (index % 3),
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }
                    }}
                    whileHover={{ 
                      rotate: 0, 
                      y: -8, 
                      scale: 1.03,
                      transition: { duration: 0.25, ease: 'easeOut' }
                    }}
                    className="relative mt-[18px] bg-white rounded-[26px] p-3.5 sm:p-4 border border-slate-200/80 shadow-[0_16px_36px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.03)] hover:shadow-[0_26px_56px_rgba(15,23,42,0.16),0_6px_16px_rgba(15,23,42,0.06)] transition-all duration-300 select-none group cursor-pointer"
                  >
                    {/* Inner Photo Frame */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        draggable={false}
                        className="object-cover transition-transform duration-600 ease-out group-hover:scale-108 pointer-events-none"
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 24vw"
                      />

                      {/* Photo gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

                      {/* Top-Right Category Pill Badge */}
                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-white/60 pointer-events-none">
                        <div className={`w-2 h-2 rounded-full ${card.iconBg}`} />
                        <span className="text-[11px] font-semibold text-slate-800 tracking-tight">
                          {card.category}
                        </span>
                      </div>

                      {/* Bottom-Left Feature Tag */}
                      <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
                        <span className="inline-block px-2.5 py-0.5 rounded-md bg-black/65 backdrop-blur-md text-[10px] font-medium text-white tracking-wide">
                          {card.badge}
                        </span>
                      </div>
                    </div>

                    {/* Text Area */}
                    <div className="pt-3.5 pb-1 px-1">
                      {/* Header Row: Title & Category Icon */}
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight leading-snug group-hover:text-emerald-600 transition-colors duration-200">
                          {card.title}
                        </h3>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${card.iconBg} flex-shrink-0 shadow-xs`}>
                          <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* Short Description */}
                      <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-1.5 mt-4 sm:mt-6">
          {SERVICE_CARDS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => emblaApi?.scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === idx 
                  ? 'w-6 bg-emerald-500' 
                  : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};
