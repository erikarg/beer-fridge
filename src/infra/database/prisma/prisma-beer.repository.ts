import { inject, injectable } from "@expressots/core";
import { Beer } from "@prisma/client";

import { PrismaService } from "./prisma.service";

@injectable()
export class PrismaBeerRepository {
    constructor(@inject(PrismaService) private prisma: PrismaService) {}

    async create(
        data: Omit<Beer, "id" | "createdAt" | "updatedAt">,
    ): Promise<Beer> {
        return this.prisma.beer.create({ data });
    }

    async findAll(): Promise<Beer[]> {
        return this.prisma.beer.findMany();
    }

    async findById(id: number): Promise<Beer | null> {
        return this.prisma.beer.findUnique({ where: { id } });
    }

    async update(
        id: number,
        data: Partial<Omit<Beer, "id" | "createdAt" | "updatedAt">>,
    ): Promise<Beer> {
        return this.prisma.beer.update({
            where: { id },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await this.prisma.beer.delete({ where: { id } });
    }
}
