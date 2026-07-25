import winston from "winston";
import fs from "fs";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

const baseLogDir = process.env.LOG_DIR || "src/log";
const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
const dailyDir = path.join(baseLogDir, today);

try {
    fs.mkdirSync(dailyDir, { recursive: true });
} catch (err) {
    // If directory creation fails, fallback to console-only logging
    // eslint-disable-next-line no-console
    console.error("Failed to create log directory", err);
}

const errorLogPath = path.join(dailyDir, `${today}-error.log`);
const debugLogPath = path.join(dailyDir, `${today}-debug.log`);

const baseFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
        return `[${timestamp}] ${level}: ${message}${metaString}`;
    })
);

const logger = winston.createLogger({
    level: isProduction ? "info" : "debug",
    format: baseFormat,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), baseFormat),
        }),
        new winston.transports.File({ filename: errorLogPath, level: "error" }),
        new winston.transports.File({ filename: debugLogPath, level: "debug" }),
    ],
    exitOnError: false,
});

export default logger;
