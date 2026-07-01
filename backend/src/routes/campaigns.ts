import { Router } from "express";
import db from "../utils/db";
import { authenticateJWT, AuthenticatedRequest } from "../middleware/auth";
import { CampaignType } from "@prisma/client";

const router = Router();

// Public: Get all campaigns
router.get("/", async (req, res) => {
  try {
    const campaigns = await db.campaign.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: "asc" },
    });
    // Serialize BigInt reachTotal for client
    const serialized = campaigns.map((c) => ({
      ...c,
      reachTotal: c.reachTotal ? c.reachTotal.toString() : null,
    }));
    return res.json(serialized);
  } catch (error: any) {
    console.error("Get campaigns error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Public: Get campaign details by slug (with media)
router.get("/by-slug/:slug", async (req, res) => {
  try {
    const campaign = await db.campaign.findFirst({
      where: { slug: req.params.slug, deletedAt: null },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        videos: { orderBy: { sortOrder: "asc" } },
        testimonials: { where: { isPublished: true } },
      },
    });
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }
    return res.json({
      ...campaign,
      reachTotal: campaign.reachTotal ? campaign.reachTotal.toString() : null,
    });
  } catch (error: any) {
    console.error("Get campaign by slug error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Create campaign
router.post("/", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const {
      brandName,
      slug,
      type,
      platforms,
      reachTotal,
      budgetTier,
      coverImageUrl,
      brief,
      strategy,
      resultsNote,
    } = req.body;

    if (!brandName || !slug || !type || !platforms) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const campaign = await db.campaign.create({
      data: {
        brandName,
        slug,
        type: type as CampaignType,
        platforms,
        reachTotal: reachTotal ? BigInt(reachTotal) : null,
        budgetTier: budgetTier || null,
        coverImageUrl: coverImageUrl || null,
        brief: brief || null,
        strategy: strategy || null,
        resultsNote: resultsNote || null,
        status: "COMPLETED",
        featured: true,
      },
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "CREATE_CAMPAIGN",
        entityType: "CAMPAIGN",
        entityId: campaign.id,
      },
    });

    return res.json({
      ...campaign,
      reachTotal: campaign.reachTotal ? campaign.reachTotal.toString() : null,
    });
  } catch (error: any) {
    console.error("Create campaign error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Authenticated: Delete campaign
router.delete("/:id", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const campaign = await db.campaign.update({
      where: { id },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "DELETE_CAMPAIGN",
        entityType: "CAMPAIGN",
        entityId: campaign.id,
      },
    });

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Delete campaign error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
