export const metadata = {
  title: "Admin Dashboard | Kacha Creatives",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-dark">
      {children}
    </div>
  );
}
