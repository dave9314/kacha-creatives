"use client";

import { useState } from "react";
import {
  TrendingUp,
  Video,
  Palette,
  Lightbulb,
  Target,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Video,
  Palette,
  Lightbulb,
  Target,
};

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: string[];
}

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const [expanded, setExpanded] = useState<string | null>(services[0]?.id || null);

  return (
    <section id="services" className="py-24 lg:py-32 bg-brand-dark relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-amber/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Our Services
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            Creative Solutions That
            <br />
            <span className="gradient-text">Drive Impact</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            From social media management to high-end video production, we deliver
            everything your brand needs to grow.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-4">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Target;
            const isOpen = expanded === service.id;

            return (
              <div
                key={service.id}
                className={cn(
                  "border transition-all duration-500 cursor-pointer",
                  isOpen
                    ? "border-brand-amber/40 bg-brand-amber/5"
                    : "border-white/5 bg-white/2 hover:border-white/20"
                )}
                onClick={() => setExpanded(isOpen ? null : service.id)}
              >
                <div className="p-6 flex items-start gap-4">
                  <div
                    className={cn(
                      "p-3 transition-colors flex-shrink-0",
                      isOpen
                        ? "bg-brand-amber text-brand-dark"
                        : "bg-white/5 text-white/60"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display font-semibold text-white text-lg">
                        {service.name}
                      </h3>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-brand-amber flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-white/50 text-sm mt-1">{service.description}</p>
                  </div>
                </div>

                {/* Expanded items */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500",
                    isOpen ? "max-h-96" : "max-h-0"
                  )}
                >
                  <div className="px-6 pb-6 ml-16">
                    <div className="grid grid-cols-2 gap-2">
                      {service.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-white/60 text-sm"
                        >
                          <div className="w-1.5 h-1.5 bg-brand-amber rounded-full flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
