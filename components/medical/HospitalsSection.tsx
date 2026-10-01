"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const HospitalsSection = () => {
  const hospitals = [
    {
      name: "Max Hospital",
      location: "Chandigarh Road in Phase 6, Sahibzada Ajit Singh Nagar (Mohali), Punjab",
      rating: "4.9 (1,240)",
      image: "/max-hospital.jpg",
    },
    {
      name: "Profile Cosmetic Surgery",
      location: "Ludhiana - Dr. Vikas Gupta, Surgeon",
      rating: "4.9 (1,240)",
      image: "/profileaestheticsurgery.png",
    },
    {
      name: "Sangam Netralaya",
      location: "Ajitgarh, Punjab",
      rating: "4.9 (1,240)",
      image: "/sangam-netralaya.webp",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-vedara-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-vedara-gold-muted font-bold text-xs uppercase tracking-widest mb-3">
            BEING STRAIGHT WITH YOU
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-vedara-deep mb-6">
            We&apos;re new. Our <span className="italic text-teal-600">hospitals</span> are not.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            You won&apos;t find hundreds of reviews for us, because we started this year. What you can verify today is every hospital we work with — when it was founded, what it&apos;s accredited to, when that accreditation expires, and how many of your procedure it does each year.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            That&apos;s the record that matters. We&apos;re the people who get you to it and stay beside you while you&apos;re there.
          </p>
        </div>

        {/* Hospital Cards (Shadcn Card System) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {hospitals.map((hosp, idx) => (
            <Card
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col h-full group hover:shadow-xl transition-all duration-300"
            >
              {/* Image container with uniform aspect ratio and uncropped full image display */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 flex items-center justify-center">
                <Image
                  src={hosp.image}
                  alt={hosp.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              <CardContent className="p-6 flex flex-col flex-1 pb-4">
                <CardTitle className="font-bold text-lg text-slate-900 leading-tight mb-2 min-h-[2.75rem] flex items-center">
                  {hosp.name}
                </CardTitle>
                
                <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-3 min-h-[2.5rem]">
                  <MapPin className="w-3.5 h-3.5 text-vedara-cyan shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{hosp.location}</span>
                </div>
                
                <div className="flex items-center gap-1.5 mb-2 mt-auto">
                  <div className="flex text-vedara-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-slate-500">{hosp.rating}</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0 mt-auto">
                <Button
                  variant="outlineNavy"
                  size="sm"
                  className="w-full text-xs font-bold gap-1.5 py-2.5 rounded-xl cursor-pointer"
                  render={<Link href="/hospitals" />}
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom CTA - Shadcn Button */}
        <div className="mt-12 flex justify-end">
          <Button
            variant="outlineNavy"
            size="lg"
            className="border-2 font-bold gap-2 text-sm shadow-xs rounded-xl cursor-pointer"
            render={<Link href="/hospitals" />}
          >
            <span>See the hospitals</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

      </div>
    </section>
  );
};
