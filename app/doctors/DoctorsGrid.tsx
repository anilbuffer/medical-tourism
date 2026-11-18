'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DOCTORS } from '@/data/doctorsData';
import { ArrowRight, Sparkles, Stethoscope, User } from 'lucide-react';

type FilterType = 'all' | 'cardiac' | 'ortho' | 'onco' | 'neuro' | 'surgery' | 'gastro';

export function DoctorsGrid() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

  const filterTabs = [
    { id: 'all', label: 'All Specialists', icon: Sparkles },
    { id: 'cardiac', label: 'Cardiology', icon: Stethoscope },
    { id: 'ortho', label: 'Orthopaedics', icon: Stethoscope },
    { id: 'onco', label: 'Oncology', icon: Stethoscope },
    { id: 'neuro', label: 'Neuro & Spine', icon: Stethoscope },
    { id: 'surgery', label: 'Surgery', icon: Stethoscope },
    { id: 'gastro', label: 'Gastro & Liver', icon: Stethoscope },
  ] as const;

  const filteredDoctors = activeTab === 'all' 
    ? DOCTORS 
    : DOCTORS.filter((doc) => doc.group === activeTab);

  return (
    <div>
      {/* Section Header & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#e6ecea] mb-10 sm:mb-12">
        <div>
          <h2
            className="text-[30px] sm:text-[40px] font-bold tracking-tight leading-tight"
            style={{ color: 'var(--color-primary)' }}
          >
            Clinical excellence{' '}
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
              &amp; specialists
            </span>
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-full border border-gray-200 overflow-x-auto max-w-full self-start md:self-end">
          {filterTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as FilterType)}
                className={`h-[38px] px-4 sm:px-5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'shadow-xs text-white'
                    : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200/60'
                }`}
                style={isSelected ? { backgroundColor: 'var(--color-primary)' } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Doctors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {filteredDoctors.map((doc) => (
          <Link
            key={doc.slug}
            href={`/doctors/${doc.slug}`}
            className="group bg-white border border-[#e6ecea] rounded-[24px] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Photo */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-gray-100">
                {doc.img ? (
                  <Image
                    src={doc.img}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#eaf4f6] via-[#d6edf2] to-[#b8e0ea] group-hover:scale-105 transition-transform duration-500 select-none">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/75 border-2 border-[#8bd2ea]/50 flex items-center justify-center shadow-sm">
                      <User className="w-14 h-14 sm:w-16 sm:h-16 text-[#0b383e]/60 stroke-[1.5]" />
                    </div>
                    {doc.initials && (
                      <span className="mt-2 text-xs font-bold tracking-widest text-[#0b383e]/55 uppercase">
                        {doc.initials}
                      </span>
                    )}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                    Doctor
                  </span>
                </div>
                {doc.years && (
                  <div className="absolute top-3.5 right-3.5">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0b383e]/85 backdrop-blur-xs text-white shadow-xs">
                      {doc.years} exp
                    </span>
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <h3
                  className="text-[19px] sm:text-[20px] font-bold tracking-tight mb-1 group-hover:text-[#095458] transition-colors leading-snug"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {doc.name}
                </h3>
                <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-2 line-clamp-2">
                  {doc.role}
                </p>
                <div className="pt-1">
                  <span className="text-[13px] font-bold text-[#008329]">
                    {doc.department || doc.specialty}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-5 pb-5 pt-2 border-t border-[#f1f4f4] flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#095458] group-hover:text-[#0b383e] transition-colors">
                <span>View profile</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
