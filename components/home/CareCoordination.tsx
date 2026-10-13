"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Building2, 
  ClipboardCheck, 
  Plane, 
  Video, 
  Pill, 
  HeartHandshake 
} from "lucide-react";

export const CareCoordination: React.FC = () => {
  const [processedDoctorSrc, setProcessedDoctorSrc] = useState<string | null>(null);

  // Client-side canvas floodfill to make pure white background transparent
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = "/doctor-center-portrait.jpg";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;
        const visited = new Uint8Array(w * h);
        const queue: number[] = [0, w - 1, (h - 1) * w, (h - 1) * w + (w - 1)];

        while (queue.length > 0) {
          const idx = queue.pop()!;
          if (visited[idx]) continue;
          visited[idx] = 1;
          const p = idx * 4;
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];
          // Flood fill near-white studio background
          if (r > 215 && g > 215 && b > 215) {
            data[p + 3] = 0; // Make transparent
            const x = idx % w;
            const y = Math.floor(idx / w);
            if (x > 0 && !visited[idx - 1]) queue.push(idx - 1);
            if (x < w - 1 && !visited[idx + 1]) queue.push(idx + 1);
            if (y > 0 && !visited[idx - w]) queue.push(idx - w);
            if (y < h - 1 && !visited[idx + w]) queue.push(idx + w);
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setProcessedDoctorSrc(canvas.toDataURL("image/png"));
      } catch {
        // Fallback to original image if canvas is restricted
        setProcessedDoctorSrc("/doctor-center-portrait.jpg");
      }
    };
    img.onerror = () => {
      setProcessedDoctorSrc("/doctor-center-portrait.jpg");
    };
  }, []);

  const leftFeatures = [
    {
      title: "In-Hospital Bedside Liaison",
      desc: "Daily visits and direct communication with your treating doctors and surgical unit.",
      icon: Building2,
    },
    {
      title: "Pre-Departure Evaluation",
      desc: "Comprehensive clinical review and recovery checks before discharging to your recovery suite.",
      icon: ClipboardCheck,
    },
    {
      title: "Fit-to-Fly Certification",
      desc: "Official medical clearances and documentation required by international airlines.",
      icon: Plane,
    },
  ];

  const rightFeatures = [
    {
      title: "Scheduled Teleconsultations",
      desc: "Follow-up video consultations with your operating surgeon after returning home.",
      icon: Video,
    },
    {
      title: "Prescription Handover",
      desc: "Full supply of post-op medications with international equivalents and dosages.",
      icon: Pill,
    },
    {
      title: "24/7 Dedicated Coordinator",
      desc: "Direct WhatsApp and phone liaison for recovery questions and local doctor handover.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="aftercare" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#DCE5EB]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#DCE5EB] text-xs font-semibold text-[#087F79] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F79]" />
            <span>Aftercare &amp; Continuity</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#102B46] tracking-tight leading-tight">
            The Right Choice for Your
            <span className="block mt-1 text-[#087F79]">Healthcare &amp; Recovery Needs</span>
          </h2>
        </div>

        {/* Master Split Card with Overlapping Center Doctor */}
        <div className="relative rounded-3xl overflow-visible border border-[#DCE5EB] shadow-xl">
          
          {/* 2-Panel Background Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden items-stretch">
            
            {/* Left Panel: Light Mint (6 Cols) */}
            <div className="lg:col-span-6 bg-[#EAF5F4] p-8 sm:p-10 lg:p-12 xl:p-14 lg:pr-36 xl:pr-48 flex flex-col justify-center space-y-7 sm:space-y-9">
              {leftFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-4 sm:gap-5">
                    {/* Icon on Left */}
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#DCE5EB] flex items-center justify-center text-[#087F79] shrink-0 shadow-2xs mt-0.5">
                      <Icon className="w-5 h-5 text-[#087F79]" />
                    </div>

                    {/* Text on Right */}
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#102B46] leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#627486] mt-1.5 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Panel: Deep Navy (6 Cols) */}
            <div className="lg:col-span-6 bg-[#102B46] text-white p-8 sm:p-10 lg:p-12 xl:p-14 lg:pl-36 xl:pl-48 flex flex-col justify-center space-y-7 sm:space-y-9">
              {rightFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start justify-between lg:justify-end gap-4 sm:gap-5">
                    {/* Text on Left (Right-aligned on desktop) */}
                    <div className="flex-1 text-left lg:text-right">
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Icon on Right */}
                    <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#2ECDC5] shrink-0 shadow-2xs mt-0.5">
                      <Icon className="w-5 h-5 text-[#2ECDC5]" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Desktop Center Doctor Figure (Standing in middle seam) */}
          <div className="hidden lg:flex absolute inset-y-0 left-1/2 -translate-x-1/2 -top-12 bottom-0 w-[340px] xl:w-[370px] items-end justify-center pointer-events-none z-20">
            <div className="relative w-full h-[520px]">
              {processedDoctorSrc && (
                <Image
                  src={processedDoctorSrc}
                  alt="Medical specialist and care coordinator"
                  fill
                  sizes="(max-width: 1280px) 340px, 370px"
                  className="object-contain object-bottom drop-shadow-2xl transition-opacity duration-300"
                  priority
                  unoptimized
                />
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
