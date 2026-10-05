"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, ShieldCheck, Check, Sparkles, Calculator, Plane, Hotel, Stethoscope, HeartPulse, BadgePercent, TrendingDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCare } from "@/context/CareContext";

export const AltCostTransparency = () => {
  const { openIntake } = useCare();
  const [category, setCategory] = useState<"Serious" | "Elective">("Serious");
  const [selectedTreatment, setSelectedTreatment] = useState("Knee replacement (Bilateral)");
  const [attendantOption, setAttendantOption] = useState("1 attendant (included in base plan)");

  // Interactive estimates dataset
  const estimatesData: Record<string, {
    treatmentMin: number;
    treatmentMax: number;
    flights: number;
    accommodation: number;
    attendantAllowance: number;
    transfers: number;
    medications: number;
    followup: number;
    contingency: number;
    totalMin: number;
    totalMax: number;
    ukPrivateMin: number;
    ukPrivateMax: number;
    savingsPct: string;
    waitHome: string;
  }> = {
    "Knee replacement (Bilateral)": {
      treatmentMin: 18000,
      treatmentMax: 25000,
      flights: 1200,
      accommodation: 1800,
      attendantAllowance: 1200,
      transfers: 400,
      medications: 300,
      followup: 250,
      contingency: 4200,
      totalMin: 27350,
      totalMax: 35350,
      ukPrivateMin: 120000,
      ukPrivateMax: 180000,
      savingsPct: "70% – 80%",
      waitHome: "12 – 18 months wait",
    },
    "Hip replacement (Robotic)": {
      treatmentMin: 7200,
      treatmentMax: 11000,
      flights: 1200,
      accommodation: 1400,
      attendantAllowance: 1000,
      transfers: 400,
      medications: 300,
      followup: 250,
      contingency: 1800,
      totalMin: 11200,
      totalMax: 16800,
      ukPrivateMin: 25000,
      ukPrivateMax: 45000,
      savingsPct: "65% – 75%",
      waitHome: "9 – 14 months wait",
    },
    "Blood & marrow transplant": {
      treatmentMin: 24000,
      treatmentMax: 32000,
      flights: 1500,
      accommodation: 3500,
      attendantAllowance: 1800,
      transfers: 500,
      medications: 800,
      followup: 400,
      contingency: 5500,
      totalMin: 38000,
      totalMax: 49500,
      ukPrivateMin: 150000,
      ukPrivateMax: 250000,
      savingsPct: "75% – 82%",
      waitHome: "6 – 12 months wait",
    },
    "Liver / Kidney transplant": {
      treatmentMin: 28000,
      treatmentMax: 36000,
      flights: 1600,
      accommodation: 3800,
      attendantAllowance: 2000,
      transfers: 500,
      medications: 900,
      followup: 500,
      contingency: 6200,
      totalMin: 43500,
      totalMax: 55000,
      ukPrivateMin: 180000,
      ukPrivateMax: 300000,
      savingsPct: "70% – 80%",
      waitHome: "Critical queue list",
    },
    "Cardiac valve replacement": {
      treatmentMin: 9500,
      treatmentMax: 14000,
      flights: 1200,
      accommodation: 1600,
      attendantAllowance: 1100,
      transfers: 400,
      medications: 350,
      followup: 300,
      contingency: 2200,
      totalMin: 16650,
      totalMax: 22500,
      ukPrivateMin: 45000,
      ukPrivateMax: 75000,
      savingsPct: "68% – 78%",
      waitHome: "8 – 12 months wait",
    },
  };

  const currentEstimate = estimatesData[selectedTreatment] || estimatesData["Knee replacement (Bilateral)"];

  // Adjust for attendant count
  const attendantMultiplier = attendantOption.includes("2 attendants") ? 1.6 : attendantOption.includes("alone") ? 0.7 : 1.0;
  const computedFlights = Math.round(currentEstimate.flights * (attendantOption.includes("2 attendants") ? 1.5 : 1.0));
  const computedAccommodation = Math.round(currentEstimate.accommodation * attendantMultiplier);
  const computedTotalMin = Math.round(currentEstimate.treatmentMin + computedFlights + computedAccommodation + currentEstimate.attendantAllowance + currentEstimate.transfers + currentEstimate.medications + currentEstimate.followup + currentEstimate.contingency);
  const computedTotalMax = Math.round(currentEstimate.treatmentMax + computedFlights + computedAccommodation + currentEstimate.attendantAllowance + currentEstimate.transfers + currentEstimate.medications + currentEstimate.followup + currentEstimate.contingency);

  const approxSavingsUsd = currentEstimate.ukPrivateMin - computedTotalMin;

  return (
    <section id="cost" className="py-24 sm:py-32 bg-gradient-to-b from-[#05122F] via-[#081C48] to-[#040D28] text-white relative overflow-hidden">
      {/* Background radial ambient lights */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[550px] h-[550px] bg-vedara-cyan/20 rounded-full blur-[150px] pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.1, 0.95, 1.1],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-vedara-blue/25 rounded-full blur-[160px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-[2px] w-10 bg-vedara-gold" />
            <p className="text-vedara-gold font-bold text-xs uppercase tracking-[0.25em]">
              COST & FINANCIAL TRANSPARENCY
            </p>
            <div className="h-[2px] w-10 bg-vedara-gold" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight">
            The whole trip, not just the operating table.
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Surprise medical bills are impossible when every item — surgery, attendants, flights, hotel, and aftercare buffer — is quoted in writing before you board.
          </p>
        </div>

        {/* ── Interactive Calculator Showcase ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-3xl overflow-hidden shadow-2xl mb-16 border-2 border-cyan-500/30 bg-[#07132F]/95 text-white backdrop-blur-2xl">
          
          {/* Left: Input Panel */}
          <div className="lg:col-span-5 bg-[#050E24]/90 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-white">
                  <Calculator className="w-5 h-5 text-vedara-cyan" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Live Itinerary Estimator
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-vedara-cyan/20 text-vedara-cyan border border-vedara-cyan/30 text-[11px] font-bold">
                  Instant Preview
                </span>
              </div>

              {/* Step 1: Category */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-vedara-cyan text-[#020713] flex items-center justify-center text-xs font-extrabold shadow-sm">
                    1
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Select treatment category
                  </h3>
                </div>
                
                <div className="flex gap-2 mb-3 pl-9">
                  <button
                    type="button"
                    onClick={() => setCategory("Serious")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      category === "Serious"
                        ? "bg-vedara-cyan text-[#020713] font-black shadow-md shadow-cyan-500/25"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                    }`}
                  >
                    Serious
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategory("Elective")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      category === "Elective"
                        ? "bg-vedara-cyan text-[#020713] font-black shadow-md shadow-cyan-500/25"
                        : "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                    }`}
                  >
                    Elective
                  </button>
                </div>

                <div className="pl-9">
                  <select
                    value={selectedTreatment}
                    onChange={(e) => setSelectedTreatment(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-white/20 bg-[#0B1A3C] text-white text-sm font-semibold outline-none focus:border-vedara-cyan shadow-inner"
                  >
                    <option value="Knee replacement (Bilateral)">Knee replacement (Bilateral)</option>
                    <option value="Hip replacement (Robotic)">Hip replacement (Robotic)</option>
                    <option value="Blood & marrow transplant">Blood & marrow transplant</option>
                    <option value="Liver / Kidney transplant">Liver / Kidney transplant</option>
                    <option value="Cardiac valve replacement">Cardiac valve replacement</option>
                  </select>
                </div>
              </div>

              {/* Step 2: Attendants */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 rounded-full bg-vedara-gold text-vedara-deep flex items-center justify-center text-xs font-extrabold shadow-sm">
                    2
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    Number of attendants
                  </h3>
                </div>

                <div className="pl-9">
                  <select
                    value={attendantOption}
                    onChange={(e) => setAttendantOption(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-white/20 bg-[#0B1A3C] text-white text-sm font-semibold outline-none focus:border-vedara-gold shadow-inner"
                  >
                    <option value="1 attendant (included in base plan)">1 attendant (included in base plan)</option>
                    <option value="2 attendants">2 attendants</option>
                    <option value="Travelling alone (bedside nurse arranged)">Travelling alone (bedside nurse arranged)</option>
                  </select>
                </div>
              </div>

              {/* Real-time Estimated Savings Pill with Animated Pop */}
              <div className="pl-9 mb-4">
                <motion.div 
                  key={computedTotalMin}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-2xl bg-emerald-950/70 border-2 border-emerald-400/60 flex items-center justify-between shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                >
                  <div className="flex items-center gap-2.5 text-emerald-300">
                    <TrendingDown className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Estimated Savings</div>
                      <div className="text-base font-black text-white">${approxSavingsUsd.toLocaleString()}+ vs UK Private</div>
                    </div>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-emerald-500 text-[#020713] font-black text-xs shadow-md">
                    {currentEstimate.savingsPct}
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Explanatory note */}
            <div className="pt-6 border-t border-white/10 pl-9">
              <div className="flex items-start gap-2.5 text-slate-400">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-vedara-gold" />
                <p className="text-xs leading-relaxed">
                  Indicative only. Your formal written quote is itemized and fixed before travel.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Itemized Output & Summary */}
          <div className="lg:col-span-7 bg-[#07132F]/95 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-white/10">
                <div>
                  <h3 className="font-extrabold text-white text-xl font-serif">
                    Itemized estimate
                  </h3>
                  <p className="text-xs text-vedara-cyan mt-0.5">{selectedTreatment}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-300 text-xs font-bold border border-emerald-400/40">
                  Fixed Price Assurance
                </span>
              </div>
              
              {/* Itemized Breakdown List */}
              <div className="space-y-3.5 text-sm text-slate-300 mb-8">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🏥</span>
                    <span className="font-medium text-slate-200">Treatment range</span>
                  </div>
                  <div className="font-bold text-white">
                    ${currentEstimate.treatmentMin.toLocaleString()} – ${currentEstimate.treatmentMax.toLocaleString()}
                  </div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">✈️</span>
                    <span className="font-medium text-slate-200">Return flights (all travelers)</span>
                  </div>
                  <div className="font-bold text-white">${computedFlights.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🏨</span>
                    <span className="font-medium text-slate-200">Accommodation (serviced apartment)</span>
                  </div>
                  <div className="font-bold text-white">${computedAccommodation.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">👤</span>
                    <span className="font-medium text-slate-200">Attendant living allowance</span>
                  </div>
                  <div className="font-bold text-white">${currentEstimate.attendantAllowance.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🚕</span>
                    <span className="font-medium text-slate-200">Airport & clinic VIP transfers</span>
                  </div>
                  <div className="font-bold text-white">${currentEstimate.transfers.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">💊</span>
                    <span className="font-medium text-slate-200">Take-home discharge medications</span>
                  </div>
                  <div className="font-bold text-white">${currentEstimate.medications.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🩺</span>
                    <span className="font-medium text-slate-200">Follow-up consult once home</span>
                  </div>
                  <div className="font-bold text-white">${currentEstimate.followup.toLocaleString()}</div>
                </div>

                <div className="flex justify-between items-center py-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">🛡️</span>
                    <span className="font-medium text-slate-200">15% contingency buffer</span>
                  </div>
                  <div className="font-bold text-white">${currentEstimate.contingency.toLocaleString()}</div>
                </div>
              </div>

              {/* Total Callout Box with Animated Number Flash */}
              <motion.div 
                key={`${computedTotalMin}-${computedTotalMax}`}
                initial={{ scale: 0.98, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl p-6 border-2 border-vedara-cyan/40 bg-gradient-to-r from-[#0C1E48] to-[#061434] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 shadow-[0_0_35px_rgba(46,205,197,0.2)]"
              >
                <div>
                  <div className="font-serif font-extrabold text-white text-xl">Total All-In Trip</div>
                  <div className="text-xs text-slate-300 font-medium">Including flights, companion & lodging</div>
                </div>
                <div className="font-black text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
                  ${computedTotalMin.toLocaleString()} – ${computedTotalMax.toLocaleString()}
                </div>
              </motion.div>
            </div>

            {/* Savings Callout */}
            <div className="bg-white/[0.05] border border-vedara-gold/30 rounded-2xl p-4 flex items-start gap-3">
              <div className="text-vedara-gold shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                Privately in the UK or North America, this procedure alone costs $40,000 – $60,000. 
                With us, you save 20–35% with every single travel, attendant, and recovery cost counted.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Comparison Table Section */}
        <div className="bg-[#07132F]/95 rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-white/15 text-white backdrop-blur-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white flex items-center gap-2.5">
                <span>How it compares</span>
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Direct comparison between an all-in medical travel journey versus local private healthcare.
              </p>
            </div>
            <span className="px-4 py-2 rounded-full bg-vedara-cyan/20 text-vedara-cyan text-xs font-bold border border-vedara-cyan/40 self-start sm:self-auto shadow-glow">
              0 Weeks Clinical Wait Times
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-white/15 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <th className="pb-4 font-bold">Treatment</th>
                  <th className="pb-4 font-bold text-vedara-cyan">India, All-In Trip *</th>
                  <th className="pb-4 font-bold text-slate-300">At Home (Private)</th>
                  <th className="pb-4 font-bold text-slate-300">Wait Times At Home</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-200">
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span>🦴</span> Knee replacement (Bilateral)
                  </td>
                  <td className="py-4 font-black text-vedara-cyan text-base">$27,350 – $35,350</td>
                  <td className="py-4 text-slate-300 font-semibold">$120,000 – $180,000</td>
                  <td className="py-4 text-rose-400 font-semibold">12 – 18 months wait</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span>🦵</span> Hip replacement (Robotic)
                  </td>
                  <td className="py-4 font-black text-vedara-cyan text-base">$11,200 – $16,800</td>
                  <td className="py-4 text-slate-300 font-semibold">$25,000 – $45,000</td>
                  <td className="py-4 text-rose-400 font-semibold">9 – 14 months wait</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span>🦷</span> Full-arch dental rehabilitation
                  </td>
                  <td className="py-4 font-black text-vedara-cyan text-base">$8,400 – $12,600</td>
                  <td className="py-4 text-slate-300 font-semibold">$15,000 – $30,000</td>
                  <td className="py-4 text-rose-400 font-semibold">6 – 8 months wait</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span>👶</span> IVF with ICSI & genetic screening
                  </td>
                  <td className="py-4 font-black text-vedara-cyan text-base">$10,500 – $15,000</td>
                  <td className="py-4 text-slate-300 font-semibold">$20,000 – $35,000</td>
                  <td className="py-4 text-amber-300 font-semibold">Limited NHS cycles</td>
                </tr>
                <tr className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-4 font-bold text-white flex items-center gap-2">
                    <span>👁️</span> Advanced refractive & lens surgery
                  </td>
                  <td className="py-4 font-black text-vedara-cyan text-base">$20,000 – $28,000</td>
                  <td className="py-4 text-slate-300 font-semibold">$80,000 – $150,000</td>
                  <td className="py-4 text-rose-400 font-semibold">8 – 12 months wait</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              * &quot;India, All-In Trip&quot; includes return flights, attendant accommodations, local transfers, all clinical fees, medication and contingency buffer.
            </p>

            {/* Primary Action Button */}
            <Button
              variant="gold"
              size="lg"
              onClick={() => openIntake(selectedTreatment)}
              className="shrink-0 px-8 py-3.5 rounded-xl text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer text-vedara-deep hover:scale-105 transition-all"
            >
              <span>Get a written quote</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};
