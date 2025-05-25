import dotenv from "dotenv";

import { logger } from "../common/utils/logger";

// Load environment variables
dotenv.config({ path: ".env" });

interface EnvConfig {
    NODE_ENV: string;
    PORT: number;
    DATABASE_URL: string;
    LOG_LEVEL: string;
    APP_NAME: string;
    APP_VERSION: string;
}

function validateEnv(): EnvConfig {
    const requiredVars = ["DATABASE_URL"];
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        logger.error(
            `Missing required environment variables: ${missingVars.join(", ")}`,
        );
        process.exit(1);
    }

    return {
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: parseInt(process.env.PORT || "3000", 10),
        DATABASE_URL: process.env.DATABASE_URL!,
        LOG_LEVEL: process.env.LOG_LEVEL || "info",
        APP_NAME: process.env.APP_NAME || "Beer Fridge API",
        APP_VERSION: process.env.APP_VERSION || "1.0.0",
    };
}

export const env = validateEnv();
