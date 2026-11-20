'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DOCTORS } from '@/data/doctorsData';
import { useDebounce } from '@/hooks/useDebounce';
import { 
  ArrowRight, 
  ArrowUp,
  Sparkles, 
  Stethoscope, 
  User, 
  Building2, 
  Eye, 
  Smile, 
  HeartPulse, 
  Flower2, 
  Scissors,
  Search,
  X 
} from 'lucide-react';

type FilterType = 'all' | 'ortho' | 'dental' | 'cosmetic' | 'fertility' | 'eye' | 'cardiac';
type HospitalFilter = 'all' | 'ace-heart-institute' | 'fortis-mohali' | 'max-super-speciality-mohali' | 'landmark-chandigarh' | 'livasa-mohali';

const HOSPITAL_NAMES: Record<string, string> = {
  'ace-heart-institute': 'ACE Heart Institute',
  'fortis-mohali': 'Fortis Hospital',
  'max-super-speciality-mohali': 'Max Super Speciality',
  'landmark-chandigarh': 'Landmark Hospital',
  'livasa-mohali': 'Livasa Hospital',
};

export function DoctorsGrid() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterType>('all');
  const [selectedHospital, setSelectedHospital] = useState<HospitalFilter>('all');
  const headingRef = useRef<HTMLHeadingElement>(null);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const handleMoveToTop = () => {
    if (headingRef.current) {
      headingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      headingRef.current.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Specialists', icon: Sparkles },
    { id: 'ortho', label: 'Orthopaedics', icon: Stethoscope },
    { id: 'dental', label: 'Dental', icon: Smile },
    { id: 'cosmetic', label: 'Cosmetic Surgery', icon: Scissors },
    { id: 'fertility', label: 'Fertility & IVF', icon: Flower2 },
    { id: 'eye', label: 'Ophthalmology', icon: Eye },
    { id: 'cardiac', label: 'Cardiac Care', icon: HeartPulse },
  ] as const;

  const hospitalTabs = [
    { id: 'all', label: 'All Hospitals' },
    { id: 'ace-heart-institute', label: 'ACE Heart Institute' },
    { id: 'fortis-mohali', label: 'Fortis Mohali' },
    { id: 'max-super-speciality-mohali', label: 'Max Mohali' },
    { id: 'landmark-chandigarh', label: 'Landmark Hospital' },
    { id: 'livasa-mohali', label: 'Livasa Hospital' },
  ] as const;

  const filteredDoctors = DOCTORS.filter((doc) => {
    const matchesSpecialty = activeTab === 'all' || doc.group === activeTab;
    const matchesHospital = selectedHospital === 'all' || doc.hospital === selectedHospital;

    // Search edge cases: leading/trailing whitespace, case insensitivity, multi-term matching on name only
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) {
      return matchesSpecialty && matchesHospital;
    }

    const doctorName = `${doc.name} ${doc.shortName || ''}`.toLowerCase();
    const queryTokens = query.split(/\s+/).filter(Boolean);
    const matchesSearch = queryTokens.every((token) => doctorName.includes(token));

    return matchesSpecialty && matchesHospital && matchesSearch;
  });

  return (
    <div>
      {/* Section Header & Filters */}
      <div className="flex flex-col gap-6 pb-6 border-b border-[#e6ecea] mb-10 sm:mb-12">
        <div>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-[30px] sm:text-[40px] font-bold tracking-tight leading-tight scroll-mt-24 focus:outline-hidden"
            style={{ color: 'var(--color-primary)' }}
          >
            Clinical excellence{' '}
            <span className="px-2.5 py-0.5 rounded-xl inline-block bg-[rgba(139,210,234,0.25)] font-semibold">
              &amp; specialists
            </span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Verified specialists across ACE Heart Institute, Fortis Mohali, Max Super Speciality Mohali, Landmark Hospital Chandigarh, and Livasa Hospital.
          </p>
        </div>

        {/* Filter Controls: Hospital selector & Specialty tabs */}
        <div className="flex flex-col gap-4">
          {/* Hospital Segment Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-bold text-[#0b383e] flex items-center gap-1.5 py-1">
              <Building2 className="w-3.5 h-3.5 text-[#008329]" />
              <span>Hospital:</span>
            </span>
            <div className="flex flex-wrap items-center gap-1.5 bg-[#f1f5f4] p-1 rounded-2xl sm:rounded-full border border-[#d8e3e0]">
              {hospitalTabs.map((hosp) => {
                const isSelected = selectedHospital === hosp.id;
                return (
                  <button
                    key={hosp.id}
                    type="button"
                    onClick={() => setSelectedHospital(hosp.id as HospitalFilter)}
                    className={`h-[34px] px-3.5 sm:px-4 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#0b383e] text-white shadow-xs'
                        : 'text-gray-700 hover:text-gray-950 hover:bg-gray-200/60'
                    }`}
                  >
                    {hosp.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Speciality Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-2xl sm:rounded-full border border-gray-200 overflow-x-auto max-w-full">
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

        {/* Search Input below tab filters */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctors by name..."
            className="w-full h-10 pl-10 pr-10 text-sm bg-white border border-[#d8e3e0] rounded-full focus:outline-hidden focus:ring-2 focus:ring-[#8bd2ea] focus:border-[#0b383e] text-gray-900 placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-gray-500">
          Showing <span className="font-bold text-[#0b383e]">{filteredDoctors.length}</span> doctors
          {selectedHospital !== 'all' && ` at ${HOSPITAL_NAMES[selectedHospital]}`}
        </p>
      </div>

      {/* Grid of Doctors */}
      {filteredDoctors.length > 0 ? (
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
                    
                    {/* Top Left: Hospital badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-[#0b383e] shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#008329]" />
                        {doc.hospital && HOSPITAL_NAMES[doc.hospital]
                          ? HOSPITAL_NAMES[doc.hospital]
                          : 'Specialist'}
                      </span>
                    </div>

                    {/* Top Right: Experience badge */}
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
      ) : (
        <div className="text-center py-16 px-4 bg-white border border-[#e6ecea] rounded-[24px]">
          <p className="text-gray-500 text-base">
            No doctors found matching the selected criteria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setActiveTab('all');
              setSelectedHospital('all');
            }}
            className="mt-4 px-5 py-2.5 rounded-full text-xs font-bold bg-[#0b383e] text-white hover:bg-[#0e484f] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Floating Move to Top Button - visible at all times */}
      <button
        type="button"
        onClick={handleMoveToTop}
        title="Move to top"
        aria-label="Move to top"
        className="fixed right-4 sm:right-6 bottom-[82px] sm:bottom-[92px] z-[890] inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#0b383e] text-white border border-[#0b383e] shadow-lg hover:bg-[#0e484f] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        <span>Move to top</span>
      </button>
    </div>
  );
}
