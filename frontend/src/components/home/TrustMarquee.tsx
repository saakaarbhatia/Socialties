"use client";

import { motion } from "framer-motion";

interface BrandLogo {
  name: string;
  logoUrl: string;
}

interface TrustMarqueeProps {
  logos: BrandLogo[];
}

export default function TrustMarquee({ logos }: TrustMarqueeProps) {
  // Triple the logos list to make sure it covers the screen for seamless scrolling
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <section className="bg-brand-ink-soft py-10 border-y border-border/10 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-ink-soft to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-ink-soft to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-4">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-fg-muted/60 dark:text-fg-muted/40">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="flex w-full overflow-hidden relative py-2">
        <motion.div
          className="flex space-x-16 items-center shrink-0 min-w-full"
          animate={{ x: [0, -1000] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {marqueeLogos.map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center shrink-0 text-xl font-bold text-fg-muted/40 dark:text-fg-muted/30 hover:text-brand-lime transition-colors"
            >
              {/* Fallback to text brand representation to look premium in case of lack of assets */}
              <span className="tracking-widest uppercase font-display select-none">
                {brand.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
