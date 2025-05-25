import { body, controller, Post } from "@expressots/adapter-express";
import { inject } from "@expressots/core";

import { OpenFridgeUseCase } from "../useCases/open-fridge.usecase";
import { OpenFridgeDto } from "../dtos/open-fridge.dto";
import { logger } from "../../../common/utils/logger";

@controller("/fridge")
export class FridgeController {
    constructor(
        @inject(OpenFridgeUseCase)
        private readonly openFridgeUseCase: OpenFridgeUseCase,
    ) {}

    @Post("/open")
    async openFridge(@body() body: OpenFridgeDto) {
        try {
            logger.info("Opening fridge", { userId: body.userId });
            const result = await this.openFridgeUseCase.execute(body.userId);
            logger.info("Fridge opened successfully", {
                userId: body.userId,
                beerCount: result.length,
            });
            return {
                success: true,
                message: "Fridge opened successfully",
                beers: result,
                timestamp: new Date().toISOString(),
            };
        } catch (error) {
            logger.error("Failed to open fridge", {
                userId: body.userId,
                error: error instanceof Error ? error.message : "Unknown error",
            });
            throw error;
        }
    }
}
