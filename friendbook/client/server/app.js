import express from "express";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import { connectDatabase } from "./db";
const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!process.env.DATABASE || !process.env.JWT_SECRET) {
    return res.status(503).json({ status: "configuration_required" });
  }
  try {
    await connectDatabase();
    res.json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "database_unavailable" });
  }
});
app.use(async (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  if (!process.env.DATABASE || !process.env.JWT_SECRET) {
    return res.status(503).send("Application setup is incomplete. Please configure the database and authentication.");
  }
  try { await connectDatabase(); next(); }
  catch { res.status(503).send("Database is unavailable. Please try again later."); }
});
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use((req, res) => res.status(404).send("Endpoint not found"));
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.name === "UnauthorizedError") return res.status(401).send("Please sign in again.");
  if (error.name === "CastError" || error.name === "ValidationError") return res.status(400).send("Invalid request.");
  res.status(500).send("Unable to complete the request.");
});
export default app;
