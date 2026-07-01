"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createTeamMember(formData: {
  name: string;
  designation: string;
  photoUrl?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  bio?: string;
}) {
  try {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/team`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create team member");
    }

    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create team member:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/team/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete team member");
    }

    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete team member:", error);
    return { success: false, error: error.message };
  }
}
