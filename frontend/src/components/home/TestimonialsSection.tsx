"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  authorName: string;
  authorRole: string | null;
  companyName: string | null;
  content: string | null;
  rating: number | null;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[index];

  return (
    <section className="bg-brand-ink py-24 px-6 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-[20%] right-[5%] w-[250px] h-[250px] bg-brand-violet/5 rounded-full blur-[80px]" />
      <div className="absolute bottom-[20%] left-[5%] w-[250px] h-[250px] bg-brand-lime/5 rounded-full blur-[80px]" />

      <div className="max-w-4xl mx-auto space-y-12 relative text-center">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
            Testimonials
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Hear from our partners.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="bg-brand-ink-soft/40 border border-white/5 rounded-3xl p-8 sm:p-12 relative min-h-[300px] flex flex-col justify-between items-center backdrop-blur-sm">
          <Quote className="text-brand-lime/20 w-16 h-16 absolute -top-8 left-12 transform -rotate-12" />

          {/* Rating */}
          <div className="flex space-x-1 justify-center text-brand-lime">
            {Array.from({ length: current.rating || 5 }).map((_, i) => (
              <Star key={i} size={16} className="fill-current" />
            ))}
          </div>

          {/* Testimonial Text */}
          <div className="my-8 max-w-2xl text-lg sm:text-xl text-white/90 leading-relaxed italic">
            "{current.content}"
          </div>

          {/* Author info */}
          <div className="space-y-1">
            <h4 className="font-bold text-white text-base">
              {current.authorName}
            </h4>
            <p className="text-xs text-fg-muted dark:text-fg-muted/60">
              {current.authorRole} {current.companyName ? `@ ${current.companyName}` : ""}
            </p>
          </div>

          {/* Nav Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center space-x-6 mt-8">
              <button
                onClick={prevTestimonial}
                className="p-2 border border-white/10 rounded-full hover:bg-white/5 hover:border-brand-lime transition-all text-white"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-xs text-fg-muted">
                {index + 1} / {testimonials.length}
              </span>
              <button
                onClick={nextTestimonial}
                className="p-2 border border-white/10 rounded-full hover:bg-white/5 hover:border-brand-lime transition-all text-white"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
