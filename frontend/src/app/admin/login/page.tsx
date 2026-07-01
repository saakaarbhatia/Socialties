"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Key, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [status, router]);

  // Show spinner while checking session
  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-[75vh] flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-brand-lime" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error || !res?.ok) {
        setErrorMsg("Invalid email or password. Please try again.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 bg-background">
      <div className="max-w-md w-full space-y-8 bg-bg-elevated border border-border p-8 rounded-3xl shadow-sm">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-brand-lime/10 border border-brand-lime/20 rounded-2xl flex items-center justify-center text-brand-lime mx-auto">
            <Key size={22} />
          </div>
          <h1 className="text-2xl font-display font-black text-foreground">
            Admin Portal
          </h1>
          <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">
            Log in to manage leads and campaigns
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-4 rounded-xl flex items-center space-x-2 text-sm">
              <AlertTriangle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Email Address
            </label>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              placeholder="admin@socialties.in"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Password
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-lime hover:bg-brand-lime-dark text-black font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-lime/10 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Log In</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
