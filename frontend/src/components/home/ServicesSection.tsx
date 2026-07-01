"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { motion } from "framer-motion";

interface Service {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
          Our Capabilities
        </h2>
        <p className="text-3xl sm:text-4xl font-display font-black text-foreground tracking-tight">
          Everything you need to dominate the digital landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          // Dynamic Lucide icon lookup
          const IconComponent = (Icons as any)[service.icon] || Icons.HelpCircle;

          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              key={service.slug}
              className="group relative bg-bg-elevated border border-border rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-brand-lime/30 hover:shadow-xl hover:shadow-brand-lime/5"
            >
              {/* Corner accent gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/0 via-brand-lime/0 to-brand-lime/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

              <div className="space-y-6 relative">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-brand-lime/10 border border-brand-lime/20 flex items-center justify-center text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-colors duration-300">
                  <IconComponent size={22} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-fg-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-lime hover:text-brand-lime-dark transition-colors"
                  >
                    <span>Inquire Now</span>
                    <Icons.ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
