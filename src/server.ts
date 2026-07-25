import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI!;

const startServer = async () => {
  try {
    logger.debug("Starting backend server initialization");
    await mongoose.connect(MONGO_URI);
    logger.info("✅ MongoDB Connected");

    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("❌ Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

startServer();