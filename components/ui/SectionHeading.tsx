import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  centered = false,
  className = "",
}) => {
  return (
    <div className={`${centered ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF5F4] border border-[#DCE5EB] text-[#087F79] text-xs font-semibold uppercase tracking-wider mb-3.5 shadow-2xs ${
            centered ? "mx-auto" : ""
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#087F79]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-[#102B46] tracking-tight leading-[1.2]">
        {title}
      </h2>
      {description && (
        <p className="text-[#627486] text-sm sm:text-base mt-3 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};
