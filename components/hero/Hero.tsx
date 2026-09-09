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
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(245,166,35,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 -left-40 w-[600px] h-[600px] bg-brand-amber/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-amber/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[85vh]">

          {/* LEFT — Text */}
          <div className="flex flex-col justify-center">
            {/* Label */}
            <div className="inline-flex items-center gap-3 mb-5 animate-fade-in">
              <div className="h-px w-10 bg-brand-amber" />
              <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
                Digital Marketing Firm
              </span>
            </div>

            {/* Heading — attractive balanced size */}
            <h1 className="font-display font-bold text-white leading-tight mb-5">
              <span className="block text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] animate-slide-up">
                IGNITE YOUR
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] gradient-text animate-slide-up"
                style={{ animationDelay: "80ms" }}
              >
                BRAND.
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] animate-slide-up"
                style={{ animationDelay: "160ms" }}
              >
                INSPIRE YOUR
              </span>
              <span
                className="block text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] gradient-text animate-slide-up"
                style={{ animationDelay: "240ms" }}
              >
                AUDIENCE.
              </span>
            </h1>

            <p
              className="text-white/50 text-base max-w-md mb-8 leading-relaxed animate-slide-up"
              style={{ animationDelay: "320ms" }}
            >
              We craft powerful digital content, strategic branding, and compelling
              media productions that connect your business with its audience and
              drive real results.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3 mb-10 animate-slide-up"
              style={{ animationDelay: "400ms" }}
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
                <Play className="w-4 h-4 fill-current" />
                EXPLORE OUR WORK
              </button>
            </div>

            {/* Pillars */}
            <div
              className="flex flex-wrap gap-5 pt-6 border-t border-white/5 animate-fade-in"
              style={{ animationDelay: "600ms" }}
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

          {/* RIGHT — Photo */}
          <div
            className="hidden lg:block animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative w-full max-w-[460px] h-[580px] mx-auto">

              {/* Amber glow behind image */}
              <div className="absolute -inset-2 bg-brand-amber/10 blur-2xl rounded-sm" />

              {/* Image container */}
              <div className="relative h-full overflow-hidden border border-brand-amber/20">

                {/* Actual photo */}
                <Image
                  src="/IMG_6329.JPG"
                  alt="Kacha Creatives videographer with gimbal camera"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="460px"
                />

                {/* Dark overlay for blending */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/30" />
                <div className="absolute inset-0 bg-brand-amber/5" />

                {/* Corner frames */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-amber z-10" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-brand-amber z-10" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-brand-amber z-10" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-amber z-10" />

                {/* Floating tag — top right */}
                <div className="absolute top-6 -right-4 z-20 bg-brand-charcoal/95 border border-brand-amber/40 px-3 py-1.5 flex items-center gap-2 shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
                  <span className="text-white/80 text-xs font-medium">Video Production</span>
                </div>

                {/* Floating tag — bottom left */}
                <div className="absolute bottom-16 -left-4 z-20 bg-brand-charcoal/95 border border-brand-amber/40 px-3 py-1.5 flex items-center gap-2 shadow-lg">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
                  <span className="text-white/80 text-xs font-medium">Brand Storytelling</span>
                </div>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-brand-dark to-transparent">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-brand-amber text-xs font-bold tracking-widest uppercase">Kacha Creatives</p>
                      <p className="text-white/40 text-xs">Addis Ababa, Ethiopia · Est. 2023</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-1 h-4 bg-brand-amber/50 rounded-full" style={{ height: `${(i + 1) * 5 + 8}px` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Side amber line */}
              <div className="absolute -left-3 top-12 bottom-12 w-0.5 bg-gradient-to-b from-transparent via-brand-amber to-transparent" />

              {/* Founded badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-brand-amber px-4 py-1.5 z-20">
                <span className="text-brand-dark text-xs font-bold tracking-widest">FOUNDED 2023</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/20 text-[10px] tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-brand-amber/40 to-transparent" />
      </div>
    </section>
  );
}
