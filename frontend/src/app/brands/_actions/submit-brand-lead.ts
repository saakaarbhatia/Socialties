"use server";

import { brandLeadSchema, BrandLeadInput } from "../_schemas/brand-lead.schema";

export async function submitBrandLead(data: BrandLeadInput) {
  try {
    const validated = brandLeadSchema.parse(data);
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/brand-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit brand lead via API");
    }

    const result = await res.json();
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Failed to submit brand lead action:", error);
    return { success: false, error: error.message || "Failed to submit lead" };
  }
}
