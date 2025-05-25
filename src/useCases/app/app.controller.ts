import { controller, Get } from "@expressots/adapter-express";
import { inject } from "@expressots/core";

import { AppUseCase } from "./app.usecase";

@controller("/")
export class AppController {
    constructor(@inject(AppUseCase) private appUseCase: AppUseCase) {}

    @Get("/")
    execute() {
        return this.appUseCase.execute();
    }

    @Get("/health")
    health() {
        return {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV ?? "development",
        };
    }
}
