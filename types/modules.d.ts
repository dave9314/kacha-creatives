// These module declarations ensure TypeScript recognises Next.js and Lucide
// when the TS language server hasn't fully indexed node_modules yet.
// They are only needed until `next dev` generates next-env.d.ts on first run.

declare module "next/navigation";
declare module "next/image";
declare module "next/link";
declare module "next/headers";
declare module "next/cache";
declare module "next/server";
declare module "lucide-react";
