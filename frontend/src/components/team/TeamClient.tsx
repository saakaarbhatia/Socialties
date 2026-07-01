"use client";

import { useState } from "react";
import { Linkedin, Instagram, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photoUrl: string | null;
  linkedin: string | null;
  instagram: string | null;
  email: string | null;
  bio: string | null;
}

interface TeamClientProps {
  members: TeamMember[];
}

export default function TeamClient({ members }: TeamClientProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="space-y-12">
      {members.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-border rounded-3xl text-fg-muted">
          Our team is currently working behind the scenes. Check back soon!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => setSelectedMember(member)}
              key={member.id}
              className="group cursor-pointer bg-bg-elevated border border-border rounded-3xl p-5 hover:border-brand-lime/20 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-4"
            >
              {/* Avatar Photo */}
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-brand-ink-soft border border-border group-hover:scale-105 transition-transform duration-300">
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-brand-lime text-2xl font-black uppercase font-display bg-brand-lime/5">
                    {member.name.substring(0, 2)}
                  </div>
                )}
              </div>

              {/* Name & Designation */}
              <div className="space-y-1">
                <h3 className="font-bold text-lg text-foreground group-hover:text-brand-lime transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-fg-muted uppercase tracking-wider font-semibold">
                  {member.designation}
                </p>
              </div>

              {/* Quick links */}
              <div className="flex space-x-3 text-fg-muted">
                {member.linkedin && <span className="hover:text-brand-lime transition-colors"><Linkedin size={14} /></span>}
                {member.instagram && <span className="hover:text-brand-lime transition-colors"><Instagram size={14} /></span>}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal Dialog */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-bg-elevated border border-border max-w-lg w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 text-fg-muted hover:text-foreground rounded-full border border-border hover:bg-background transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Avatar Photo */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-brand-ink-soft shrink-0 border border-border">
                  {selectedMember.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedMember.photoUrl}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-lime text-2xl font-black uppercase font-display bg-brand-lime/5">
                      {selectedMember.name.substring(0, 2)}
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-center sm:text-left">
                  <div>
                    <h3 className="font-extrabold text-2xl text-foreground">
                      {selectedMember.name}
                    </h3>
                    <p className="text-sm text-brand-lime uppercase tracking-wider font-bold">
                      {selectedMember.designation}
                    </p>
                  </div>

                  {/* Social links */}
                  <div className="flex justify-center sm:justify-start space-x-4 text-fg-muted">
                    {selectedMember.linkedin && (
                      <a
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-brand-lime transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                    {selectedMember.instagram && (
                      <a
                        href={selectedMember.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-brand-lime transition-colors"
                      >
                        <Instagram size={18} />
                      </a>
                    )}
                    {selectedMember.email && (
                      <a
                        href={`mailto:${selectedMember.email}`}
                        className="hover:text-brand-lime transition-colors"
                      >
                        <Mail size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Bio */}
              {selectedMember.bio && (
                <div className="text-sm text-fg-muted leading-relaxed whitespace-pre-wrap border-t border-border/10 pt-4">
                  {selectedMember.bio}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
