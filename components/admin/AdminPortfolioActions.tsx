"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { toggleProjectStatus, deletePortfolioProject } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  status: string;
}

export default function AdminPortfolioActions({ project }: { project: Project }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      const result = await toggleProjectStatus(project.id);
      if (result.success) {
        toast.success(
          project.status === "PUBLISHED" ? "Project unpublished" : "Project published!"
        );
        router.refresh();
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deletePortfolioProject(project.id);
      if (result.success) {
        toast.success("Project deleted");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/portfolio/${project.id}/edit`}
        className="p-1.5 text-white/30 hover:text-white transition-colors"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button
        onClick={handleToggle}
        disabled={isPending}
        className="p-1.5 text-white/30 hover:text-brand-amber transition-colors disabled:opacity-50"
        title={project.status === "PUBLISHED" ? "Unpublish" : "Publish"}
      >
        {project.status === "PUBLISHED" ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-1.5 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
