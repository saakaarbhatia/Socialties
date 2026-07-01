"use client";

import { useState } from "react";
import { createCampaign, deleteCampaign } from "@/app/admin/(protected)/campaigns/_actions/campaigns";
import { Plus, Trash2, X } from "lucide-react";
import { CampaignType } from "@/lib/types";

interface Campaign {
  id: string;
  brandName: string;
  slug: string;
  type: string;
  platforms: string[];
  reachTotal: bigint | null;
  budgetTier: string | null;
}

interface CampaignsCrudClientProps {
  initialCampaigns: Campaign[];
}

export default function CampaignsCrudClient({ initialCampaigns }: CampaignsCrudClientProps) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [isOpen, setIsOpen] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [slug, setSlug] = useState("");
  const [type, setType] = useState<CampaignType>("PRODUCT_LAUNCH");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [reachTotal, setReachTotal] = useState("");
  const [budgetTier, setBudgetTier] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [brief, setBrief] = useState("");
  const [strategy, setStrategy] = useState("");
  const [resultsNote, setResultsNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await createCampaign({
        brandName,
        slug,
        type,
        platforms,
        reachTotal: reachTotal ? Number(reachTotal) : undefined,
        budgetTier,
        coverImageUrl,
        brief,
        strategy,
        resultsNote,
      });

      if (res.success) {
        window.location.reload();
      } else {
        alert(res.error || "Failed to create campaign");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) return;
    try {
      const res = await deleteCampaign(id);
      if (res.success) {
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(res.error || "Failed to delete campaign");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const togglePlatformSelection = (plat: string) => {
    setPlatforms((prev) =>
      prev.includes(plat) ? prev.filter((p) => p !== plat) : [...prev, plat]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Campaigns</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 bg-brand-lime text-black hover:bg-brand-lime-dark font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center space-x-2 transition-all shadow-md shadow-brand-lime/10"
        >
          <Plus size={14} />
          <span>Add Campaign</span>
        </button>
      </div>

      <div className="bg-bg-elevated border border-border rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-background border-b border-border text-fg-muted uppercase tracking-wider font-semibold text-xs">
              <th className="p-4">Brand</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Type</th>
              <th className="p-4">Platforms</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="hover:bg-background/50 transition-colors">
                <td className="p-4 font-bold text-foreground">{campaign.brandName}</td>
                <td className="p-4">{campaign.slug}</td>
                <td className="p-4 text-xs font-semibold">{campaign.type}</td>
                <td className="p-4 text-xs">{campaign.platforms.join(", ")}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="p-2 border border-border text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add campaign modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-elevated border border-border max-w-lg w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-fg-muted hover:text-foreground rounded-full border border-border hover:bg-background transition-colors"
            >
              <X size={16} />
            </button>

            <h3 className="text-2xl font-black text-foreground">Add Campaign</h3>

            <form onSubmit={handleAddCampaign} className="space-y-4 text-sm">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Slug (unique url path) *
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="brand-launch-2026"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Campaign Type *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as CampaignType)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                >
                  <option value="PRODUCT_LAUNCH">PRODUCT_LAUNCH</option>
                  <option value="BRAND_AWARENESS">BRAND_AWARENESS</option>
                  <option value="EVENT_PROMOTION">EVENT_PROMOTION</option>
                  <option value="GIFTING">GIFTING</option>
                  <option value="PERFORMANCE_ADS">PERFORMANCE_ADS</option>
                  <option value="AMBASSADOR_PROGRAM">AMBASSADOR_PROGRAM</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted block">
                  Platforms *
                </label>
                <div className="flex gap-4">
                  {["INSTAGRAM", "YOUTUBE"].map((plat) => (
                    <label key={plat} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={platforms.includes(plat)}
                        onChange={() => togglePlatformSelection(plat)}
                        className="rounded border-border text-brand-lime focus:ring-brand-lime"
                      />
                      <span>{plat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                    Total Reach
                  </label>
                  <input
                    type="number"
                    value={reachTotal}
                    onChange={(e) => setReachTotal(e.target.value)}
                    placeholder="e.g. 10000000"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                    Scale / Budget Tier
                  </label>
                  <input
                    type="text"
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    placeholder="e.g. ₹5L - ₹10L"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  The Brief
                </label>
                <textarea
                  rows={2}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  The Strategy
                </label>
                <textarea
                  rows={2}
                  value={strategy}
                  onChange={(e) => setStrategy(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Results Note
                </label>
                <textarea
                  rows={2}
                  value={resultsNote}
                  onChange={(e) => setResultsNote(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || platforms.length === 0}
                  className="w-full py-4 bg-brand-lime hover:bg-brand-lime-dark text-black font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-lime/10 disabled:opacity-50"
                >
                  {submitting ? <span>Creating...</span> : <span>Save Campaign</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
