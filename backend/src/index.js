import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import plantsRouter from "./routes/plants.js";

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? "*" }));

app.get("/api/health", (_req, res) => res.json({ ok: true, ts: new Date().toISOString() }));
app.use("/api/plants", plantsRouter);

const PORT = process.env.PORT || 4000;

connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`[API] http://localhost:${PORT}`)))
  .catch(err => {
    console.error("Failed to start server", err);
    process.exit(1);
  });
