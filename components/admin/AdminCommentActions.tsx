"use client";

import { useTransition } from "react";
import { Check, X, Trash2 } from "lucide-react";
import { moderateComment, deleteComment } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Comment {
  id: string;
  name: string;
  status: string;
}

export default function AdminCommentActions({ comment }: { comment: Comment }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleApprove = () => {
    startTransition(async () => {
      await moderateComment(comment.id, "APPROVED");
      toast.success("Comment approved — now visible publicly");
      router.refresh();
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      await moderateComment(comment.id, "REJECTED");
      toast.success("Comment rejected");
      router.refresh();
    });
  };

  const handleDelete = () => {
    if (!confirm("Delete this comment?")) return;
    startTransition(async () => {
      await deleteComment(comment.id);
      toast.success("Comment deleted");
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-1 flex-shrink-0">
      {comment.status !== "APPROVED" && (
        <button
          onClick={handleApprove}
          disabled={isPending}
          className="p-2 text-white/30 hover:text-green-400 transition-colors disabled:opacity-50"
          title="Approve"
        >
          <Check className="w-4 h-4" />
        </button>
      )}
      {comment.status !== "REJECTED" && (
        <button
          onClick={handleReject}
          disabled={isPending}
          className="p-2 text-white/30 hover:text-yellow-400 transition-colors disabled:opacity-50"
          title="Reject"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="p-2 text-white/30 hover:text-red-400 transition-colors disabled:opacity-50"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
