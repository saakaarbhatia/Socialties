"use client";

import { useState } from "react";
import { createTeamMember, deleteTeamMember } from "@/app/admin/(protected)/team/_actions/team";
import { Plus, Trash2, X } from "lucide-react";

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

interface TeamCrudClientProps {
  initialMembers: TeamMember[];
}

export default function TeamCrudClient({ initialMembers }: TeamCrudClientProps) {
  const [members, setMembers] = useState(initialMembers);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await createTeamMember({
        name,
        designation,
        photoUrl,
        linkedin,
        instagram,
        email,
        bio,
      });

      if (res.success) {
        window.location.reload();
      } else {
        alert(res.error || "Failed to create team member");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await deleteTeamMember(id);
      if (res.success) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        alert(res.error || "Failed to delete team member");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Manage Members</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 bg-brand-lime text-black hover:bg-brand-lime-dark font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center space-x-2 transition-all shadow-md shadow-brand-lime/10"
        >
          <Plus size={14} />
          <span>Add Member</span>
        </button>
      </div>

      <div className="bg-bg-elevated border border-border rounded-3xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-background border-b border-border text-fg-muted uppercase tracking-wider font-semibold text-xs">
              <th className="p-4">Name</th>
              <th className="p-4">Designation</th>
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/10">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-background/50 transition-colors">
                <td className="p-4 font-bold text-foreground">{member.name}</td>
                <td className="p-4">{member.designation}</td>
                <td className="p-4 text-fg-muted">{member.email || "N/A"}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDeleteMember(member.id)}
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

      {/* Add member modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-elevated border border-border max-w-lg w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 text-fg-muted hover:text-foreground rounded-full border border-border hover:bg-background transition-colors"
            >
              <X size={16} />
            </button>

            <h3 className="text-2xl font-black text-foreground">Add Team Member</h3>

            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Designation *
                </label>
                <input
                  type="text"
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Instagram URL
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-fg-muted">
                  Bio / Details
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-lime"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-brand-lime hover:bg-brand-lime-dark text-black font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-lime/10 disabled:opacity-50"
                >
                  {submitting ? <span>Creating...</span> : <span>Save Member</span>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
