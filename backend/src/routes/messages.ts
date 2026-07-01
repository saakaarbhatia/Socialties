import { Router } from "express";
import db from "../utils/db";
import { authenticateJWT, AuthenticatedRequest } from "../middleware/auth";

const router = Router();

// Public: Submit contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const msg = await db.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        isRead: false,
      },
    });

    return res.json({ success: true, id: msg.id });
  } catch (error: any) {
    console.error("Submit contact message error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Get all contact messages
router.get("/", authenticateJWT, async (req, res) => {
  try {
    const messages = await db.contactMessage.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
    });
    return res.json(messages);
  } catch (error: any) {
    console.error("Get contact messages error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Authenticated: Update contact message read status
router.put("/:id", authenticateJWT, async (req: AuthenticatedRequest, res) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    if (isRead === undefined) {
      return res.status(400).json({ error: "isRead is required" });
    }

    const msg = await db.contactMessage.update({
      where: { id },
      data: { isRead: !!isRead },
    });

    // Write audit log
    await db.auditLog.create({
      data: {
        actorId: req.user!.id,
        action: "UPDATE_MESSAGE_READ_STATUS",
        entityType: "CONTACT_MESSAGE",
        entityId: msg.id,
      },
    });

    return res.json({ success: true });
  } catch (error: any) {
    console.error("Update contact message read status error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
