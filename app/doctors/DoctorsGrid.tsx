'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DOCTORS, CARE_TEAM_MEMBERS } from '@/data/doctorsData';
import { ArrowRight, Stethoscope, UserCheck, HeartPulse, Sparkles } from 'lucide-react';

type FilterType = 'all' | 'doctors' | 'care' | 'recovery';

export function DoctorsGrid() {
  const [activeTab, setActiveTab] = useState<FilterType>('all');

  const filterTabs = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'care', label: 'Care Team', icon: UserCheck },
    { id: 'recovery', label: 'Recovery', icon: HeartPulse },
  ] as const;

  const showDoctors = activeTab === 'all' || activeTab === 'doctors';
  const showCare = activeTab === 'all' || activeTab === 'care';
  const showRecovery = activeTab === 'all' || activeTab === 'recovery';

  const visibleCareMembers = CARE_TEAM_MEMBERS.filter((m) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'care' && m.tag === 'care') return true;
    if (activeTab === 'recovery' && m.tag === 'recovery') return true;
    return false;
  });

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
              &amp; care team
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

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {/* Doctors */}
        {showDoctors &&
          DOCTORS.map((doc) => (
            <Link
              key={doc.slug}
              href={`/doctors/${doc.slug}`}
              className="group bg-white border border-[#e6ecea] rounded-[24px] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={doc.img}
                    alt={doc.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                      Doctor
                    </span>
                  </div>
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
                  <p className="text-[13px] font-bold text-[#008329]">
                    {doc.years} experience
                  </p>
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

        {/* Care Team and Recovery Members */}
        {(showCare || showRecovery) &&
          visibleCareMembers.map((member) => (
            <article
              key={member.id}
              className="bg-white border border-[#e6ecea] rounded-[24px] overflow-hidden shadow-[0_1px_3px_rgba(11,56,62,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/4.5] w-full overflow-hidden bg-gray-100">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8bd2ea]" />
                      {member.tag === 'care' ? 'Care Team' : 'Recovery'}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <h3
                    className="text-[19px] sm:text-[20px] font-bold tracking-tight mb-1 leading-snug"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-2">
                    {member.role}
                  </p>
                  <p className="text-[13px] font-bold text-[#008329]">
                    {member.years} experience
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-[#f1f4f4] flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>Dedicated support</span>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

