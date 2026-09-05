import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-charcoal border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-amber flex items-center justify-center">
                <span className="font-display font-bold text-brand-dark text-lg">K</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">
                  KACHA
                </div>
                <div className="text-brand-amber text-xs tracking-[0.3em]">
                  CREATIVES
                </div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
              A dynamic digital marketing firm driven by creativity, strategy, and
              adaptability. Based in Addis Ababa, Ethiopia.
            </p>
            <p className="text-white/20 text-xs italic">
              "IGNITE YOUR BRAND. INSPIRE YOUR AUDIENCE."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Team", href: "#team" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/40 text-sm hover:text-brand-amber transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-5 tracking-wider uppercase">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+251920766374"
                  className="flex items-start gap-3 text-white/40 hover:text-brand-amber transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-brand-amber" />
                  <span className="text-sm">+2519 2076 6374</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+251916451065"
                  className="flex items-start gap-3 text-white/40 hover:text-brand-amber transition-colors group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-brand-amber" />
                  <span className="text-sm">+2519 1645 1065</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:biniyamwondem2006@gmail.com"
                  className="flex items-start gap-3 text-white/40 hover:text-brand-amber transition-colors group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-brand-amber" />
                  <span className="text-sm break-all">biniyamwondem2006@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/Addis+Ababa,+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/40 hover:text-brand-amber transition-colors group"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-brand-amber" />
                  <span className="text-sm">Addis Ababa, Ethiopia</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} Kacha Creatives. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Digital Marketing Firm · Addis Ababa, Ethiopia · Founded 2023
          </p>
        </div>
      </div>
    </footer>
  );
}
