import { injectable, inject } from "@expressots/core";

import { BeerResponseDto } from "../dtos/beer-response.dto";
import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";

@injectable()
export class GetBeerByIdUseCase {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: PrismaBeerRepository,
    ) {}

    async execute(id: number): Promise<BeerResponseDto | null> {
        return this.beerRepo.findById(id);
    }
}
