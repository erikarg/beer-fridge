import {
    body,
    controller,
    Delete,
    Get,
    param,
    Post,
} from "@expressots/adapter-express";
import { inject } from "@expressots/core";

import { CreateBeerUseCase } from "../useCases/create-beer.usecase";
import { BeerService } from "../services/beer.service";
import { CreateBeerDto } from "../dtos/create-beer.dto";
import { BeerResponseDto } from "../dtos/beer-response.dto";
import { NotFoundException } from "../../../common/exceptions/app.exception";
import { logger } from "../../../common/utils/logger";

@controller("/beer")
export class BeerController {
    constructor(
        @inject(CreateBeerUseCase) private createBeer: CreateBeerUseCase,
        @inject(BeerService) private beerService: BeerService,
    ) {}

    @Post("/")
    async create(@body() body: CreateBeerDto): Promise<BeerResponseDto> {
        try {
            logger.info("Creating new beer", {
                type: body.type,
                brand: body.brand,
            });
            const beer = await this.createBeer.execute(body);
            logger.info("Beer created successfully", { id: beer.id });
            return beer;
        } catch (error) {
            logger.error("Failed to create beer", {
                error: error instanceof Error ? error.message : "Unknown error",
            });
            throw error;
        }
    }

    @Get("/")
    async list(): Promise<BeerResponseDto[]> {
        try {
            logger.info("Fetching all beers");
            const beers = await this.beerService.getAllBeers();
            logger.info("Beers fetched successfully", { count: beers.length });
            return beers;
        } catch (error) {
            logger.error("Failed to fetch beers", {
                error: error instanceof Error ? error.message : "Unknown error",
            });
            throw error;
        }
    }

    @Get("/:id")
    async getById(@param("id") id: number): Promise<BeerResponseDto> {
        try {
            logger.info("Fetching beer by ID", { id });
            const beer = await this.beerService.getBeerById(id);

            if (!beer) {
                throw new NotFoundException(`Beer with ID ${id} not found`);
            }

            logger.info("Beer fetched successfully", { id });
            return beer;
        } catch (error) {
            logger.error("Failed to fetch beer", {
                id,
                error: error instanceof Error ? error.message : "Unknown error",
            });
            throw error;
        }
    }

    @Delete("/:id")
    async delete(@param("id") id: number): Promise<{ message: string }> {
        try {
            logger.info("Deleting beer", { id });

            // Check if beer exists first
            const existingBeer = await this.beerService.getBeerById(id);
            if (!existingBeer) {
                throw new NotFoundException(`Beer with ID ${id} not found`);
            }

            await this.beerService.deleteBeer(id);
            logger.info("Beer deleted successfully", { id });

            return { message: "Beer deleted successfully" };
        } catch (error) {
            logger.error("Failed to delete beer", {
                id,
                error: error instanceof Error ? error.message : "Unknown error",
            });
            throw error;
        }
    }
}
