"use client";

import React, { useState, useRef, useEffect } from "react";
import { PatientCase, PatientDocument } from "@/types/portal";
import { usePortal } from "@/lib/portal/store";
import {
  Layers,
  Sliders,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Sun,
  Contrast,
  Ruler,
  Info,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MessageSquare,
  Download,
  Eye,
  Sparkles,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface CSInlineDicomViewerProps {
  patientCase: PatientCase;
  onTriggerIncompleteAction?: (docTitle: string, reason: string) => void;
}

export const CSInlineDicomViewer: React.FC<CSInlineDicomViewerProps> = ({
  patientCase,
  onTriggerIncompleteAction,
}) => {
  const { updateDocumentReviewStatus, currentUser } = usePortal();

  // Selected document from case documents
  const [selectedDocId, setSelectedDocId] = useState<string>(
    patientCase.documents[0]?.id || "doc_mri_scans"
  );

  const selectedDoc =
    patientCase.documents.find((d) => d.id === selectedDocId) ||
    patientCase.documents[0];

  // DICOM PACS Controls State
  const [currentSlice, setCurrentSlice] = useState(14);
  const totalSlices = 48;
  const [zoomLevel, setZoomLevel] = useState(100);
  const [windowLevel, setWindowLevel] = useState(120);
  const [windowWidth, setWindowWidth] = useState(350);
  const [isInverted, setIsInverted] = useState(false);
  const [activeTool, setActiveTool] = useState<"pan" | "measure" | "contrast">(
    "contrast"
  );
  const [showMetadata, setShowMetadata] = useState(true);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);

  // Review status form state
  const [feedbackText, setFeedbackText] = useState("");
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  // Canvas ref for realistic procedural DICOM scan simulation
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cine loop playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingSequence) {
      interval = setInterval(() => {
        setCurrentSlice((prev) => (prev >= totalSlices ? 1 : prev + 1));
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isPlayingSequence, totalSlices]);

  // Render simulated anatomical slice with contrast & window level adjustments
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.fillStyle = isInverted ? "#ffffff" : "#020617";
    ctx.fillRect(0, 0, width, height);

    // Draw coordinate grid & orientation marks
    ctx.strokeStyle = isInverted ? "rgba(0,0,0,0.1)" : "rgba(46, 205, 197, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(width / 2, 20);
    ctx.lineTo(width / 2, height - 20);
    ctx.moveTo(20, height / 2);
    ctx.lineTo(width - 20, height / 2);
    ctx.stroke();

    // Anatomical structure simulation based on current slice and window levels
    const centerX = width / 2;
    const centerY = height / 2;
    const sliceRatio = currentSlice / totalSlices;
    const brightnessAdjust = (windowLevel - 120) * 0.4;
    const contrastAdjust = windowWidth / 350;

    // Outer contour (Torso / Abdominal wall)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(zoomLevel / 100, zoomLevel / 100);

    const baseRadiusX = 140 + Math.sin(sliceRatio * Math.PI) * 20;
    const baseRadiusY = 110 + Math.sin(sliceRatio * Math.PI) * 15;

    // Body perimeter
    ctx.fillStyle = isInverted
      ? `rgb(${Math.max(0, 200 - brightnessAdjust * 2)}, ${Math.max(0, 200 - brightnessAdjust * 2)}, ${Math.max(0, 200 - brightnessAdjust * 2)})`
      : `rgb(${Math.min(255, 30 + brightnessAdjust)}, ${Math.min(255, 35 + brightnessAdjust)}, ${Math.min(255, 45 + brightnessAdjust)})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, baseRadiusX, baseRadiusY, 0, 0, Math.PI * 2);
    ctx.fill();

    // Liver parenchyma (Right lobe predominant)
    const liverSize = 75 + Math.sin(sliceRatio * Math.PI * 1.2) * 35;
    ctx.fillStyle = isInverted
      ? `rgb(${Math.max(0, 160 - brightnessAdjust * 1.5)}, ${Math.max(0, 150 - brightnessAdjust * 1.5)}, ${Math.max(0, 170 - brightnessAdjust * 1.5)})`
      : `rgb(${Math.min(255, (65 + brightnessAdjust) * contrastAdjust)}, ${Math.min(255, (85 + brightnessAdjust) * contrastAdjust)}, ${Math.min(255, (110 + brightnessAdjust) * contrastAdjust)})`;
    ctx.beginPath();
    ctx.ellipse(-35, -15, liverSize * 0.9, liverSize * 0.7, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Portal vein & hepatic vasculature
    ctx.strokeStyle = isInverted ? "#000000" : "#2ECDC5";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-35, -15);
    ctx.bezierCurveTo(-20, -35, -10, -50, -5, -60);
    ctx.moveTo(-35, -15);
    ctx.bezierCurveTo(-45, 10, -60, 25, -70, 35);
    ctx.stroke();

    // Living Donor right lobe resection margin guide (for transplant planning)
    if (patientCase.treatmentCategory.includes("Transplant")) {
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(-15, -70);
      ctx.lineTo(-15, 60);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#F59E0B";
      ctx.font = "bold 9px monospace";
      ctx.fillText("Cantlie Line (68% Vol)", -8, -40);
    }

    // Spine / Vertebral column (Posterior)
    ctx.fillStyle = isInverted ? "#222222" : "#E2E8F0";
    ctx.beginPath();
    ctx.arc(0, 75, 22, 0, Math.PI * 2);
    ctx.fill();

    // Spinal canal
    ctx.fillStyle = isInverted ? "#ffffff" : "#020617";
    ctx.beginPath();
    ctx.arc(0, 75, 8, 0, Math.PI * 2);
    ctx.fill();

    // Kidneys
    ctx.fillStyle = isInverted ? "#888888" : "#334155";
    ctx.beginPath();
    ctx.ellipse(-75, 45, 24, 34, -0.3, 0, Math.PI * 2);
    ctx.ellipse(75, 45, 24, 34, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Measure tool overlay
    if (activeTool === "measure") {
      ctx.strokeStyle = "#EF4444";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-60, -20);
      ctx.lineTo(20, -20);
      ctx.stroke();

      // Measurement calipers & readout
      ctx.fillStyle = "#EF4444";
      ctx.fillRect(-62, -25, 4, 10);
      ctx.fillRect(18, -25, 4, 10);
      ctx.font = "bold 11px monospace";
      ctx.fillText("82.4 mm", -25, -28);
    }

    ctx.restore();

    // Orientation Labels
    ctx.fillStyle = isInverted ? "#0F172A" : "#94A3B8";
    ctx.font = "bold 11px monospace";
    ctx.fillText("A (Anterior)", width / 2 - 35, 22);
    ctx.fillText("P (Posterior)", width / 2 - 35, height - 12);
    ctx.fillText("R (Right)", 15, height / 2 + 4);
    ctx.fillText("L (Left)", width - 65, height / 2 + 4);

    // Technical HUD parameters
    ctx.fillStyle = isInverted ? "#0F172A" : "#2ECDC5";
    ctx.font = "10px monospace";
    ctx.fillText(`Slice: ${currentSlice}/${totalSlices}`, 15, 35);
    ctx.fillText(`Zoom: ${zoomLevel}%`, 15, 50);
    ctx.fillText(`WL: ${windowLevel} / WW: ${windowWidth}`, 15, 65);
    ctx.fillText(`FOV: 360mm • Matrix: 512x512`, 15, 80);
  }, [
    currentSlice,
    totalSlices,
    zoomLevel,
    windowLevel,
    windowWidth,
    isInverted,
    activeTool,
    patientCase.treatmentCategory,
  ]);

  const handleMarkReviewed = () => {
    if (!selectedDoc) return;
    updateDocumentReviewStatus(
      patientCase.id,
      selectedDoc.id,
      "reviewed",
      feedbackText || "Verified & approved by Care Coordinator desk."
    );
    setActionSuccessMsg(`✓ Document "${selectedDoc.title}" marked as Reviewed & Verified.`);
    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  const handleMarkIncomplete = () => {
    if (!selectedDoc) return;
    const note =
      feedbackText ||
      `Missing required diagnostic resolution / page. Please re-upload full scan.`;
    updateDocumentReviewStatus(
      patientCase.id,
      selectedDoc.id,
      "incomplete",
      note
    );
    setActionSuccessMsg(`⚠️ Document "${selectedDoc.title}" marked Incomplete.`);

    // Trigger parent callback to auto-populate WhatsApp template
    if (onTriggerIncompleteAction) {
      onTriggerIncompleteAction(selectedDoc.title, note);
    }

    setTimeout(() => setActionSuccessMsg(""), 4000);
  };

  const isDicomDoc =
    selectedDoc?.title.toLowerCase().endsWith(".dicom") ||
    selectedDoc?.category === "scan_imaging";

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Document Switcher Strip */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <div className="text-xs font-bold text-slate-500 shrink-0 uppercase tracking-wider">
            Patient Vault:
          </div>
          {patientCase.documents.map((doc) => {
            const isSelected = doc.id === selectedDocId;
            const isDicom = doc.title.toLowerCase().endsWith(".dicom");
            return (
              <button
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? "bg-[#101955] text-white border-[#101955] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {isDicom ? (
                  <Layers className={`w-3.5 h-3.5 ${isSelected ? "text-[#2ECDC5]" : "text-slate-500"}`} />
                ) : (
                  <FileText className={`w-3.5 h-3.5 ${isSelected ? "text-[#2ECDC5]" : "text-slate-500"}`} />
                )}
                <span className="truncate max-w-[180px]">{doc.title}</span>
                <span
                  className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold ${
                    doc.status === "reviewed"
                      ? "bg-emerald-500/20 text-emerald-700 bg-emerald-100"
                      : doc.status === "incomplete"
                      ? "bg-rose-500/20 text-rose-700 bg-rose-100"
                      : "bg-amber-500/20 text-amber-700 bg-amber-100"
                  }`}
                >
                  {doc.status}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <span className="text-xs text-slate-500">
            Version: <strong>v{selectedDoc?.currentVersion || 1}</strong>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500">
            Size: <strong>{selectedDoc?.versions[0]?.fileSize || "148.5 MB"}</strong>
          </span>
        </div>
      </div>

      {actionSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
          <span>{actionSuccessMsg}</span>
          <span className="text-[10px] text-emerald-600">Syncing with Patient Portal</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Interactive Viewer (DICOM or PDF) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          {isDicomDoc ? (
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 flex flex-col shadow-xl text-white">
              {/* DICOM PACS Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    onClick={() => setActiveTool("contrast")}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTool === "contrast"
                        ? "bg-[#2ECDC5] text-slate-950 shadow-md"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>W/L Contrast</span>
                  </button>

                  <button
                    onClick={() => setActiveTool("measure")}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeTool === "measure"
                        ? "bg-[#2ECDC5] text-slate-950 shadow-md"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Caliper</span>
                  </button>

                  <button
                    onClick={() => setIsInverted(!isInverted)}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isInverted
                        ? "bg-amber-400 text-slate-950"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Invert</span>
                  </button>

                  <button
                    onClick={() => setIsPlayingSequence(!isPlayingSequence)}
                    className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isPlayingSequence
                        ? "bg-rose-500 text-white animate-pulse"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{isPlayingSequence ? "Stop Cine" : "Play Cine"}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(50, prev - 15))}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[11px] font-bold text-[#2ECDC5]">
                    {zoomLevel}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(250, prev + 15))}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Main Canvas Viewport */}
              <div className="relative flex items-center justify-center bg-slate-900 rounded-2xl my-3 overflow-hidden border border-slate-800/80 min-h-[380px]">
                <canvas
                  ref={canvasRef}
                  width={520}
                  height={380}
                  className="max-w-full h-auto object-contain cursor-crosshair"
                />

                {/* DICOM Header Overlay */}
                {showMetadata && (
                  <div className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-sm p-3 rounded-xl border border-slate-800 text-[10px] space-y-1 font-mono text-slate-300 pointer-events-none max-w-[210px]">
                    <div className="text-[#2ECDC5] font-bold">MEDANTA RADIOLOGY PACS</div>
                    <div>MR Axial T2 Fast Spin Echo</div>
                    <div>TR: 4200ms • TE: 98ms</div>
                    <div>Flip Angle: 90° • Slice Thk: 3.0mm</div>
                    <div>Patient: {patientCase.patientName}</div>
                    <div className="text-slate-400">ID: {patientCase.id}</div>
                  </div>
                )}
              </div>

              {/* Slice Navigation Slider */}
              <div className="flex items-center gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <button
                  onClick={() => setCurrentSlice((prev) => Math.max(1, prev - 1))}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] font-bold text-slate-400 font-mono">
                    <span>Slice {currentSlice} of {totalSlices}</span>
                    <span className="text-[#2ECDC5]">Z: {(currentSlice * 3.0 - 72).toFixed(1)} mm</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={totalSlices}
                    value={currentSlice}
                    onChange={(e) => setCurrentSlice(Number(e.target.value))}
                    className="w-full accent-[#2ECDC5] cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => setCurrentSlice((prev) => Math.min(totalSlices, prev + 1))}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Document / PDF Viewer Mode */
            <div className="bg-slate-100 rounded-3xl border border-slate-200 p-6 flex flex-col items-center justify-center min-h-[460px] text-center shadow-inner">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 text-[#101955]">
                <FileText className="w-8 h-8 text-[#2ECDC5]" />
              </div>
              <h4 className="font-extrabold text-slate-900 text-base mb-1">
                {selectedDoc?.title || "Document Preview"}
              </h4>
              <p className="text-xs text-slate-500 max-w-md mb-4">
                Clinical PDF Document • {selectedDoc?.versions[0]?.fileSize || "2.4 MB"} • Categorized under{" "}
                <span className="capitalize font-semibold text-slate-700">
                  {selectedDoc?.category.replace(/_/g, " ")}
                </span>
              </p>

              {/* PDF Viewer Mock Frame */}
              <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 p-6 text-left space-y-3 shadow-md">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2ECDC5]" />
                    Page 1 of 2 Verified
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    Page 2 Missing
                  </span>
                </div>
                <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed font-mono bg-slate-50 p-3 rounded-xl">
                  <div>Patient Name: {patientCase.patientName}</div>
                  <div>Test: Complete Blood Count &amp; Liver Function Profile</div>
                  <div>ALT (SGPT): 84 U/L [High] | AST (SGOT): 92 U/L [High]</div>
                  <div>Bilirubin Total: 3.4 mg/dL [High] | Albumin: 2.8 g/dL [Low]</div>
                  <div className="text-rose-600 font-bold mt-2">
                    ⚠️ Page 2 (Viral Serology HCV/HBV + INR Coagulation) not present in scan file.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Review & Action Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          {/* Document Status & Review Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#101955]" />
                Verification Status
              </h4>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  selectedDoc?.status === "reviewed"
                    ? "bg-emerald-100 text-emerald-800"
                    : selectedDoc?.status === "incomplete"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {selectedDoc?.status || "Pending"}
              </span>
            </div>

            {selectedDoc?.csFeedback && (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block mb-0.5">Coordinator Note:</span>
                <p className="italic text-slate-600">{selectedDoc.csFeedback}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Add / Update Review Remarks
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Page 2 viral serology missing, please re-upload..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-[#2ECDC5] focus:outline-none resize-none"
              />
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleMarkReviewed}
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Verified</span>
              </button>

              <button
                onClick={handleMarkIncomplete}
                className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Mark Incomplete</span>
              </button>
            </div>
          </div>

          {/* Quick WhatsApp Action Card */}
          <div className="bg-gradient-to-br from-[#101955] to-[#1e2a78] text-white rounded-3xl p-5 shadow-lg space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2ECDC5]">
              <MessageSquare className="w-4 h-4" />
              <span>Instant Patient WhatsApp Action</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              If scans are missing or incomplete, 1-click trigger an auto-filled WhatsApp template to{" "}
              <strong>{patientCase.patientName}</strong> ({patientCase.patientPhone}).
            </p>

            <button
              onClick={() => {
                if (onTriggerIncompleteAction) {
                  onTriggerIncompleteAction(
                    selectedDoc?.title || "Diagnostic Scan",
                    selectedDoc?.csFeedback || "Missing scan pages or DICOM resolution."
                  );
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span>Send WhatsApp Missing Scan Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
