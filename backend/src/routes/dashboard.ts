import { Router } from "express";
import db from "../utils/db";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/stats", authenticateJWT, async (req, res) => {
  try {
    const totalCampaigns = await db.campaign.count({ where: { deletedAt: null } });
    const totalTeam = await db.teamMember.count({ where: { deletedAt: null } });
    const creatorApps = await db.creatorApplication.count({ where: { deletedAt: null } });
    const brandLeads = await db.brandLead.count({ where: { deletedAt: null } });
    const contactMessages = await db.contactMessage.count({ where: { deletedAt: null } });

    // Recent activity log
    const auditLogs = await db.auditLog.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        actor: {
          select: { name: true, email: true },
        },
      },
    });

    const recentActivity = auditLogs.map((log) => ({
      id: log.id,
      action: log.action,
      entityType: log.entityType,
      createdAt: log.createdAt,
      actorName: log.actor?.name || "System",
    }));

    return res.json({
      stats: {
        campaigns: totalCampaigns,
        team: totalTeam,
        creatorApps,
        brandLeads,
        contactMessages,
      },
      recentActivity,
    });
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
