import TeamCrudClient from "@/components/admin/TeamCrudClient";

export const revalidate = 0; // Dynamic admin team page

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default async function AdminTeamPage() {
  let members = [];
  try {
    const res = await fetch(`${API_BASE}/api/team`, { cache: "no-store" });
    if (res.ok) members = await res.json();
  } catch {
    // render with empty list on failure
  }


  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-display font-black tracking-tight">Team Management</h1>
        <p className="text-sm text-fg-muted">Add, remove, and manage Socialties team members.</p>
      </div>

      <TeamCrudClient initialMembers={members} />
    </div>
  );
}
