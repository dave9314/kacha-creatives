"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  createTeamMember,
  updateTeamMember,
  uploadTeamPhoto,
} from "@/lib/actions/admin";
import { Upload, User } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  photoUrl: string | null;
  order: number;
  isVisible: boolean;
}

export default function TeamForm({ member }: { member?: TeamMember }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(member?.photoUrl || null);
  const [savedId, setSavedId] = useState<string | null>(member?.id || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      let result;
      if (member) {
        result = await updateTeamMember(member.id, formData);
      } else {
        result = await createTeamMember(formData);
        if (result.success && result.id) {
          setSavedId(result.id);
          toast.success("Member created! You can now upload a photo.");
          router.push(`/admin/team/${result.id}/edit`);
          return;
        }
      }

      if (result?.success) {
        toast.success(member ? "Member updated!" : "Member created!");
        if (!member) router.push("/admin/team");
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  const handlePhotoUpload = async (file: File) => {
    const currentId = savedId || member?.id;
    if (!currentId) {
      toast.error("Save the member first, then upload a photo.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.set("photo", file);

    const result = await uploadTeamPhoto(currentId, formData);
    setUploading(false);

    if (result.success && result.url) {
      setPhotoUrl(result.url);
      toast.success("Photo uploaded!");
    } else {
      toast.error(result.error || "Upload failed");
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      {/* Photo upload */}
      <div className="glass-dark p-6">
        <h2 className="font-display font-semibold text-white text-lg mb-4">
          Profile Photo
        </h2>
        <div className="flex items-center gap-6">
          <div
            className="w-24 h-24 bg-brand-dark border border-white/10 overflow-hidden relative cursor-pointer hover:border-brand-amber/40 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {photoUrl ? (
              <Image src={photoUrl} alt="Team photo" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col gap-1">
                <User className="w-8 h-8 text-white/20" />
                <span className="text-white/20 text-xs">No photo</span>
              </div>
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 border border-white/10 text-white/60 text-sm px-4 py-2 hover:border-brand-amber/40 hover:text-white transition-colors disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
            <p className="text-white/30 text-xs mt-2">JPG, PNG, WEBP — Max 5MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhotoUpload(file);
            }}
          />
        </div>
      </div>

      {/* Details form */}
      <form onSubmit={handleSubmit} className="glass-dark p-6 space-y-4">
        <h2 className="font-display font-semibold text-white text-lg mb-2">
          Member Details
        </h2>

        <div>
          <label className="block text-white/60 text-sm mb-2">
            Full Name <span className="text-brand-amber">*</span>
          </label>
          <input
            name="name"
            required
            defaultValue={member?.name}
            placeholder="Full name"
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">
            Role / Title <span className="text-brand-amber">*</span>
          </label>
          <input
            name="role"
            required
            defaultValue={member?.role}
            placeholder="e.g. Graphic Designer"
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">
            Bio <span className="text-white/30 text-xs">(Optional)</span>
          </label>
          <textarea
            name="bio"
            rows={3}
            defaultValue={member?.bio || ""}
            placeholder="Short bio..."
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/60 text-sm mb-2">Display Order</label>
            <input
              name="order"
              type="number"
              defaultValue={member?.order ?? 0}
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                name="isVisible"
                type="checkbox"
                value="true"
                defaultChecked={member?.isVisible ?? true}
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
            {isPending ? "Saving..." : member ? "Save Changes" : "Create Member"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/team")}
            className="border border-white/10 text-white/50 text-sm px-6 py-2.5 hover:border-white/30 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
