import { inject, injectable } from "@expressots/core";

import { BeerService } from "../services/beer.service";

@injectable()
export class ListBeersUseCase {
    constructor(@inject(BeerService) private beerService: BeerService) {}

    async execute() {
        return this.beerService.getAllBeers();
    }
}
