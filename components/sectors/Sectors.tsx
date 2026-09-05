"use client";

import {
  ShoppingBag,
  Heart,
  Building2,
  Briefcase,
  UtensilsCrossed,
  Car,
  Coffee,
  MapPin,
  Home,
  Hammer,
} from "lucide-react";

const sectors = [
  { name: "Retail Shops", icon: ShoppingBag },
  { name: "Health Centers", icon: Heart },
  { name: "Dental Clinics", icon: Heart },
  { name: "Real Estate & Housing", icon: Home },
  { name: "Construction Materials", icon: Hammer },
  { name: "Rental Businesses", icon: Car },
  { name: "Consultancy & Professional Services", icon: Briefcase },
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Cafes", icon: Coffee },
  { name: "Local Brands", icon: Building2 },
  { name: "Travel Agencies", icon: MapPin },
];

export default function Sectors() {
  return (
    <section id="sectors" className="py-24 lg:py-32 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Industries We Serve
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            We Work Across{" "}
            <span className="gradient-text">Many Sectors</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            From local brands to professional services, our creative solutions adapt to
            every industry's unique needs.
          </p>
        </div>

        {/* Sectors grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.name}
                className="group glass-dark p-4 flex flex-col items-center gap-3 text-center hover:border-brand-amber/30 hover:bg-brand-amber/5 transition-all duration-300 cursor-default"
              >
                <div className="p-3 bg-white/5 group-hover:bg-brand-amber/10 transition-colors">
                  <Icon className="w-5 h-5 text-white/40 group-hover:text-brand-amber transition-colors" />
                </div>
                <span className="text-white/60 text-xs leading-tight group-hover:text-white/80 transition-colors">
                  {sector.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* CTA bar */}
        <div className="mt-16 glass-dark p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-bold text-white text-xl mb-1">
              Don't see your industry?
            </h3>
            <p className="text-white/50 text-sm">
              Our flexible approach adapts to any business type.
            </p>
          </div>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-shrink-0 bg-brand-amber text-brand-dark font-bold text-sm px-6 py-3 hover:bg-brand-gold transition-colors"
          >
            LET'S TALK
          </button>
        </div>
      </div>
    </section>
  );
}
