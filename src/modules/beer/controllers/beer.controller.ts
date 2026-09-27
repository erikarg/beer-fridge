import {
    body,
    controller,
    Delete,
    Get,
    Http,
    param,
    Post,
    Put,
} from "@expressots/adapter-express";
import { inject } from "@expressots/core";

import { CreateBeerUseCase } from "../useCases/create-beer.usecase";
import { UpdateBeerUseCase } from "../useCases/update-beer.usecase";
import { GetBeerByIdUseCase } from "../useCases/get-beer-by-id.usecase";
import { DeleteBeerUseCase } from "../useCases/delete-beer.usecase";
import { ListBeersUseCase } from "../useCases/list-beers.usecase";
import { CreateBeerDto } from "../dtos/create-beer.dto";
import { UpdateBeerDto } from "../dtos/update-beer.dto";
import { BeerResponseDto } from "../dtos/beer-response.dto";
import {
    NotFoundException,
    ValidationException,
} from "../../../common/exceptions/app.exception";
import { logger } from "../../../common/utils/logger";

@controller("/beer")
export class BeerController {
    constructor(
        @inject(CreateBeerUseCase) private createBeer: CreateBeerUseCase,
        @inject(UpdateBeerUseCase) private updateBeer: UpdateBeerUseCase,
        @inject(GetBeerByIdUseCase) private getBeerById: GetBeerByIdUseCase,
        @inject(DeleteBeerUseCase) private deleteBeer: DeleteBeerUseCase,
        @inject(ListBeersUseCase) private listBeers: ListBeersUseCase,
    ) {}

    @Post("/")
    async create(@body() payload: CreateBeerDto): Promise<BeerResponseDto> {
        try {
            logger.info("Creating new beer", {
                type: payload.type,
                brand: payload.brand,
            });
            const beer = await this.createBeer.execute(payload);
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
        logger.info("Fetching all beers");
        const beers = await this.listBeers.execute();
        logger.info("Beers fetched successfully", { count: beers.length });
        return beers;
    }

    @Get("/:id")
    async getById(@param("id") id: string): Promise<BeerResponseDto> {
        try {
            logger.info("Fetching beer by ID", { id });
            const beer = await this.getBeerById.execute(this.parseId(id));

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

    @Put("/:id")
    @Http(200)
    async update(
        @param("id") id: string,
        @body() payload: UpdateBeerDto,
    ): Promise<BeerResponseDto> {
        try {
            logger.info("Updating beer", { id, updates: payload });

            const beerId = this.parseId(id);
            const existingBeer = await this.getBeerById.execute(beerId);
            if (!existingBeer) {
                throw new NotFoundException(`Beer with ID ${id} not found`);
            }

            const updatedBeer = await this.updateBeer.execute(beerId, payload);
            logger.info("Beer updated successfully", { id });

            return updatedBeer;
        } catch (error) {
            logger.error("Failed to update beer", {
                id,
                error: error instanceof Error ? error.message : "Unknown error",
            });
            throw error;
        }
    }

    @Delete("/:id")
    async delete(@param("id") id: string): Promise<{ message: string }> {
        try {
            logger.info("Deleting beer", { id });

            const beerId = this.parseId(id);
            const existingBeer = await this.getBeerById.execute(beerId);
            if (!existingBeer) {
                throw new NotFoundException(`Beer with ID ${id} not found`);
            }

            await this.deleteBeer.execute(beerId);
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

    private parseId(id: string): number {
        const parsed = Number(id);
        if (!Number.isInteger(parsed) || parsed <= 0) {
            throw new ValidationException("Beer ID must be a positive integer");
        }
        return parsed;
    }
}
