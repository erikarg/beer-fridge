import { AppFactory } from "@expressots/core";

import { App } from "./app";
import { env } from "./config/env.config";
import { logger } from "./common/utils/logger";

async function bootstrap() {
    try {
        const app = await AppFactory.create(App);

        await app.listen(env.PORT, {
            appName: env.APP_NAME,
            appVersion: env.APP_VERSION,
        });

        logger.info("🚀 Server started successfully", {
            port: env.PORT,
            environment: env.NODE_ENV,
            appName: env.APP_NAME,
            version: env.APP_VERSION,
        });
    } catch (error) {
        logger.error("❌ Failed to start server", {
            error: error instanceof Error ? error.message : "Unknown error",
        });
        process.exit(1);
    }
}

bootstrap();
