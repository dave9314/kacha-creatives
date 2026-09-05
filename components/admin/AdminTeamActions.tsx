"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteTeamMember, toggleTeamVisibility } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TeamMember {
  id: string;
  name: string;
  isVisible: boolean;
}

export default function AdminTeamActions({ member }: { member: TeamMember }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleToggleVisibility = () => {
    startTransition(async () => {
      const result = await toggleTeamVisibility(member.id);
      if (result?.success) {
        toast.success(member.isVisible ? "Member hidden" : "Member now visible");
        router.refresh();
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${member.name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteTeamMember(member.id);
      if (result.success) {
        toast.success("Member deleted");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-1 flex-shrink-0">
      <Link
        href={`/admin/team/${member.id}/edit`}
        className="p-1.5 text-white/30 hover:text-white transition-colors"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </Link>
      <button
        onClick={handleToggleVisibility}
        disabled={isPending}
        className="p-1.5 text-white/30 hover:text-brand-amber transition-colors disabled:opacity-50"
        title={member.isVisible ? "Hide" : "Show"}
      >
        {member.isVisible ? (
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
