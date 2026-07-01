import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import dashboardRouter from "./routes/dashboard";
import campaignsRouter from "./routes/campaigns";
import teamRouter from "./routes/team";
import brandLeadsRouter from "./routes/brandLeads";
import creatorAppsRouter from "./routes/creatorApps";
import messagesRouter from "./routes/messages";
import settingsRouter from "./routes/settings";
import publicRouter from "./routes/public";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.BACKEND_PORT || 4000;

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
}));

app.use(express.json());

// Public health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Setup API routes
app.use("/api/auth", authRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/campaigns", campaignsRouter);
app.use("/api/team", teamRouter);
app.use("/api/brand-leads", brandLeadsRouter);
app.use("/api/creator-applications", creatorAppsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/settings", settingsRouter);
app.use("/api/public", publicRouter);

app.listen(port, () => {
  console.log(`Backend server successfully listening on port ${port}`);
});
