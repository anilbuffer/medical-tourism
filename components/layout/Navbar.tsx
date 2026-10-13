"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCare } from "@/context/CareContext";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar: React.FC = () => {
  const { openIntake } = useCare();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    // { label: "About Us", href: "/about" },
    { label: "Treatments", href: "/#treatments" },
    { label: "Hospitals", href: "/#hospitals" },
    { label: "Patient Stories", href: "/#stories" },
    // { label: "Contact", href: "/contact" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/" && typeof window !== "undefined" && window.location.hash === href.replace("/", "");
    return pathname === href;
  };

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md ${scrolled ? "border-b border-[#DCE5EB] shadow-xs" : "border-b border-[#DCE5EB]/80"
        }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Brand Logo Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] rounded-lg p-1"
            aria-label="YourMedicareTrip Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/logo-icon.png"
                alt="YourMedicareTrip Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-[#102B46] tracking-tight leading-none">
                YourMedicare<span className="text-[#087F79]">Trip</span>
              </span>
              <span className="text-[10px] text-[#627486] font-medium tracking-wider uppercase mt-0.5">
                Medical Travel Concierge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] ${active
                    ? "text-[#087F79] bg-[#EAF5F4]"
                    : "text-[#102B46] hover:text-[#087F79] hover:bg-[#F6F8FB]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Primary Header CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={() => openIntake("Header Free Medical Opinion")}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] active:scale-95 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79] cursor-pointer group"
            >
              <span>Get a Free Medical Opinion</span>
              <ArrowRight className="w-4 h-4 text-white stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => openIntake("Mobile Header Free Medical Opinion")}
              className="px-3.5 py-2 rounded-lg bg-[#087F79] text-white text-xs font-semibold shadow-xs"
            >
              Get Opinion
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#102B46] hover:bg-[#F6F8FB] border border-[#DCE5EB] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#087F79]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Accessible Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-white border-b border-[#DCE5EB] shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 pt-4 pb-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav aria-label="Mobile Navigation" className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-semibold text-[#102B46] hover:bg-[#EAF5F4] hover:text-[#087F79] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-3 border-t border-[#DCE5EB]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openIntake("Mobile Drawer Free Medical Opinion");
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#087F79] hover:bg-[#066f6a] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <span>Get a Free Medical Opinion</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <p className="text-center text-xs text-[#627486] mt-2.5">
                Personal guidance &bull; Clear next steps &bull; Zero obligation
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
