import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import TestimonialForm from "@/components/admin/TestimonialForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({
    where: { id },
    include: { media: { orderBy: { createdAt: "asc" } } },
  });
  if (!testimonial) { notFound(); return null; }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <Link
            href="/admin/testimonials"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Testimonials
          </Link>
          <h1 className="font-display font-bold text-white text-3xl">Edit Testimonial</h1>
          <p className="text-white/40 mt-1">{testimonial.clientName}</p>
        </div>
        <TestimonialForm testimonial={testimonial} />
      </main>
    </div>
  );
}
