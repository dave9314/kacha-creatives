"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTestimonial, updateTestimonial } from "@/lib/actions/admin";
import toast from "react-hot-toast";

interface Testimonial {
  id: string;
  clientName: string;
  company: string;
  quote: string;
  authorName: string;
  isPublished: boolean;
  order: number;
}

export default function TestimonialForm({ testimonial }: { testimonial?: Testimonial }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = testimonial
        ? await updateTestimonial(testimonial.id, formData)
        : await createTestimonial(formData);

      if (result?.success) {
        toast.success(testimonial ? "Testimonial updated!" : "Testimonial created!");
        router.push("/admin/testimonials");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl glass-dark p-8 space-y-5">
      <div>
        <label className="block text-white/60 text-sm mb-2">
          Client / Company Name <span className="text-brand-amber">*</span>
        </label>
        <input
          name="clientName"
          required
          defaultValue={testimonial?.clientName}
          placeholder="e.g. Loza Nutrition"
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">
          Company <span className="text-brand-amber">*</span>
        </label>
        <input
          name="company"
          required
          defaultValue={testimonial?.company}
          placeholder="Company name"
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">
          Quote / Testimonial <span className="text-brand-amber">*</span>
        </label>
        <textarea
          name="quote"
          required
          rows={5}
          defaultValue={testimonial?.quote}
          placeholder="What the client said..."
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">
          Author Name <span className="text-brand-amber">*</span>
        </label>
        <input
          name="authorName"
          required
          defaultValue={testimonial?.authorName}
          placeholder="e.g. Prof. Muluken Fekadie"
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-sm mb-2">Display Order</label>
          <input
            name="order"
            type="number"
            defaultValue={testimonial?.order ?? 0}
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="isPublished"
              type="checkbox"
              value="true"
              defaultChecked={testimonial?.isPublished ?? true}
              className="accent-brand-amber"
            />
            <span className="text-white/60 text-sm">Published</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand-amber text-brand-dark font-bold text-sm px-6 py-2.5 hover:bg-brand-gold transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : testimonial ? "Save Changes" : "Create Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
          className="border border-white/10 text-white/50 text-sm px-6 py-2.5 hover:border-white/30 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
