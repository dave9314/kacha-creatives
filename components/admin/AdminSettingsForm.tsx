"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateSiteSettings, changeAdminPassword } from "@/lib/actions/admin";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  settings: Record<string, string>;
  adminEmail: string;
}

export default function AdminSettingsForm({ settings, adminEmail }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isPwPending, startPwTransition] = useTransition();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [pwError, setPwError] = useState("");

  const handleSettingsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateSiteSettings(formData);
      if (result?.success) {
        toast.success("Settings saved!");
        router.refresh();
      } else {
        toast.error("Failed to save settings");
      }
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPwError("");
    const formData = new FormData(e.currentTarget);
    const newPw = formData.get("newPassword") as string;
    const confirmPw = formData.get("confirmPassword") as string;
    if (newPw !== confirmPw) {
      setPwError("Passwords do not match");
      return;
    }
    startPwTransition(async () => {
      const result = await changeAdminPassword(formData);
      if (result?.success) {
        toast.success("Password changed!");
        (e.target as HTMLFormElement).reset();
      } else {
        setPwError(result?.error || "Failed to change password");
      }
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Site Info */}
      <form onSubmit={handleSettingsSubmit} className="glass-dark p-8 space-y-5">
        <h2 className="font-display font-semibold text-white text-lg border-b border-white/5 pb-4 mb-6">
          Site Information
        </h2>

        {[
          { key: "company_name", label: "Company Name" },
          { key: "tagline", label: "Tagline" },
          { key: "phone_1", label: "Phone 1" },
          { key: "phone_2", label: "Phone 2" },
          { key: "email", label: "Contact Email" },
          { key: "address", label: "Address" },
          { key: "founded", label: "Founded Year" },
        ].map((field) => (
          <div key={field.key}>
            <label className="block text-white/60 text-sm mb-2">{field.label}</label>
            <input
              name={field.key}
              defaultValue={settings[field.key] || ""}
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
            />
          </div>
        ))}

        <div>
          <label className="block text-white/60 text-sm mb-2">Mission</label>
          <textarea
            name="mission"
            rows={3}
            defaultValue={settings["mission"] || ""}
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none"
          />
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">Vision</label>
          <textarea
            name="vision"
            rows={3}
            defaultValue={settings["vision"] || ""}
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-brand-amber text-brand-dark font-bold text-sm px-6 py-2.5 hover:bg-brand-gold transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Settings"}
        </button>
      </form>

      {/* Admin account info */}
      <div className="glass-dark p-6">
        <h2 className="font-display font-semibold text-white text-lg mb-4">
          Admin Account
        </h2>
        <p className="text-white/50 text-sm mb-2">
          Logged in as:{" "}
          <span className="text-white font-medium">{adminEmail}</span>
        </p>
        <p className="text-white/30 text-xs">
          This is the only admin account. Only this account can access the dashboard.
        </p>
      </div>

      {/* Change password */}
      <form onSubmit={handlePasswordSubmit} className="glass-dark p-8 space-y-4">
        <h2 className="font-display font-semibold text-white text-lg border-b border-white/5 pb-4 mb-2">
          Change Password
        </h2>

        <div>
          <label className="block text-white/60 text-sm mb-2">Current Password</label>
          <div className="relative">
            <input
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              required
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 pr-12 text-sm focus:border-brand-amber focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">New Password</label>
          <div className="relative">
            <input
              name="newPassword"
              type={showNew ? "text" : "password"}
              required
              minLength={8}
              className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 pr-12 text-sm focus:border-brand-amber focus:outline-none transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
            >
              {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-white/60 text-sm mb-2">Confirm New Password</label>
          <input
            name="confirmPassword"
            type="password"
            required
            className="w-full bg-brand-dark border border-white/10 text-white px-4 py-3 text-sm focus:border-brand-amber focus:outline-none transition-colors"
          />
        </div>

        {pwError && (
          <p className="text-red-400 text-sm">{pwError}</p>
        )}

        <button
          type="submit"
          disabled={isPwPending}
          className="bg-white/10 border border-white/10 text-white font-bold text-sm px-6 py-2.5 hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          {isPwPending ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
