import React from "react";
import { ArrowRight } from "lucide-react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children = "Get a Free Medical Opinion",
  showArrow = true,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-[#087F79] hover:bg-[#066f6a] active:scale-95 text-white font-semibold text-sm tracking-wide transition-all duration-300 shadow-md shadow-[#087F79]/20 hover:shadow-lg hover:shadow-[#087F79]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] focus-visible:ring-offset-2 cursor-pointer group ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 text-white stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
};
