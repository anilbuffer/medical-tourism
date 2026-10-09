"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Mountain } from "lucide-react";
import { useCare } from "@/context/CareContext";

// Medical SVG Outline Icons with green/teal duotone strokes matching reference image
// Medical SVG Outline Icons with green/teal duotone strokes - Enlarged and precisely aligned
const KneeIcon = () => (
  <div className="w-12 h-12 rounded-xl bg-[#F0F7F6] border border-[#D2EAE6] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E0F2EE] group-hover:border-[#B4DFD5] transition-all">
    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
      {/* Femur (Upper thigh bone & condyles) */}
      <path
        d="M11 3H17C18 3 18.8 3.8 18.8 4.8V8C18.8 9.5 19.8 10.8 21.2 11.2C22.4 11.6 23 12.6 23 13.5C23 14.8 22 15.8 20.8 15.8H7.2C6 15.8 5 14.8 5 13.5C5 12.6 5.6 11.6 6.8 11.2C8.2 10.8 9.2 9.5 9.2 8V4.8C9.2 3.8 10 3 11 3Z"
        stroke="#0B5D68"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="#E8F4F2"
      />
      {/* Robotic Articulation Bearing Plate */}
      <rect x="7" y="15.8" width="14" height="2.8" rx="1.4" fill="#1B8755" stroke="#0B5D68" strokeWidth="1" />
      {/* Tibia (Lower shin bone) */}
      <path
        d="M9 18.6H19C20 18.6 20.8 19.4 20.8 20.4V23C20.8 24.1 19.9 25 18.8 25H9.2C8.1 25 7.2 24.1 7.2 23V20.4C7.2 19.4 8 18.6 9 18.6Z"
        stroke="#0B5D68"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="#E8F4F2"
      />
      {/* Sub-Millimeter Robotic Target Center */}
      <circle cx="14" cy="17.2" r="0.9" fill="#FFFFFF" />
    </svg>
  </div>
);

const HipIcon = () => (
  <div className="w-12 h-12 rounded-xl bg-[#F0F7F6] border border-[#D2EAE6] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E0F2EE] group-hover:border-[#B4DFD5] transition-all">
    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
      {/* Pelvic Wing & Acetabular Cup Socket */}
      <path
        d="M4.5 7.5C6.2 4.5 9.8 3.5 14 3.5C18.2 3.5 21.8 4.5 23.5 7.5C22.2 9.8 20 11 18.2 11C15.8 11 15.2 9.2 14 9.2C12.8 9.2 12.2 11 9.8 11C8 11 5.8 9.8 4.5 7.5Z"
        stroke="#0B5D68"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#E8F4F2"
      />
      {/* Femoral Head Ball (Ceramic/Titanium Implant) */}
      <circle cx="14" cy="13.2" r="3.6" stroke="#0B5D68" strokeWidth="1.8" fill="#1B8755" />
      {/* Direct Anterior Femoral Stem */}
      <path
        d="M14 16.8V20.2L11 24.5"
        stroke="#0B5D68"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20.2L17 24.5"
        stroke="#0B5D68"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="13.2" r="1.3" fill="#FFFFFF" />
    </svg>
  </div>
);

const DentalIcon = () => (
  <div className="w-12 h-12 rounded-xl bg-[#F0F7F6] border border-[#D2EAE6] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E0F2EE] group-hover:border-[#B4DFD5] transition-all">
    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
      {/* Molar Crown Contours */}
      <path
        d="M6 10C6 6 9 4.2 14 4.2C19 4.2 22 6 22 10C22 13.5 20.8 16 19.5 19.5C18.5 22.8 17.2 24 16 24C14.8 24 14.8 21.2 14 21.2C13.2 21.2 13.2 24 12 24C10.8 24 9.5 22.8 8.5 19.5C7.2 16 6 13.5 6 10Z"
        stroke="#0B5D68"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="#E8F4F2"
      />
      {/* Crown Occlusal Surface Highlight */}
      <path
        d="M10 8C11.2 7 12.6 6.5 14 6.5C15.4 6.5 16.8 7 18 8"
        stroke="#1B8755"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      {/* Titanium Implant Abutment Screw Post */}
      <path
        d="M14 12.5V17M12 14.5H16"
        stroke="#1B8755"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

const IvfIcon = () => (
  <div className="w-12 h-12 rounded-xl bg-[#F0F7F6] border border-[#D2EAE6] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E0F2EE] group-hover:border-[#B4DFD5] transition-all">
    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
      {/* Ovum Outer Protective Membrane */}
      <circle cx="14" cy="14" r="9.5" stroke="#0B5D68" strokeWidth="1.8" strokeDasharray="3.5 2" fill="#E8F4F2" />
      {/* Cellular Blastocyst Inner Mass */}
      <circle cx="12" cy="12" r="4.2" stroke="#1B8755" strokeWidth="1.7" fill="#D8EFE8" />
      <circle cx="16.5" cy="15.5" r="3" stroke="#0B5D68" strokeWidth="1.5" fill="#C2E5DC" />
      <circle cx="12" cy="12" r="1.5" fill="#1B8755" />
      {/* ICSI Microinjection Pipette */}
      <path d="M3 14H6.5M5.5 12.5L7 14L5.5 15.5" stroke="#1B8755" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const VisionIcon = () => (
  <div className="w-12 h-12 rounded-xl bg-[#F0F7F6] border border-[#D2EAE6] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#E0F2EE] group-hover:border-[#B4DFD5] transition-all">
    <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
      {/* Eye Contour */}
      <path
        d="M3 14C5.5 8.5 9.5 5.5 14 5.5C18.5 5.5 22.5 8.5 25 14C22.5 19.5 18.5 22.5 14 22.5C9.5 22.5 5.5 19.5 3 14Z"
        stroke="#0B5D68"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="#E8F4F2"
      />
      {/* Iris */}
      <circle cx="14" cy="14" r="5" stroke="#1B8755" strokeWidth="1.7" fill="#D8EFE8" />
      {/* Pupil */}
      <circle cx="14" cy="14" r="2.2" fill="#0B5D68" />
      {/* Laser Topography Crosshair Markers */}
      <path d="M14 3V5M14 23V25M3 14H5M23 14H25" stroke="#1B8755" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </div>
);

interface PriceRow {
  id: string;
  treatment: string;
  icon: React.ComponentType;
  ukUsPrice: string;
  waitTime: string;
  indiaPrice: string;
}

const PRICE_ROWS: PriceRow[] = [
  {
    id: "knee-replacement",
    treatment: "Knee Replacement (Bilateral Robotic)",
    icon: KneeIcon,
    ukUsPrice: "$38,000 – $65,000",
    waitTime: "12 – 18 Months Waiting",
    indiaPrice: "$9,500 – $13,500",
  },
  {
    id: "hip-replacement",
    treatment: "Hip Replacement (Direct Anterior)",
    icon: HipIcon,
    ukUsPrice: "$32,000 – $52,000",
    waitTime: "10 – 14 Months Waiting",
    indiaPrice: "$8,200 – $11,500",
  },
  {
    id: "full-arch-dental",
    treatment: "Full-Arch Dental (All-on-4 / Zirconia)",
    icon: DentalIcon,
    ukUsPrice: "$22,000 – $38,000",
    waitTime: "6 – 9 Months Waiting",
    indiaPrice: "$4,800 – $7,200",
  },
  {
    id: "ivf-cycle",
    treatment: "IVF Cycle with ICSI & PGT-A",
    icon: IvfIcon,
    ukUsPrice: "$14,000 – $24,000",
    waitTime: "Strict Age/NHS Caps",
    indiaPrice: "$4,200 – $6,500",
  },
  {
    id: "contoura-vision",
    treatment: "Contoura Vision Lasik (Both Eyes)",
    icon: VisionIcon,
    ukUsPrice: "$5,500 – $8,000",
    waitTime: "Not Covered by NHS",
    indiaPrice: "$1,400 – $1,900",
  },
];

export const CostTransparency = () => {
  const { openIntake } = useCare();

  return (
    <section id="costs" className="py-16 sm:py-24 bg-[#F5F7F6] border-t border-[#DCE6EB] font-sans">
      <div className="max-w-[1580px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-4xl mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECF4F7] border border-[#DCE6EB] text-[#0B5D68] text-xs font-heading font-bold uppercase tracking-wider mb-3.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B5D68]" />
            <span>TRANSPARENT ALL-INCLUSIVE PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-heading font-extrabold text-[#0C2338] mb-3 leading-[1.15] tracking-tight">
            All-Inclusive Cost Comparison
          </h2>
          <p className="text-[#6B7C88] text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
            Direct comparison between an all-in medical travel journey to India vs private out-of-pocket costs at home.
          </p>
        </div>

        {/* Global Cost Comparison Table Styled Exactly Like Reference Image */}
        <div className="overflow-x-auto rounded-2xl border border-[#DCE6EB] shadow-xs">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-[#DCE6EB]">
                {/* Left Column: Treatment Procedure */}
                <th className="bg-[#ECF4F7] py-4 sm:py-5 px-5 sm:px-8 font-heading font-bold text-sm sm:text-base text-[#0C2338] rounded-tl-2xl w-[40%]">
                  Treatment Procedure
                </th>

                {/* Middle Column 1: UK / US Private Rate */}
                <th className="bg-[#ECF4F7] py-4 sm:py-5 px-5 sm:px-6 font-heading font-bold text-sm sm:text-base text-[#0C2338] w-[22%]">
                  UK / US Private Rate
                </th>

                {/* Middle Column 2: NHS Wait Times */}
                <th className="bg-[#ECF4F7] py-4 sm:py-5 px-5 sm:px-6 font-heading font-bold text-sm sm:text-base text-[#0C2338] w-[20%]">
                  NHS / Public Wait Times
                </th>

                {/* Right Column: India Highlighted Header (Authoritative Medical Teal) */}
                <th className="bg-[#0B5D68] py-4 sm:py-5 px-5 sm:px-8 font-heading font-bold text-sm sm:text-base text-white rounded-tr-2xl w-[18%] text-left">
                  India (Your Medicare Trip)
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#DCE6EB]">
              {PRICE_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <tr
                    key={row.id}
                    className="group transition-colors hover:bg-slate-50/70"
                  >
                    {/* Treatment Column with Custom Medical Outline Icon */}
                    <td className="py-5 sm:py-6 px-5 sm:px-8 bg-white group-hover:bg-slate-50/70 transition-colors">
                      <div className="flex items-center gap-4">
                        <Icon />
                        <span className="font-heading font-bold text-[#0C2338] text-[15px] sm:text-base leading-snug">
                          {row.treatment}
                        </span>
                      </div>
                    </td>

                    {/* UK / US Private Rate */}
                    <td className="py-5 sm:py-6 px-5 sm:px-6 bg-white group-hover:bg-slate-50/70 transition-colors font-medium text-[#1E293B] text-sm sm:text-base tabular-nums">
                      {row.ukUsPrice}
                    </td>

                    {/* NHS Wait Times */}
                    <td className="py-5 sm:py-6 px-5 sm:px-6 bg-white group-hover:bg-slate-50/70 transition-colors font-medium text-[#6B7C88] text-xs sm:text-sm">
                      {row.waitTime}
                    </td>

                    {/* India Column: Distinct Soft Tint Background running the full height */}
                    <td className="py-5 sm:py-6 px-5 sm:px-8 bg-[#ECF4F7] group-hover:bg-[#E0EEF3] transition-colors border-l border-[#DCE6EB] font-heading font-extrabold text-[#0B5D68] text-base sm:text-lg tabular-nums text-left">
                      {row.indiaPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Explanatory Asterisk and CTA */}
        <div className="mt-8 pt-5 border-t border-[#DCE6EB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#6B7C88] leading-relaxed max-w-2xl">
            * &quot;India (Your Medicare Trip)&quot; includes surgeon fees, pre-op diagnostics, theatre fees, US-FDA implant costs, inpatient stay, attendant accommodation, and local transport.
          </p>
          <button
            onClick={() => openIntake("Cost Comparison Consultation")}
            className="px-7 py-3.5 rounded-xl bg-[#F0A126] hover:bg-[#db8e18] text-[#0C2338] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#F0A126]/20 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Get Itemised Written Quote</span>
            <ArrowRight className="w-4 h-4 text-[#0C2338] stroke-[2.4]" />
          </button>
        </div>
      </div>
    </section>
  );
};
