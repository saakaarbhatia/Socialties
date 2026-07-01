"use server";

import { ApplicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function updateApplicationStatus(id: string, status: ApplicationStatus) {
  try {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/creator-applications/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update application status");
    }

    revalidatePath("/admin/creator-applications");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update creator application status:", error);
    return { success: false, error: error.message };
  }
}
