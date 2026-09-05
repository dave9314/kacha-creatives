import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatDate } from "@/lib/utils";
import { Paperclip } from "lucide-react";
import Link from "next/link";

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const { status, search } = await searchParams;

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status.toUpperCase();
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { subject: { contains: search, mode: "insensitive" } },
    ];
  }

  const messages = await prisma.contactMessage.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.contactMessage.groupBy({
    by: ["status"],
    _count: true,
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-white text-3xl">Messages</h1>
          <p className="text-white/40 mt-1">{messages.length} contact requests</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["all", "new", "read", "replied", "archived"].map((s) => {
            const count = s === "all"
              ? counts.reduce((acc, c) => acc + c._count, 0)
              : counts.find((c) => c.status === s.toUpperCase())?._count || 0;
            return (
              <Link
                key={s}
                href={`/admin/messages?status=${s}`}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                  (status || "all") === s
                    ? "bg-brand-amber text-brand-dark"
                    : "border border-white/10 text-white/50 hover:border-white/30"
                }`}
              >
                {s.toUpperCase()} ({count})
              </Link>
            );
          })}
        </div>

        {messages.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-white/40">No messages found.</p>
          </div>
        ) : (
          <div className="glass-dark overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-white/30 text-xs font-medium p-4">Name</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Email</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Subject</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Status</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Date</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Attachment</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="p-4">
                      <Link
                        href={`/admin/messages/${msg.id}`}
                        className="text-white text-sm font-medium hover:text-brand-amber transition-colors"
                      >
                        {msg.name}
                      </Link>
                    </td>
                    <td className="p-4 text-white/60 text-sm">{msg.email}</td>
                    <td className="p-4 text-white/60 text-sm truncate max-w-[200px]">
                      {msg.subject}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium ${
                          msg.status === "NEW"
                            ? "bg-brand-amber/20 text-brand-amber"
                            : msg.status === "READ"
                            ? "bg-blue-500/20 text-blue-400"
                            : msg.status === "REPLIED"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/10 text-white/40"
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-4 text-white/40 text-xs">
                      {formatDate(msg.createdAt)}
                    </td>
                    <td className="p-4">
                      {msg.documentPath && (
                        <Paperclip className="w-4 h-4 text-brand-amber" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
