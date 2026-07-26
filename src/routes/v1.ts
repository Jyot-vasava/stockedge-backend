import { Router } from "express";
import mongoose from "mongoose";

export const v1ApiRouter = Router();

v1ApiRouter.get("/health", async (_req, res, next) => {
    try {
        const isMongoUp = mongoose.connection.readyState === 1;
        if (isMongoUp) {
            await mongoose.connection.db?.admin().ping();
        }
        res.json({ status: "ok", mongo: isMongoUp ? "up" : "down" });
    } catch (err) {
        next(err);
    }
});
