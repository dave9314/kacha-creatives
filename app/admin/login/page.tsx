"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-amber flex items-center justify-center">
              <span className="font-display font-bold text-brand-dark text-xl">K</span>
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-white text-xl leading-none">
                KACHA
              </div>
              <div className="text-brand-amber text-xs tracking-[0.3em]">
                CREATIVES
              </div>
            </div>
          </div>
          <h1 className="font-display font-bold text-white text-2xl mb-2">
            Admin Dashboard
          </h1>
          <p className="text-white/40 text-sm">
            Authorized personnel only
          </p>
        </div>

        {/* Form */}
        <div className="glass-dark p-8">
          <div className="flex items-center gap-3 mb-8 p-4 bg-brand-amber/10 border border-brand-amber/20">
            <Lock className="w-4 h-4 text-brand-amber flex-shrink-0" />
            <span className="text-white/60 text-xs">
              This area is restricted to Kacha Creatives administrators
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-white/60 text-sm mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@kachacreatives.com"
                className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-white/60 text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 pr-12 text-sm focus:border-brand-amber focus:outline-none transition-colors placeholder:text-white/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-brand-amber text-brand-dark font-bold text-sm py-3 hover:bg-brand-gold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Public visitors do not need an account.{" "}
          <a href="/" className="text-white/30 hover:text-brand-amber transition-colors">
            Return to website →
          </a>
        </p>
      </div>
    </div>
  );
}
