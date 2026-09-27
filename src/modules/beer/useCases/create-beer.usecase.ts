import { injectable, inject } from "@expressots/core";

import { CreateBeerDto } from "../dtos/create-beer.dto";
import { BeerResponseDto } from "../dtos/beer-response.dto";
import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";
import { Beer } from "@prisma/client";
import { validateDto } from "../../../common/utils/validate-dto";

@injectable()
export class CreateBeerUseCase {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: PrismaBeerRepository,
    ) {}

    async execute(data: CreateBeerDto): Promise<BeerResponseDto> {
        const dto = await validateDto(CreateBeerDto, data);

        const beerData: Omit<Beer, "id" | "createdAt" | "updatedAt"> = {
            type: dto.type,
            brand: dto.brand,
            volumeML: dto.volumeML,
            quantity: dto.quantity,
        };

        return this.beerRepo.create(beerData);
    }
}
