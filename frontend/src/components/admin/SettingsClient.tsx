"use client";

import { useState } from "react";
import { updateHomepageSettings } from "@/app/admin/(protected)/settings/_actions/settings";
import { CheckCircle } from "lucide-react";

interface SettingsClientProps {
  initialSettings: {
    heroHeadline: string;
    heroSubheading: string;
    statCampaigns: number;
    statBrands: number;
    statCreators: number;
    statReach: number;
  } | null;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [heroHeadline, setHeroHeadline] = useState(initialSettings?.heroHeadline || "");
  const [heroSubheading, setHeroSubheading] = useState(initialSettings?.heroSubheading || "");
  const [statCampaigns, setStatCampaigns] = useState(initialSettings?.statCampaigns || 0);
  const [statBrands, setStatBrands] = useState(initialSettings?.statBrands || 0);
  const [statCreators, setStatCreators] = useState(initialSettings?.statCreators || 0);
  const [statReach, setStatReach] = useState(initialSettings?.statReach || 0);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      const res = await updateHomepageSettings({
        heroHeadline,
        heroSubheading,
        statCampaigns,
        statBrands,
        statCreators,
        statReach,
      });

      if (res.success) {
        setSuccess(true);
      } else {
        alert(res.error || "Failed to update settings");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-bg-elevated border border-border p-8 rounded-3xl shadow-sm text-sm">
      {success && (
        <div className="bg-brand-lime/10 border border-brand-lime/30 text-brand-lime p-4 rounded-xl flex items-center space-x-2 font-semibold">
          <CheckCircle size={18} />
          <span>Settings saved successfully! Changes are now live on the public site.</span>
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
          Hero Headline *
        </label>
        <input
          type="text"
          required
          value={heroHeadline}
          onChange={(e) => setHeroHeadline(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime font-bold text-base text-foreground"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
          Hero Subheading *
        </label>
        <textarea
          rows={3}
          required
          value={heroSubheading}
          onChange={(e) => setHeroSubheading(e.target.value)}
          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime text-fg-muted"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-border/10">
        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Campaigns Stats
          </label>
          <input
            type="number"
            required
            value={statCampaigns}
            onChange={(e) => setStatCampaigns(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime font-bold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Brands Served
          </label>
          <input
            type="number"
            required
            value={statBrands}
            onChange={(e) => setStatBrands(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime font-bold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Creators Managed
          </label>
          <input
            type="number"
            required
            value={statCreators}
            onChange={(e) => setStatCreators(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime font-bold"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-semibold uppercase tracking-wider text-fg-muted">
            Combined Reach
          </label>
          <input
            type="number"
            required
            value={statReach}
            onChange={(e) => setStatReach(Number(e.target.value))}
            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime font-bold"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-brand-lime hover:bg-brand-lime-dark text-black font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-brand-lime/10 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </form>
  );
}
