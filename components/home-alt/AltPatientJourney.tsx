"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  MapPin, 
  Users, 
  Quote, 
  CheckCircle2, 
  Compass, 
  Sparkles,
  MousePointer,
  ArrowDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export interface JourneyStep {
  id: number;
  dayLabel: string;
  badgeDay: string;
  phase: "Preparation" | "Travel & Care" | "Recovery";
  title: string;
  description: string;
  feelQuote: string;
  where: string;
  withYou: string;
  image: string;
  iconType: "reports" | "video" | "visa" | "arrive" | "surgery" | "home";
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    dayLabel: "3 wks before",
    badgeDay: "3 WKS BEFORE",
    phase: "Preparation",
    title: "Send your X-rays",
    description:
      "A short form and whatever imaging you have — photographs of paper films are fine. Within a day we tell you what's missing. Within two, a doctor who isn't the one who'd operate has read your file.",
    feelQuote: "Mostly relief that someone is finally looking at it.",
    where: "At home",
    withYou: "Coordinator, by message",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200",
    iconType: "reports",
  },
  {
    id: 2,
    dayLabel: "2 wks before",
    badgeDay: "2 WKS BEFORE",
    phase: "Preparation",
    title: "Meet your surgeon",
    description:
      "A video call before you pay anything and before you book a flight. Bring your family into the room. The written, fixed price is in front of you during the call.",
    feelQuote: "This is the moment most people stop feeling like they're gambling.",
    where: "At home",
    withYou: "Your named surgeon",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    iconType: "video",
  },
  {
    id: 3,
    dayLabel: "10 days before",
    badgeDay: "10 DAYS BEFORE",
    phase: "Preparation",
    title: "Visa & flights",
    description:
      "The invitation letter is issued the day your plan is agreed. We complete the e-Medical Visa with you, arrange your companion's alongside it, and book flights around your surgical date.",
    feelQuote: "The part everyone dreads. It's paperwork, and it's ours.",
    where: "At home",
    withYou: "Coordinator · hospital admissions",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=1200",
    iconType: "visa",
  },
  {
    id: 4,
    dayLabel: "Days 1–2",
    badgeDay: "DAYS 1–2",
    phase: "Travel & Care",
    title: "Arrive & assessment",
    description:
      "Met inside arrivals, not outside the terminal. Nothing clinical on day one. Day two is bloods, imaging and your anaesthetic review — and if anything changes the plan, you hear it in person that day.",
    feelQuote: "Tired, then busy. Busy helps.",
    where: "Delhi → Mohali",
    withYou: "Coordinator, in person",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    iconType: "arrive",
  },
  {
    id: 5,
    dayLabel: "Day 3",
    badgeDay: "DAY 3",
    phase: "Travel & Care",
    title: "Surgery",
    description:
      "Anterior approach, muscle-sparing, around ninety minutes. The implant is named on your quote by brand. Your coordinator waits with whoever came with you and calls anyone at home you've asked us to call.",
    feelQuote: "The day everyone dreads and almost nobody remembers:",
    where: "Partner hospital, Mohali",
    withYou: "Your surgeon · family waiting",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
    iconType: "surgery",
  },
  {
    id: 6,
    dayLabel: "Days 4–14",
    badgeDay: "DAYS 4–14",
    phase: "Recovery",
    title: "Recovery, then home",
    description:
      "Walking the same day, physiotherapy twice daily, then a serviced apartment for the second week. On day twelve, fit-to-fly clearance and the Continuity Pack sent to your own doctor.",
    feelQuote: "That second week is when most people say they stopped worrying.",
    where: "Hospital, then apartment",
    withYou: "Physio daily · coordinator daily",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200",
    iconType: "home",
  },
];

/* Custom Dual-Tone Animated Vector SVG Icon */
const StepVectorIcon = ({ type, active }: { type: JourneyStep["iconType"]; active: boolean }) => {
  const strokeColor = active ? "#2ECDC5" : "#64748B";
  const accentColor = active ? "#F7D070" : "#475569";

  return (
    <svg viewBox="0 0 80 80" className="w-8 h-8 transition-transform duration-300">
      {type === "reports" && (
        <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="20" y="14" width="34" height="46" rx="4" stroke={strokeColor} />
          <path d="M28 26h18M28 34h18M28 42h10" stroke={strokeColor} />
          <circle cx="54" cy="52" r="10" stroke={accentColor} />
          <path d="M54 57v-10M49 52l5-5 5 5" stroke={accentColor} />
        </g>
      )}

      {type === "video" && (
        <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="14" y="18" width="44" height="34" rx="4" stroke={strokeColor} />
          <circle cx="36" cy="32" r="6" stroke={strokeColor} />
          <path d="M26 44c1.5-5 5-7 10-7s8.5 2 10 7" stroke={strokeColor} />
          <circle cx="62" cy="44" r="8" stroke={accentColor} />
          <path d="M56 60c1-6 3.5-9 6-9s5 3 6 9" stroke={accentColor} />
          <path d="M24 58h24M36 52v6" stroke={strokeColor} />
        </g>
      )}

      {type === "visa" && (
        <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <rect x="18" y="14" width="32" height="46" rx="4" stroke={strokeColor} />
          <circle cx="34" cy="30" r="7" stroke={strokeColor} />
          <path d="M27 30h14M34 23c3 4 3 10 0 14" stroke={strokeColor} />
          <circle cx="56" cy="48" r="12" stroke={accentColor} />
          <path d="M50 48l4 4 8-9" stroke={accentColor} />
        </g>
      )}

      {type === "arrive" && (
        <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <circle cx="28" cy="22" r="6" stroke={strokeColor} />
          <path d="M28 28v16M20 34l8-3 8 3M24 60l4-16M32 60l-4-16" stroke={strokeColor} />
          <rect x="40" y="40" width="14" height="18" rx="2" stroke={strokeColor} />
          <path d="M44 40v-4h6v4" stroke={strokeColor} />
          <circle cx="64" cy="22" r="6" stroke={accentColor} />
          <path d="M64 28v14M64 34l8-6M60 56l4-14M68 56l-4-14" stroke={accentColor} />
        </g>
      )}

      {type === "surgery" && (
        <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M30 14h20M40 14v8" stroke={accentColor} />
          <ellipse cx="40" cy="24" rx="12" ry="5" stroke={accentColor} />
          <rect x="16" y="44" width="48" height="10" rx="3" stroke={strokeColor} />
          <circle cx="26" cy="38" r="4.5" stroke={strokeColor} />
          <path d="M22 54v10M58 54v10M30 44h28" stroke={strokeColor} />
        </g>
      )}

      {type === "home" && (
        <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M14 36c10-14 26-20 42-18" stroke={accentColor} />
          <path d="M54 16l9 2-7 6z" fill={accentColor} stroke={accentColor} />
          <path d="M26 62V40l16-12 16 12v22M36 62V48h12v14" stroke={strokeColor} />
          <circle cx="64" cy="34" r="8" stroke={accentColor} />
          <path d="M61 34l2 2 5-5" stroke={accentColor} />
        </g>
      )}
    </svg>
  );
};

export const AltPatientJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { openIntake } = useCare();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Monitor window size for desktop scrollytelling vs mobile carousel
  useEffect(() => {
    const checkViewport = () => {
      const desktop = window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsDesktop(desktop);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Smooth scroll tracking across the whole journey section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  const totalSteps = JOURNEY_STEPS.length;

  // Track active step based on scroll position of the section
  useEffect(() => {
    if (!isDesktop) return;
    
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top; // Relative to viewport
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Measure progress from when top hits top to when bottom hits bottom
      const scrolled = -sectionTop;
      const scrollable = sectionHeight - windowHeight;
      
      if (scrollable > 0) {
        let progress = scrolled / scrollable;
        progress = Math.max(0, Math.min(1, progress));
        
        let step = Math.floor(progress * totalSteps);
        // Slightly tweak threshold so the last step stays active until the very end
        if (progress > 0.99) step = totalSteps - 1;
        if (step >= totalSteps) step = totalSteps - 1;
        
        setActiveStep(step);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSteps, isDesktop]);

  // Click on a timeline milestone to scroll smoothly to that chapter or change step on mobile
  const handleScrollToStep = (index: number) => {
    if (isDesktop && sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollable = sectionHeight - window.innerHeight;
      
      // Calculate target scroll position based on index / totalSteps
      const progress = (index + 0.1) / totalSteps;
      const targetScroll = sectionTop + (progress * scrollable);
      
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      // On mobile, just change the active step without scrolling the page
      setActiveStep(index);
    }
  };

  return (
    <div
      ref={sectionRef}
      id="journey"
      className="relative w-full bg-gradient-to-b from-[#03081E] via-[#081B44] to-[#040E2A] text-white border-t border-cyan-500/20"
    >
      {/* Dynamic Ambient Aurora Glows */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-vedara-cyan/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-vedara-blue/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/3 w-[600px] h-[600px] bg-vedara-gold/10 rounded-full blur-[160px] pointer-events-none" />

      {/* ── Section Introduction ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-[2px] w-10 bg-vedara-gold" />
              <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.25em] flex items-center gap-2">
                <Compass className="w-4 h-4 text-vedara-cyan animate-spin" style={{ animationDuration: "14s" }} />
                <span>YOUR JOURNEY — SCROLL STORY GUIDE</span>
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.12]">
              From your first message to your <br className="hidden sm:inline" />
              <span className="italic font-light bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 bg-clip-text text-transparent">
                first day back at work.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 text-xs text-slate-300 backdrop-blur-md">
              <MousePointer className="w-3.5 h-3.5 text-vedara-cyan animate-bounce" />
              <span>Scroll down to walk through chapters</span>
            </div>
            <div className="px-4 py-2 rounded-full bg-vedara-cyan/20 text-vedara-cyan text-xs font-black border border-vedara-cyan/40 shadow-glow flex items-center gap-1.5">
              <span>Chapter {activeStep + 1}</span>
              <span className="text-white/40 font-normal">/ {totalSteps}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Story Guide Timeline Scrubber (Follows along on scroll) ── */}
      <div className="sticky top-0 z-30 bg-[#03081E]/95 backdrop-blur-2xl border-y border-cyan-500/25 py-3.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Continuous Progress Track */}
          <div className="relative mb-3">
            <div className="h-1.5 bg-white/10 rounded-full w-full relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-vedara-cyan via-teal-400 to-vedara-gold rounded-full shadow-[0_0_20px_rgba(46,205,197,0.8)]"
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white to-transparent"
                animate={{ x: ["-100%", "1200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>

          {/* Stepper Node Scrub Buttons */}
          <div className="grid grid-cols-6 gap-2 sm:gap-3">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleScrollToStep(idx)}
                  className={`group relative text-center flex items-center justify-center sm:justify-start gap-2 p-2 sm:px-3 sm:py-2 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                    isActive
                      ? "bg-gradient-to-r from-[#0C2248] to-[#071738] border-vedara-cyan shadow-[0_0_25px_rgba(46,205,197,0.35)] scale-[1.02]"
                      : isPast
                      ? "bg-white/[0.06] border-white/20 hover:border-white/35"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-colors ${
                      isActive
                        ? "bg-vedara-cyan text-[#020713]"
                        : isPast
                        ? "bg-white/20 text-vedara-cyan"
                        : "bg-white/10 text-white/50"
                    }`}
                  >
                    {step.id}
                  </span>

                  <div className="hidden sm:block text-left truncate">
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-400 group-hover:text-amber-300 transition-colors">
                      {step.badgeDay}
                    </div>
                    <div className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-slate-300"}`}>
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Continuous Story Runway (Scroll Storytelling) ── */}
      <div className={`relative w-full pb-16 lg:pb-32 ${isDesktop ? "lg:h-[450vh]" : "h-auto"}`}>
        <div className={`${isDesktop ? "lg:sticky lg:top-40" : "relative"} w-full overflow-hidden z-10`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 min-h-[50vh] lg:min-h-[70vh] flex items-center">
            
            {/* Left Vertical Timeline (Visible Steps Track) */}
            <div className="hidden lg:flex flex-col relative py-6 mr-10 xl:mr-16 shrink-0 h-[500px] justify-between">
              {/* Connecting Line */}
              <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-cyan-500/20" />
              
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                const isPast = idx < activeStep;
                return (
                  <button
                    key={`node-${step.id}`}
                    onClick={() => handleScrollToStep(idx)}
                    className="relative flex items-center group cursor-pointer z-10"
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 font-black text-xs ${
                        isActive
                          ? "bg-vedara-cyan text-[#020713] ring-4 ring-cyan-500/30 shadow-[0_0_30px_rgba(46,205,197,0.7)] scale-110"
                          : isPast
                          ? "bg-[#0B1E45] text-vedara-cyan border-2 border-vedara-cyan/50"
                          : "bg-[#061434] text-slate-400 border-2 border-white/20 group-hover:border-white/50"
                      }`}
                    >
                      {step.id}
                    </div>
                    {/* Optional labels appearing on hover */}
                    <div className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#061434]/90 px-3 py-1.5 rounded-lg border border-white/10 text-xs font-bold shadow-xl backdrop-blur-sm pointer-events-none">
                      {step.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex-1 relative">
              <AnimatePresence mode="wait">
                {JOURNEY_STEPS.map((step, idx) => {
                  if (idx !== activeStep) return null;

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -40, filter: "blur(4px)" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="relative w-full"
                    >
                      {/* Chapter Card Dual Showcase */}
                      <div
                        className="rounded-3xl border-2 transition-all duration-500 overflow-hidden border-cyan-500/60 shadow-[0_0_50px_rgba(46,205,197,0.2)] bg-gradient-to-br from-[#0B1E45]/95 via-[#071638]/95 to-[#040D26]/95"
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                          
                          {/* Left: Visual & Clinical Narrative */}
                          <div className="lg:col-span-7 xl:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-vedara-cyan/15 rounded-full blur-[80px] pointer-events-none" />

                            {/* Photo Container */}
                            <div className="relative w-full md:w-64 h-56 md:h-64 rounded-2xl overflow-hidden shrink-0 shadow-2xl bg-slate-950 border border-white/20 group">
                              <Image
                                src={step.image}
                                alt={step.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                sizes="(max-width: 768px) 100vw, 300px"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                              
                              {/* Phase Badge */}
                              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#020713]/90 backdrop-blur-xl border border-white/25 text-vedara-cyan text-[10px] font-black uppercase tracking-wider shadow-md">
                                {step.phase}
                              </div>

                              {/* Timeline Position */}
                              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                                <span className="font-bold text-amber-300 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md">
                                  {step.dayLabel}
                                </span>
                                <span className="text-[10px] text-slate-300 font-semibold bg-black/60 px-2.5 py-1 rounded-full">
                                  Chapter {step.id} of {totalSteps}
                                </span>
                              </div>
                            </div>

                            {/* Clinical Description */}
                            <div className="flex-1 flex flex-col justify-between h-full relative z-10">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <StepVectorIcon type={step.iconType} active={true} />
                                  <span className="text-vedara-gold text-xs font-black uppercase tracking-[0.2em]">
                                    {step.badgeDay}
                                  </span>
                                </div>
                                
                                <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3 leading-tight">
                                  {step.title}
                                </h3>
                                <p className="text-slate-200 text-sm sm:text-base font-light leading-relaxed mb-6">
                                  {step.description}
                                </p>
                              </div>

                              <div className="pt-3 border-t border-white/15 flex items-center gap-2.5 text-xs text-vedara-cyan font-bold">
                                <CheckCircle2 className="w-4 h-4 text-vedara-cyan shrink-0" />
                                <span>Clinical protocol verified before patient departure</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Patient Emotional Perspective & Logistics */}
                          <div className="lg:col-span-5 xl:col-span-4 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-black/25 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-52 h-52 bg-vedara-gold/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                              <div className="flex items-center gap-2 mb-3 text-vedara-gold">
                                <Quote className="w-5 h-5 rotate-180 fill-current text-amber-300/40" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                  PATIENT PERSPECTIVE
                                </span>
                              </div>
                              
                              <blockquote className="text-white text-base sm:text-lg italic font-serif leading-relaxed mb-6">
                                &ldquo;{step.feelQuote}&rdquo;
                              </blockquote>
                            </div>

                            {/* Logistics Information */}
                            <div className="space-y-3.5 pt-4 border-t border-white/15 relative z-10">
                              <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-xl bg-vedara-cyan/20 border border-vedara-cyan/50 flex items-center justify-center text-vedara-cyan shrink-0 mt-0.5 shadow-md shadow-cyan-500/20">
                                  <MapPin className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-[9.5px] font-black tracking-widest text-vedara-cyan uppercase">
                                    WHERE
                                  </div>
                                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                                    {step.where}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-xl bg-vedara-gold/20 border border-vedara-gold/50 flex items-center justify-center text-vedara-gold shrink-0 mt-0.5 shadow-md shadow-amber-500/20">
                                  <Users className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-[9.5px] font-black tracking-widest text-vedara-gold uppercase">
                                    WITH YOU
                                  </div>
                                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                                    {step.withYou}
                                  </div>
                                </div>
                              </div>

                              {/* Step Action Button */}
                              <Button
                                variant="gold"
                                size="default"
                                onClick={() => openIntake(step.title)}
                                className="w-full text-vedara-deep font-black rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] mt-4 py-2.5 transition-all cursor-pointer"
                              >
                                <span>Inquire About This Stage</span>
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </div>

                          </div>

                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
