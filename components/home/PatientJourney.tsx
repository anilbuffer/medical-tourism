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
  MousePointer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export interface JourneyStep {
  id: number;
  dayLabel: string;
  badgeDay: string;
  phase: "Preparation" | "Travel & Care" | "Recovery" | "Post-Care";
  title: string;
  description: string;
  feelQuote: string;
  where: string;
  withYou: string;
  image: string;
  iconType: "reports" | "video" | "visa" | "arrive" | "surgery" | "home" | "followup";
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    dayLabel: "3 wks before",
    badgeDay: "3 WKS BEFORE",
    phase: "Preparation",
    title: "Send your reports",
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
    title: "Meet your doctor",
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
    title: "Treatment",
    description:
      "Anterior approach, muscle-sparing, around ninety minutes. The implant is named on your quote by brand. Your coordinator waits with whoever came with you and calls anyone at home you've asked us to call.",
    feelQuote: "The day everyone dreads and almost nobody remembers.",
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
  {
    id: 7,
    dayLabel: "1 mo after",
    badgeDay: "1 MO AFTER",
    phase: "Post-Care",
    title: "Follow Up",
    description:
      "A scheduled video consultation to check on your progress and ensure everything is healing as expected. We coordinate with your local doctor if needed.",
    feelQuote: "It felt good knowing they still cared after I got back.",
    where: "At home",
    withYou: "Your surgeon · local doctor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200",
    iconType: "followup",
  },
];

/* Custom Vector SVG Icon */
const StepVectorIcon = ({ type, active }: { type: JourneyStep["iconType"]; active: boolean }) => {
  const strokeColor = active ? "#0B5D68" : "#94A3B8";
  const accentColor = active ? "#F0A126" : "#DCE6EB";

  return (
    <svg viewBox="0 0 80 80" className="w-8 h-8 transition-transform duration-300">
      <circle cx="40" cy="40" r="30" stroke={strokeColor} strokeWidth="4" fill="none" />
      <circle cx="40" cy="40" r="15" fill={accentColor} />
    </svg>
  );
};

export const PatientJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { openIntake } = useCare();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkViewport = () => {
      const desktop = window.innerWidth >= 1024 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsDesktop(desktop);
    };
    checkViewport();
    window.addEventListener("resize", checkViewport, { passive: true });
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeElement = container.children[activeStep] as HTMLElement;
      if (activeElement) {
        const containerWidth = container.clientWidth;
        const scrollOffset = activeElement.offsetLeft - container.offsetLeft - (containerWidth / 2) + (activeElement.clientWidth / 2);
        container.scrollTo({ left: scrollOffset, behavior: 'smooth' });
      }
    }
  }, [activeStep]);

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

  useEffect(() => {
    if (!isDesktop) return;
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      const scrolled = -sectionTop;
      const scrollable = sectionHeight - windowHeight;
      
      if (scrollable > 0) {
        let progress = scrolled / scrollable;
        progress = Math.max(0, Math.min(1, progress));
        let step = Math.floor(progress * totalSteps);
        if (progress > 0.99) step = totalSteps - 1;
        if (step >= totalSteps) step = totalSteps - 1;
        setActiveStep(step);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSteps, isDesktop]);

  const handleScrollToStep = (index: number) => {
    if (isDesktop && sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollable = sectionHeight - window.innerHeight;
      const progress = (index + 0.1) / totalSteps;
      const targetScroll = sectionTop + (progress * scrollable);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      setActiveStep(index);
    }
  };

  return (
    <div ref={sectionRef} id="journey" className="relative w-full bg-[#FCFDFD] text-[#0C2338] border-t border-[#DCE6EB] font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0B5D68]"></span>
              <p className="text-[#0B5D68] font-heading font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#0B5D68]" />
                <span>PATIENT JOURNEY — STEP-BY-STEP CONCIERGE CARE</span>
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0C2338] leading-[1.12]">
              From Your First Report Review to Your <br className="hidden sm:inline" />
              <span className="text-[#0B5D68]">
                Safe Return Home.
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-md border-y border-[#DCE6EB] py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-3">
            <div className="h-1.5 bg-[#ECF4F7] rounded-full w-full relative overflow-hidden">
              <motion.div
                className="h-full bg-[#0B5D68] rounded-full"
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              />
            </div>
          </div>

          <div ref={scrollContainerRef} className="flex overflow-x-auto gap-3 pb-4 pt-2 px-2 -mx-2 snap-x">
            {JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;
              return (
                <button
                  key={step.id}
                  onClick={() => handleScrollToStep(idx)}
                  className={`group relative flex items-center justify-start gap-3 p-3 rounded-xl border transition-all duration-300 cursor-pointer shrink-0 snap-start min-w-[220px] ${
                    isActive
                      ? "bg-[#ECF4F7] border-[#0B5D68] shadow-sm scale-[1.02]"
                      : isPast
                      ? "bg-white border-[#DCE6EB] hover:border-[#0B5D68]"
                      : "bg-white border-slate-100 hover:border-[#DCE6EB]"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold font-heading shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#0B5D68] text-white"
                        : isPast
                        ? "bg-[#0B5D68]/15 text-[#0B5D68]"
                        : "bg-[#ECF4F7] text-slate-400"
                    }`}
                  >
                    {step.id}
                  </span>
                  <div className="text-left">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-[#6B7C88] group-hover:text-[#0B5D68] transition-colors font-heading">
                      {step.badgeDay}
                    </div>
                    <div className={`text-xs font-bold font-heading ${isActive ? "text-[#0B5D68]" : "text-[#0C2338]"}`}>
                      {step.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className={`relative w-full pb-16 lg:pb-32 ${isDesktop ? "lg:h-[500vh]" : "h-auto"}`}>
        <div className={`${isDesktop ? "lg:sticky lg:top-40" : "relative"} w-full overflow-hidden z-10`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 min-h-[50vh] lg:min-h-[60vh] flex items-center">
            
            <div className="hidden lg:flex flex-col relative py-6 mr-10 xl:mr-16 shrink-0 h-[500px] justify-between">
              <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-[#DCE6EB]" />
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = idx === activeStep;
                const isPast = idx < activeStep;
                return (
                  <button key={`node-${step.id}`} onClick={() => handleScrollToStep(idx)} className="relative flex items-center group cursor-pointer z-10">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 font-bold font-heading text-xs ${
                      isActive ? "bg-[#0B5D68] text-white ring-4 ring-[#0B5D68]/20 scale-110" : isPast ? "bg-white text-[#0B5D68] border-2 border-[#0B5D68]" : "bg-[#FCFDFD] text-slate-400 border-2 border-[#DCE6EB]"
                    }`}>
                      {step.id}
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
                    <motion.div key={step.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.6 }} className="relative w-full">
                      <div className="rounded-3xl border border-[#DCE6EB] overflow-hidden shadow-xl bg-white">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                          
                          <div className="lg:col-span-7 xl:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start border-b lg:border-b-0 lg:border-r border-[#DCE6EB]">
                            <div className="relative w-full md:w-64 h-56 md:h-64 rounded-2xl overflow-hidden shrink-0 shadow-md">
                              <Image src={step.image} alt={step.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 300px" />
                              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-medium font-heading uppercase tracking-wider shadow-sm border border-white/20">
                                {step.phase}
                              </div>
                            </div>

                            <div className="flex-1 flex flex-col justify-between h-full">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <StepVectorIcon type={step.iconType} active={true} />
                                  <span className="text-[#0B5D68] text-xs font-bold font-heading uppercase tracking-[0.2em]">{step.badgeDay}</span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0C2338] mb-3 leading-tight">{step.title}</h3>
                                <p className="text-[#6B7C88] text-sm sm:text-base font-normal leading-relaxed mb-6">{step.description}</p>
                              </div>
                              <div className="pt-3 border-t border-[#DCE6EB] flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                                <CheckCircle2 className="w-4 h-4 text-[#0B8F83] shrink-0" />
                                <span>Clinical protocol verified before patient departure</span>
                              </div>
                            </div>
                          </div>

                          <div className="lg:col-span-5 xl:col-span-4 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-[#ECF4F7]">
                            <div>
                              <div className="flex items-center gap-2 mb-3 text-[#0B5D68]">
                                <Quote className="w-5 h-5 rotate-180 text-[#0B5D68]" />
                                <span className="text-[10px] font-bold font-heading uppercase tracking-[0.2em]">PATIENT PERSPECTIVE</span>
                              </div>
                              <blockquote className="text-[#0C2338] text-base sm:text-lg italic font-normal leading-relaxed mb-6">
                                &ldquo;{step.feelQuote}&rdquo;
                              </blockquote>
                            </div>

                            <div className="space-y-3.5 pt-4 border-t border-[#DCE6EB]">
                              <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE6EB] flex items-center justify-center text-[#0B5D68] shrink-0 shadow-sm"><MapPin className="w-4 h-4 text-[#2C7FAF]" /></div>
                                <div>
                                  <div className="text-[9.5px] font-bold tracking-widest text-[#6B7C88] uppercase font-heading">WHERE</div>
                                  <div className="text-xs sm:text-sm font-bold text-[#0C2338] mt-0.5">{step.where}</div>
                                </div>
                              </div>
                              <div className="flex items-start gap-3.5">
                                <div className="w-9 h-9 rounded-xl bg-white border border-[#DCE6EB] flex items-center justify-center text-[#0B5D68] shrink-0 shadow-sm"><Users className="w-4 h-4 text-[#2C7FAF]" /></div>
                                <div>
                                  <div className="text-[9.5px] font-bold tracking-widest text-[#6B7C88] uppercase font-heading">WITH YOU</div>
                                  <div className="text-xs sm:text-sm font-bold text-[#0C2338] mt-0.5">{step.withYou}</div>
                                </div>
                              </div>
                              <Button variant="outline" onClick={() => openIntake(step.title)} className="w-full bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] border-0 font-heading font-bold rounded-xl mt-4 py-2.5 shadow-md shadow-[#F0A126]/20 transition-all cursor-pointer">
                                <span>Inquire About This Stage</span>
                                <ChevronRight className="w-4 h-4 ml-1 stroke-[2.4]" />
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

