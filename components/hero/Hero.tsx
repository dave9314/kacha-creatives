"use client";

import { ArrowRight, Play, Camera, Video, Palette, TrendingUp } from "lucide-react";

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

          {/* RIGHT — Attractive Visual */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="relative w-full max-w-[500px] aspect-square">

              {/* Main central card */}
              <div className="absolute inset-8 bg-gradient-to-br from-brand-charcoal via-brand-gray to-brand-dark border border-brand-amber/20 flex flex-col items-center justify-center gap-6 overflow-hidden">
                {/* Amber glow inside */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/8 via-transparent to-brand-amber/4" />
                
                {/* K logo */}
                <div className="relative z-10 w-20 h-20 bg-brand-amber flex items-center justify-center">
                  <span className="font-display font-bold text-brand-dark text-5xl leading-none">K</span>
                </div>

                {/* Company name */}
                <div className="relative z-10 text-center">
                  <div className="font-display font-bold text-white text-3xl tracking-wider leading-none">
                    KACHA
                  </div>
                  <div className="text-brand-amber text-sm tracking-[0.5em] mt-1">
                    CREATIVES
                  </div>
                  <div className="text-white/30 text-xs mt-3 tracking-widest uppercase">
                    Digital Marketing Firm
                  </div>
                </div>

                {/* Tagline */}
                <div className="relative z-10 text-center px-6">
                  <div className="h-[1px] w-12 bg-brand-amber/40 mx-auto mb-3" />
                  <p className="text-white/40 text-xs leading-relaxed italic">
                    "IGNITE YOUR BRAND. INSPIRE YOUR AUDIENCE."
                  </p>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-brand-amber/40" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand-amber/40" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-brand-amber/40" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-brand-amber/40" />
              </div>

              {/* Floating service cards */}
              <div className="absolute -top-4 -right-4 bg-brand-charcoal border border-white/10 p-3 flex items-center gap-2 shadow-xl animate-slide-up" style={{ animationDelay: "600ms" }}>
                <div className="p-1.5 bg-brand-amber/10">
                  <Video className="w-3.5 h-3.5 text-brand-amber" />
                </div>
                <span className="text-white/70 text-xs font-medium">Video Production</span>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-brand-charcoal border border-white/10 p-3 flex items-center gap-2 shadow-xl animate-slide-up" style={{ animationDelay: "700ms" }}>
                <div className="p-1.5 bg-brand-amber/10">
                  <Palette className="w-3.5 h-3.5 text-brand-amber" />
                </div>
                <span className="text-white/70 text-xs font-medium">Brand Design</span>
              </div>

              <div className="absolute top-1/2 -left-8 -translate-y-1/2 bg-brand-charcoal border border-white/10 p-3 flex items-center gap-2 shadow-xl animate-slide-up" style={{ animationDelay: "800ms" }}>
                <div className="p-1.5 bg-brand-amber/10">
                  <Camera className="w-3.5 h-3.5 text-brand-amber" />
                </div>
                <span className="text-white/70 text-xs font-medium">Photography</span>
              </div>

              <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-brand-charcoal border border-white/10 p-3 flex items-center gap-2 shadow-xl animate-slide-up" style={{ animationDelay: "900ms" }}>
                <div className="p-1.5 bg-brand-amber/10">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-amber" />
                </div>
                <span className="text-white/70 text-xs font-medium">Social Media</span>
              </div>

              {/* Orbit ring */}
              <div className="absolute inset-0 border border-brand-amber/8 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
              <div className="absolute inset-4 border border-white/5 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />

              {/* Addis Ababa badge */}
              <div className="absolute -bottom-2 right-4 bg-brand-amber px-3 py-1">
                <span className="text-brand-dark text-xs font-bold tracking-wider">ADDIS ABABA, ET</span>
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
