import pino from "pino";
import { env } from "./env.js";

const separator = "==================================================";

export const logger = pino({
    level: env.logLevel,
    base: undefined,
    timestamp: false,
});

export const logWithSeparator = (message: string, details?: unknown) => {
    logger.info(separator);
    if (details !== undefined) {
        logger.info({ details }, message);
    } else {
        logger.info(message);
    }
    logger.info(separator);
};
