import { AppExpress } from "@expressots/adapter-express";
import { AppContainer, Env, injectable } from "@expressots/core";
import { AppModule } from "@useCases/app/app.module";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";

import { errorHandlerMiddleware } from "./common/middleware/error-handler.middleware";
import { logger } from "./common/utils/logger";

@injectable()
export class App extends AppExpress {
    private config: AppContainer = this.configContainer([AppModule]);

    async globalConfiguration(): Promise<void> {
        this.setGlobalRoutePrefix("/v1");

        this.initEnvironment("development", {
            env: {
                development: ".env",
                production: ".env",
            },
        });
    }

    async configureServices(): Promise<void> {
        this.Provider.register(Env);

        // Security middleware
        this.Middleware.addMiddleware(helmet());
        this.Middleware.addMiddleware(
            cors({
                origin: process.env.ALLOWED_ORIGINS?.split(",") || [
                    "http://localhost:3000",
                ],
                credentials: true,
            }),
        );

        // Performance middleware
        this.Middleware.addMiddleware(compression());

        // Rate limiting
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
            message: "Too many requests from this IP, please try again later.",
            standardHeaders: true,
            legacyHeaders: false,
        });
        this.Middleware.addMiddleware(limiter);

        // Body parser
        this.Middleware.addBodyParser();

        // Error handler
        this.Middleware.setErrorHandler({
            showStackTrace: process.env.NODE_ENV === "development",
        });

        logger.info("Middleware configured successfully");
    }

    async postServerInitialization(): Promise<void> {
        this.Provider.get(Env).checkFile(".env");

        logger.info("Application initialized successfully", {
            environment: process.env.NODE_ENV,
            port: process.env.PORT,
        });
    }

    async serverShutdown(): Promise<void> {
        logger.info("Application shutting down...");
    }
}
