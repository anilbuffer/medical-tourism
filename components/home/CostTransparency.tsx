"use client";

import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Bone,
  Smile,
  Sparkles,
  Eye
} from "lucide-react";
import { useCare } from "@/context/CareContext";

export const CostTransparency: React.FC = () => {
  const { openIntake } = useCare();

  const procedures = [
    {
      procedure: "Knee Replacement (Bilateral Robotic)",
      icon: Bone,
      ukUsRate: "$38,000 – $65,000",
      waitTimes: "12 – 18 Months Waiting",
      indiaRate: "$9,500 – $13,500",
    },
    {
      procedure: "Hip Replacement (Direct Anterior)",
      icon: Activity,
      ukUsRate: "$32,000 – $52,000",
      waitTimes: "10 – 14 Months Waiting",
      indiaRate: "$8,200 – $11,500",
    },
    {
      procedure: "Full-Arch Dental (All-on-4 / Zirconia)",
      icon: Smile,
      ukUsRate: "$22,000 – $38,000",
      waitTimes: "6 – 9 Months Waiting",
      indiaRate: "$4,800 – $7,200",
    },
    {
      procedure: "IVF Cycle with ICSI & PGT-A",
      icon: Sparkles,
      ukUsRate: "$14,000 – $24,000",
      waitTimes: "Strict Age/NHS Caps",
      indiaRate: "$4,200 – $6,500",
    },
    {
      procedure: "Contoura Vision Lasik (Both Eyes)",
      icon: Eye,
      ukUsRate: "$5,500 – $8,000",
      waitTimes: "Not Covered by NHS",
      indiaRate: "$1,400 – $1,900",
    },
  ];

  return (
    <section id="costs" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#087F79]/20 shadow-2xs mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#087F79] animate-pulse" />
            <span className="text-[#087F79] text-xs font-bold uppercase tracking-wider">
              TRANSPARENT PRICING
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#102B46] tracking-tight leading-tight">
            All-Inclusive <span className="text-[#087F79]">Cost Comparison</span>
          </h2>
          <p className="text-[#627486] text-sm sm:text-base mt-2.5 sm:mt-3 leading-relaxed font-normal">
            Save up to 70–80% compared to US and UK private hospitals with direct itemized hospital billing and zero hidden agency markups.
          </p>
        </div>

        {/* Master Comparison Table Card */}
        <div className="bg-[#F8FAFC] rounded-2xl lg:rounded-3xl border border-[#DCE5EB] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="border-b border-[#DCE5EB]">
                  <th scope="col" className="py-5 px-6 sm:px-8 text-xs sm:text-sm font-bold text-[#102B46] tracking-wide w-[36%]">
                    Treatment Procedure
                  </th>
                  <th scope="col" className="py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-[#102B46] tracking-wide w-[22%]">
                    UK / US Private Rate
                  </th>
                  <th scope="col" className="py-5 px-4 sm:px-6 text-xs sm:text-sm font-bold text-[#102B46] tracking-wide w-[22%]">
                    NHS / Public Wait Times
                  </th>
                  <th scope="col" className="py-5 px-6 sm:px-8 text-xs sm:text-sm font-bold text-white tracking-wide w-[20%] bg-[#087F79] text-left">
                    India (Your Medicare Trip)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE5EB]/70 bg-white">
                {procedures.map((item) => {
                  const Icon = item.icon;
                  return (
                    <tr key={item.procedure} className="hover:bg-[#F8FAFC]/80 transition-colors">
                      {/* Column 1: Procedure + Icon */}
                      <td className="py-5 px-6 sm:px-8">
                        <div className="flex items-center gap-3.5 sm:gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#EAF5F4] border border-[#DCE5EB] flex items-center justify-center text-[#087F79] shrink-0 shadow-2xs">
                            <Icon className="w-5 h-5 text-[#087F79]" />
                          </div>
                          <span className="font-bold text-sm sm:text-base text-[#102B46] leading-snug">
                            {item.procedure}
                          </span>
                        </div>
                      </td>

                      {/* Column 2: UK / US Private Rate */}
                      <td className="py-5 px-4 sm:px-6 font-semibold text-sm sm:text-base text-[#506375]">
                        {item.ukUsRate}
                      </td>

                      {/* Column 3: NHS / Public Wait Times */}
                      <td className="py-5 px-4 sm:px-6 text-xs sm:text-sm text-[#627486]">
                        {item.waitTimes}
                      </td>

                      {/* Column 4: India (Your Medicare Trip) */}
                      <td className="py-5 px-6 sm:px-8 font-extrabold text-sm sm:text-base text-[#102B46] bg-[#EAF5F4]/30 border-l border-[#DCE5EB]">
                        {item.indiaRate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Area: Footnote Disclaimer + CTA */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-5 pt-1">
          <p className="text-xs text-[#627486] leading-relaxed max-w-2xl font-normal">
            * &quot;India (Your Medicare Trip)&quot; includes surgeon fees, pre-op diagnostics, theatre fees, US-FDA implant costs, inpatient stay, attendant accommodation, and local transport.
          </p>

          <button
            onClick={() => openIntake("Get Itemised Written Quote")}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0"
          >
            <span>Get Itemised Written Quote</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};
