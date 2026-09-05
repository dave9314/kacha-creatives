// This route is a server-side proxy for direct media uploads
// It keeps the Supabase service role key server-side only.
// Portfolio uploads go through Server Actions (admin.ts) instead.
// This route exists as a fallback for future use.

export async function GET() {
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
