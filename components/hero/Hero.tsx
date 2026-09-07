"use client";

import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-dark"
    >
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,166,35,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 -left-40 w-[700px] h-[700px] bg-brand-amber/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-brand-amber/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">

          {/* LEFT — Text */}
          <div className="flex flex-col justify-center">
            {/* Label */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-[1px] w-10 bg-brand-amber" />
              <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
                Digital Marketing Firm
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-display font-bold text-white leading-[0.95] mb-6">
              <span className="block text-[clamp(2.8rem,5.5vw,5rem)] animate-slide-up">
                IGNITE YOUR
              </span>
              <span
                className="block text-[clamp(2.8rem,5.5vw,5rem)] gradient-text animate-slide-up"
                style={{ animationDelay: "100ms" }}
              >
                BRAND.
              </span>
              <span
                className="block text-[clamp(2.8rem,5.5vw,5rem)] animate-slide-up"
                style={{ animationDelay: "200ms" }}
              >
                INSPIRE YOUR
              </span>
              <span
                className="block text-[clamp(2.8rem,5.5vw,5rem)] gradient-text animate-slide-up"
                style={{ animationDelay: "300ms" }}
              >
                AUDIENCE.
              </span>
            </h1>

            <p
              className="text-white/50 text-base md:text-lg max-w-lg mb-8 leading-relaxed animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              We craft powerful digital content, strategic branding, and compelling
              media productions that connect your business with its audience and
              drive real results.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 mb-12 animate-slide-up"
              style={{ animationDelay: "500ms" }}
            >
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-2 bg-brand-amber text-brand-dark font-bold text-sm px-7 py-3.5 hover:bg-brand-gold transition-all duration-300 active:scale-95 group"
              >
                START A PROJECT
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={scrollToPortfolio}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold text-sm px-7 py-3.5 hover:border-brand-amber hover:text-brand-amber transition-all duration-300 group"
              >
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform fill-current" />
                EXPLORE OUR WORK
              </button>
            </div>

            {/* Pillars */}
            <div
              className="flex flex-wrap gap-5 pt-6 border-t border-white/5 animate-fade-in"
              style={{ animationDelay: "700ms" }}
            >
              {[
                { label: "Creative Strategy", icon: "✦" },
                { label: "Data Driven", icon: "◈" },
                { label: "Results Focused", icon: "◎" },
                { label: "Client First", icon: "◆" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
                >
                  <span className="text-brand-amber text-xs">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Cameraman Photo */}
          <div
            className="hidden lg:flex items-center justify-center animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative w-full max-w-[460px] h-[580px]">

              {/* Corner frames */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-amber z-20" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand-amber z-20" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand-amber z-20" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-amber z-20" />

              {/* Left amber accent line */}
              <div className="absolute left-0 top-12 bottom-12 w-[2px] bg-gradient-to-b from-transparent via-brand-amber to-transparent z-20" />

              {/* Image container with dark bg */}
              <div className="absolute inset-0 bg-brand-charcoal overflow-hidden">
                {/* Amber glow behind image */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/10 via-transparent to-brand-amber/5" />

                {/* THE ACTUAL IMAGE */}
                <Image
                  src="/hero-cameraman.png"
                  alt="Kacha Creatives videographer with professional gimbal camera"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 0px, 460px"
                />

                {/* Bottom fade overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark to-transparent z-10" />
              </div>

              {/* Floating tag — top right */}
              <div className="absolute -top-3 -right-3 bg-brand-amber px-3 py-1.5 z-30">
                <span className="text-brand-dark text-xs font-bold tracking-wider uppercase">
                  Est. 2023
                </span>
              </div>

              {/* Floating card — bottom left */}
              <div className="absolute -bottom-3 -left-3 bg-brand-charcoal border border-brand-amber/40 px-4 py-2.5 z-30 shadow-xl">
                <p className="text-brand-amber text-xs font-bold tracking-widest uppercase">Kacha Creatives</p>
                <p className="text-white/50 text-xs mt-0.5">Addis Ababa, Ethiopia</p>
              </div>

              {/* Live dot */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-brand-dark/70 px-2 py-1 border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/60 text-[10px] font-medium tracking-wider">AVAILABLE</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-[10px] tracking-widest">SCROLL</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-brand-amber/40 to-transparent" />
      </div>
    </section>
  );
}
