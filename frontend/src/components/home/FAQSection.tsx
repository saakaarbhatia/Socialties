"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How do you select influencers for my campaign?",
    answer: "We use a mix of data analysis and manual screening. We evaluate target audience alignment, historical performance metrics, real vs bot follower ratios, brand safety, and engagement quality to curate a highly optimized creator shortlist.",
  },
  {
    question: "What is your pricing model?",
    answer: "Our pricing depends on the campaign scale, objectives, and creator tiers involved. We operate on project-based management fees or retainer options with zero hidden costs or markups on creator rates.",
  },
  {
    question: "How do you track campaign performance?",
    answer: "We provide comprehensive live performance dashboards and post-campaign analytical audits tracking CTRs, direct sales/conversions, cost-per-acquisition (CPA), return on ad spend (ROAS), and real engagement reach.",
  },
  {
    question: "I am a creator, how do I apply to join Socialties?",
    answer: "Simple! Head over to our Creators page, fill out the application form, link your active social handles, and upload your latest media kit. Our creator relations team will review your application within 3-5 business days.",
  },
  {
    question: "How long does it take to launch an influencer campaign?",
    answer: "For standard gifting or product promotion campaigns, we can go live within 2-3 weeks from the brief sign-off, which includes influencer sourcing, agreement contracts, content review, and posting.",
  },
  {
    question: "Do you handle paid advertising along with influencer campaigns?",
    answer: "Yes, absolutely. We run performance ads using creator content (creator-licensing whitelist ads) on Meta and TikTok/Google, which consistently drives 2-3x higher conversion compared to standard brand ads.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-sm font-semibold tracking-wider text-brand-lime uppercase">
          FAQ
        </h2>
        <p className="text-3xl sm:text-4xl font-display font-black tracking-tight">
          Frequently Asked Questions
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-bg-elevated border border-border rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-base sm:text-lg text-foreground hover:text-brand-lime transition-colors"
              >
                <span>{faq.question}</span>
                <span className="ml-4 shrink-0 text-fg-muted">
                  {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-sm text-fg-muted leading-relaxed border-t border-border/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
