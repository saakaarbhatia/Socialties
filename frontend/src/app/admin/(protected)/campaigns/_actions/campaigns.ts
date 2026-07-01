"use server";

import { CampaignType } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createCampaign(formData: {
  brandName: string;
  slug: string;
  type: CampaignType;
  platforms: string[];
  reachTotal?: number;
  budgetTier?: string;
  coverImageUrl?: string;
  brief?: string;
  strategy?: string;
  resultsNote?: string;
}) {
  try {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/campaigns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create campaign");
    }

    revalidatePath("/admin/campaigns");
    revalidatePath("/campaigns");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create campaign:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteCampaign(id: string) {
  try {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/campaigns/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete campaign");
    }

    revalidatePath("/admin/campaigns");
    revalidatePath("/campaigns");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete campaign:", error);
    return { success: false, error: error.message };
  }
}
