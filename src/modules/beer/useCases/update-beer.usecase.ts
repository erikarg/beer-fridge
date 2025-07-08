import { injectable, inject } from "@expressots/core";
import { UpdateBeerDto } from "../dtos/update-beer.dto";
import { BeerResponseDto } from "../dtos/beer-response.dto";
import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";
import { Beer } from "@prisma/client";
import { validateDto } from "../../../common/utils/validate-dto";

@injectable()
export class UpdateBeerUseCase {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: PrismaBeerRepository,
    ) {}

    async execute(id: number, data: UpdateBeerDto): Promise<BeerResponseDto> {
        const dto = await validateDto(UpdateBeerDto, data);

        const updateData: Partial<
            Omit<Beer, "id" | "createdAt" | "updatedAt">
        > = {};

        if (dto.type !== undefined) updateData.type = dto.type;
        if (dto.brand !== undefined) updateData.brand = dto.brand;
        if (dto.volumeML !== undefined) updateData.volumeML = dto.volumeML;
        if (dto.quantity !== undefined) updateData.quantity = dto.quantity;

        return this.beerRepo.update(id, updateData);
    }
}
