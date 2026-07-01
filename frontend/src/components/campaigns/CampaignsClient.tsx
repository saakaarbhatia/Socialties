"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Instagram, Youtube, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface Campaign {
  id: string;
  slug: string;
  brandName: string;
  type: string;
  platforms: string[];
  status: string;
  reachTotal: bigint | null;
  budgetTier: string | null;
  coverImageUrl: string | null;
}

interface CampaignsClientProps {
  initialCampaigns: Campaign[];
}

const campaignTypes = [
  { label: "All Types", value: "" },
  { label: "Product Launch", value: "PRODUCT_LAUNCH" },
  { label: "Brand Awareness", value: "BRAND_AWARENESS" },
  { label: "Event Promotion", value: "EVENT_PROMOTION" },
  { label: "Gifting", value: "GIFTING" },
  { label: "Performance Ads", value: "PERFORMANCE_ADS" },
  { label: "Ambassador Program", value: "AMBASSADOR_PROGRAM" },
];

const platformsList = [
  { label: "All Platforms", value: "" },
  { label: "Instagram", value: "INSTAGRAM" },
  { label: "YouTube", value: "YOUTUBE" },
];

export default function CampaignsClient({ initialCampaigns }: CampaignsClientProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const filteredCampaigns = useMemo(() => {
    return initialCampaigns.filter((campaign) => {
      const matchesSearch = campaign.brandName.toLowerCase().includes(search.toLowerCase());
      const matchesType = !selectedType || campaign.type === selectedType;
      const matchesPlatform =
        !selectedPlatform ||
        campaign.platforms.map((p) => p.toUpperCase()).includes(selectedPlatform.toUpperCase());
      return matchesSearch && matchesType && matchesPlatform;
    });
  }, [initialCampaigns, search, selectedType, selectedPlatform]);

  const formatReach = (num: bigint | null) => {
    if (!num) return "N/A";
    if (num >= BigInt("10000000")) {
      return (Number(num) / 10000000).toFixed(0) + "Cr+";
    }
    if (num >= BigInt("1000000")) {
      return (Number(num) / 1000000).toFixed(0) + "M+";
    }
    return num.toLocaleString();
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toUpperCase()) {
      case "INSTAGRAM":
        return <Instagram size={14} className="text-pink-500" />;
      case "YOUTUBE":
        return <Youtube size={14} className="text-red-500" />;
      default:
        return <Globe size={14} className="text-blue-500" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Search and Filters Bar */}
      <div className="bg-bg-elevated border border-border p-6 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted" size={18} />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
          />
        </div>

        {/* Filter by Campaign Type */}
        <div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
          >
            {campaignTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Platform */}
        <div>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
          >
            {platformsList.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-3xl text-fg-muted">
          No campaigns found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <motion.div
              layout
              key={campaign.id}
              className="group relative overflow-hidden bg-bg-elevated border border-border rounded-3xl aspect-[4/3] flex flex-col justify-end p-6"
            >
              {campaign.coverImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={campaign.coverImageUrl}
                  alt={campaign.brandName}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-violet/20 to-brand-ink/90 -z-10" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative space-y-3 text-white z-10">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-semibold rounded-lg uppercase tracking-wide">
                    {campaign.type.replace("_", " ")}
                  </span>
                  <div className="flex space-x-2 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/10">
                    {campaign.platforms.map((platform) => (
                      <span key={platform} title={platform}>
                        {getPlatformIcon(platform)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display font-black tracking-tight">
                    {campaign.brandName}
                  </h3>
                  <div className="flex items-center space-x-4 text-xs text-white/70">
                    {campaign.reachTotal && (
                      <p>
                        Reach: <span className="font-bold text-brand-lime">{formatReach(campaign.reachTotal)}</span>
                      </p>
                    )}
                    {campaign.budgetTier && (
                      <p>
                        Scale: <span className="font-bold">{campaign.budgetTier}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-1">
                  <Link
                    href={`/campaigns/${campaign.slug}`}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-brand-lime hover:text-white transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
