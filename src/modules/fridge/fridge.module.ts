import { ContainerModule, CreateModule } from "@expressots/core";

import { PrismaFridgeEventRepository } from "../../infra/database/prisma/prisma-fridge-event.repository";

import { FridgeController } from "./controllers/fridge.controller";
import { FridgeService } from "./services/fridge.service";
import { OpenFridgeUseCase } from "./useCases/open-fridge.usecase";

export const FridgeModule: ContainerModule = CreateModule([
    FridgeController,
    FridgeService,
    OpenFridgeUseCase,
    PrismaFridgeEventRepository,
]);
