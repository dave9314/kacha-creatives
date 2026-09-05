"use client";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-brand-amber relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-gold/40 rounded-full blur-[60px]" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-[60px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-brand-dark/40 text-xs tracking-[0.5em] uppercase mb-4 font-semibold">
          LET'S GROW YOUR BRAND
        </div>
        <h2 className="font-display font-bold text-brand-dark text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
          Let's Grow Your Brand Through Creative Digital Storytelling.
        </h2>
        <p className="text-brand-dark/60 text-lg mb-10 max-w-xl mx-auto">
          Ready to ignite your brand and inspire your audience? Let's start a conversation.
        </p>
        <button
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold text-sm px-10 py-5 hover:bg-brand-charcoal transition-all duration-300 active:scale-95"
        >
          GET IN TOUCH
        </button>
      </div>
    </section>
  );
}
