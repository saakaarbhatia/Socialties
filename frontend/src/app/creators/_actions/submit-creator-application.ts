"use server";

import { creatorApplicationSchema, CreatorApplicationInput } from "../_schemas/creator-application.schema";

export async function submitCreatorApplication(data: CreatorApplicationInput) {
  try {
    const validated = creatorApplicationSchema.parse(data);
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/creator-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit creator application via API");
    }

    const result = await res.json();
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Failed to submit creator application action:", error);
    return { success: false, error: error.message || "Failed to submit application" };
  }
}
