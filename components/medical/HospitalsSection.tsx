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
      name: "MAX Super Speciality Hospital",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Fortis Hospital Mohali",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Healing Super Specialty Hospital",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    },
    {
      name: "Sangam Netralaya",
      location: "Sector 8C, Chandigarh",
      rating: "4.9 (1,240)",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitals.map((hosp, idx) => (
            <Card
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col group hover:shadow-xl transition-all duration-300"
            >
              {/* Unified Photographic Rule: Interiors - Wards & Patient Suites with identical 16/10 aspect ratio */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={hosp.image}
                  alt={hosp.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              <CardContent className="p-6 flex flex-col flex-1 pb-4">
                <CardTitle className="font-bold text-lg text-slate-900 leading-tight mb-2 h-12">
                  {hosp.name}
                </CardTitle>
                
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-vedara-cyan" />
                  <span>{hosp.location}</span>
                </div>
                
                <div className="flex items-center gap-1.5 mb-2">
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
