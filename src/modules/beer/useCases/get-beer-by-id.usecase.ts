import { injectable, inject } from "@expressots/core";

import { BeerService } from "../services/beer.service";
import { BeerResponseDto } from "../dtos/beer-response.dto";

@injectable()
export class GetBeerByIdUseCase {
    constructor(@inject(BeerService) private beerService: BeerService) {}

    async execute(id: number): Promise<BeerResponseDto | null> {
        return this.beerService.getBeerById(id);
    }
} 