"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial, uploadTestimonialMedia } from "@/lib/actions/admin";
import toast from "react-hot-toast";
import { Upload, X, Play, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { formatFileSize } from "@/lib/utils";

interface Media {
  id: string;
  url: string;
  type: string;
  filename: string;
  size: number;
}

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  quote: string;
  authorName: string;
  isPublished: boolean;
  order: number;
  media?: Media[];
}

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(testimonial?.id || null);
  const [mediaList, setMediaList] = useState<Media[]>(testimonial?.media || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, formData)
        : await createTestimonial(formData);

      if (result?.success) {
        if (!testimonial && result.id) {
          setSavedId(result.id);
          toast.success("Testimonial saved! Now upload media files.");
          router.push(`/admin/testimonials/${result.id}/edit`);
          return;
        }
        toast.success(testimonial ? "Testimonial updated!" : "Testimonial created!");
        router.push("/admin/testimonials");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  const handleMediaUpload = async (files: FileList | null) => {
    const currentId = savedId || testimonial?.id;
    if (!files || !currentId) {
      toast.error("Save the testimonial first, then upload media.");
      return;
    }
    setUploading(true);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      const result = await uploadTestimonialMedia(currentId, fd);
      if (result.success && result.media) {
        setMediaList((prev) => [...prev, result.media as Media]);
        toast.success(`${file.name} uploaded`);
      } else {
        toast.error(`Failed: ${result.error}`);
      }
    }
    setUploading(false);
  };

  const currentId = savedId || testimonial?.id;

  return (
    <div className="max-w-2xl space-y-6">
      {/* Details form */}
      <form onSubmit={handleSubmit} className="glass-dark p-8 space-y-5">
        <h2 className="font-display font-semibold text-white text-lg mb-2">Testimonial Details</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">
              Client Name <span className="text-brand-amber">*</span>
            </label>
            <input name="clientName" required defaultValue={testimonial?.clientName}
              placeholder="e.g. Loza Nutrition"
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-white/60 text-sm mb-2">
              Company <span className="text-brand-amber">*</span>
            </label>
            <input name="company" required defaultValue={testimonial?.company}
              placeholder="Company name"
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors" />
          </div>
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">
            Quote / Testimonial <span className="text-brand-amber">*</span>
          </label>
          <textarea name="quote" required rows={4} defaultValue={testimonial?.quote}
            placeholder="What the client said about Kacha Creatives..."
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none" />
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">
            Author Name <span className="text-brand-amber">*</span>
          </label>
          <input name="authorName" required defaultValue={testimonial?.authorName}
            placeholder="e.g. Prof. Muluken Fekadie"
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">Display Order</label>
            <input name="order" type="number" defaultValue={testimonial?.order ?? 0}
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors" />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input name="isPublished" type="checkbox" value="true"
                defaultChecked={testimonial?.isPublished ?? true} className="accent-brand-amber" />
              <span className="text-white/60 text-sm">Published</span>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button type="submit" disabled={isPending}
            className="bg-brand-amber text-brand-dark font-bold text-sm px-6 py-2.5 hover:bg-brand-gold transition-colors disabled:opacity-50">
            {isPending ? "Saving..." : testimonial ? "Save Changes" : "Create & Add Media"}
          </button>
          <button type="button" onClick={() => router.push("/admin/testimonials")}
            className="border border-white/10 text-white/50 text-sm px-6 py-2.5 hover:border-white/30 hover:text-white transition-colors">
            Cancel
          </button>
        </div>
      </form>

      {/* Media upload — only after testimonial is saved */}
      {currentId && (
        <div className="glass-dark p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-white text-lg">
              Media Files — Images & Videos
            </h2>
            <span className="text-white/40 text-xs">{mediaList.length} files</span>
          </div>

          <p className="text-white/40 text-xs mb-4">
            Upload photos or videos of work done for this client. These will appear with the testimonial on the public website.
          </p>

          {/* Upload zone */}
          <div
            className="border-2 border-dashed border-white/10 p-8 text-center hover:border-brand-amber/40 transition-colors cursor-pointer mb-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-6 h-6 text-white/30 mx-auto mb-3" />
            <p className="text-white/50 text-sm">
              Click to upload <span className="text-brand-amber">images or videos</span>
            </p>
            <p className="text-white/20 text-xs mt-1">JPG, PNG, WEBP, MP4, WEBM — Max 50MB each</p>
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

          <input ref={fileInputRef} type="file" multiple accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleMediaUpload(e.target.files)} />

          {/* Media grid */}
          {mediaList.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {mediaList.map((m) => (
                <div key={m.id} className="relative aspect-square bg-brand-dark border border-white/5 overflow-hidden group">
                  {m.type === "VIDEO" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-brand-charcoal gap-2">
                      <Play className="w-8 h-8 text-brand-amber" />
                      <span className="text-white/40 text-xs truncate px-2 text-center">{m.filename}</span>
                    </div>
                  ) : (
                    <Image src={m.url} alt={m.filename} fill className="object-cover" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
