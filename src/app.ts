import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFoundHandler } from "./middleware/notFound.js";
import { exampleRouter } from "./modules/example/example.routes.js";
import { v1ApiRouter } from "./routes/v1.js";
import { v2ApiRouter } from "./routes/v2.js";

export const createApp = () => {
    const app = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json({ limit: "1mb" }));
    app.use(morgan("dev"));

    app.get("/", (_req, res) => res.json({ status: "ok" }));
    app.use("/api/v1", v1ApiRouter);
    app.use("/api/v2", v2ApiRouter);
    app.use("/api", exampleRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
};
