import TeamClient from "@/components/team/TeamClient";
import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${API_BASE}/api/public/seo?path=/team`, { cache: "no-store" });
    const seo = res.ok ? await res.json() : null;
    return {
      title: seo?.title || "Meet the Team | Socialties",
      description: seo?.description || "Meet the strategists, creators, and developers behind Socialties.",
    };
  } catch {
    return {
      title: "Meet the Team | Socialties",
      description: "Meet the strategists, creators, and developers behind Socialties.",
    };
  }
}

export const revalidate = 60; // Revalidate team page

export default async function TeamPage() {
  let members: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/api/team`, { next: { revalidate: 60 } });
    if (res.ok) members = await res.json();
  } catch {
    // fallback to empty list
  }


  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4 max-w-2xl text-center mx-auto">
        <h1 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
          Our Team
        </h1>
        <p className="text-4xl sm:text-5xl font-display font-black text-foreground tracking-tight leading-none">
          Meet the Minds Behind the Magic
        </p>
        <p className="text-base text-fg-muted leading-relaxed">
          We are a full-service creative marketing collective pairing cutting-edge technical strategy with authentic human storytelling to scale brands.
        </p>
      </div>

      <TeamClient members={members} />
    </div>
  );
}
