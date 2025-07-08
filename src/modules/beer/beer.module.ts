import { ContainerModule, CreateModule } from "@expressots/core";

import { PrismaBeerRepository } from "../../infra/database/prisma/prisma-beer.repository";

import { BeerController } from "./controllers/beer.controller";
import { CreateBeerUseCase } from "./useCases/create-beer.usecase";
import { UpdateBeerUseCase } from "./useCases/update-beer.usecase";
import { GetBeerByIdUseCase } from "./useCases/get-beer-by-id.usecase";
import { DeleteBeerUseCase } from "./useCases/delete-beer.usecase";
import { ListBeersUseCase } from "./useCases/list-beers.usecase";

export const BeerModule: ContainerModule = CreateModule([
    BeerController,
    CreateBeerUseCase,
    UpdateBeerUseCase,
    GetBeerByIdUseCase,
    DeleteBeerUseCase,
    ListBeersUseCase,
    PrismaBeerRepository,
]);
