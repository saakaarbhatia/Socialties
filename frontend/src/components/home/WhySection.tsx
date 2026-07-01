"use client";

import { CheckCircle2, ShieldCheck, Zap, Users, BarChart3, HelpCircle, Layers } from "lucide-react";
import { motion } from "framer-motion";

const valueProps = [
  {
    title: "Vast Creator Network",
    description: "Access a curated roster of pre-vetted creators across multiple niches with active, engaged followings.",
    icon: Users,
  },
  {
    title: "Swift Campaign Execution",
    description: "Go from campaign concept to active live postings in record time with our streamlined execution pipeline.",
    icon: Zap,
  },
  {
    title: "Verified Audiences",
    description: "We filter out fake followers and bot engagement to ensure every dollar is spent on genuine real people.",
    icon: ShieldCheck,
  },
  {
    title: "Transparent Partnership",
    description: "No hidden management fees, clear pricing models, and honest feedback loop on campaign expectations.",
    icon: CheckCircle2,
  },
  {
    title: "End-to-End Management",
    description: "From discovery, briefing, negotiation, content supervision to posting, we handle every detail.",
    icon: Layers,
  },
  {
    title: "Performance Analytics",
    description: "Track conversions, click-through rates, reach, and total engagement with our granular post-campaign reports.",
    icon: BarChart3,
  },
  {
    title: "Dedicated Account Support",
    description: "A single dedicated campaign manager coordinating every step of your campaigns to ensure flawless execution.",
    icon: HelpCircle,
  },
];

export default function WhySection() {
  return (
    <section className="bg-brand-ink py-24 px-6 relative overflow-hidden">
      {/* Decorative background visual elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-lime/5 rounded-full blur-[160px] -z-10" />

      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
            Why Socialties
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            We deliver results that move the needle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Section introduction card */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-6 bg-brand-ink-soft/60 border border-white/5 rounded-3xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
              Data-backed strategy paired with creative storytelling.
            </h3>
            <p className="text-sm text-fg-muted dark:text-fg-muted/80 leading-relaxed">
              We don't believe in vanity metrics like impressions without context. We design influencer marketing and advertising campaigns focused on conversions, app installs, sales, and genuine brand affinity.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <span className="px-3 py-1.5 bg-brand-lime/10 border border-brand-lime/20 text-brand-lime rounded-lg text-xs font-semibold uppercase tracking-wider">
                ROI Focused
              </span>
              <span className="px-3 py-1.5 bg-brand-violet/10 border border-brand-violet/20 text-brand-violet rounded-lg text-xs font-semibold uppercase tracking-wider">
                Creator-First
              </span>
              <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-white/80 rounded-lg text-xs font-semibold uppercase tracking-wider">
                Full Transparency
              </span>
            </div>
          </div>

          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                key={prop.title}
                className="bg-brand-ink-soft/40 border border-white/5 rounded-3xl p-8 space-y-6 hover:border-brand-lime/20 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-lime/10 flex items-center justify-center text-brand-lime">
                  <Icon size={20} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-fg-muted dark:text-fg-muted/70 leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
