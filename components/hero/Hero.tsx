"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,166,35,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow effects */}
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-brand-amber/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-brand-amber/8 rounded-full blur-[100px]" />
        {/* Diagonal lines */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] bg-brand-amber"
              style={{
                width: "200%",
                top: `${i * 14}%`,
                transform: "rotate(-15deg) translateX(-20%)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Label */}
          <div className="inline-flex items-center gap-3 mb-8 animate-fade-in">
            <div className="h-[1px] w-12 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Digital Marketing Firm
            </span>
          </div>

          {/* Main heading */}
          <h1 className="font-display font-bold text-white leading-none mb-6">
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] animate-slide-up"
              style={{ animationDelay: "100ms" }}
            >
              IGNITE YOUR
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] gradient-text animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              BRAND.
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] animate-slide-up"
              style={{ animationDelay: "300ms" }}
            >
              INSPIRE YOUR
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[96px] gradient-text animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              AUDIENCE.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="text-white/50 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed animate-slide-up"
            style={{ animationDelay: "500ms" }}
          >
            We craft powerful digital content, strategic branding, and compelling
            media productions that connect your business with its audience and
            drive real results.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "600ms" }}
          >
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 bg-brand-amber text-brand-dark font-bold text-sm px-8 py-4 hover:bg-brand-gold transition-all duration-300 active:scale-95 group"
            >
              START A PROJECT
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToPortfolio}
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-8 py-4 hover:border-brand-amber hover:text-brand-amber transition-all duration-300 group"
            >
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
              EXPLORE OUR WORK
            </button>
          </div>

          {/* Feature pillars */}
          <div
            className="flex flex-wrap gap-6 mt-16 pt-16 border-t border-white/5 animate-fade-in"
            style={{ animationDelay: "800ms" }}
          >
            {[
              { label: "Creative Strategy", icon: "✦" },
              { label: "Data Driven", icon: "◈" },
              { label: "Results Focused", icon: "◎" },
              { label: "Client First", icon: "◆" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors"
              >
                <span className="text-brand-amber">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/20 text-xs tracking-widest">SCROLL</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-amber/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
