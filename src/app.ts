import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import testRoutes from "./routes/test.route.js";
import logger from "./utils/logger.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use((req, _res, next) => {
    logger.debug(`Incoming ${req.method} request to ${req.originalUrl}`);
    next();
});

app.use("/api/test", testRoutes);

app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error(`Unhandled error on ${req.method} ${req.originalUrl}`, {
        error: err.message,
        stack: err.stack,
    });

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

export default app;