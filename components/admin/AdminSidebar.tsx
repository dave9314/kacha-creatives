"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Image,
  Users,
  MessageSquare,
  Mail,
  Quote,
  Settings,
  LogOut,
  Briefcase,
  Library,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Portfolio", href: "/admin/portfolio", icon: Image },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Comments", href: "/admin/comments", icon: MessageSquare },
  { label: "Messages", href: "/admin/messages", icon: Mail },
  { label: "Media Library", href: "/admin/media", icon: Library },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-brand-charcoal border-r border-white/5 flex flex-col z-50">
      <div className="p-6 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-amber flex items-center justify-center">
            <span className="font-display font-bold text-brand-dark text-sm">K</span>
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm leading-none">KACHA</div>
            <div className="text-brand-amber text-[9px] tracking-[0.3em]">ADMIN</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-brand-amber text-brand-dark font-semibold"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          View Website
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-white/30 hover:text-red-400 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
