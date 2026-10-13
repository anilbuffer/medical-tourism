"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare } from "lucide-react";
import { useCare } from "@/context/CareContext";

export const Footer: React.FC = () => {
  const { openIntake } = useCare();
  const currentYear = new Date().getFullYear();

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello, I would like to inquire about care coordination and treatment options with YourMedicareTrip."
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <footer className="w-full bg-[#102B46] text-white">
      {/* 01. Top Consultation Bar */}
      <div className="bg-[#0A1C2E] border-t border-b border-white/10 py-5 sm:py-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Left: Dot + Heading */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#087F79]" />
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Get a free consultation
              </h3>
            </div>

            {/* Right: Phone pill + Free Consultation pill */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* Phone pill */}
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#2ECDC5]" />
                <span>+91 98765 43210</span>
              </a>

              {/* Free Consultation Pill */}
              <button
                onClick={() => openIntake("Footer Top Strip - Free Consultation")}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#087F79] hover:bg-[#066f6a] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer"
              >
                <span>Free Consultation</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 02. Main Footer Body */}
      <div className="py-14 sm:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column (8 cols): Logo, Headline & 3 Contact Fields */}
            <div className="lg:col-span-8 space-y-6">

              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 group">
                <div className="relative w-9 h-9 shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src="/logo-icon.png"
                    alt="YourMedicareTrip Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-heading font-extrabold text-xl text-white tracking-tight">
                  YourMedicare<span className="text-[#087F79]">Trip</span>
                </span>
              </Link>

              {/* Big Editorial Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white tracking-tight leading-tight">
                We&apos;re Here When You&apos;re Ready.
              </h2>

              {/* 3 Contact Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Phone Number
                  </p>
                  <p className="text-sm font-bold text-white mt-1">
                    <a href="tel:+919876543210" className="hover:text-[#2ECDC5] transition-colors">
                      +91 98765 43210
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Email Address
                  </p>
                  <p className="text-sm font-bold text-white mt-1">
                    <a href="mailto:care@yourmedicaretrip.com" className="hover:text-[#2ECDC5] transition-colors">
                      care@yourmedicaretrip.com
                    </a>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-sm font-bold text-white mt-1">
                    Delhi NCR &amp; Mohali, India
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column (4 cols): Join Our Community + Social Icons */}
            <div className="lg:col-span-4 space-y-4 lg:pl-6">
              <h3 className="text-base font-bold text-white">
                Join Our Community
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Join us today for resources, clinical insights &amp; patient coordination guides.
              </p>

              {/* Social Media Circular Buttons */}
              <div className="flex items-center gap-3 pt-2">
                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#087F79] hover:border-[#087F79] text-white flex items-center justify-center transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#087F79] hover:border-[#087F79] text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                {/* X / Twitter */}
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#087F79] hover:border-[#087F79] text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#087F79] hover:border-[#087F79] text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-[#087F79] hover:border-[#087F79] text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-white/10 my-8 sm:my-10" />

          {/* Bottom Bar: Left Nav Links, Right Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            {/* Left: Navigation Links */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/treatments" className="hover:text-white transition-colors">
                Treatments
              </Link>
              <Link href="/hospitals" className="hover:text-white transition-colors">
                Hospitals
              </Link>
              <Link href="/#journey" className="hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>

            {/* Right: Copyright */}
            <div>
              Copyright &copy; {currentYear} YourMedicareTrip. All Rights Reserved.
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
