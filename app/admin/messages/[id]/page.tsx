import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { formatDate } from "@/lib/utils";
import { ChevronLeft, Paperclip } from "lucide-react";
import Link from "next/link";
import MessageDetailActions from "@/components/admin/MessageDetailActions";
import { updateMessageStatus } from "@/lib/actions/admin";

export default async function MessageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const { id } = await params;
  const message = await prisma.contactMessage.findUnique({ where: { id } });
  if (!message) notFound();

  // Auto-mark as READ when opened
  if (message!.status === "NEW") {
    await updateMessageStatus(id, "READ");
  }

  const statusColors: Record<string, string> = {
    NEW: "bg-brand-amber/20 text-brand-amber",
    READ: "bg-blue-500/20 text-blue-400",
    REPLIED: "bg-green-500/20 text-green-400",
    ARCHIVED: "bg-white/10 text-white/40",
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Messages
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="font-display font-bold text-white text-3xl">
              Contact Request
            </h1>
            <span className={`px-3 py-1 text-xs font-semibold ${statusColors[message.status]}`}>
              {message.status}
            </span>
          </div>
        </div>

        <div className="max-w-3xl space-y-6">
          {/* Contact details */}
          <div className="glass-dark p-8">
            <h2 className="font-display font-semibold text-white text-lg mb-6 pb-4 border-b border-white/5">
              Contact Information
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Name</p>
                <p className="text-white font-medium">{message.name}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Email</p>
                <a
                  href={`mailto:${message.email}`}
                  className="text-brand-amber hover:underline font-medium"
                >
                  {message.email}
                </a>
              </div>
              {message.phone && (
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Phone</p>
                  <a
                    href={`tel:${message.phone}`}
                    className="text-white hover:text-brand-amber transition-colors font-medium"
                  >
                    {message.phone}
                  </a>
                </div>
              )}
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wide mb-1">Received</p>
                <p className="text-white/60 text-sm">
                  {new Date(message.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Subject & Message */}
          <div className="glass-dark p-8">
            <div className="mb-6">
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                Subject / Introduction
              </p>
              <p className="text-white text-lg font-semibold">{message.subject}</p>
            </div>
            <div>
              <p className="text-white/40 text-xs uppercase tracking-wide mb-2">
                Message / Project Description
              </p>
              <div className="bg-brand-dark/50 border border-white/5 p-5 rounded-sm">
                <p className="text-white/80 leading-relaxed whitespace-pre-wrap text-sm">
                  {message.description}
                </p>
              </div>
            </div>
          </div>

          {/* Attachment */}
          {message.documentPath && (
            <div className="glass-dark p-6">
              <h2 className="font-display font-semibold text-white text-base mb-4">
                Attached Document
              </h2>
              <div className="flex items-center gap-4 p-4 bg-brand-dark/50 border border-white/5">
                <Paperclip className="w-5 h-5 text-brand-amber flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">
                    {message.documentName || "Document"}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    {message.documentType} ·{" "}
                    {message.documentSize
                      ? `${(message.documentSize / 1024).toFixed(1)} KB`
                      : "Unknown size"}
                  </p>
                </div>
                <MessageDocumentDownload documentPath={message.documentPath} />
              </div>
            </div>
          )}

          {/* Actions */}
          <MessageDetailActions message={message} />
        </div>
      </main>
    </div>
  );
}

// Server component for download button
async function MessageDocumentDownload({ documentPath }: { documentPath: string }) {
  const { getDocumentSignedUrl } = await import("@/lib/actions/admin");
  const signedUrl = await getDocumentSignedUrl(documentPath);

  if (!signedUrl) {
    return (
      <span className="text-white/30 text-xs">Unavailable</span>
    );
  }

  return (
    <a
      href={signedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-shrink-0 bg-brand-amber text-brand-dark text-xs font-bold px-4 py-2 hover:bg-brand-gold transition-colors"
    >
      Download
    </a>
  );
}
