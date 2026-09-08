"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Play } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Media {
  id: string;
  url: string;
  type: string;
  filename: string;
}

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  quote: string;
  authorName: string;
  media?: Media[];
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent(index);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating]
  );

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(() => next(), 6000);
    return () => clearInterval(timer);
  }, [current]); // eslint-disable-line

  if (!testimonials.length) return null;

  const t = testimonials[current];
  const hasMedia = t.media && t.media.length > 0;
  const firstMedia = t.media?.[0];

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-amber/4 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Trusted by Amazing Brands
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial card */}
        <div
          className={cn(
            "transition-all duration-500",
            animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          )}
        >
          {hasMedia ? (
            /* With media — split layout */
            <div className="grid lg:grid-cols-2 gap-6 glass-dark overflow-hidden">
              {/* Media side */}
              <div className="relative min-h-[300px] lg:min-h-[400px] bg-brand-charcoal overflow-hidden">
                {firstMedia?.type === "VIDEO" ? (
                  <video
                    key={firstMedia.url}
                    src={firstMedia.url}
                    controls
                    className="w-full h-full object-cover"
                    poster=""
                    preload="metadata"
                  />
                ) : firstMedia ? (
                  <Image
                    key={firstMedia.url}
                    src={firstMedia.url}
                    alt={`${t.clientName} work`}
                    fill
                    className="object-cover"
                  />
                ) : null}
                {/* Media count badge */}
                {t.media && t.media.length > 1 && (
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white/70 text-xs px-2 py-1">
                    +{t.media.length - 1} more
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-dark/20 pointer-events-none" />
              </div>

              {/* Text side */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="p-3 bg-brand-amber/10 inline-block mb-6">
                  <Quote className="w-6 h-6 text-brand-amber" />
                </div>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-brand-amber" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-white text-lg leading-relaxed mb-8 font-light">
                  "{t.quote}"
                </blockquote>
                <div>
                  <div className="font-display font-semibold text-brand-amber">— {t.authorName}</div>
                  <div className="text-white/40 text-sm mt-1">{t.company}</div>
                </div>
              </div>
            </div>
          ) : (
            /* Text only — centered layout */
            <div className="glass-dark p-10 md:p-14 text-center">
              <div className="mb-8 flex justify-center">
                <div className="p-4 bg-brand-amber/10">
                  <Quote className="w-8 h-8 text-brand-amber" />
                </div>
              </div>
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-white text-xl md:text-2xl leading-relaxed mb-10 font-light max-w-3xl mx-auto">
                "{t.quote}"
              </blockquote>
              <div>
                <div className="font-display font-semibold text-brand-amber text-base">— {t.authorName}</div>
                <div className="text-white/40 text-sm mt-1">{t.company}</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={prev} className="p-3 border border-white/10 text-white/50 hover:border-brand-amber hover:text-brand-amber transition-all" aria-label="Previous">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={cn("transition-all duration-300", i === current ? "w-8 h-2 bg-brand-amber" : "w-2 h-2 bg-white/20 hover:bg-white/40 rounded-full")}
                aria-label={`Testimonial ${i + 1}`} />
            ))}
          </div>
          <button onClick={next} className="p-3 border border-white/10 text-white/50 hover:border-brand-amber hover:text-brand-amber transition-all" aria-label="Next">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
