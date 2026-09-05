import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Star } from "lucide-react";
import AdminCommentActions from "@/components/admin/AdminCommentActions";

export default async function AdminCommentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const { status } = await searchParams;

  const where: Record<string, unknown> = {};
  if (status && status !== "all") where.status = status.toUpperCase();

  const comments = await prisma.comment.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.comment.groupBy({
    by: ["status"],
    _count: true,
  });

  const statusTabs = ["all", "pending", "approved", "rejected"];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-white text-3xl">Comments</h1>
          <p className="text-white/40 mt-1">{comments.length} comments</p>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusTabs.map((s) => {
            const count =
              s === "all"
                ? counts.reduce((acc, c) => acc + c._count, 0)
                : counts.find((c) => c.status === s.toUpperCase())?._count || 0;
            return (
              <Link
                key={s}
                href={`/admin/comments?status=${s}`}
                className={`px-4 py-1.5 text-xs font-semibold transition-colors capitalize ${
                  (status || "all") === s
                    ? "bg-brand-amber text-brand-dark"
                    : "border border-white/10 text-white/50 hover:border-white/30"
                }`}
              >
                {s} ({count})
              </Link>
            );
          })}
        </div>

        {comments.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-white/40">No comments found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div key={comment.id} className="glass-dark p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="font-semibold text-white text-sm">
                        {comment.name}
                      </span>
                      <span className="text-white/30 text-xs">{comment.email}</span>
                      {comment.rating && (
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < comment.rating!
                                  ? "text-brand-amber fill-brand-amber"
                                  : "text-white/10"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                      <span
                        className={`px-2 py-0.5 text-xs font-medium ${
                          comment.status === "PENDING"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : comment.status === "APPROVED"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {comment.status}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {comment.comment}
                    </p>
                    <p className="text-white/20 text-xs mt-2">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                  <AdminCommentActions comment={comment} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
