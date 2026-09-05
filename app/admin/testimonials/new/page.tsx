import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import TestimonialForm from "@/components/admin/TestimonialForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NewTestimonialPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

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
          <h1 className="font-display font-bold text-white text-3xl">Add Testimonial</h1>
        </div>
        <TestimonialForm />
      </main>
    </div>
  );
}
