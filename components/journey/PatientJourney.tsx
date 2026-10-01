"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface JourneyStep {
  id: number;
  iconType: "reports" | "video" | "visa" | "arrive" | "surgery" | "home";
  dayLabel: string;
  badgeDay: string;
  title: string;
  description: string;
  feelQuote: string;
  where: string;
  withYou: string;
  image: string;
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    iconType: "reports",
    dayLabel: "3 wks before",
    badgeDay: "3 WKS BEFORE",
    title: "Send your X-rays",
    description:
      "A short form and whatever imaging you have — photographs of paper films are fine. Within a day we tell you what's missing. Within two, a doctor who isn't the one who'd operate has read your file.",
    feelQuote: "Mostly relief that someone is finally looking at it.",
    where: "At home",
    withYou: "Coordinator, by message",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    iconType: "video",
    dayLabel: "2 wks before",
    badgeDay: "2 WKS BEFORE",
    title: "Meet your surgeon",
    description:
      "A video call before you pay anything and before you book a flight. Bring your family into the room. The written, fixed price is in front of you during the call.",
    feelQuote: "This is the moment most people stop feeling like they're gambling.",
    where: "At home",
    withYou: "Your named surgeon",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    iconType: "visa",
    dayLabel: "10 days before",
    badgeDay: "10 DAYS BEFORE",
    title: "Visa & flights",
    description:
      "The invitation letter is issued the day your plan is agreed. We complete the e-Medical Visa with you, arrange your companion's alongside it, and book flights around your surgical date.",
    feelQuote: "The part everyone dreads. It's paperwork, and it's ours.",
    where: "At home",
    withYou: "Coordinator · hospital admissions",
    image: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    iconType: "arrive",
    dayLabel: "Days 1–2",
    badgeDay: "DAYS 1–2",
    title: "Arrive & assessment",
    description:
      "Met inside arrivals, not outside the terminal. Nothing clinical on day one. Day two is bloods, imaging and your anaesthetic review — and if anything changes the plan, you hear it in person that day.",
    feelQuote: "Tired, then busy. Busy helps.",
    where: "Delhi → Mohali",
    withYou: "Coordinator, in person",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 5,
    iconType: "surgery",
    dayLabel: "Day 3",
    badgeDay: "DAY 3",
    title: "Surgery",
    description:
      "Anterior approach, muscle-sparing, around ninety minutes. The implant is named on your quote by brand. Your coordinator waits with whoever came with you and calls anyone at home you've asked us to call.",
    feelQuote: "The day everyone dreads and almost nobody remembers:",
    where: "Partner hospital, Mohali",
    withYou: "Your surgeon · family waiting",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 6,
    iconType: "home",
    dayLabel: "Days 4–14",
    badgeDay: "DAYS 4–14",
    title: "Recovery, then home",
    description:
      "Walking the same day, physiotherapy twice daily, then a serviced apartment for the second week. On day twelve, fit-to-fly clearance and the Continuity Pack sent to your own doctor.",
    feelQuote: "That second week is when most people say they stopped worrying.",
    where: "Hospital, then apartment",
    withYou: "Physio daily · coordinator daily",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800",
  },
];

/* Custom dual-tone SVG illustrations matching the reference demo */
const StepIllustration = ({
  type,
  active,
}: {
  type: JourneyStep["iconType"];
  active: boolean;
}) => {
  const strokeTeal = active ? "#062A38" : "#4A6570";
  const strokeGold = "#C9A24A";
  const strokeWidth = "2.8";

  return (
    <svg
      viewBox="0 0 120 100"
      className="w-full h-full transition-transform duration-300"
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      {type === "reports" && (
        <g>
          <rect
            x="30"
            y="16"
            width="46"
            height="60"
            rx="5"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 32h26M40 42h26M40 52h16"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="80"
            cy="62"
            r="14"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M80 68V56M74 62l6-6 6 6"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 84h68"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {type === "video" && (
        <g>
          <rect
            x="20"
            y="20"
            width="62"
            height="44"
            rx="5"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="51"
            cy="36"
            r="7"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M39 54c2-7 7-10 12-10s10 3 12 10"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 76h38M45 64v12"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="94"
            cy="56"
            r="9"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M86 80c1-8 4-12 8-12s7 4 8 12"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {type === "visa" && (
        <g>
          <rect
            x="26"
            y="18"
            width="42"
            height="58"
            rx="5"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="47"
            cy="40"
            r="9"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 40h18M47 31c4 5 4 13 0 18M47 31c-4 5-4 13 0 18M38 62h18"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="83"
            cy="50"
            r="16"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M75 50l6 6 12-13"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 86h80"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {type === "arrive" && (
        <g>
          <circle
            cx="38"
            cy="26"
            r="8"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M38 34v22M28 42l10-4 10 4M32 78l6-22M44 78l-6-22"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="52"
            y="52"
            width="18"
            height="22"
            rx="3"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M57 52v-5h8v5"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="90"
            cy="26"
            r="8"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M90 34v20M90 40l10-8M84 74l6-20M96 74l-6-20"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 84h88"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {type === "surgery" && (
        <g>
          <path
            d="M44 12h32M60 12v10"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse
            cx="60"
            cy="28"
            rx="16"
            ry="7"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M52 33l3 5M60 35v6M68 33l-3 5"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="22"
            y="56"
            width="76"
            height="12"
            rx="4"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="36"
            cy="50"
            r="6"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 56h44M30 68v14M90 68v14"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {type === "home" && (
        <g>
          <path
            d="M18 44c14-18 34-26 54-24"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M70 18l12 3-10 7z" fill={strokeGold} />
          <path
            d="M34 84V54l22-16 22 16v30M48 84V66h16v18"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="42"
            y="46"
            width="10"
            height="9"
            rx="2"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 84h68"
            fill="none"
            stroke={strokeTeal}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="88"
            cy="42"
            r="10"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M84 42l3 3 6-7"
            fill="none"
            stroke={strokeGold}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
};

export const PatientJourney = () => {
  // Start with Step 5 (index 4) as in the user's reference mockup
  const [activeStep, setActiveStep] = useState(4);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0.8);

  const containerRef = useRef<HTMLDivElement>(null);
  const isManualNavRef = useRef(false);

  // Monitor window size for desktop scrollytelling vs mobile carousel
  useEffect(() => {
    const checkViewport = () => {
      const desktop =
        window.innerWidth >= 1024 &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsDesktop(desktop);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  // Framer Motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (!isDesktop) return;

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setScrollProgress(latest);
      if (isManualNavRef.current) return;

      // Map progress [0, 1] to step index [0, 5]
      const stepIdx = Math.min(
        JOURNEY_STEPS.length - 1,
        Math.max(0, Math.floor(latest * JOURNEY_STEPS.length * 0.999))
      );
      setActiveStep(stepIdx);
    });

    return () => unsubscribe();
  }, [isDesktop, scrollYProgress]);

  // Handle explicit step selection (click on timeline or arrows)
  const handleSelectStep = useCallback(
    (index: number) => {
      const clampedIndex = Math.max(0, Math.min(JOURNEY_STEPS.length - 1, index));
      setActiveStep(clampedIndex);

      if (isDesktop && containerRef.current) {
        isManualNavRef.current = true;
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const containerTop = rect.top + scrollTop;
        const scrollRange = containerRef.current.offsetHeight - window.innerHeight;

        if (scrollRange > 0) {
          const targetFraction = (clampedIndex + 0.5) / JOURNEY_STEPS.length;
          const targetScroll = containerTop + targetFraction * scrollRange;
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }

        setTimeout(() => {
          isManualNavRef.current = false;
        }, 750);
      }
    },
    [isDesktop]
  );

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      handleSelectStep(activeStep + 1);
    } else if (e.key === "ArrowLeft") {
      handleSelectStep(activeStep - 1);
    }
  };

  const currentStep = JOURNEY_STEPS[activeStep];
  const totalSteps = JOURNEY_STEPS.length;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${isDesktop ? "lg:h-[240vh]" : "h-auto"}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Interactive Patient Journey"
    >
      <section
        className={`w-full bg-white border-t border-slate-100 py-16 sm:py-20 ${
          isDesktop
            ? "lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col overflow-hidden"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-14 gap-6">
            <div>
              <p className="text-[#a58d34] font-bold text-xs uppercase tracking-widest mb-2.5">
                Your journey
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#0F1340] tracking-tight leading-[1.15]">
                From your first message to your
                <br className="hidden sm:inline" /> first day back at work.
              </h2>
            </div>

            {/* Stepper badge & quick controls */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                STEP
              </span>
              <div className="px-3.5 py-1.5 rounded-full bg-[#f4f6dc] text-[#a58d34] text-sm font-black border border-[#e5ca76] shadow-xs flex items-center gap-1.5">
                <span>{activeStep + 1}</span>
                <span className="text-[#a58d34]/60 font-medium">/ {totalSteps}</span>
              </div>

              {/* Prev / Next buttons */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => handleSelectStep(activeStep - 1)}
                  disabled={activeStep === 0}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed transition-all shadow-xs"
                  aria-label="Previous step"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectStep(activeStep + 1)}
                  disabled={activeStep === totalSteps - 1}
                  className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50 disabled:opacity-35 disabled:cursor-not-allowed transition-all shadow-xs"
                  aria-label="Next step"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div className="relative mb-10 sm:mb-14">
            {/* Desktop Timeline with Connecting Progress Line */}
            <div className="hidden md:block relative">
              {/* Connecting background dashed track */}
              <div
                className="absolute top-[82px] h-[2px] bg-slate-200 z-0 pointer-events-none"
                style={{
                  left: "calc(100% / 12)",
                  width: "calc(100% * 5 / 6)",
                }}
              />

              {/* Connecting animated gold progress line */}
              <motion.div
                className="absolute top-[82px] h-[2.5px] bg-gradient-to-r from-[#C9A24A] via-[#E0BC6E] to-[#C9A24A] z-0 pointer-events-none shadow-xs"
                style={{
                  left: "calc(100% / 12)",
                }}
                animate={{
                  width: `calc((100% * 5 / 6) * ${activeStep / (totalSteps - 1)})`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                }}
              />

              {/* 6 Step Nodes Columns */}
              <div className="grid grid-cols-6 relative z-10">
                {JOURNEY_STEPS.map((step, idx) => {
                  const isActive = idx === activeStep;
                  const isCompleted = idx < activeStep;

                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => handleSelectStep(idx)}
                      className="group flex flex-col items-center text-center px-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A24A] rounded-xl transition-all cursor-pointer"
                    >
                      {/* SVG Illustration above node */}
                      <div
                        className={`w-14 h-12 mb-2 transition-all duration-300 ${
                          isActive
                            ? "opacity-100 scale-105"
                            : isCompleted
                            ? "opacity-80"
                            : "opacity-40 group-hover:opacity-75"
                        }`}
                      >
                        <StepIllustration
                          type={step.iconType}
                          active={isActive || isCompleted}
                        />
                      </div>

                      {/* Number Node */}
                      <div className="relative my-1">
                        <motion.div
                          animate={{
                            scale: isActive ? 1.18 : 1,
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                            isActive
                              ? "bg-[#a58d34] text-white border-4 border-white shadow-md ring-2 ring-[#a58d34]/40"
                              : isCompleted
                              ? "bg-[#f4f6dc] text-[#a58d34] border-2 border-[#C9A24A] shadow-xs"
                              : "bg-white text-slate-400 border-2 border-slate-200 group-hover:border-slate-300 shadow-xs"
                          }`}
                        >
                          {step.id}
                        </motion.div>
                      </div>

                      {/* Timeline Day badge */}
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider mt-1.5 transition-colors ${
                          isActive
                            ? "text-[#a58d34]"
                            : isCompleted
                            ? "text-slate-500"
                            : "text-slate-400"
                        }`}
                      >
                        {step.badgeDay}
                      </span>

                      {/* Step Title */}
                      <span
                        className={`text-xs font-semibold mt-0.5 line-clamp-1 max-w-[120px] transition-colors ${
                          isActive
                            ? "text-[#0F1340] font-bold"
                            : "text-slate-600 group-hover:text-slate-900"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile / Tablet Horizontal Scrollable Stepper */}
            <div className="md:hidden overflow-x-auto no-scrollbar py-2 -mx-4 px-4 flex gap-3">
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                const isCompleted = idx < activeStep;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => handleSelectStep(idx)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl shrink-0 border transition-all text-left ${
                      isActive
                        ? "bg-[#f4f6dc] border-[#e5ca76] shadow-sm"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                        isActive
                          ? "bg-[#a58d34] text-white"
                          : isCompleted
                          ? "bg-[#f4f6dc] text-[#a58d34] border border-[#C9A24A]"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step.id}
                    </div>
                    <div>
                      <div
                        className={`text-[9px] font-bold uppercase tracking-wider ${
                          isActive ? "text-[#a58d34]" : "text-slate-400"
                        }`}
                      >
                        {step.badgeDay}
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          isActive ? "text-[#0F1340]" : "text-slate-700"
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Step Content Cards (Two columns matching reference image) */}
          <div className="relative min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
              >
                {/* Left Card: Clinical details & Image */}
                <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(6,42,56,0.06)] border border-slate-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {/* Step Image */}
                  <div className="relative w-full sm:w-52 md:w-56 h-48 sm:h-52 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-slate-100">
                    <Image
                      src={currentStep.image}
                      alt={currentStep.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 240px"
                    />
                  </div>

                  {/* Step Text Info */}
                  <div className="pt-1 flex-1 flex flex-col justify-center">
                    <div className="text-[#a58d34] text-xs font-bold uppercase tracking-wider mb-1.5">
                      {currentStep.dayLabel}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F1340] mb-3 tracking-tight">
                      {currentStep.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed">
                      {currentStep.description}
                    </p>
                  </div>
                </div>

                {/* Right Card: Emotional Feeling & Logistics Box */}
                <div className="lg:col-span-5 xl:col-span-4 bg-[#f4f6dc] rounded-3xl p-6 sm:p-8 border border-[#e5ca76]/40 shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="text-[#7A5F22] font-semibold text-sm sm:text-[15.5px] italic leading-relaxed mb-6">
                      &ldquo;{currentStep.feelQuote}&rdquo;
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#e5ca76]/30">
                    {/* Item A: Where */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#a58d34] text-xs font-black shrink-0 shadow-xs border border-[#e5ca76]/40 mt-0.5">
                        A
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold tracking-widest text-[#a58d34] uppercase mb-0.5">
                          WHERE
                        </div>
                        <div className="text-sm font-bold text-[#0F1340]">
                          {currentStep.where}
                        </div>
                      </div>
                    </div>

                    {/* Item B: With you */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#a58d34] text-xs font-black shrink-0 shadow-xs border border-[#e5ca76]/40 mt-0.5">
                        B
                      </div>
                      <div>
                        <div className="text-[10px] font-extrabold tracking-widest text-[#a58d34] uppercase mb-0.5">
                          WITH YOU
                        </div>
                        <div className="text-sm font-bold text-[#0F1340]">
                          {currentStep.withYou}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scrollytelling Bottom Progress Bar (Section A behaviour from HTML demo) */}
        {isDesktop && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200/50 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C9A24A] via-[#E0BC6E] to-[#C9A24A]"
              style={{
                width: `${Math.max(0, Math.min(100, scrollProgress * 100))}%`,
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
};
