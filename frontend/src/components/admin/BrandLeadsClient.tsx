"use client";

import { useState } from "react";
import { updateLeadStatus } from "@/app/admin/(protected)/brand-leads/_actions/update-lead";
import { X, Check, ArrowRight } from "lucide-react";
import { LeadStatus } from "@/lib/types";

interface BrandLead {
  id: string;
  companyName: string;
  website: string | null;
  contactPerson: string;
  phone: string;
  email: string;
  campaignBudget: string;
  campaignObjectives: string[];
  targetAudience: string | null;
  platforms: string[];
  description: string;
  timeline: string | null;
  status: LeadStatus;
  createdAt: Date;
}

interface BrandLeadsClientProps {
  initialLeads: BrandLead[];
}

export default function BrandLeadsClient({ initialLeads }: BrandLeadsClientProps) {
  const [leads, setLeads] = useState(initialLeads);
  const [selectedLead, setSelectedLead] = useState<BrandLead | null>(null);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    setUpdating(true);
    try {
      const res = await updateLeadStatus(id, newStatus);
      if (res.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-bg-elevated border border-border rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-background border-b border-border text-fg-muted uppercase tracking-wider font-semibold text-xs">
              <th className="p-4">Company</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Budget</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {leads.map((lead) => (
              <tr
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className="hover:bg-background/50 cursor-pointer transition-colors"
              >
                <td className="p-4 font-bold text-foreground">{lead.companyName}</td>
                <td className="p-4">
                  {lead.contactPerson}
                  <div className="text-xs text-fg-muted">{lead.email}</div>
                </td>
                <td className="p-4">{lead.campaignBudget}</td>
                <td className="p-4">
                  <span className="text-xs px-2.5 py-1 bg-blue-500/10 text-blue-500 font-bold uppercase rounded-lg">
                    {lead.status}
                  </span>
                </td>
                <td className="p-4 text-xs text-fg-muted">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details drawer modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/55 backdrop-blur-xs">
          <div className="bg-bg-elevated border-l border-border h-full max-w-lg w-full p-8 flex flex-col justify-between overflow-y-auto space-y-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-6 right-6 p-2 text-fg-muted hover:text-foreground rounded-full border border-border hover:bg-background transition-colors"
            >
              <X size={16} />
            </button>

            <div className="space-y-6 pt-8">
              <div>
                <h3 className="text-2xl font-black text-foreground">{selectedLead.companyName}</h3>
                {selectedLead.website && (
                  <a
                    href={selectedLead.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-brand-lime hover:underline"
                  >
                    {selectedLead.website}
                  </a>
                )}
              </div>

              {/* Status Select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Update Lead Status
                </label>
                <select
                  disabled={updating}
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value as LeadStatus)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="WON">WON</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>

              {/* Contact info */}
              <div className="space-y-2 border-t border-border/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Contact Details
                </h4>
                <p className="text-sm font-semibold">{selectedLead.contactPerson}</p>
                <p className="text-xs text-fg-muted">
                  Email: <a href={`mailto:${selectedLead.email}`} className="hover:underline">{selectedLead.email}</a>
                </p>
                <p className="text-xs text-fg-muted">Phone: {selectedLead.phone}</p>
              </div>

              {/* Campaign specifications */}
              <div className="space-y-3 border-t border-border/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Campaign Specs
                </h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-fg-muted block">Budget</span>
                    <span className="font-semibold">{selectedLead.campaignBudget}</span>
                  </div>
                  {selectedLead.timeline && (
                    <div>
                      <span className="text-fg-muted block">Timeline</span>
                      <span className="font-semibold">{selectedLead.timeline}</span>
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-xs text-fg-muted block mb-1">Objectives</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.campaignObjectives.map((obj) => (
                      <span
                        key={obj}
                        className="px-2 py-0.5 bg-background border border-border text-foreground text-[10px] font-semibold uppercase rounded-md"
                      >
                        {obj}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs text-fg-muted block mb-1">Platforms</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedLead.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="px-2 py-0.5 bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-[10px] font-bold uppercase rounded-md"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message description */}
              <div className="space-y-2 border-t border-border/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-fg-muted">
                  Campaign Description
                </h4>
                <p className="text-sm text-fg-muted leading-relaxed whitespace-pre-wrap">
                  {selectedLead.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
