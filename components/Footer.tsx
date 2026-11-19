'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Star,
  ArrowRight
} from 'lucide-react';
import { useConsultation } from '@/components/providers/AppProviders';

export const Footer: React.FC = () => {
  const { setOpen } = useConsultation();

  const quickLinks: Array<{ label: string; href?: string; isConsultation?: boolean }> = [
    { label: 'Home', href: '/' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Care Services', href: '/care-services' },
    { label: 'Why Choose Us', href: '/why-choose-us' },
    { label: 'Hospitals', href: '/hospitals' },
    { label: 'Doctors', href: '/doctors' },
    { label: 'Aftercare', href: '/aftercare' },
    { label: 'Destination & Stay', href: '/destination' },
    { label: 'Testimonials', href: '/#stories' },
    { label: 'Patient Guides', href: '/guides' },
    { label: 'Social', href: '/#social' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', isConsultation: true },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms-of-use' },
  ];

  const treatmentLinks = [
    { label: 'Orthopaedics', href: '/treatments/knee-replacement' },
    { label: 'Fertility Care', href: '/treatments/ivf' },
    { label: 'Eye Care', href: '/treatments/cataract-surgery' },
    { label: 'Dental', href: '/treatments/dental-implants' },
    { label: 'Cosmetic Surgery', href: '/treatments/rhinoplasty' },
    { label: 'Health Check-ups', href: '/treatments/health-checkups' },
    { label: 'Wellness', href: '/treatments/wellness' },
  ];

  return (
    <footer 
      className="relative z-[4] text-white overflow-hidden"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      {/* ======================================================== */}
      {/* MAIN LARGE WHITE FLOATING CARD                           */}
      {/* ======================================================== */}
      <div className="py-8 sm:py-10 lg:py-14">
        <div className="w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="overflow-hidden rounded-[24px] lg:rounded-[32px] bg-white text-gray-900 px-6 py-10 sm:px-10 lg:px-12 xl:px-14 lg:py-14 shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_0.8fr_1.3fr] gap-10 lg:gap-8 xl:gap-12 items-start">
              
              {/* Column 1: Brand Logo, TrustScore & Socials */}
              <div className="flex flex-col items-start gap-5">
                {/* Brand Logo */}
                <Link href="/" className="inline-flex items-center gap-3 group">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    YMT
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-extrabold tracking-tight leading-none text-gray-950 uppercase">
                      YOUR MEDICARE TRIP
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
                      GLOBAL CARE SERVICES
                    </span>
                  </div>
                </Link>

                {/* Horizontal Line Divider */}
                <div aria-hidden="true" className="h-px w-20 bg-gray-200" />

                {/* Trustpilot Review Box */}
                <div className="flex flex-col items-start gap-2">
                  <div className="flex items-center gap-1 flex-nowrap shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-6 h-6 rounded-[4px] flex items-center justify-center text-white shadow-xs"
                        style={{ backgroundColor: '#00b67a' }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm font-semibold whitespace-nowrap text-gray-800">
                    TrustScore <span className="font-extrabold text-gray-950">4.8</span>
                  </p>
                </div>

                {/* Social Media Rounded Outlined Buttons */}
                <div className="pt-2">
                  <div className="flex items-center justify-start gap-2">
                    {/* X / Twitter */}
                    <a 
                      href="https://x.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="X (Twitter)"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    >
                      <svg className="size-4 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    >
                      <svg className="size-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    >
                      <svg className="size-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.762-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    >
                      <svg className="size-4 fill-current" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                    </a>
                    {/* YouTube */}
                    <a 
                      href="https://youtube.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="inline-flex size-8 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition-colors hover:bg-gray-900 hover:text-white hover:border-gray-900"
                    >
                      <svg className="size-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Column 2: Quick Links */}
              <div className="min-w-0 flex flex-col">
                <h3 className="text-base font-semibold text-gray-950 shrink-0">
                  Quick Links
                </h3>
                <div className="mt-3 lg:mt-4 max-h-[250px] overflow-y-auto overscroll-contain pr-2 [scrollbar-width:thin] [scrollbar-color:rgba(11,56,62,0.25)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                  <ul className="space-y-1 lg:space-y-2 text-sm text-gray-600 font-medium">
                    {quickLinks.map((link) => (
                      <li key={link.label} className="py-0.5">
                        {link.isConsultation ? (
                          <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="transition-colors hover:text-gray-950 block text-left cursor-pointer"
                          >
                            {link.label}
                          </button>
                        ) : (
                          <Link 
                            href={link.href || '#'} 
                            className="transition-colors hover:text-gray-950 block"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Column 3: Treatments */}
              <div className="min-w-0">
                <h3 className="text-base font-semibold text-gray-950">
                  Treatments
                </h3>
                <ul className="mt-3 lg:mt-4 space-y-1 lg:space-y-2 text-sm text-gray-600 font-medium">
                  {treatmentLinks.map((link) => (
                    <li key={link.label} className="py-0.5">
                      <Link 
                        href={link.href} 
                        className="transition-colors hover:text-gray-950 block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Contact Us & Grievances */}
              <div className="flex min-w-0 flex-col gap-8">
                
                {/* Contact Us */}
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-gray-950">
                    Contact Us
                  </h3>
                  <div className="mt-3 lg:mt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex min-w-0 items-start gap-2.5">
                      <Mail className="mt-0.5 size-4 shrink-0 text-gray-500" />
                      <a 
                        href="mailto:contact@example.com" 
                        className="min-w-0 block transition-colors hover:text-gray-950 truncate"
                      >
                        contact@example.com
                      </a>
                    </div>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Phone className="size-4 shrink-0 text-gray-500" />
                      <a 
                        href="tel:+442079460991" 
                        className="transition-colors hover:text-gray-950 whitespace-nowrap"
                      >
                        +44 20 7946 0991
                      </a>
                    </div>
                    <div className="flex min-w-0 items-start gap-2.5">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-gray-500" />
                      <p className="leading-relaxed break-words text-xs sm:text-sm">
                        123 Healthcare Boulevard, Suite 400, London, EC1A 1BB, United Kingdom
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0b383e] text-white hover:bg-[#095458] transition-colors shadow-xs cursor-pointer"
                      >
                        <span>Book a Free Consultation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* For Grievances Contact */}
                <div className="min-w-0 pt-2 border-t border-gray-100 lg:border-none lg:pt-0">
                  <h3 className="text-base font-semibold text-gray-950">
                    For Grievances Contact
                  </h3>
                  <div className="mt-2 lg:mt-3 space-y-2.5 text-sm text-gray-600">
                    <p className="font-semibold text-gray-900">
                      Mr. Alex Morgan
                    </p>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Mail className="size-4 shrink-0 text-gray-500" />
                      <a 
                        href="mailto:grievance@example.com" 
                        className="min-w-0 block whitespace-nowrap transition-colors hover:text-gray-950 truncate text-xs sm:text-sm"
                      >
                        grievance@example.com
                      </a>
                    </div>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Phone className="size-4 shrink-0 text-gray-500" />
                      <a 
                        href="tel:+919876543210" 
                        className="transition-colors hover:text-gray-950 whitespace-nowrap text-xs sm:text-sm"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                    <div className="pt-1">
                      <Link 
                        href="/grievance" 
                        className="text-xs font-bold text-[#095458] hover:underline inline-flex items-center gap-1"
                      >
                        Grievance redressal process &rarr;
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOTTOM LEGAL BAR                                         */}
      {/* ======================================================== */}
      <div 
        className="border-t border-black/5"
        style={{ backgroundColor: '#f3f4f6' }}
      >
        <div className="w-full max-w-[1520px] mx-auto flex flex-col items-center gap-3 py-3.5 px-6 sm:px-10 xl:px-12 text-xs text-gray-700 lg:flex-row lg:justify-between">
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/privacy-policy" className="hover:text-gray-950 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-gray-950 transition-colors">
              Terms of Use
            </Link>
            <Link href="/medical-disclaimer" className="hover:text-gray-950 transition-colors">
              Medical Disclaimer
            </Link>
            <Link href="/grievance" className="hover:text-gray-950 transition-colors">
              Grievance Redressal
            </Link>
          </div>

          <div className="text-gray-600 font-medium">
            &copy; 2026 Your Medicare Trip. All rights reserved.
          </div>
        </div>
      </div>

    </footer>
  );
};
