import { injectable, inject } from "@expressots/core";

import { PrismaBeerRepository } from "../../../infra/database/prisma/prisma-beer.repository";

@injectable()
export class DeleteBeerUseCase {
    constructor(
        @inject(PrismaBeerRepository) private beerRepo: PrismaBeerRepository,
    ) {}

    async execute(id: number): Promise<void> {
        return this.beerRepo.delete(id);
    }
}
