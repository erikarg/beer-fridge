import { injectable, inject } from "@expressots/core";

import { BeerService } from "../services/beer.service";
import { CreateBeerDto } from "../dtos/create-beer.dto";
import { BeerResponseDto } from "../dtos/beer-response.dto";

@injectable()
export class CreateBeerUseCase {
    constructor(@inject(BeerService) private beerService: BeerService) {}

    async execute(data: CreateBeerDto): Promise<BeerResponseDto> {
        return this.beerService.createBeer(data);
    }
}
