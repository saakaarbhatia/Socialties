import SettingsClient from "@/components/admin/SettingsClient";

export const revalidate = 0; // Dynamic settings page

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default async function AdminSettingsPage() {
  let formattedSettings = null;
  try {
    const res = await fetch(`${API_BASE}/api/settings`, { cache: "no-store" });
    if (res.ok) {
      const settings = await res.json();
      if (settings) {
        formattedSettings = {
          heroHeadline: settings.heroHeadline,
          heroSubheading: settings.heroSubheading,
          statCampaigns: settings.statCampaigns,
          statBrands: settings.statBrands,
          statCreators: settings.statCreators,
          statReach: Number(settings.statReach),
        };
      }
    }
  } catch {
    // render with null settings on failure
  }


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-black tracking-tight">Portal Settings</h1>
        <p className="text-sm text-fg-muted">Edit website banners, animated stat counters, and copy.</p>
      </div>

      <SettingsClient initialSettings={formattedSettings} />
    </div>
  );
}
