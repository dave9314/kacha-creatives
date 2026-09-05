"use client";

import { Lightbulb, Award, Users, Globe } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Creative Strategy & Direction",
    description:
      "We combine strong visual storytelling with clear digital strategy to help brands grow across social platforms.",
  },
  {
    icon: Award,
    title: "Professional Quality, Freelance Agility",
    description:
      "High-quality design, media, and content delivered through a responsive, affordable, and easy-to-work-with team.",
  },
  {
    icon: Users,
    title: "Flexible & Scalable Team",
    description:
      "The team structure adjusts according to project needs, bringing the right talent at the right time without added overhead.",
  },
  {
    icon: Globe,
    title: "Cross-Industry Experience",
    description:
      "From hospitals and real estate to retail and consultancy, we tailor content to each market's unique requirements.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-amber/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Why Choose Kacha Creatives
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            What Sets Us{" "}
            <span className="gradient-text">Apart</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="group glass-dark p-8 hover:border-brand-amber/30 hover:bg-brand-amber/5 transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="p-3 bg-brand-amber/10 group-hover:bg-brand-amber transition-colors inline-block mb-4">
                    <Icon className="w-6 h-6 text-brand-amber group-hover:text-brand-dark transition-colors" />
                  </div>
                  <div className="text-brand-amber/20 font-display font-bold text-6xl leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>
                <h3 className="font-display font-semibold text-white text-lg mb-3 group-hover:text-brand-amber transition-colors">
                  {reason.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
