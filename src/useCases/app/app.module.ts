import { ContainerModule, CreateModule } from "@expressots/core";

import { BeerModule } from "../../modules/beer/beer.module";
import { FridgeModule } from "../../modules/fridge/fridge.module";
import { PrismaModule } from "../../infra/database/prisma/prisma.module";

import { AppController } from "./app.controller";
import { AppUseCase } from "./app.usecase";

export const AppModule: ContainerModule = CreateModule([
    AppController,
    AppUseCase,
    BeerModule,
    FridgeModule,
    PrismaModule,
]);
