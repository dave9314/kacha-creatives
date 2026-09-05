import { createClient } from "@supabase/supabase-js";

// Public client — safe for browser (read-only storage)
export const supabasePublic = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-only admin client — NEVER expose to browser
export function getSupabaseAdmin() {
  if (typeof window !== "undefined") {
    throw new Error("Supabase admin client must only be used server-side");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export const BUCKETS = {
  PORTFOLIO: "kacha-portfolio",
  TEAM: "kacha-team",
  GENERAL: "kacha-general",
  CONTACT_DOCUMENTS: "kacha-contact-documents",
} as const;

export function generateStoragePath(
  _bucket: string,
  folder: string,
  filename: string
): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  return `${folder}/${safeName}`;
}
