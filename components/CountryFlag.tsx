
import React from 'react';

interface CountryFlagProps {
  code?: string;
  market?: string;
  className?: string;
}

// Precomputed integer coordinates for India's Ashoka Chakra (24 spokes) to guarantee 100% deterministic SSR/CSR hydration
const ASHOKA_CHAKRA_SPOKES = [
  { deg: 0, x2: 525, y2: 300 },
  { deg: 15, x2: 522, y2: 319 },
  { deg: 30, x2: 515, y2: 338 },
  { deg: 45, x2: 503, y2: 353 },
  { deg: 60, x2: 488, y2: 365 },
  { deg: 75, x2: 469, y2: 372 },
  { deg: 90, x2: 450, y2: 375 },
  { deg: 105, x2: 431, y2: 372 },
  { deg: 120, x2: 413, y2: 365 },
  { deg: 135, x2: 397, y2: 353 },
  { deg: 150, x2: 385, y2: 338 },
  { deg: 165, x2: 378, y2: 319 },
  { deg: 180, x2: 375, y2: 300 },
  { deg: 195, x2: 378, y2: 281 },
  { deg: 210, x2: 385, y2: 263 },
  { deg: 225, x2: 397, y2: 247 },
  { deg: 240, x2: 412, y2: 235 },
  { deg: 255, x2: 431, y2: 228 },
  { deg: 270, x2: 450, y2: 225 },
  { deg: 285, x2: 469, y2: 228 },
  { deg: 300, x2: 488, y2: 235 },
  { deg: 315, x2: 503, y2: 247 },
  { deg: 330, x2: 515, y2: 262 },
  { deg: 345, x2: 522, y2: 281 },
];

export const CountryFlag: React.FC<CountryFlagProps> = ({ code = '', market = '', className = '' }) => {
  const c = code.toUpperCase().trim();
  const m = market.toLowerCase().trim();

  // Helper for UK / United Kingdom / Great Britain
  if (
    c === 'GB' ||
    c === 'UK' ||
    c === 'GBR' ||
    m.includes('kingdom') ||
    m.includes('britain') ||
    m.includes('england') ||
    m === 'uk' ||
    m === 'gb'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="United Kingdom"
      >
        <svg viewBox="0 0 60 30" className="w-full h-full block">
          <defs>
            <clipPath id="uk-flag-saltire">
              <path d="M30 15h30v15z m0 0v15h-30z m0 0h-30v-15z m0 0v-15h30z" />
            </clipPath>
          </defs>
          <rect width="60" height="30" fill="#012169" />
          <path d="M0 0l60 30m0-30L0 30" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0 0l60 30m0-30L0 30" clipPath="url(#uk-flag-saltire)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30 0v30M0 15h60" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      </span>
    );
  }

  // Helper for Saudi Arabia
  if (
    c === 'SA' ||
    c === 'KSA' ||
    c === 'SAU' ||
    m.includes('saudi') ||
    m.includes('arabia')
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Saudi Arabia"
      >
        <svg viewBox="0 0 900 600" className="w-full h-full block">
          <rect width="900" height="600" fill="#006C35" />
          <g fill="#FFFFFF">
            {/* Arabic inscription representation */}
            <path d="M260 270c10-18 28-26 48-22 18 4 28 18 36 34 14-22 34-36 60-32 24 4 36 22 42 42 16-24 40-34 68-28 26 6 36 26 42 48 18-20 42-28 68-22 22 6 32 24 38 42h-30c-4-12-10-22-22-25-14-3-26 2-34 14-4 6-6 13-8 21h-28c-2-12-6-24-16-31-12-8-26-6-36 4-6 6-8 15-10 27h-28c-2-14-8-26-20-33-14-8-28-5-38 6-6 7-8 16-10 27h-28c-2-12-6-22-16-29-12-8-24-5-32 4-6 7-8 15-10 25h-32c0-16 4-32 18-45z" opacity="0.95" />
            {/* Sword */}
            <path d="M250 362h360v12H250z" />
            <polygon points="610,358 660,368 610,378" />
            <rect x="235" y="354" width="15" height="28" rx="3" />
            <circle cx="225" cy="368" r="7" />
          </g>
        </svg>
      </span>
    );
  }

  // Helper for UAE
  if (
    c === 'AE' ||
    c === 'ARE' ||
    c === 'UAE' ||
    m.includes('uae') ||
    m.includes('emirates') ||
    m === 'ae'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="United Arab Emirates"
      >
        <svg viewBox="0 0 1200 600" className="w-full h-full block">
          <rect width="1200" height="200" fill="#00732F" />
          <rect y="200" width="1200" height="200" fill="#FFFFFF" />
          <rect y="400" width="1200" height="200" fill="#000000" />
          <rect width="300" height="600" fill="#FF0000" />
        </svg>
      </span>
    );
  }

  // Helper for Turkey
  if (
    c === 'TR' ||
    c === 'TUR' ||
    m.includes('turkey') ||
    m.includes('türkiye') ||
    m === 'tr'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Turkey"
      >
        <svg viewBox="0 0 1200 800" className="w-full h-full block">
          <rect width="1200" height="800" fill="#E30A17" />
          <circle cx="430" cy="400" r="200" fill="#FFFFFF" />
          <circle cx="480" cy="400" r="160" fill="#E30A17" />
          <polygon points="630,400 710,425 680,345 730,380 645,380" fill="#FFFFFF" transform="rotate(-19 680 380)" />
        </svg>
      </span>
    );
  }

  // Helper for Thailand
  if (
    c === 'TH' ||
    c === 'THA' ||
    m.includes('thailand') ||
    m === 'th'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Thailand"
      >
        <svg viewBox="0 0 900 600" className="w-full h-full block">
          <rect width="900" height="600" fill="#A51931" />
          <rect y="100" width="900" height="400" fill="#FFFFFF" />
          <rect y="200" width="900" height="200" fill="#2D2A4A" />
        </svg>
      </span>
    );
  }

  // Helper for Oman
  if (
    c === 'OM' ||
    c === 'OMN' ||
    m.includes('oman') ||
    m === 'om'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Oman"
      >
        <svg viewBox="0 0 1200 600" className="w-full h-full block">
          <rect width="1200" height="200" fill="#FFFFFF" />
          <rect y="200" width="1200" height="200" fill="#DB161B" />
          <rect y="400" width="1200" height="200" fill="#008000" />
          <rect width="300" height="600" fill="#DB161B" />
        </svg>
      </span>
    );
  }

  // Helper for Egypt
  if (
    c === 'EG' ||
    c === 'EGY' ||
    m.includes('egypt') ||
    m === 'eg'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Egypt"
      >
        <svg viewBox="0 0 900 600" className="w-full h-full block">
          <rect width="900" height="200" fill="#C8102E" />
          <rect y="200" width="900" height="200" fill="#FFFFFF" />
          <rect y="400" width="900" height="200" fill="#000000" />
          <path d="M430 260 h40 v40 h-40 z M420 310 h60 v15 h-60 z" fill="#C09A3E" />
        </svg>
      </span>
    );
  }

  // Helper for USA
  if (
    c === 'US' ||
    c === 'USA' ||
    m.includes('united states') ||
    m.includes('america') ||
    m === 'us'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="United States"
      >
        <svg viewBox="0 0 741 390" className="w-full h-full block">
          <rect width="741" height="390" fill="#B22234"/>
          <path d="M0 30h741M0 90h741M0 150h741M0 210h741M0 270h741M0 330h741" stroke="#FFFFFF" strokeWidth="30"/>
          <rect width="296.4" height="210" fill="#3C3B6E"/>
          <g fill="#FFFFFF">
            <circle cx="49" cy="35" r="9"/>
            <circle cx="98" cy="35" r="9"/>
            <circle cx="148" cy="35" r="9"/>
            <circle cx="197" cy="35" r="9"/>
            <circle cx="247" cy="35" r="9"/>
            <circle cx="74" cy="70" r="9"/>
            <circle cx="123" cy="70" r="9"/>
            <circle cx="173" cy="70" r="9"/>
            <circle cx="222" cy="70" r="9"/>
            <circle cx="49" cy="105" r="9"/>
            <circle cx="98" cy="105" r="9"/>
            <circle cx="148" cy="105" r="9"/>
            <circle cx="197" cy="105" r="9"/>
            <circle cx="247" cy="105" r="9"/>
            <circle cx="74" cy="140" r="9"/>
            <circle cx="123" cy="140" r="9"/>
            <circle cx="173" cy="140" r="9"/>
            <circle cx="222" cy="140" r="9"/>
            <circle cx="49" cy="175" r="9"/>
            <circle cx="98" cy="175" r="9"/>
            <circle cx="148" cy="175" r="9"/>
            <circle cx="197" cy="175" r="9"/>
            <circle cx="247" cy="175" r="9"/>
          </g>
        </svg>
      </span>
    );
  }

  // Helper for Canada
  if (
    c === 'CA' ||
    c === 'CAN' ||
    m.includes('canada') ||
    m === 'ca'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Canada"
      >
        <svg viewBox="0 0 1000 500" className="w-full h-full block">
          <rect width="250" height="500" fill="#D80621"/>
          <rect x="250" width="500" height="500" fill="#FFFFFF"/>
          <rect x="750" width="250" height="500" fill="#D80621"/>
          <path d="M500 95 l18 45 42 -12 -12 40 45 10 -30 35 30 18 -55 10 2 20 -35 -15 -5 54 h-10 l-5 -54 -35 15 2 -20 -55 -10 30 -18 -30 -35 45 -10 -12 -40 42 12 z" fill="#D80621"/>
        </svg>
      </span>
    );
  }

  // Helper for Australia
  if (
    c === 'AU' ||
    c === 'AUS' ||
    m.includes('australia') ||
    m === 'au'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Australia"
      >
        <svg viewBox="0 0 1200 600" className="w-full h-full block">
          <rect width="1200" height="600" fill="#00008B"/>
          <g transform="scale(0.5)">
            <rect width="600" height="300" fill="#012169"/>
            <path d="M0 0l600 300m0-300L0 300" stroke="#FFFFFF" strokeWidth="60"/>
            <path d="M0 0l600 300m0-300L0 300" stroke="#C8102E" strokeWidth="40"/>
            <path d="M300 0v300M0 150h600" stroke="#FFFFFF" strokeWidth="100"/>
            <path d="M300 0v300M0 150h600" stroke="#C8102E" strokeWidth="60"/>
          </g>
          <g fill="#FFFFFF">
            <circle cx="300" cy="450" r="55"/>
            <circle cx="900" cy="150" r="22"/>
            <circle cx="1020" cy="240" r="22"/>
            <circle cx="900" cy="400" r="22"/>
            <circle cx="780" cy="280" r="22"/>
            <circle cx="960" cy="310" r="14"/>
          </g>
        </svg>
      </span>
    );
  }

  // Helper for Germany
  if (
    c === 'DE' ||
    c === 'DEU' ||
    c === 'GER' ||
    m.includes('german') ||
    m.includes('deutsch')
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="Germany"
      >
        <svg viewBox="0 0 5 3" className="w-full h-full block">
          <rect width="5" height="1" fill="#000000" />
          <rect y="1" width="5" height="1" fill="#DD0000" />
          <rect y="2" width="5" height="1" fill="#FFCE00" />
        </svg>
      </span>
    );
  }

  // Helper for India
  if (
    c === 'IN' ||
    c === 'IND' ||
    m.includes('india') ||
    m === 'in'
  ) {
    return (
      <span 
        className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] flex-shrink-0 align-middle ${className}`}
        title="India"
      >
        <svg viewBox="0 0 900 600" className="w-full h-full block">
          <rect width="900" height="200" fill="#FF9933" />
          <rect y="200" width="900" height="200" fill="#FFFFFF" />
          <rect y="400" width="900" height="200" fill="#138808" />
          <circle cx="450" cy="300" r="75" fill="none" stroke="#000080" strokeWidth="12" />
          <circle cx="450" cy="300" r="15" fill="#000080" />
          {ASHOKA_CHAKRA_SPOKES.map(spoke => (
            <line
              key={spoke.deg}
              x1="450"
              y1="300"
              x2={spoke.x2}
              y2={spoke.y2}
              stroke="#000080"
              strokeWidth="4"
            />
          ))}
        </svg>
      </span>
    );
  }

  // Global / Default
  return (
    <span 
      className={`relative inline-flex items-center justify-center w-[22px] h-[15px] sm:w-[24px] sm:h-[16px] rounded-[3px] overflow-hidden border border-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.12)] bg-sky-700 text-white flex-shrink-0 align-middle ${className}`}
      title="Global"
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    </span>
  );
};
