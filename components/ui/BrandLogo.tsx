"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "white" | "color";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "h-10 sm:h-11 w-auto",
  variant = "white",
}) => {
  const isWhite = variant === "white";
  const crossColor = isWhite ? "#ffffff" : "#0B5D68";
  const textColor = isWhite ? "#ffffff" : "#0C2338";
  const accentColor = "#F0A126";
  const subtextColor = isWhite ? "rgba(255, 255, 255, 0.85)" : "#6B7C88";

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <svg
        viewBox="0 0 310 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto block"
        style={{ imageRendering: "crisp-edges" }}
      >
        {/* Cross + Ascending Swoosh Group */}
        <g transform="translate(4, 4)">
          {/* Medical Cross */}
          <rect x="15" y="0" width="16" height="46" rx="5" fill={crossColor} />
          <rect x="0" y="15" width="46" height="16" rx="5" fill={crossColor} />

          {/* Golden Dynamic Swoosh Arrow */}
          <path
            d="M -2 46 C 10 46 25 34 37 10"
            stroke={accentColor}
            strokeWidth="3.75"
            strokeLinecap="round"
          />
          {/* Arrowhead */}
          <polygon
            points="37,4 42,16 31,12"
            fill={accentColor}
          />
        </g>

        {/* Wordmark Text: Vector Poppins Typography */}
        <text
          x="66"
          y="33"
          fontFamily="Poppins, 'Poppins Fallback', system-ui, sans-serif"
          fontSize="29"
          fontWeight="400"
          fill={textColor}
          letterSpacing="-0.01em"
        >
          your<tspan fontWeight="700" fill={textColor}>Medicare</tspan><tspan fontWeight="700" fill={accentColor}>Trip</tspan>
        </text>

        {/* Subtitle: High Precision Subtext */}
        <text
          x="68"
          y="47"
          fontFamily="'Roboto', system-ui, -apple-system, sans-serif"
          fontSize="7.5"
          fontWeight="700"
          letterSpacing="0.24em"
          fill={subtextColor}
        >
          YOUR MEDICAL TRAVEL COMPANY
        </text>
      </svg>
    </div>
  );
};
