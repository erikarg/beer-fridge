import { inject, injectable } from "@expressots/core";
import { EventType } from "@prisma/client";

import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";
import { PrismaFridgeEventRepository } from "../../../infra/database/prisma/prisma-fridge-event.repository";

@injectable()
export class OpenFridgeUseCase {
    constructor(
        @inject(PrismaBeerRepository)
        private readonly beerRepo: PrismaBeerRepository,
        @inject(PrismaFridgeEventRepository)
        private readonly fridgeEventRepo: PrismaFridgeEventRepository,
    ) {}

    async execute(userId?: string) {
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
