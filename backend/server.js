import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// Route imports
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(",") || ["http://localhost:5173"],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static file serving for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Logging
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: { success: false, message: "Too many requests, please try again later" },
  })
);

// API Routes
app.get("/api/health", (_req, res) =>
  res.json({ success: true, status: "ok", timestamp: new Date().toISOString() })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/properties/:propertyId/reviews", reviewRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server (skip on serverless platforms)
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 API running on port ${PORT}`);
  });
}

export default app;
