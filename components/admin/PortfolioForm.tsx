"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createPortfolioProject,
  updatePortfolioProject,
  uploadPortfolioMedia,
  deleteMedia,
  toggleProjectStatus,
} from "@/lib/actions/admin";
import { Upload, X, Play, Image as ImageIcon, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { formatFileSize } from "@/lib/utils";

interface Media {
  id: string;
  url: string;
  type: string;
  filename: string;
  size: number;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string;
  status: string;
  isFeatured: boolean;
  order: number;
  media: Media[];
}

const CATEGORIES = [
  "Graphic Design",
  "Video Production",
  "Photography",
  "Branding",
  "Social Media",
  "Campaign",
  "Other",
];

export default function PortfolioForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [media, setMedia] = useState<Media[]>(project?.media || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let result;
      if (project) {
        result = await updatePortfolioProject(project.id, formData);
      } else {
        result = await createPortfolioProject(formData);
        if (result.success && result.id) {
          router.push(`/admin/portfolio/${result.id}/edit`);
          toast.success("Project created! Now upload media.");
          return;
        }
      }

      if (result?.success) {
        toast.success(project ? "Project updated!" : "Project created!");
        if (!project) router.push("/admin/portfolio");
      } else {
        toast.error(result?.error || "Something went wrong");
      }
    });
  };

  const handleMediaUpload = async (files: FileList | null) => {
    if (!files || !project?.id) {
      toast.error("Save the project first, then upload media.");
      return;
    }

    setUploading(true);
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.set("file", file);

      const result = await uploadPortfolioMedia(project.id, formData);
      if (result.success && result.media) {
        setMedia((prev) => [...prev, result.media as Media]);
        toast.success(`${file.name} uploaded`);
      } else {
        toast.error(`Failed to upload ${file.name}: ${result.error}`);
      }
    }
    setUploading(false);
  };

  const handleDeleteMedia = async (mediaId: string) => {
    if (!confirm("Delete this media file?")) return;
    const result = await deleteMedia(mediaId);
    if (result.success) {
      setMedia((prev) => prev.filter((m) => m.id !== mediaId));
      toast.success("Media deleted");
    }
  };

  const handleTogglePublish = () => {
    if (!project?.id) return;
    startTransition(async () => {
      const result = await toggleProjectStatus(project.id);
      if (result.success) {
        toast.success(
          project.status === "PUBLISHED" ? "Unpublished" : "Published!"
        );
        router.refresh();
      }
    });
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Project details form */}
      <form onSubmit={handleSubmit} className="glass-dark p-8 space-y-5">
        <h2 className="font-display font-semibold text-white text-lg mb-6">
          Project Details
        </h2>

        <div>
          <label className="block text-white/60 text-sm mb-2">
            Title <span className="text-brand-amber">*</span>
          </label>
          <input
            name="title"
            required
            defaultValue={project?.title}
            placeholder="Project title"
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">Category</label>
          <select
            name="category"
            defaultValue={project?.category || "Graphic Design"}
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={project?.description || ""}
            placeholder="Brief project description..."
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={project?.order || 0}
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-end gap-4">
            <label className="flex items-center gap-2 cursor-pointer pb-3">
              <input
                name="isFeatured"
                type="checkbox"
                value="true"
                defaultChecked={project?.isFeatured}
                className="accent-brand-amber"
              />
              <span className="text-white/60 text-sm">Featured Project</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="bg-brand-amber text-brand-dark font-bold text-sm px-6 py-2.5 hover:bg-brand-gold transition-colors disabled:opacity-50"
          >
            {isPending ? "Saving..." : project ? "Save Changes" : "Create Project"}
          </button>

          {project && (
            <button
              type="button"
              onClick={handleTogglePublish}
              disabled={isPending}
              className={cn(
                "flex items-center gap-2 font-semibold text-sm px-6 py-2.5 border transition-colors disabled:opacity-50",
                project.status === "PUBLISHED"
                  ? "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10"
                  : "border-green-500/40 text-green-400 hover:bg-green-500/10"
              )}
            >
              {project.status === "PUBLISHED" ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  Unpublish
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  Publish
                </>
              )}
            </button>
          )}
        </div>
      </form>

      {/* Media upload — only if project exists */}
      {project && (
        <div className="glass-dark p-8">
          <h2 className="font-display font-semibold text-white text-lg mb-6">
            Media ({media.length} files)
          </h2>

          {/* Upload area */}
          <div
            className="border-2 border-dashed border-white/10 p-8 text-center hover:border-brand-amber/30 transition-colors cursor-pointer mb-6"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-6 h-6 text-white/30 mx-auto mb-3" />
            <p className="text-white/50 text-sm">
              Click to upload images or videos
            </p>
            <p className="text-white/20 text-xs mt-1">
              JPG, PNG, WEBP, MP4, WEBM, MOV
            </p>
            {uploading && (
              <div className="mt-3 flex items-center justify-center gap-2 text-brand-amber text-xs">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Uploading...
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => handleMediaUpload(e.target.files)}
            className="hidden"
          />

          {/* Media grid */}
          {media.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {media.map((m) => (
                <div key={m.id} className="group relative aspect-square bg-brand-dark">
                  {m.type === "VIDEO" ? (
                    <div className="w-full h-full flex items-center justify-center bg-brand-muted">
                      <Play className="w-8 h-8 text-white/30" />
                      <span className="absolute bottom-2 left-2 text-white/30 text-xs truncate max-w-[80%]">
                        {m.filename}
                      </span>
                    </div>
                  ) : (
                    <Image
                      src={m.url}
                      alt={m.filename}
                      fill
                      className="object-cover"
                    />
                  )}
                  <button
                    onClick={() => handleDeleteMedia(m.id)}
                    className="absolute top-1 right-1 p-1 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete media"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white/60 text-xs truncate">{formatFileSize(m.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
