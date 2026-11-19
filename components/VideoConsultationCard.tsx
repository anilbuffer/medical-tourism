'use client';

import React from 'react';
import { ArrowRight, Video } from 'lucide-react';
import { useConsultation } from '@/components/providers/ConsultationProvider';

export type VideoConsultationCardVariant = 'banner' | 'dark' | 'elevated';

export interface VideoConsultationCardProps {
  variant?: VideoConsultationCardVariant;
  treatmentTitle?: string;
  badge?: string;
  title?: string;
  buttonText?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const VideoConsultationCard: React.FC<VideoConsultationCardProps> = ({
  variant = 'banner',
  treatmentTitle,
  badge,
  title,
  buttonText,
  className = '',
  style,
  onClick,
}) => {
  const { setOpen } = useConsultation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    setOpen(true, treatmentTitle);
  };

  // 1. Elevated variant (ContactSection on home page)
  if (variant === 'elevated') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group relative flex flex-col justify-between p-7 sm:p-9 rounded-[28px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 cursor-pointer text-white shadow-lg hover:shadow-2xl text-left border w-full ${className}`}
        style={{
          background: 'linear-gradient(145deg, #082d32 0%, #051e22 100%)',
          borderColor: 'rgba(255, 255, 255, 0.12)',
          ...style,
        }}
      >
        <div className="flex items-center justify-between gap-3 relative z-10 mb-6 w-full">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 shadow-xs">
              {badge || 'FREE'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/80 font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Free 30-min video call</span>
            </span>
          </div>

          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/15 text-white/90 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20 group-hover:text-white group-hover:shadow-md">
            <Video className="w-6 h-6" />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center my-3">
          <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
            {title || 'Schedule 30-min video call'}
          </h3>
        </div>

        <div className="relative z-10 mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-sm font-semibold text-white/90 group-hover:text-white transition-colors w-full">
          <span>{buttonText || 'Book your video appointment'}</span>
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/25 group-hover:text-white group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </button>
    );
  }

  // 2. Dark variant (CtaBand & doctors detail page)
  if (variant === 'dark') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`group flex flex-col justify-between p-6 rounded-[22px] bg-[#0b383e] text-white shadow-md hover:-translate-y-1 transition-all min-h-[160px] text-left cursor-pointer w-full ${className}`}
        style={style}
      >
        <div>
          <small className="text-xs text-white/70 block mb-1 font-normal">
            {badge || 'Free, 30 minutes'}
          </small>
          <strong className="text-base sm:text-lg font-bold text-white">
            {title || 'Video consultation'}
          </strong>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white/90 pt-4 border-t border-white/10 mt-4 w-full">
          <span>{buttonText || 'Book your video appointment'}</span>
          <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-[#8bd2ea] group-hover:bg-[#8bd2ea] group-hover:text-[#0b383e] transition-colors">
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </button>
    );
  }

  // 3. Banner / Default variant (Standard in all page dark bands, matching uploaded image)
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`group flex flex-col justify-between p-5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-left cursor-pointer w-full ${className}`}
      style={style}
    >
      <div>
        <span className="text-xs font-semibold text-[#8bd2ea]">
          {badge || 'Free, 30 minutes'}
        </span>
        <strong className="block text-base sm:text-lg font-bold text-white mt-1">
          {title || 'Video consultation'}
        </strong>
      </div>
      <div className="flex items-center gap-2 text-xs font-bold text-white/90 mt-4 group-hover:text-white">
        <span>{buttonText || 'Book your appointment'}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
};

export const ConsultationCard = VideoConsultationCard;

