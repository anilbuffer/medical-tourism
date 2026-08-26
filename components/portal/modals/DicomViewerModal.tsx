"use client";

import React, { useState } from "react";
import {
  FileText,
  Sliders,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sun,
  Contrast,
  Ruler,
  Layers,
  Sparkles,
  ShieldCheck,
  Download,
  Info,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface DicomViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName?: string;
}

export const DicomViewerModal: React.FC<DicomViewerModalProps> = ({
  isOpen,
  onClose,
  fileName = "Abdominal_MRI_Scans.dicom",
}) => {
  const [currentSlice, setCurrentSlice] = useState(14);
  const totalSlices = 48;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [windowLevel, setWindowLevel] = useState(120);
  const [windowWidth, setWindowWidth] = useState(350);
  const [isInverted, setIsInverted] = useState(false);
  const [activeTool, setActiveTool] = useState<"pan" | "measure" | "contrast">("contrast");
  const [showMetadata, setShowMetadata] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-6xl h-[92vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Top DICOM Header */}
        <div className="h-16 px-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2ECDC5] to-[#1baba4] flex items-center justify-center text-white shadow-md">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">
                  High-Resolution DICOM PACS Imaging Workstation
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  3.0 Tesla • Volumetric Liver Study
                </span>
              </div>
              <span className="text-[11px] text-slate-400">
                {fileName} • Patient: Tariq Al-Mansoor (PT-2026-089412)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMetadata(!showMetadata)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                showMetadata
                  ? "bg-[#2ECDC5]/15 text-[#2ECDC5] border-[#2ECDC5]/30"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>DICOM Metadata</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-2.5 bg-slate-950/70 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTool("contrast")}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTool === "contrast"
                  ? "bg-[#2ECDC5] text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Window / Level</span>
            </button>

            <button
              onClick={() => setActiveTool("measure")}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTool === "measure"
                  ? "bg-[#2ECDC5] text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Caliper (Graft Ratio)</span>
            </button>

            <button
              onClick={() => setIsInverted(!isInverted)}
              className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isInverted
                  ? "bg-amber-500 text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Contrast className="w-3.5 h-3.5" />
              <span>Invert Gray</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-[11px] text-[#2ECDC5] font-bold">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-slate-400 font-mono text-[11px]">
              Slice: <strong className="text-white">{currentSlice}</strong> of {totalSlices}
            </span>
          </div>
        </div>

        {/* Viewport Canvas + Sidebar */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 min-h-0 bg-black">
          {/* Main Imaging Screen (3 cols) */}
          <div className="lg:col-span-3 p-4 flex flex-col items-center justify-center relative select-none overflow-hidden bg-black">
            {/* Synthetic High-Res DICOM Visualization */}
            <div
              className="relative transition-all duration-150 flex items-center justify-center rounded-xl overflow-hidden border border-slate-800/80 shadow-2xl"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                filter: isInverted
                  ? `invert(100%) brightness(${windowLevel / 100}) contrast(${windowWidth / 250})`
                  : `brightness(${windowLevel / 100}) contrast(${windowWidth / 250})`,
              }}
            >
              {/* MRI Abdominal Scan Graphic */}
              <div className="w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] bg-gradient-to-br from-slate-950 via-slate-900 to-black relative flex items-center justify-center p-6">
                {/* Organ Contour Simulation */}
                <div className="w-full h-full rounded-full border-2 border-dashed border-slate-700/40 relative flex items-center justify-center">
                  {/* Liver Lobe Volumetric Shading */}
                  <div className="absolute top-10 right-10 w-52 h-44 bg-gradient-to-bl from-slate-400/40 via-slate-300/20 to-transparent rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-slate-400/50 shadow-inner flex items-center justify-center">
                    <span className="text-[10px] font-mono text-[#2ECDC5] font-black bg-slate-950/80 px-2 py-0.5 rounded border border-[#2ECDC5]/40">
                      Right Lobe: 68% SLV
                    </span>
                  </div>

                  {/* Portal Vein & Hepatic Artery branching */}
                  <div className="absolute top-28 left-28 w-24 h-24 border-r-2 border-b-2 border-emerald-400/60 rounded-full" />
                  <div className="absolute top-36 left-36 w-16 h-16 border-t-2 border-l-2 border-cyan-400/60 rounded-full" />

                  {/* Spine and vertebral baseline */}
                  <div className="w-16 h-16 rounded-2xl bg-slate-300/30 border border-slate-200/50 flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 rounded-full bg-slate-950/80" />
                  </div>

                  {/* Caliper measurement overlay */}
                  <div className="absolute bottom-12 left-16 flex items-center gap-1 bg-slate-950/90 border border-teal-400/60 px-2 py-1 rounded text-[10px] font-mono text-teal-300 shadow-md">
                    <Ruler className="w-3 h-3" />
                    <span>Transverse Diameter: 14.8 cm</span>
                  </div>
                </div>

                {/* DICOM Overlay Corner HUD Elements */}
                <div className="absolute top-3 left-3 font-mono text-[10px] text-teal-400 leading-tight">
                  <div>VEDARA PACS v4.2</div>
                  <div>ID: PT-2026-089412</div>
                  <div>SERIES: T2 Axial 3D FastSpin</div>
                </div>

                <div className="absolute top-3 right-3 font-mono text-[10px] text-teal-400 text-right leading-tight">
                  <div>Medanta NCR Liver Suite</div>
                  <div>TR: 2200ms | TE: 92ms</div>
                  <div>FOV: 380mm | Thick: 1.5mm</div>
                </div>

                <div className="absolute bottom-3 left-3 font-mono text-[10px] text-slate-400 leading-tight">
                  <div>WL: {windowLevel} | WW: {windowWidth}</div>
                  <div>SL: {currentSlice} / {totalSlices}</div>
                </div>

                <div className="absolute bottom-3 right-3 font-mono text-[10px] text-slate-400 text-right leading-tight">
                  <div>Matrix: 512x512</div>
                  <div>3.0T MAGNETOM Vida</div>
                </div>
              </div>
            </div>

            {/* Bottom Slice Scrubber Slider */}
            <div className="absolute bottom-4 left-6 right-6 bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 flex items-center gap-3">
              <button
                onClick={() => setCurrentSlice((s) => Math.max(1, s - 1))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <input
                type="range"
                min="1"
                max={totalSlices}
                value={currentSlice}
                onChange={(e) => setCurrentSlice(Number(e.target.value))}
                className="flex-1 accent-[#2ECDC5] cursor-pointer"
              />

              <button
                onClick={() => setCurrentSlice((s) => Math.min(totalSlices, s + 1))}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Metadata & Multi-Slice Reel */}
          {showMetadata && (
            <div className="p-4 border-l border-slate-800 bg-slate-950 flex flex-col min-h-0 text-xs overflow-y-auto space-y-4 scrollbar-thin">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2ECDC5] block mb-2">
                  Clinical Study Data
                </span>
                <div className="space-y-2 bg-slate-900 p-3 rounded-2xl border border-slate-800 text-[11px]">
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Study Description</span>
                    <span className="font-bold text-white">Liver Volumetry 3D</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Modality</span>
                    <span className="font-bold text-white">MR (Magnetic Resonance)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Acquisition Date</span>
                    <span className="font-bold text-white">2026-08-24</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-1">
                    <span className="text-slate-400">Slice Thickness</span>
                    <span className="font-bold text-white">1.50 mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Field Strength</span>
                    <span className="font-bold text-emerald-400">3.0 Tesla</span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                  Specialist Finding Summary
                </span>
                <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-[11px] text-emerald-200 space-y-1 leading-relaxed">
                  <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Living Donor Candidacy Cleared</span>
                  </div>
                  <p className="text-slate-300 text-[10px]">
                    No anatomical contraindications found. Standard portal bifurcation (Type 1) and dual hepatic vein drainage confirmed.
                  </p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                  Slice Reel Preview
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[10, 14, 18, 22, 26, 30].map((s) => (
                    <button
                      key={s}
                      onClick={() => setCurrentSlice(s)}
                      className={`h-16 rounded-xl border flex flex-col items-center justify-center p-1 font-mono text-[10px] transition-all cursor-pointer ${
                        currentSlice === s
                          ? "bg-[#2ECDC5]/20 border-[#2ECDC5] text-[#2ECDC5]"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 mb-1" />
                      <span>SL-{s}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
