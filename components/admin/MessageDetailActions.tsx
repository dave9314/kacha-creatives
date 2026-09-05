"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateMessageStatus, deleteMessage } from "@/lib/actions/admin";
import { CheckCheck, Archive, Trash2, Reply } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
  id: string;
  status: string;
}

export default function MessageDetailActions({ message }: { message: Message }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleStatus = (status: "READ" | "REPLIED" | "ARCHIVED") => {
    startTransition(async () => {
      await updateMessageStatus(message.id, status);
      toast.success(`Marked as ${status.toLowerCase()}`);
      router.refresh();
    });
  };

  const handleDelete = () => {
    if (!confirm("Delete this message permanently?")) return;
    startTransition(async () => {
      await deleteMessage(message.id);
      toast.success("Message deleted");
      router.push("/admin/messages");
    });
  };

  return (
    <div className="glass-dark p-6">
      <h2 className="font-display font-semibold text-white text-base mb-4">Actions</h2>
      <div className="flex flex-wrap gap-3">
        {message.status !== "REPLIED" && (
          <button
            onClick={() => handleStatus("REPLIED")}
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-medium px-4 py-2 hover:bg-green-500/30 transition-colors disabled:opacity-50"
          >
            <Reply className="w-4 h-4" />
            Mark as Replied
          </button>
        )}
        {message.status !== "READ" && message.status !== "REPLIED" && (
          <button
            onClick={() => handleStatus("READ")}
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium px-4 py-2 hover:bg-blue-500/30 transition-colors disabled:opacity-50"
          >
            <CheckCheck className="w-4 h-4" />
            Mark as Read
          </button>
        )}
        {message.status !== "ARCHIVED" && (
          <button
            onClick={() => handleStatus("ARCHIVED")}
            disabled={isPending}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/50 text-sm font-medium px-4 py-2 hover:bg-white/10 transition-colors disabled:opacity-50"
          >
            <Archive className="w-4 h-4" />
            Archive
          </button>
        )}
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium px-4 py-2 hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
}
