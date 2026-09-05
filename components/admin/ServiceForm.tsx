"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createService, updateService } from "@/lib/actions/admin";
import toast from "react-hot-toast";

const ICON_OPTIONS = [
  { value: "TrendingUp", label: "Trending Up (Marketing)" },
  { value: "Video", label: "Video (Media Production)" },
  { value: "Palette", label: "Palette (Branding & Design)" },
  { value: "Lightbulb", label: "Lightbulb (Consulting)" },
  { value: "Target", label: "Target (Strategy)" },
];

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  items: string[];
  order: number;
  isVisible: boolean;
}

export default function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = service
        ? await updateService(service.id, formData)
        : await createService(formData);

      if (result?.success) {
        toast.success(service ? "Service updated!" : "Service created!");
        router.push("/admin/services");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl glass-dark p-8 space-y-5">
      <div>
        <label className="block text-white/60 text-sm mb-2">
          Service Name <span className="text-brand-amber">*</span>
        </label>
        <input
          name="name"
          required
          defaultValue={service?.name}
          placeholder="e.g. Digital Marketing & Social Media"
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">
          Description <span className="text-brand-amber">*</span>
        </label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={service?.description}
          placeholder="Short description of the service..."
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">Icon</label>
        <select
          name="icon"
          defaultValue={service?.icon || "TrendingUp"}
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
        >
          {ICON_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-white/60 text-sm mb-2">
          Service Items{" "}
          <span className="text-white/30 text-xs">(one per line)</span>
        </label>
        <textarea
          name="items"
          rows={6}
          defaultValue={service?.items?.join("\n") || ""}
          placeholder={"Daily Page Management\nFacebook & Instagram\nAnalytics & Reporting"}
          className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none font-mono"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white/60 text-sm mb-2">Display Order</label>
          <input
            name="order"
            type="number"
            defaultValue={service?.order ?? 0}
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
          />
        </div>
        <div className="flex items-end pb-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="isVisible"
              type="checkbox"
              value="true"
              defaultChecked={service?.isVisible ?? true}
              className="accent-brand-amber"
            />
            <span className="text-white/60 text-sm">Visible on website</span>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand-amber text-brand-dark font-bold text-sm px-6 py-2.5 hover:bg-brand-gold transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : service ? "Save Changes" : "Create Service"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="border border-white/10 text-white/50 text-sm px-6 py-2.5 hover:border-white/30 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
