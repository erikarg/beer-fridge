import { ContainerModule, CreateModule } from "@expressots/core";

import { PrismaBeerRepository } from "../../infra/database/prisma/prisma-beer.repository";

import { BeerController } from "./controllers/beer.controller";
import { BeerService } from "./services/beer.service";
import { CreateBeerUseCase } from "./useCases/create-beer.usecase";
import { ListBeersUseCase } from "./useCases/list-beers.usecase";

export const BeerModule: ContainerModule = CreateModule([
    BeerController,
    BeerService,
    CreateBeerUseCase,
    ListBeersUseCase,
    PrismaBeerRepository,
]);
