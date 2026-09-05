import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import AdminServiceActions from "@/components/admin/AdminServiceActions";

export default async function AdminServicesPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-white text-3xl">Services</h1>
            <p className="text-white/40 mt-1">{services.length} services</p>
          </div>
          <Link
            href="/admin/services/new"
            className="inline-flex items-center gap-2 bg-brand-amber text-brand-dark font-bold text-sm px-5 py-2.5 hover:bg-brand-gold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Service
          </Link>
        </div>

        {services.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-white/40 mb-4">No services found. Run the seed to populate.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="glass-dark p-5 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-semibold text-white text-base">
                      {service.name}
                    </h3>
                    <span
                      className={`px-1.5 py-0.5 text-xs ${
                        service.isVisible
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/10 text-white/30"
                      }`}
                    >
                      {service.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm">{service.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {service.items.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 bg-white/5 text-white/30 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                    {service.items.length > 4 && (
                      <span className="px-2 py-0.5 bg-white/5 text-white/30 text-xs">
                        +{service.items.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
                <AdminServiceActions service={service} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
