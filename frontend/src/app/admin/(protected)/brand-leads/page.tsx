import BrandLeadsClient from "@/components/admin/BrandLeadsClient";

export const revalidate = 0; // Dynamic brand leads dashboard

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default async function AdminBrandLeadsPage() {
  let leads = [];
  try {
    const res = await fetch(`${API_BASE}/api/brand-leads`, { cache: "no-store" });
    if (res.ok) leads = await res.json();
  } catch {
    // render with empty list on failure
  }


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-black tracking-tight">Brand Leads</h1>
        <p className="text-sm text-fg-muted">Review incoming brand marketing campaign briefs.</p>
      </div>

      <BrandLeadsClient initialLeads={leads} />
    </div>
  );
}
