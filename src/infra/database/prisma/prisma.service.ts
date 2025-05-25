import { PrismaClient } from "@prisma/client";
import { injectable } from "@expressots/core";

@injectable()
export class PrismaService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async onModuleInit(): Promise<void> {
        await this.prisma.$connect();
        console.log("✅ Prisma connected");
    }

    async onModuleDestroy(): Promise<void> {
        await this.prisma.$disconnect();
        console.log("❌ Prisma disconnected");
    }

    get beer() {
        return this.prisma.beer;
    }

    get fridgeEvent() {
        return this.prisma.fridgeEvent;
    }

    get $connect() {
        return this.prisma.$connect.bind(this.prisma);
    }

    get $disconnect() {
        return this.prisma.$disconnect.bind(this.prisma);
    }
}
