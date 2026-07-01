import { Router } from "express";
import db from "../utils/db";
import { authenticateJWT, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// Public: Get homepage settings
router.get("/", async (req, res) => {
  try {
    const settings = await db.homepageSettings.findFirst();
    if (!settings) {
      return res.json(null);
    }
    return res.json({
      ...settings,
      statReach: settings.statReach ? settings.statReach.toString() : "0",
    });
  } catch (error: any) {
    console.error("Get homepage settings error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Create or update settings
router.post("/", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { heroHeadline, heroSubheading, statCampaigns, statBrands, statCreators, statReach } = req.body;

    if (!heroHeadline || !heroSubheading) {
      return res.status(400).json({ error: "Hero headline and subheading are required" });
    }

    const existing = await db.homepageSettings.findFirst();
    let settings;

    if (existing) {
      settings = await db.homepageSettings.update({
        where: { id: existing.id },
        data: {
          heroHeadline,
          heroSubheading,
          statCampaigns: Number(statCampaigns) || 0,
          statBrands: Number(statBrands) || 0,
          statCreators: Number(statCreators) || 0,
          statReach: statReach ? BigInt(statReach) : BigInt("0"),
        },
      });
    } else {
      settings = await db.homepageSettings.create({
        data: {
          heroHeadline,
          heroSubheading,
          statCampaigns: Number(statCampaigns) || 0,
          statBrands: Number(statBrands) || 0,
          statCreators: Number(statCreators) || 0,
          statReach: statReach ? BigInt(statReach) : BigInt("0"),
          trustedBrandLogos: [],
        },
      });
    }

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "UPDATE_HOMEPAGE_SETTINGS",
        entityType: "HOMEPAGE_SETTINGS",
        entityId: settings.id,
      },
    });

    return res.json({
      ...settings,
      statReach: settings.statReach ? settings.statReach.toString() : "0",
    });
  } catch (error: any) {
    console.error("Update settings error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
