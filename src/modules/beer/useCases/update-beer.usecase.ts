import { injectable, inject } from "@expressots/core";

import { BeerService } from "../services/beer.service";
import { UpdateBeerDto } from "../dtos/update-beer.dto";
import { BeerResponseDto } from "../dtos/beer-response.dto";

@injectable()
export class UpdateBeerUseCase {
    constructor(@inject(BeerService) private beerService: BeerService) {}

    async execute(id: number, data: UpdateBeerDto): Promise<BeerResponseDto> {
        return this.beerService.updateBeer(id, data);
    }
}