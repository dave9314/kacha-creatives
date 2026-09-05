import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdminTestimonialActions from "@/components/admin/AdminTestimonialActions";

export default async function AdminTestimonialsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-white text-3xl">Testimonials</h1>
            <p className="text-white/40 mt-1">{testimonials.length} testimonials</p>
          </div>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-2 bg-brand-amber text-brand-dark font-bold text-sm px-5 py-2.5 hover:bg-brand-gold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Testimonial
          </Link>
        </div>

        {testimonials.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-white/40 mb-4">No testimonials. Run the seed to populate.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((t) => (
              <div key={t.id} className="glass-dark p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display font-semibold text-white text-base">
                        {t.clientName}
                      </h3>
                      <span className="text-white/30 text-sm">·</span>
                      <span className="text-white/50 text-sm">{t.company}</span>
                      <span
                        className={`px-1.5 py-0.5 text-xs ${
                          t.isPublished
                            ? "bg-green-500/20 text-green-400"
                            : "bg-white/10 text-white/30"
                        }`}
                      >
                        {t.isPublished ? "Published" : "Hidden"}
                      </span>
                    </div>
                    <p className="text-white/50 text-sm italic leading-relaxed line-clamp-2">
                      "{t.quote}"
                    </p>
                    <p className="text-white/30 text-xs mt-2">— {t.authorName}</p>
                  </div>
                  <AdminTestimonialActions testimonial={t} />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
