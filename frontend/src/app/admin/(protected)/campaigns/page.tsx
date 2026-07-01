import CampaignsCrudClient from "@/components/admin/CampaignsCrudClient";

export const revalidate = 0; // Dynamic admin campaigns page

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default async function AdminCampaignsPage() {
  let campaigns = [];
  try {
    const res = await fetch(`${API_BASE}/api/campaigns`, { cache: "no-store" });
    if (res.ok) campaigns = await res.json();
  } catch {
    // render with empty list on failure
  }


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-black tracking-tight">Campaigns</h1>
        <p className="text-sm text-fg-muted">Create, edit, and delete case studies showcased on the platform.</p>
      </div>

      <CampaignsCrudClient initialCampaigns={campaigns} />
    </div>
  );
}
