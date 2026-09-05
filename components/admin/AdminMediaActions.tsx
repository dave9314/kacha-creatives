"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Trash2, ExternalLink } from "lucide-react";
import { deleteMedia } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AdminMediaActions({
  mediaId,
  projectId,
}: {
  mediaId: string;
  projectId?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (
      !confirm(
        "Delete this media file? If it is used as a cover image, the project cover will be cleared."
      )
    )
      return;
    startTransition(async () => {
      const result = await deleteMedia(mediaId);
      if (result.success) {
        toast.success("Media deleted");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-1 p-2 border-t border-white/5">
      {projectId && (
        <Link
          href={`/admin/portfolio/${projectId}/edit`}
          className="p-1.5 text-white/30 hover:text-brand-amber transition-colors"
          title="View project"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-1.5 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50 ml-auto"
        title="Delete"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
