import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SecondaryLinkProps {
  href: string;
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

export const SecondaryLink: React.FC<SecondaryLinkProps> = ({
  href,
  children,
  showArrow = true,
  className = "",
}) => {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl bg-white hover:bg-[#EAF5F4] active:scale-95 text-[#102B46] border border-[#DCE5EB] hover:border-[#087F79]/50 font-semibold text-sm tracking-wide transition-all duration-300 shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] focus-visible:ring-offset-2 group ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight className="w-4 h-4 text-[#087F79] transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
};
