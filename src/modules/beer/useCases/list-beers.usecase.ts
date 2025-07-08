import { inject, injectable } from "@expressots/core";

import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";

@injectable()
export class ListBeersUseCase {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: PrismaBeerRepository,
    ) {}

    async execute() {
        return this.beerRepo.findAll();
    }
}
