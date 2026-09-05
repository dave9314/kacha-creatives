import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PortfolioForm from "@/components/admin/PortfolioForm";

export default async function NewPortfolioPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-white text-3xl">New Project</h1>
          <p className="text-white/40 mt-1">Create a new portfolio project</p>
        </div>
        <PortfolioForm />
      </main>
    </div>
  );
}
