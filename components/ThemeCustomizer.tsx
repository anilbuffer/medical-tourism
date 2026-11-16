'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  X, 
  RotateCcw, 
  Check,  
  Sliders, 
  Type, 
  Lock,
} from 'lucide-react';
import { THEME_PRESETS } from '@/data/contentData';
import { ThemePreset } from '@/types';

export const ThemeCustomizer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('signature-tmtc');
  
  // Custom Color State
  const [customPrimary, setCustomPrimary] = useState<string>(THEME_PRESETS[0].primary);
  const [customSecondary, setCustomSecondary] = useState<string>(THEME_PRESETS[0].secondary);
  const [customMint, setCustomMint] = useState<string>(THEME_PRESETS[0].mint);
  const [customSurface, setCustomSurface] = useState<string>(THEME_PRESETS[0].surfaceBase);
  const [customTextColor, setCustomTextColor] = useState<string>(THEME_PRESETS[0].high);

  const hexToRgb = (hex: string): string => {
    const clean = hex.replace('#', '');
    if (clean.length === 3) {
      const r = parseInt(clean[0] + clean[0], 16);
      const g = parseInt(clean[1] + clean[1], 16);
      const b = parseInt(clean[2] + clean[2], 16);
      return `${r}, ${g}, ${b}`;
    }
    if (clean.length === 6) {
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    return '139, 210, 234';
  };

  // Apply colors to root document
  const applyColors = (
    primary: string,
    secondary: string,
    mint: string,
    surface: string,
    textColor: string,
    limeTint?: string
  ) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    root.style.setProperty('--color-primary', primary);
    root.style.setProperty('--color-secondary', secondary);
    root.style.setProperty('--color-mint', mint);
    root.style.setProperty('--color-surface-base', surface);
    root.style.setProperty('--color-high', textColor);

    const secRgb = hexToRgb(secondary);
    root.style.setProperty('--color-secondary-rgb', secRgb);
    root.style.setProperty('--color-heading-highlight', `color-mix(in srgb, ${secondary} 25%, transparent)`);
    if (limeTint) {
      root.style.setProperty('--color-lime-tint', limeTint);
    } else {
      root.style.setProperty('--color-lime-tint', `color-mix(in srgb, ${secondary} 25%, transparent)`);
    }

    // Derived lighter/darker states
    root.style.setProperty('--color-surface-dim', surface === '#ffffff' ? '#f8fafa' : '#f1f5f9');
  };

  const handleSelectPreset = (preset: ThemePreset) => {
    setSelectedPresetId(preset.id);
    setCustomPrimary(preset.primary);
    setCustomSecondary(preset.secondary);
    setCustomMint(preset.mint);
    setCustomSurface(preset.surfaceBase);
    setCustomTextColor(preset.high);

    applyColors(
      preset.primary,
      preset.secondary,
      preset.mint,
      preset.surfaceBase,
      preset.high,
      preset.limeTint
    );
  };

  const handleCustomPrimaryChange = (val: string) => {
    setCustomPrimary(val);
    setSelectedPresetId('custom');
    applyColors(val, customSecondary, customMint, customSurface, customTextColor);
  };

  const handleCustomSecondaryChange = (val: string) => {
    setCustomSecondary(val);
    setSelectedPresetId('custom');
    applyColors(customPrimary, val, customMint, customSurface, customTextColor);
  };

  const handleCustomSurfaceChange = (val: string) => {
    setCustomSurface(val);
    setSelectedPresetId('custom');
    applyColors(customPrimary, customSecondary, customMint, val, customTextColor);
  };

  const handleCustomTextChange = (val: string) => {
    setCustomTextColor(val);
    setSelectedPresetId('custom');
    applyColors(customPrimary, customSecondary, customMint, customSurface, val);
  };

  const handleReset = () => {
    handleSelectPreset(THEME_PRESETS[0]);
  };

  return (
    <>
      {/* Floating Trigger Button positioned above WhatsApp button */}
      <div className="fixed bottom-24 right-6 z-50">
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-shadow border border-white/20"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-surface-base)',
          }}
          aria-label="Open Theme & Palette Studio"
        >
          <div 
            className="w-7 h-7 rounded-full flex items-center justify-center animate-spin-slow"
            style={{ backgroundColor: 'var(--color-secondary)', color: 'var(--color-primary)' }}
          >
            <Palette className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-black leading-none">Theme & Colors</div>
            <div className="text-[10px] text-white/70 mt-0.5">Customizer Studio</div>
          </div>
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--color-secondary)' }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: 'var(--color-secondary)' }} />
          </span>
        </motion.button>
      </div>

      {/* Slide-in Drawer Modal with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto p-6 flex flex-col justify-between border-l"
              style={{ borderColor: 'var(--color-surface-outline)' }}
              onClick={e => e.stopPropagation()}
            >
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: 'var(--color-surface-outline)' }}>
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' }}
                  >
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">
                      Theme & Color Studio
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Live preview color customizer
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                    title="Reset to default theme"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Typography Integrity Pill - Exactly preserves Mulish font as requested */}
              <div 
                className="my-5 p-3.5 rounded-2xl border flex items-start gap-3 bg-slate-50"
                style={{ borderColor: 'var(--color-surface-outline)' }}
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-secondary)' }}
                >
                  <Type className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-900">
                    <span>Typography: Mulish (Locked)</span>
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    Consistent Google Mulish typography, letter-spacing, and line heights remain strictly preserved across all color schemes.
                  </p>
                </div>
              </div>

              {/* Presets List */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-700">
                    Curated Color Palettes
                  </span>
                  <span className="text-[10px] text-gray-400">Click to apply</span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {THEME_PRESETS.map(preset => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'ring-2 ring-emerald-600 shadow-sm bg-emerald-50/30'
                            : 'hover:bg-gray-50 bg-white'
                        }`}
                        style={{
                          borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface-outline)',
                        }}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-gray-900 truncate">
                              {preset.name}
                            </span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-[10px] text-gray-500 truncate mt-0.5">
                            {preset.description}
                          </div>
                        </div>

                        {/* Color Swatch Dots */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <span 
                            className="w-4 h-4 rounded-full border border-black/10 shadow-inner" 
                            style={{ backgroundColor: preset.primary }} 
                            title={`Primary: ${preset.primary}`}
                          />
                          <span 
                            className="w-4 h-4 rounded-full border border-black/10 shadow-inner" 
                            style={{ backgroundColor: preset.secondary }} 
                            title={`Secondary: ${preset.secondary}`}
                          />
                          <span 
                            className="w-4 h-4 rounded-full border border-black/10 shadow-inner" 
                            style={{ backgroundColor: preset.mint }} 
                            title={`Mint: ${preset.mint}`}
                          />
                          <span 
                            className="w-4 h-4 rounded-full border border-black/10 shadow-inner" 
                            style={{ backgroundColor: preset.high }} 
                            title={`Text: ${preset.high}`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Fine-Tuning Pickers */}
              <div className="pt-4 border-t" style={{ borderColor: 'var(--color-surface-outline)' }}>
                <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-gray-700 mb-3">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Custom Color Adjuster</span>
                </div>

                <div className="space-y-3">
                  {/* Primary Color */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border bg-gray-50">
                    <div>
                      <div className="text-xs font-bold text-gray-800">Primary Brand Color</div>
                      <div className="text-[10px] text-gray-400">Buttons, headers, accents</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-600 uppercase">{customPrimary}</span>
                      <input
                        type="color"
                        value={customPrimary}
                        onChange={e => handleCustomPrimaryChange(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Secondary Accent */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border bg-gray-50">
                    <div>
                      <div className="text-xs font-bold text-gray-800">Accent / Secondary</div>
                      <div className="text-[10px] text-gray-400">Highlights, badges, stars</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-600 uppercase">{customSecondary}</span>
                      <input
                        type="color"
                        value={customSecondary}
                        onChange={e => handleCustomSecondaryChange(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Text Color */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border bg-gray-50">
                    <div>
                      <div className="text-xs font-bold text-gray-800">Typography Text Color</div>
                      <div className="text-[10px] text-gray-400">Headings, titles, high contrast</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-600 uppercase">{customTextColor}</span>
                      <input
                        type="color"
                        value={customTextColor}
                        onChange={e => handleCustomTextChange(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>

                  {/* Surface Background */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border bg-gray-50">
                    <div>
                      <div className="text-xs font-bold text-gray-800">Surface Base Color</div>
                      <div className="text-[10px] text-gray-400">Page & card background</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-600 uppercase">{customSurface}</span>
                      <input
                        type="color"
                        value={customSurface}
                        onChange={e => handleCustomSurfaceChange(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t mt-6" style={{ borderColor: 'var(--color-surface-outline)' }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl font-bold text-xs text-white shadow-md transition-all flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer"
                style={{
                  backgroundColor: 'var(--color-primary)',
                }}
              >
                <span>Apply & Close Studio</span>
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

