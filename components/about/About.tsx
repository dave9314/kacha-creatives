"use client";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-amber/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-brand-amber" />
          <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
            About Us
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <h2 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-none mb-8">
              We Are{" "}
              <span className="gradient-text">Kacha</span>
              <br />
              <span className="gradient-text">Creatives</span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Kacha Creative is a dynamic digital marketing firm driven by{" "}
              <span className="text-white">creativity, strategy, and adaptability.</span>
            </p>

            <p className="text-white/60 leading-relaxed mb-6">
              Founded by{" "}
              <span className="text-brand-amber font-medium">Biniyam Wondem</span> and{" "}
              <span className="text-brand-amber font-medium">Brook Wondem</span>, the firm
              works with a network of professionals to deliver tailored digital content and
              branding solutions.
            </p>

            <p className="text-white/60 leading-relaxed mb-10">
              We serve different sectors including retail, healthcare, real estate, and
              consulting. Through flexible project execution and measurable impact, we create
              engaging storytelling and effective digital experiences — scaling our resources
              according to project size while maintaining quality and brand alignment.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                "Founded 2023",
                "Addis Ababa, Ethiopia",
                "Flexible Team",
                "Project-Based",
                "Multi-Industry",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 border border-white/10 text-white/50 text-xs tracking-wide hover:border-brand-amber/40 hover:text-white/70 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="glass-dark p-8 relative group hover:border-brand-amber/20 transition-colors">
              <div className="text-7xl font-display font-bold text-brand-amber/10 absolute -top-4 -left-2">
                01
              </div>
              <h3 className="font-display font-semibold text-white text-xl mb-3 relative">
                Our Mission
              </h3>
              <p className="text-white/50 leading-relaxed text-sm relative">
                To craft compelling digital marketing content that drives visibility, builds
                brand identity, and connects businesses with their audiences across digital
                platforms.
              </p>
            </div>

            <div className="glass-dark p-8 relative group hover:border-brand-amber/20 transition-colors">
              <div className="text-7xl font-display font-bold text-brand-amber/10 absolute -top-4 -left-2">
                02
              </div>
              <h3 className="font-display font-semibold text-white text-xl mb-3 relative">
                Our Vision
              </h3>
              <p className="text-white/50 leading-relaxed text-sm relative">
                To become one of Ethiopia's most trusted creative firms by delivering
                result-driven digital strategies, professional content, and exceptional client
                service — powered by a flexible, multidisciplinary team.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "2023", label: "Founded" },
                { value: "12+", label: "Team Members" },
                { value: "∞", label: "Possibilities" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="glass-dark p-4 text-center"
                >
                  <div className="font-display font-bold text-brand-amber text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
