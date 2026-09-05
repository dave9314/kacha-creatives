"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Update active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(href.replace("#", ""));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setMobileOpen(false);
      }
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-md border-b border-white/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Kacha Creatives Home"
            >
              <div className="w-10 h-10 bg-brand-amber rounded-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <span className="font-display font-bold text-brand-dark text-lg">
                  K
                </span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-none tracking-wide">
                  KACHA
                </div>
                <div className="text-brand-amber text-xs tracking-[0.3em] leading-none">
                  CREATIVES
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors duration-200 relative group",
                    activeSection === link.href.replace("#", "")
                      ? "text-brand-amber"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand-amber transition-all duration-300",
                      activeSection === link.href.replace("#", "")
                        ? "w-4"
                        : "w-0 group-hover:w-4"
                    )}
                  />
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="hidden lg:inline-flex items-center gap-2 bg-brand-amber text-brand-dark text-sm font-bold px-5 py-2.5 hover:bg-brand-gold transition-colors duration-300 active:scale-95"
              >
                START A PROJECT
              </a>

              {/* Discreet admin link */}
              <Link
                href="/admin"
                className="text-white/20 hover:text-white/60 transition-colors p-2"
                title="Admin"
                aria-label="Admin Dashboard"
              >
                <Settings className="w-4 h-4" />
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-dark/95 backdrop-blur-lg"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={cn(
            "absolute top-0 right-0 w-full max-w-sm h-full bg-brand-charcoal border-l border-white/5 flex flex-col transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <span className="font-display font-bold text-white text-lg">
              MENU
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white/70 hover:text-white"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  "flex items-center py-4 text-xl font-display font-medium border-b border-white/5 transition-colors",
                  activeSection === link.href.replace("#", "")
                    ? "text-brand-amber"
                    : "text-white/80 hover:text-brand-amber"
                )}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-brand-amber/40 text-sm mr-4 font-mono">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="block w-full text-center bg-brand-amber text-brand-dark font-bold py-4 text-sm hover:bg-brand-gold transition-colors"
            >
              START A PROJECT
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
