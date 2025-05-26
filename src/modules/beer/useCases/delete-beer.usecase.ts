import { injectable, inject } from "@expressots/core";

import { BeerService } from "../services/beer.service";

@injectable()
export class DeleteBeerUseCase {
    constructor(@inject(BeerService) private beerService: BeerService) {}

    async execute(id: number): Promise<void> {
        return this.beerService.deleteBeer(id);
    }
} 