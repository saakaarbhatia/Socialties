import { Router } from "express";
import db from "../utils/db";
import { authenticateJWT, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// Public: Get all team members
router.get("/", async (req, res) => {
  try {
    const team = await db.teamMember.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return res.json(team);
  } catch (error: any) {
    console.error("Get team error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Create team member
router.post("/", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { name, designation, photoUrl, linkedin, instagram, email, bio } = req.body;

    if (!name || !designation) {
      return res.status(400).json({ error: "Name and designation are required" });
    }

    const member = await db.teamMember.create({
      data: {
        name,
        designation,
        photoUrl: photoUrl || null,
        linkedin: linkedin || null,
        instagram: instagram || null,
        email: email || null,
        bio: bio || null,
        isActive: true,
      },
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "CREATE_TEAM_MEMBER",
        entityType: "TEAM_MEMBER",
        entityId: member.id,
      },
    });

    return res.json(member);
  } catch (error: any) {
    console.error("Create team member error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Delete team member
router.delete("/:id", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const member = await db.teamMember.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "DELETE_TEAM_MEMBER",
        entityType: "TEAM_MEMBER",
        entityId: member.id,
      },
    });

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Delete team member error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
