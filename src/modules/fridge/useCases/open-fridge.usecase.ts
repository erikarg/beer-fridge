import { inject, injectable } from "@expressots/core";
import { EventType } from "@prisma/client";

import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";
import { PrismaFridgeEventRepository } from "../../../infra/database/prisma/prisma-fridge-event.repository";
import { validateDto } from "../../../common/utils/validate-dto";
import { OpenFridgeDto } from "../dtos/open-fridge.dto";

@injectable()
export class OpenFridgeUseCase {
    constructor(
        @inject(PrismaBeerRepository)
        private readonly beerRepo: PrismaBeerRepository,
        @inject(PrismaFridgeEventRepository)
        private readonly fridgeEventRepo: PrismaFridgeEventRepository,
    ) {}

    async execute(data: OpenFridgeDto) {
        const { userId } = await validateDto(OpenFridgeDto, data);

        await this.fridgeEventRepo.create({
            type: EventType.OPENED,
            message: userId
                ? `Fridge opened by user ${userId}`
                : "Fridge opened",
            beerId: null,
        });

        return this.beerRepo.findAll();
    }
}
