"use client";

import { useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteService } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Service {
  id: string;
  name: string;
}

export default function AdminServiceActions({ service }: { service: Service }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm(`Delete "${service.name}"?`)) return;
    startTransition(async () => {
      const result = await deleteService(service.id);
      if (result?.success) {
        toast.success("Service deleted");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <Link
        href={`/admin/services/${service.id}/edit`}
        className="p-1.5 text-white/30 hover:text-white transition-colors"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </Link>
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
