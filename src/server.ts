import "./config/globalCrypto.js";
import { createApp } from "./app.js";
import { connectMongo, disconnectMongo } from "./config/db.js";
import { env } from "./config/env.js";
import { logWithSeparator, logger } from "./config/logger.js";

const main = async () => {
  logWithSeparator("Starting backend server");
  await connectMongo();

  const app = createApp();
  const server = app.listen(env.port, () => {
    logWithSeparator("API listening");
  });

  const closeServer = async () =>
    new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

  const shutdown = async (signal: string) => {
    logWithSeparator("Shutting down", { signal });
    try {
      await closeServer();
      await disconnectMongo();
      process.exit(0);
    } catch (err) {
      logger.error({ err }, "Shutdown failed");
      process.exit(1);
    }
  };

  process.on("SIGINT", () => void shutdown("SIGINT"));
  process.on("SIGTERM", () => void shutdown("SIGTERM"));
};

void (async () => {
  try {
    await main();
  } catch (err) {
    logger.error({ err }, "Fatal error");
    process.exit(1);
  }
})();