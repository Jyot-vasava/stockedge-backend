import { Router } from "express";

export const v2ApiRouter = Router();

v2ApiRouter.get("/health", (_req, res) => {
    res.json({ status: "ok", version: "v2" });
});
