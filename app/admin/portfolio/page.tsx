import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Plus, Eye, EyeOff, Star, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toggleProjectStatus, deletePortfolioProject } from "@/lib/actions/admin";
import AdminPortfolioActions from "@/components/admin/AdminPortfolioActions";

export default async function AdminPortfolioPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const projects = await prisma.portfolioProject.findMany({
    include: { media: true },
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-white text-3xl">Portfolio</h1>
            <p className="text-white/40 mt-1">{projects.length} projects</p>
          </div>
          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center gap-2 bg-brand-amber text-brand-dark font-bold text-sm px-5 py-2.5 hover:bg-brand-gold transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-white/40 mb-4">No portfolio projects yet.</p>
            <Link
              href="/admin/portfolio/new"
              className="bg-brand-amber text-brand-dark font-bold text-sm px-6 py-3 hover:bg-brand-gold transition-colors"
            >
              Create First Project
            </Link>
          </div>
        ) : (
          <div className="glass-dark overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-white/30 text-xs font-medium p-4">Title</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Category</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Media</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Status</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Date</th>
                  <th className="text-left text-white/30 text-xs font-medium p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-white/5 hover:bg-white/2">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {project.isFeatured && (
                          <Star className="w-3 h-3 text-brand-amber fill-brand-amber" />
                        )}
                        <span className="text-white text-sm font-medium">{project.title}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-white/5 text-white/50 text-xs">
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4 text-white/40 text-sm">
                      {project.media.length} files
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 text-xs font-medium ${
                        project.status === "PUBLISHED"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/10 text-white/40"
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-white/40 text-xs">
                      {formatDate(project.createdAt)}
                    </td>
                    <td className="p-4">
                      <AdminPortfolioActions project={project} />
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
