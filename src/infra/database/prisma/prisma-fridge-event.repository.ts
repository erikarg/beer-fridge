import { inject, injectable } from "@expressots/core";
import { FridgeEvent, EventType } from "@prisma/client";

import { PrismaService } from "./prisma.service";

@injectable()
export class PrismaFridgeEventRepository {
    constructor(@inject(PrismaService) private prisma: PrismaService) {}

    async create(
        data: Omit<FridgeEvent, "id" | "createdAt">,
    ): Promise<FridgeEvent> {
        return this.prisma.fridgeEvent.create({
            data: {
                ...data,
                createdAt: new Date(),
            },
        });
    }

    async findAll(): Promise<FridgeEvent[]> {
        return this.prisma.fridgeEvent.findMany({
            orderBy: { createdAt: "desc" },
        });
    }

    async findById(id: number): Promise<FridgeEvent | null> {
        return this.prisma.fridgeEvent.findUnique({ where: { id } });
    }
}
