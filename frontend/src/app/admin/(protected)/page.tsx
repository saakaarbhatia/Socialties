import { FolderKanban, Users2, Inbox, UserCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 0; // Dynamic dashboard page

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function fetchApi(path: string) {
  try {
    const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const [campaigns, team, brandLeads, creatorApps] = await Promise.all([
    fetchApi("/api/campaigns"),
    fetchApi("/api/team"),
    fetchApi("/api/brand-leads"),
    fetchApi("/api/creator-applications"),
  ]);

  const campaignsCount = campaigns?.length ?? 0;
  const teamCount = team?.length ?? 0;
  const brandLeadsCount = brandLeads?.length ?? 0;
  const creatorAppsCount = creatorApps?.length ?? 0;

  const recentLeads = (brandLeads ?? []).slice(0, 5);
  const recentApps = (creatorApps ?? []).slice(0, 5);

  const kpis = [
    { label: "Total Campaigns", value: campaignsCount, icon: FolderKanban, color: "text-brand-lime" },
    { label: "Team Members", value: teamCount, icon: Users2, color: "text-brand-violet" },
    { label: "Brand Leads", value: brandLeadsCount, icon: Inbox, color: "text-blue-500" },
    { label: "Creator Applications", value: creatorAppsCount, icon: UserCheck, color: "text-green-500" },
  ];

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-black tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-fg-muted">Quick statistics and conversion funnels review.</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-bg-elevated border border-border p-6 rounded-3xl flex items-center justify-between shadow-sm"
            >
              <div className="space-y-1">
                <span className="text-xs text-fg-muted uppercase tracking-wider font-semibold">
                  {kpi.label}
                </span>
                <p className="text-3xl font-black text-foreground">{kpi.value}</p>
              </div>
              <div className={`p-4 bg-background border border-border rounded-2xl ${kpi.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent submissions inbox lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Brand Leads */}
        <div className="bg-bg-elevated border border-border rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center space-x-2">
              <Inbox size={18} className="text-blue-500" />
              <span>Recent Brand Leads</span>
            </h2>
            <Link
              href="/admin/brand-leads"
              className="text-xs font-bold uppercase tracking-wider text-brand-lime hover:text-brand-lime-dark flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-border/10">
            {recentLeads.length === 0 ? (
              <p className="text-sm text-fg-muted py-4">No recent brand leads received.</p>
            ) : (
              recentLeads.map((lead) => (
                <div key={lead.id} className="py-4 flex justify-between items-center text-sm first:pt-0 last:pb-0">
                  <div>
                    <h3 className="font-semibold text-foreground">{lead.companyName}</h3>
                    <p className="text-xs text-fg-muted">
                      {lead.contactPerson} · {lead.campaignBudget}
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-500 font-bold uppercase rounded-lg">
                    {lead.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Creator Applications */}
        <div className="bg-bg-elevated border border-border rounded-3xl p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center space-x-2">
              <UserCheck size={18} className="text-green-500" />
              <span>Recent Applications</span>
            </h2>
            <Link
              href="/admin/creator-applications"
              className="text-xs font-bold uppercase tracking-wider text-brand-lime hover:text-brand-lime-dark flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-border/10">
            {recentApps.length === 0 ? (
              <p className="text-sm text-fg-muted py-4">No recent creator applications.</p>
            ) : (
              recentApps.map((app) => (
                <div key={app.id} className="py-4 flex justify-between items-center text-sm first:pt-0 last:pb-0">
                  <div>
                    <h3 className="font-semibold text-foreground">{app.fullName}</h3>
                    <p className="text-xs text-fg-muted">
                      {app.category} · {app.followers?.toLocaleString() || 0} followers
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-green-500/10 text-green-500 font-bold uppercase rounded-lg">
                    {app.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
