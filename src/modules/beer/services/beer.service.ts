import { inject, injectable } from "@expressots/core";
import { Beer } from "@prisma/client";

import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";
import { CreateBeerDto } from "../dtos/create-beer.dto";
import { UpdateBeerDto } from "../dtos/update-beer.dto";
import { BeerResponseDto } from "../dtos/beer-response.dto";

@injectable()
export class BeerService {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: Omit<PrismaBeerRepository, 'prisma'>,
    ) {}

    async createBeer(data: CreateBeerDto): Promise<BeerResponseDto> {
        const beerData: Omit<Beer, "id" | "createdAt" | "updatedAt"> = {
            type: data.type,
            brand: data.brand,
            volumeML: data.volumeML,
            quantity: data.quantity,
        };

        return this.beerRepo.create(beerData);
    }

    async getAllBeers(): Promise<BeerResponseDto[]> {
        return this.beerRepo.findAll();
    }

    async getBeerById(id: number): Promise<BeerResponseDto | null> {
        return this.beerRepo.findById(id);
    }

    async updateBeer(id: number, data: UpdateBeerDto): Promise<BeerResponseDto> {
        const updateData: Partial<Omit<Beer, "id" | "createdAt" | "updatedAt">> = {};

        if (data.type !== undefined) updateData.type = data.type;
        if (data.brand !== undefined) updateData.brand = data.brand;
        if (data.volumeML !== undefined) updateData.volumeML = data.volumeML;
        if (data.quantity !== undefined) updateData.quantity = data.quantity;

        return this.beerRepo.update(id, updateData);
    }

    async deleteBeer(id: number): Promise<void> {
        return this.beerRepo.delete(id);
    }
}
