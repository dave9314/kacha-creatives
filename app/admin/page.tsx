import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  ImageIcon,
  Users,
  MessageSquare,
  Mail,
  Quote,
  CheckCircle,
  Clock,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/admin/login");
  }

  const [
    publishedProjects,
    draftProjects,
    teamCount,
    pendingComments,
    newMessages,
    testimonialCount,
    recentMessages,
  ] = await Promise.all([
    prisma.portfolioProject.count({ where: { status: "PUBLISHED" } }),
    prisma.portfolioProject.count({ where: { status: "DRAFT" } }),
    prisma.teamMember.count({ where: { isVisible: true } }),
    prisma.comment.count({ where: { status: "PENDING" } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.testimonial.count({ where: { isPublished: true } }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const stats = [
    {
      label: "New Messages",
      value: newMessages,
      icon: Mail,
      href: "/admin/messages",
      color: "text-brand-amber",
      bg: "bg-brand-amber/10",
    },
    {
      label: "Pending Comments",
      value: pendingComments,
      icon: MessageSquare,
      href: "/admin/comments",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Total Projects",
      value: publishedProjects + draftProjects,
      icon: ImageIcon,
      href: "/admin/portfolio",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Team Members",
      value: teamCount,
      icon: Users,
      href: "/admin/team",
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
  ];

  const statusColors: Record<string, string> = {
    NEW: "bg-brand-amber/20 text-brand-amber",
    READ: "bg-blue-500/20 text-blue-400",
    REPLIED: "bg-green-500/20 text-green-400",
    ARCHIVED: "bg-white/10 text-white/40",
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-white text-3xl">
            Dashboard
          </h1>
          <p className="text-white/40 mt-1">
            Welcome back, {session.user.name || "Admin"} — Kacha Creatives CMS
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="glass-dark p-6 hover:border-white/20 transition-colors group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 ${stat.bg}`}>
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-white/20 text-xs group-hover:text-white/40 transition-colors">
                    View →
                  </span>
                </div>
                <div className="font-display font-bold text-white text-3xl mb-1">
                  {stat.value}
                </div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </Link>
            );
          })}
        </div>

        {/* Portfolio breakdown */}
        <div className="grid lg:grid-cols-3 gap-4 mb-6">
          <div className="glass-dark p-6">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-white/60 text-sm">Published</span>
            </div>
            <div className="font-display font-bold text-white text-2xl">
              {publishedProjects}
            </div>
            <div className="text-white/30 text-xs mt-1">Portfolio projects</div>
          </div>
          <div className="glass-dark p-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-white/60 text-sm">Drafts</span>
            </div>
            <div className="font-display font-bold text-white text-2xl">
              {draftProjects}
            </div>
            <div className="text-white/30 text-xs mt-1">Unpublished projects</div>
          </div>
          <div className="glass-dark p-6">
            <div className="flex items-center gap-2 mb-3">
              <Quote className="w-4 h-4 text-brand-amber" />
              <span className="text-white/60 text-sm">Testimonials</span>
            </div>
            <div className="font-display font-bold text-white text-2xl">
              {testimonialCount}
            </div>
            <div className="text-white/30 text-xs mt-1">Published</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent messages */}
          <div className="lg:col-span-2 glass-dark p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-semibold text-white text-base">
                Recent Messages
              </h2>
              <Link
                href="/admin/messages"
                className="text-brand-amber text-xs hover:underline"
              >
                View all →
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <p className="text-white/30 text-sm">No messages yet.</p>
            ) : (
              <div className="space-y-1">
                {recentMessages.map((msg) => (
                  <Link
                    key={msg.id}
                    href={`/admin/messages/${msg.id}`}
                    className="flex items-center gap-3 py-2.5 px-3 hover:bg-white/3 transition-colors rounded-sm group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white text-sm font-medium group-hover:text-brand-amber transition-colors truncate">
                          {msg.name}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 text-xs font-medium flex-shrink-0 ${statusColors[msg.status]}`}
                        >
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-white/40 text-xs truncate">{msg.subject}</p>
                    </div>
                    <span className="text-white/20 text-xs flex-shrink-0">
                      {formatDate(msg.createdAt)}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="glass-dark p-6">
            <h2 className="font-display font-semibold text-white text-base mb-5">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {[
                { label: "+ New Project", href: "/admin/portfolio/new", primary: true },
                { label: "+ Add Team Member", href: "/admin/team/new", primary: false },
                { label: "+ Add Testimonial", href: "/admin/testimonials/new", primary: false },
                { label: "View Messages", href: "/admin/messages", primary: false },
                { label: "Moderate Comments", href: "/admin/comments?status=pending", primary: false },
                { label: "Media Library", href: "/admin/media", primary: false },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`block w-full text-left text-sm font-medium px-4 py-2.5 transition-colors ${
                    action.primary
                      ? "bg-brand-amber text-brand-dark hover:bg-brand-gold"
                      : "bg-white/5 border border-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
