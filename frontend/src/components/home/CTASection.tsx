"use client";

import Link from "next/link";
import { ArrowRight, Phone, MessageSquare, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      {/* 1. Brand/Creator Split Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* For Brands */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-ink-soft border border-white/5 rounded-3xl p-8 sm:p-12 flex flex-col justify-between space-y-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-violet/10 rounded-full blur-3xl" />
          <div className="space-y-4 relative">
            <span className="px-3 py-1 bg-brand-violet/20 border border-brand-violet/30 text-brand-violet text-xs font-semibold rounded-lg uppercase tracking-wide">
              For Brands
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight leading-tight">
              Launch a campaign that drives real sales.
            </h3>
            <p className="text-sm text-fg-muted dark:text-fg-muted/70 max-w-md leading-relaxed">
              Skip the vanity metrics. Partner with top vetted creators and run optimized social acquisition funnels built for ROI.
            </p>
          </div>
          <div className="pt-4 relative">
            <Link
              href="/brands"
              className="inline-flex items-center space-x-2 px-6 py-3 font-bold uppercase tracking-wider rounded-xl bg-brand-lime hover:bg-brand-lime-dark text-black transition-all group"
            >
              <span>Work With Us</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* For Creators */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-ink-soft border border-white/5 rounded-3xl p-8 sm:p-12 flex flex-col justify-between space-y-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-lime/5 rounded-full blur-3xl" />
          <div className="space-y-4 relative">
            <span className="px-3 py-1 bg-brand-lime/10 border border-brand-lime/30 text-brand-lime text-xs font-semibold rounded-lg uppercase tracking-wide">
              For Creators
            </span>
            <h3 className="text-3xl sm:text-4xl font-display font-black tracking-tight leading-tight">
              Turn your influence into consistent income.
            </h3>
            <p className="text-sm text-fg-muted dark:text-fg-muted/70 max-w-md leading-relaxed">
              Get access to premium brand campaigns, transparent payouts, creative support, and long-term representation.
            </p>
          </div>
          <div className="pt-4 relative">
            <Link
              href="/creators"
              className="inline-flex items-center space-x-2 px-6 py-3 font-bold uppercase tracking-wider rounded-xl border border-white/20 hover:border-white/40 text-white transition-all bg-white/5"
            >
              <span>Apply to Join</span>
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 2. Final CTA Band */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-brand-violet to-brand-ink border border-border/20 rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-white"
      >
        <div className="space-y-3 text-center lg:text-left">
          <h3 className="text-3xl font-display font-black tracking-tight">
            Ready to grow? Let's talk.
          </h3>
          <p className="text-white/80 text-sm max-w-md leading-relaxed">
            Get in touch with Sanskar, Saakaar, or Dhruva to kickstart your next campaign today.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+919876543210"
            className="flex items-center space-x-2 px-5 py-3 border border-white/20 hover:border-white/40 rounded-xl text-sm font-semibold transition-all bg-white/5 hover:bg-white/10"
          >
            <Phone size={16} />
            <span>Call Us</span>
          </a>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-2 px-5 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-sm font-semibold transition-all"
          >
            <MessageSquare size={16} />
            <span>WhatsApp</span>
          </a>
          <a
            href="mailto:connect@socialties.in"
            className="flex items-center space-x-2 px-5 py-3 border border-white/20 hover:border-white/40 rounded-xl text-sm font-semibold transition-all bg-white/5 hover:bg-white/10"
          >
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
