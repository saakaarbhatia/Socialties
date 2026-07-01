import { Router } from "express";
import db from "../utils/db";

const router = Router();

// Public: Get all active services
router.get("/services", async (req, res) => {
  try {
    const services = await db.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    return res.json(services);
  } catch (error: any) {
    console.error("Get services error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Public: Get published testimonials
router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await db.testimonial.findMany({
      where: { isPublished: true, deletedAt: null },
      orderBy: { sortOrder: "asc" },
    });
    return res.json(testimonials);
  } catch (error: any) {
    console.error("Get testimonials error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Public: Get SEO settings for a page path (?path=/campaigns)
router.get("/seo", async (req, res) => {
  try {
    const { path } = req.query;
    if (!path || typeof path !== "string") {
      return res.status(400).json({ error: "path query param required" });
    }
    const seo = await db.seoSetting.findUnique({
      where: { pagePath: path },
    });
    return res.json(seo || null);
  } catch (error: any) {
    console.error("Get SEO settings error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
