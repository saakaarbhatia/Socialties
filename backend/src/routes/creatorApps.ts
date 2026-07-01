import { Router } from "express";
import db from "../utils/db";
import { authenticateJWT, AuthenticatedRequest } from "../middleware/auth";
import { ApplicationStatus } from "@prisma/client";

const router = Router();

// Public: Submit creator application
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      instagramUrl,
      youtubeUrl,
      followers,
      category,
      phone,
      email,
      city,
      languages,
      contentTypes,
      engagementRate,
      averageViews,
      message,
      mediaKitUrl,
      profilePhotoUrl,
    } = req.body;

    if (!fullName || !category || !phone || !email || !city) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const app = await db.creatorApplication.create({
      data: {
        fullName,
        instagramUrl: instagramUrl || null,
        youtubeUrl: youtubeUrl || null,
        followers: followers ? Number(followers) : null,
        category,
        phone,
        email,
        city,
        languages: languages || [],
        contentTypes: contentTypes || [],
        engagementRate: engagementRate ? Number(engagementRate) : null,
        averageViews: averageViews ? Number(averageViews) : null,
        message: message || null,
        mediaKitUrl: mediaKitUrl || null,
        profilePhotoUrl: profilePhotoUrl || null,
        status: "PENDING",
      },
    });

    return res.json({ success: true, id: app.id });
  } catch (error: any) {
    console.error("Submit creator app error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Get all creator applications
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const apps = await db.creatorApplication.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return res.json(apps);
  } catch (error: any) {
    console.error("Get creator apps error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Update creator application status
router.put("/:id", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const app = await db.creatorApplication.update({
      where: { id },
      data: { status: status as ApplicationStatus },
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "UPDATE_CREATOR_APP_STATUS",
        entityType: "CREATOR_APPLICATION",
        entityId: app.id,
      },
    });

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Update creator app status error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
