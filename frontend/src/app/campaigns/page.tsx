import CampaignsClient from "@/components/campaigns/CampaignsClient";
import type { Metadata } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const res = await fetch(`${API_BASE}/api/public/seo?path=/campaigns`, { cache: "no-store" });
    const seo = res.ok ? await res.json() : null;
    return {
      title: seo?.title || "Our Campaigns | Socialties Case Studies",
      description: seo?.description || "Explore how Socialties drives real ROI for top brands.",
    };
  } catch {
    return {
      title: "Our Campaigns | Socialties Case Studies",
      description: "Explore how Socialties drives real ROI for top brands.",
    };
  }
}

export const revalidate = 60; // Revalidate dynamic campaigns list page

export default async function CampaignsPage() {
  let campaigns: any[] = [];
  try {
    const res = await fetch(`${API_BASE}/api/campaigns`, { next: { revalidate: 60 } });
    if (res.ok) campaigns = await res.json();
  } catch {
    // fallback to empty list
  }


  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-12">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
          Case Studies
        </h1>
        <p className="text-4xl sm:text-5xl font-display font-black text-foreground tracking-tight leading-none">
          Campaigns Showcase
        </p>
        <p className="text-base text-fg-muted leading-relaxed">
          See how we turn authentic creative storytelling into trackable returns and viral social engagement for leading brands.
        </p>
      </div>

      <CampaignsClient initialCampaigns={campaigns} />
    </div>
  );
}
