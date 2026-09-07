"use client";

import { ArrowRight, Play } from "lucide-react";

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

            {/* Heading — balanced size */}
            <h1 className="font-display font-bold text-white leading-[0.95] mb-6">
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] animate-slide-up">
                IGNITE YOUR
              </span>
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] gradient-text animate-slide-up" style={{ animationDelay: "100ms" }}>
                BRAND.
              </span>
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] animate-slide-up" style={{ animationDelay: "200ms" }}>
                INSPIRE YOUR
              </span>
              <span className="block text-[clamp(2.8rem,6vw,5.5rem)] gradient-text animate-slide-up" style={{ animationDelay: "300ms" }}>
                AUDIENCE.
              </span>
            </h1>

            <p className="text-white/50 text-base md:text-lg max-w-lg mb-8 leading-relaxed animate-slide-up" style={{ animationDelay: "400ms" }}>
              We craft powerful digital content, strategic branding, and compelling
              media productions that connect your business with its audience and
              drive real results.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12 animate-slide-up" style={{ animationDelay: "500ms" }}>
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
            <div className="flex flex-wrap gap-5 pt-6 border-t border-white/5 animate-fade-in" style={{ animationDelay: "700ms" }}>
              {[
                { label: "Creative Strategy", icon: "✦" },
                { label: "Data Driven", icon: "◈" },
                { label: "Results Focused", icon: "◎" },
                { label: "Client First", icon: "◆" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
                  <span className="text-brand-amber text-xs">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Hero Image */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in relative" style={{ animationDelay: "300ms" }}>
            <div className="relative w-full max-w-[500px] h-[600px]">

              {/* Dark background with amber glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-charcoal to-brand-dark border border-brand-amber/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-dark to-transparent z-10" />
                <div className="absolute inset-0 bg-brand-amber/3" />

                {/* Hero image */}
                <img
                  src="/hero-cameraman.png"
                  alt="Kacha Creatives videographer with gimbal camera"
                  className="w-full h-full object-cover object-center scale-105"
                  style={{ mixBlendMode: "luminosity", opacity: 0.9 }}
                />
              </div>

              {/* Amber accent line */}
              <div className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-transparent via-brand-amber to-transparent" />

              {/* Corner frames */}
              <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-brand-amber z-20" />
              <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-brand-amber z-20" />
              <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-brand-amber z-20" />
              <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-brand-amber z-20" />

              {/* Floating service cards */}
              <div className="absolute top-6 -right-5 bg-brand-charcoal/95 border border-brand-amber/30 px-3 py-2 flex items-center gap-2 z-20 shadow-xl">
                <div className="w-2 h-2 bg-brand-amber rounded-full animate-pulse" />
                <span className="text-white/80 text-xs font-medium">Video Production</span>
              </div>

              <div className="absolute bottom-16 -left-5 bg-brand-charcoal/95 border border-brand-amber/30 px-3 py-2 flex items-center gap-2 z-20 shadow-xl">
                <div className="w-2 h-2 bg-brand-amber rounded-full animate-pulse" />
                <span className="text-white/80 text-xs font-medium">Brand Stories</span>
              </div>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-brand-amber text-xs font-semibold tracking-widest uppercase">Kacha Creatives</p>
                    <p className="text-white/40 text-xs">Addis Ababa, Ethiopia</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 bg-brand-amber/60 rounded-full" />
                    ))}
                  </div>
                </div>
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
