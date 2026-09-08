import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminSettingsForm from "@/components/admin/AdminSettingsForm";

export default async function AdminSettingsPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const settings = await prisma.siteSettings.findMany();
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display font-bold text-white text-3xl">Settings</h1>
          <p className="text-white/40 mt-1">Site configuration and admin account</p>
        </div>
        <AdminSettingsForm settings={settingsMap} adminEmail={session?.user?.email || ""} />
      </main>
    </div>
  );
}
