"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Discovery & Briefing",
    description:
      "We begin by deeply understanding your brand, goals, target audience, and competitive landscape. This foundation shapes everything that follows.",
    icon: "◎",
  },
  {
    number: "02",
    title: "Strategic Planning",
    description:
      "Our team develops aligned digital and content strategies tailored to your brand objectives, platform mix, and campaign goals.",
    icon: "◈",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "We deploy the right creative professionals — photographers, designers, editors, writers — to bring the strategy to life with precision and quality.",
    icon: "✦",
  },
  {
    number: "04",
    title: "Review & Feedback",
    description:
      "We refine our work based on your input and real audience response, iterating until the result exceeds expectations.",
    icon: "◆",
  },
  {
    number: "05",
    title: "Post-Support",
    description:
      "Ongoing support options keep your brand growing, adapting, and performing after launch — we're a long-term partner, not just a vendor.",
    icon: "★",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 lg:py-32 bg-brand-charcoal relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Our Creative Process
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            From Idea to{" "}
            <span className="gradient-text">Impact</span>
          </h2>
        </div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          {/* Step indicators */}
          <div className="relative flex justify-between mb-12">
            {/* Connecting line */}
            <div className="absolute top-8 left-8 right-8 h-[1px] bg-white/10">
              <div
                className="h-full bg-brand-amber transition-all duration-700"
                style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              />
            </div>

            {steps.map((step, i) => (
              <button
                key={step.number}
                onClick={() => setActiveStep(i)}
                className="flex flex-col items-center gap-3 relative z-10 group"
              >
                <div
                  className={cn(
                    "w-16 h-16 flex items-center justify-center border-2 transition-all duration-300 font-display font-bold text-sm",
                    i <= activeStep
                      ? "border-brand-amber bg-brand-amber text-brand-dark"
                      : "border-white/20 bg-brand-dark text-white/40 group-hover:border-white/40"
                  )}
                >
                  {step.number}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium text-center max-w-[100px] leading-tight transition-colors",
                    i === activeStep ? "text-brand-amber" : "text-white/40"
                  )}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="glass-dark p-12 max-w-3xl mx-auto text-center">
            <span className="text-brand-amber/30 font-display font-bold text-8xl">
              {steps[activeStep].icon}
            </span>
            <h3 className="font-display font-bold text-white text-2xl mt-2 mb-4">
              {steps[activeStep].title}
            </h3>
            <p className="text-white/60 text-lg leading-relaxed">
              {steps[activeStep].description}
            </p>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-0">
          {steps.map((step, i) => (
            <div key={step.number} className="flex gap-6 relative">
              {/* Left: number + line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className={cn(
                    "w-12 h-12 flex items-center justify-center border-2 font-display font-bold text-sm z-10 transition-all",
                    i === activeStep
                      ? "border-brand-amber bg-brand-amber text-brand-dark"
                      : "border-white/20 text-white/40 bg-brand-dark"
                  )}
                >
                  {step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="w-[1px] h-full min-h-[60px] bg-white/10 my-2" />
                )}
              </div>

              {/* Right: content */}
              <div
                className="pb-8 pt-2 cursor-pointer flex-1"
                onClick={() => setActiveStep(i)}
              >
                <h3
                  className={cn(
                    "font-display font-semibold text-lg mb-2 transition-colors",
                    i === activeStep ? "text-brand-amber" : "text-white"
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed transition-all",
                    i === activeStep ? "text-white/70 max-h-40" : "text-white/30 max-h-0 overflow-hidden"
                  )}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
