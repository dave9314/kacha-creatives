import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ServiceForm from "@/components/admin/ServiceForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) { notFound(); return null; }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <Link
            href="/admin/services"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <h1 className="font-display font-bold text-white text-3xl">Edit Service</h1>
          <p className="text-white/40 mt-1">{service.name}</p>
        </div>
        <ServiceForm service={service} />
      </main>
    </div>
  );
}
