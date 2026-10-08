"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group shrink-0 mb-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0b5d63] flex items-center justify-center shadow-md transition-transform">
                <span className="text-white font-black text-lg font-serif">Y</span>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-widest text-base sm:text-lg text-white group-hover:text-teal-300 transition-colors">
                  Your Medicare Trip
                </span>
              </div>
            </Link>
            <p className="text-sm font-light leading-relaxed text-slate-400 max-w-sm mb-6">
              A premium medical-care coordination platform helping international patients discover the right Indian specialists.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Treatments</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#treatments" className="hover:text-teal-300 transition-colors">Orthopaedics & Joint</Link></li>
              <li><Link href="#treatments" className="hover:text-teal-300 transition-colors">Dentistry & Smile</Link></li>
              <li><Link href="#treatments" className="hover:text-teal-300 transition-colors">IVF & Advanced Fertility</Link></li>
              <li><Link href="#treatments" className="hover:text-teal-300 transition-colors">Cosmetic & Reconstructive</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Patient Journey</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#journey" className="hover:text-teal-300 transition-colors">How it works</Link></li>
              <li><Link href="#costs" className="hover:text-teal-300 transition-colors">Cost transparency</Link></li>
              <li><Link href="#support" className="hover:text-teal-300 transition-colors">Care coordination</Link></li>
              <li><Link href="#stories" className="hover:text-teal-300 transition-colors">Verified testimonials</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-teal-300 transition-colors">About us</Link></li>
              <li><Link href="/guides" className="hover:text-teal-300 transition-colors">Clinical blog</Link></li>
              <li><Link href="#safety" className="hover:text-teal-300 transition-colors">Decline policy</Link></li>
              <li><Link href="/contact" className="hover:text-teal-300 transition-colors">Contact us</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-500">
          <p>© {new Date().getFullYear()} Your Medicare Trip. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

