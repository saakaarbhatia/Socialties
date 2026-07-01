import { Router } from "express";
import db from "../utils/db";
import { authenticateJWT, AuthenticatedRequest } from "../middleware/auth";
import { LeadStatus } from "@prisma/client";

const router = Router();

// Public: Submit brand lead
router.post("/", async (req, res) => {
  try {
    const {
      companyName,
      website,
      contactPerson,
      phone,
      email,
      campaignObjectives,
      targetAudience,
      platforms,
      campaignBudget,
      description,
      message,
      timeline,
      fileUrl,
    } = req.body;

    if (!companyName || !contactPerson || !email || !phone || !campaignBudget) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const lead = await db.brandLead.create({
      data: {
        companyName,
        website: website || null,
        contactPerson,
        phone,
        email,
        campaignObjectives: campaignObjectives || [],
        targetAudience: targetAudience || null,
        platforms: platforms || [],
        campaignBudget,
        description: description || message || "N/A",
        timeline: timeline || null,
        fileUrl: fileUrl || null,
        status: "NEW",
      },
    });

    return res.json({ success: true, id: lead.id });
  } catch (error: any) {
    console.error("Submit brand lead error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Get all brand leads
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const leads = await db.brandLead.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return res.json(leads);
  } catch (error: any) {
    console.error("Get brand leads error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Update brand lead status
router.put("/:id", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const lead = await db.brandLead.update({
      where: { id },
      data: { status: status as LeadStatus },
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "UPDATE_BRAND_LEAD_STATUS",
        entityType: "BRAND_LEAD",
        entityId: lead.id,
      },
    });

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Update brand lead status error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
