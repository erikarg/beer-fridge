import { ContainerModule, CreateModule } from "@expressots/core";

import { PrismaService } from "./prisma.service";

export const PrismaModule: ContainerModule = CreateModule([PrismaService]);
