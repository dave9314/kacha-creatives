"use client";

import Image from "next/image";
import { User } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string | null;
}

interface TeamProps {
  members: TeamMember[];
}

export default function Team({ members }: TeamProps) {
  return (
    <section id="team" className="py-24 lg:py-32 bg-brand-dark relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-amber/2 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-brand-amber" />
            <span className="text-brand-amber text-xs tracking-[0.4em] font-semibold uppercase">
              Our Team
            </span>
            <div className="h-[1px] w-8 bg-brand-amber" />
          </div>
          <h2 className="font-display font-bold text-white text-4xl sm:text-5xl mb-4">
            Meet Our <span className="gradient-text">Creative Team</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            A flexible, multidisciplinary team of professionals passionate about
            creativity and results.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {members.map((member, i) => (
            <div key={member.id} className="group text-center">
              {/* Photo */}
              <div className="relative aspect-square mb-3 overflow-hidden bg-brand-charcoal border border-white/5 group-hover:border-brand-amber/30 transition-colors">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-brand-charcoal">
                    <User className="w-10 h-10 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-amber/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Index number */}
                <div className="absolute top-2 left-2 text-brand-amber/30 font-display font-bold text-xs">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Info */}
              <h3 className="font-display font-semibold text-white text-sm leading-tight mb-1 group-hover:text-brand-amber transition-colors">
                {member.name}
              </h3>
              <p className="text-white/40 text-xs leading-tight">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="mt-16 glass-dark p-8 text-center border-brand-amber/10">
          <p className="text-white/50 text-sm max-w-2xl mx-auto">
            We are a flexible team of professionals passionate about creativity and results.
            Our structure adapts to each project, bringing the right talent at the right time.
          </p>
        </div>
      </div>
    </section>
  );
}
