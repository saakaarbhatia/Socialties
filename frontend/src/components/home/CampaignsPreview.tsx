"use client";

import Link from "next/link";
import { ArrowRight, Instagram, Youtube, Play, Globe } from "lucide-react";
import { motion } from "framer-motion";

interface Campaign {
  id: string;
  slug: string;
  brandName: string;
  platforms: string[];
  type: string;
  budgetTier: string | null;
  reachTotal: bigint | null;
  coverImageUrl: string | null;
}

interface CampaignsPreviewProps {
  campaigns: Campaign[];
}

export default function CampaignsPreview({ campaigns }: CampaignsPreviewProps) {
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
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
            Case Studies
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-black text-foreground tracking-tight">
            Our work speaks for itself. Explore featured campaigns.
          </p>
        </div>
        <Link
          href="/campaigns"
          className="inline-flex items-center space-x-2 font-bold uppercase tracking-wider text-sm text-foreground hover:text-brand-lime transition-colors group py-2"
        >
          <span>View All Campaigns</span>
          <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {campaigns.length === 0 ? (
          <div className="col-span-full py-16 text-center border border-dashed border-border rounded-3xl text-fg-muted">
            No featured campaigns found. Add them in the admin dashboard.
          </div>
        ) : (
          campaigns.map((campaign, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              key={campaign.id}
              className="group relative overflow-hidden bg-bg-elevated border border-border rounded-3xl aspect-[4/3] flex flex-col justify-end p-8"
            >
              {/* Cover Image */}
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

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content (Overlaid on Bottom) */}
              <div className="relative space-y-4 text-white z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-semibold rounded-lg uppercase tracking-wide">
                    {campaign.type.replace("_", " ")}
                  </span>
                  <div className="flex space-x-2 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10">
                    {campaign.platforms.map((platform) => (
                      <span key={platform} title={platform}>
                        {getPlatformIcon(platform)}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-display font-black tracking-tight">
                    {campaign.brandName}
                  </h3>
                  <div className="flex items-center space-x-6 text-sm text-white/70">
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

                <div className="pt-2">
                  <Link
                    href={`/campaigns/${campaign.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-brand-lime hover:text-white transition-colors"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
