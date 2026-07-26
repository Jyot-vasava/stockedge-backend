import mongoose from "mongoose";
import { logger } from "./logger.js";
import { env } from "./env.js";

export const connectMongo = async (): Promise<void> => {
    if (mongoose.connection.readyState === 1) return;

    const options = env.mongoDbName
        ? { dbName: env.mongoDbName }
        : undefined;

    await mongoose.connect(env.mongoUri, options);

    logger.info(
        {
            host: mongoose.connection.host,
            db: mongoose.connection.name,
        },
        "Connected to MongoDB"
    );
};

export const disconnectMongo = async (): Promise<void> => {
    if (mongoose.connection.readyState === 0) return;

    await mongoose.disconnect();
    logger.info("Disconnected from MongoDB");
};