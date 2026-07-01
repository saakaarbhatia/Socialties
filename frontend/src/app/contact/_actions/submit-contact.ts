"use server";

import { contactSchema, ContactInput } from "../_schemas/contact.schema";

export async function submitContactMessage(data: ContactInput) {
  try {
    const validated = contactSchema.parse(data);
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

    const res = await fetch(`${apiBase}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validated),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to submit message via API");
    }

    const result = await res.json();
    return { success: true, data: result };
  } catch (error: any) {
    console.error("Failed to submit contact message action:", error);
    return { success: false, error: error.message || "Failed to submit message" };
  }
}
