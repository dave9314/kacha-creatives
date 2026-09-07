import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Image from "next/image";
import { Play, FileText } from "lucide-react";
import { formatDate } from "@/lib/utils";
import AdminMediaActions from "@/components/admin/AdminMediaActions";

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const { type } = await searchParams;

  const where: Record<string, unknown> = {};
  if (type && type !== "all") where.type = type.toUpperCase();

  const media = await prisma.media.findMany({
    where,
    include: { project: { select: { id: true, title: true } } },
    orderBy: { createdAt: "desc" },
  });

  const counts = {
    all: await prisma.media.count(),
    images: await prisma.media.count({ where: { type: "IMAGE" } }),
    videos: await prisma.media.count({ where: { type: "VIDEO" } }),
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-white text-3xl">Media Library</h1>
          <p className="text-white/40 mt-1">All uploaded portfolio media</p>
        </div>

        {/* Type filters */}
        <div className="flex gap-3 mb-6">
          {[
            { label: `All (${counts.all})`, value: "all" },
            { label: `Images (${counts.images})`, value: "image" },
            { label: `Videos (${counts.videos})`, value: "video" },
          ].map((tab) => (
            <a
              key={tab.value}
              href={`/admin/media?type=${tab.value}`}
              className={`px-4 py-1.5 text-xs font-semibold transition-colors ${
                (type || "all") === tab.value
                  ? "bg-brand-amber text-brand-dark"
                  : "border border-white/10 text-white/50 hover:border-white/30"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {media.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-white/40">No media files yet. Upload via Portfolio projects.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {media.map((m) => (
              <div key={m.id} className="group relative bg-brand-charcoal border border-white/5 overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-square bg-brand-dark">
                  {m.type === "IMAGE" ? (
                    <Image
                      src={m.url}
                      alt={m.filename}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : m.type === "VIDEO" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-brand-muted gap-2">
                      <Play className="w-8 h-8 text-white/30" />
                      <span className="text-white/20 text-xs">Video</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <FileText className="w-8 h-8 text-white/30" />
                      <span className="text-white/20 text-xs">Doc</span>
                    </div>
                  )}

                  {/* Type badge */}
                  <div className="absolute top-2 left-2">
                    <span className="px-1.5 py-0.5 bg-black/70 text-white/60 text-xs">
                      {m.type}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-white/60 text-xs truncate">{m.filename}</p>
                  {m.project && (
                    <p className="text-white/30 text-xs truncate mt-0.5">
                      {m.project.title}
                    </p>
                  )}
                  <p className="text-white/20 text-xs mt-1">
                    {formatDate(m.createdAt)}
                  </p>
                </div>

                <AdminMediaActions mediaId={m.id} projectId={m.project?.id} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
