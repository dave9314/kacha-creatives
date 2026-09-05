import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import TeamForm from "@/components/admin/TeamForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NewTeamMemberPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <Link
            href="/admin/team"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Team
          </Link>
          <h1 className="font-display font-bold text-white text-3xl">
            Add Team Member
          </h1>
        </div>
        <TeamForm />
      </main>
    </div>
  );
}
