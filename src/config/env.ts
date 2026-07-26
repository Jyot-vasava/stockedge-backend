import path from "node:path";
import { config } from "dotenv";

config({
    path: path.resolve(process.cwd(), ".env"),
    quiet: true,
});

export const env = {
    port: Number(process.env.PORT ?? 5000),
    nodeEnv: process.env.NODE_ENV ?? "development",
    mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/stockedge",
    mongoDbName: process.env.MONGO_DB_NAME,
    logLevel: process.env.LOG_LEVEL ?? "info",
    jwtSecret: process.env.JWT_SECRET ?? "dev-secret",
};
