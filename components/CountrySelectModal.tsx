'use client';

import React, { useState, useEffect, useRef, useId, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ChevronDown, Globe } from 'lucide-react';
import { COUNTRIES, type CountryOption } from '@/data/countriesData';
import { CountryFlag } from '@/components/CountryFlag';
import { useCountry } from '@/components/providers/AppProviders';

export interface CountrySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountry?: CountryOption;
  onSelectCountry?: (country: CountryOption) => void;
  countries?: CountryOption[];
}

export const CountrySelectModal: React.FC<CountrySelectModalProps> = ({
  isOpen,
  onClose,
  selectedCountry: propSelectedCountry,
  onSelectCountry: propOnSelectCountry,
  countries: propCountries,
}) => {
  const titleId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Directly access CountryContext
  const { selectedCountry: ctxSelectedCountry, setSelectedCountry: ctxSetSelectedCountry } = useCountry();

  const countries = propCountries || COUNTRIES;
  const activeSelectedCountry = propSelectedCountry || ctxSelectedCountry || countries[0];
  const commitSelection = propOnSelectCountry || ctxSetSelectedCountry;

  // Temporary/staged country inside modal.
  // Changes are ONLY committed when user clicks "Select".
  const [pendingCountry, setPendingCountry] = useState<CountryOption>(activeSelectedCountry);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync / reset pending country whenever modal opens or selectedCountry changes without triggering setState inside useEffect
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevSelectedCountryCode, setPrevSelectedCountryCode] = useState(activeSelectedCountry?.code);

  if (isOpen !== prevIsOpen || activeSelectedCountry?.code !== prevSelectedCountryCode) {
    setPrevIsOpen(isOpen);
    setPrevSelectedCountryCode(activeSelectedCountry?.code);
    if (isOpen) {
      setPendingCountry(activeSelectedCountry || countries[0]);
      setIsDropdownOpen(false);
    }
  }

  // Close dropdown on click outside the dropdown container inside the modal
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isDropdownOpen]);

  // Lock body scroll while modal is active
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Discard any staged selection and close
  const handleCancel = useCallback(() => {
    setPendingCountry(activeSelectedCountry || countries[0]);
    setIsDropdownOpen(false);
    onClose();
  }, [activeSelectedCountry, countries, onClose]);

  // Commit selected country and close
  const handleSelect = useCallback(() => {
    if (pendingCountry && commitSelection) {
      commitSelection(pendingCountry);
    }
    setIsDropdownOpen(false);
    onClose();
  }, [pendingCountry, commitSelection, onClose]);

  // Handle keyboard events (Escape to close dropdown or modal)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else {
          handleCancel();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isDropdownOpen, handleCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          onClick={handleCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-[#e1e6e5] overflow-visible my-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            {/* Modal Header */}
            <div className="pt-7 px-8 pb-5 flex items-start justify-between gap-4 border-b border-[#f1f4f4]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#dcf1f8] text-[#0b383e] flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Globe className="w-5 h-5 text-[#0b383e]" />
                </div>
                <div>
                  <h2
                    id={titleId}
                    className="text-xl font-bold text-[#0b383e] leading-snug tracking-tight"
                  >
                    Select Country
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                    Choose your departure country or home region
                  </p>
                </div>
              </div>

              {/* Close Button (cancels any unsaved selection) */}
              <button
                type="button"
                onClick={handleCancel}
                aria-label="Close modal without saving"
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with Dropdown */}
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#404948] uppercase tracking-wider mb-2.5">
                  Country / Region
                </label>

                {/* Custom Accessible Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                    className={`w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl border-2 transition-all cursor-pointer text-left ${
                      isDropdownOpen
                        ? 'border-[#0b383e] bg-white ring-4 ring-[#8bd2ea]/30'
                        : 'border-[#e1e6e5] bg-[#f8fafa] hover:border-[#8bd2ea] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Country Flag / Code Badge */}
                      <span className="w-10 h-7 rounded-md bg-[#e4f3f8] text-[#0b383e] font-extrabold text-xs flex items-center justify-center tracking-wider flex-shrink-0">
                        {pendingCountry?.code}
                      </span>
                      {pendingCountry?.code !== 'OT' && (
                        <CountryFlag code={pendingCountry?.code} className="inline-flex" />
                      )}
                      <span className="font-semibold text-base sm:text-lg text-[#131a1b] truncate">
                        {pendingCountry?.label || pendingCountry?.name}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-[#0b383e]' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu Options */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 bg-white rounded-2xl border border-[#e1e6e5] shadow-xl overflow-hidden py-1.5 max-h-72 overflow-y-auto"
                        role="listbox"
                      >
                        {countries.map((country) => {
                          const isSelected = country.code === pendingCountry?.code;
                          return (
                            <button
                              key={country.code}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => {
                                setPendingCountry(country);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-[#edf6f3] text-[#0b383e] font-semibold'
                                  : 'hover:bg-gray-50 text-[#131a1b]'
                              }`}
                            >
                              <div className="flex items-center gap-3.5 min-w-0">
                                <span
                                  className={`w-10 h-7 rounded-md font-extrabold text-xs flex items-center justify-center tracking-wider flex-shrink-0 ${
                                    isSelected
                                      ? 'bg-[#0b383e] text-white'
                                      : 'bg-[#e4f3f8] text-[#0b383e]'
                                  }`}
                                >
                                  {country.code}
                                </span>
                                {country.code !== 'OT' && (
                                  <CountryFlag code={country.code} className="inline-flex" />
                                )}
                                <span className="text-sm sm:text-base font-medium truncate">
                                  {country.label || country.name}
                                </span>
                              </div>

                              {isSelected && (
                                <Check className="w-5 h-5 text-[#0b383e] flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Modal Footer with Cancel and Select Buttons */}
            <div className="p-8 pt-4 pb-7 border-t border-[#f1f4f4] flex items-center justify-end gap-3.5 bg-[#fdfdfd] rounded-b-3xl">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 font-semibold text-sm sm:text-base transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSelect}
                className="px-7 py-3 rounded-full bg-[#0b383e] hover:bg-[#095458] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow transition-all cursor-pointer flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Select</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountrySelectModal;
