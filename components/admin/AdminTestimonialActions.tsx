"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteTestimonial, updateTestimonial } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
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

export default function AdminTestimonialActions({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggle = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("clientName", testimonial.clientName);
      formData.set("company", testimonial.company);
      formData.set("quote", testimonial.quote);
      formData.set("authorName", testimonial.authorName);
      formData.set("order", testimonial.order.toString());
      if (!testimonial.isPublished) formData.set("isPublished", "true");

      const result = await updateTestimonial(testimonial.id, formData);
      if (result?.success) {
        toast.success(testimonial.isPublished ? "Hidden" : "Published!");
        router.refresh();
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete testimonial from "${testimonial.clientName}"?`)) return;
    startTransition(async () => {
      const result = await deleteTestimonial(testimonial.id);
      if (result?.success) {
        toast.success("Testimonial deleted");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <Link
        href={`/admin/testimonials/${testimonial.id}/edit`}
        className="p-1.5 text-white/30 hover:text-white transition-colors"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button
        onClick={handleToggle}
        disabled={isPending}
        className="p-1.5 text-white/30 hover:text-brand-amber transition-colors disabled:opacity-50"
        title={testimonial.isPublished ? "Hide" : "Publish"}
      >
        {testimonial.isPublished ? (
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
