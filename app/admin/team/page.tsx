import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { Plus, User } from "lucide-react";
import Image from "next/image";
import AdminTeamActions from "@/components/admin/AdminTeamActions";

export default async function AdminTeamPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/admin/login");

  const members = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-bold text-white text-3xl">Team</h1>
            <p className="text-white/40 mt-1">{members.length} members</p>
          </div>
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-2 bg-brand-amber text-brand-dark font-bold text-sm px-5 py-2.5 hover:bg-brand-gold transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </Link>
        </div>

        {members.length === 0 ? (
          <div className="glass-dark p-12 text-center">
            <p className="text-white/40 mb-4">No team members yet.</p>
            <Link
              href="/admin/team/new"
              className="bg-brand-amber text-brand-dark font-bold text-sm px-6 py-3 hover:bg-brand-gold transition-colors"
            >
              Add First Member
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map((member) => (
              <div key={member.id} className="glass-dark p-5 flex items-start gap-4">
                {/* Photo */}
                <div className="w-14 h-14 bg-brand-charcoal border border-white/10 overflow-hidden flex-shrink-0 relative">
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white/20" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-white text-sm">
                    {member.name}
                  </h3>
                  <p className="text-white/40 text-xs mt-0.5">{member.role}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-1.5 py-0.5 text-xs ${
                        member.isVisible
                          ? "bg-green-500/20 text-green-400"
                          : "bg-white/10 text-white/30"
                      }`}
                    >
                      {member.isVisible ? "Visible" : "Hidden"}
                    </span>
                    <span className="text-white/20 text-xs">#{member.order}</span>
                  </div>
                </div>

                <AdminTeamActions member={member} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
