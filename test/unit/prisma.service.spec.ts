const connectMock = jest.fn();
const disconnectMock = jest.fn();
const beerDelegate = {} as any;
const fridgeEventDelegate = {} as any;

jest.mock("@prisma/client", () => {
    return {
        PrismaClient: jest.fn().mockImplementation(() => ({
            $connect: connectMock,
            $disconnect: disconnectMock,
            beer: beerDelegate,
            fridgeEvent: fridgeEventDelegate,
        })),
    };
});

import { PrismaService } from "../../src/infra/database/prisma/prisma.service";

describe("PrismaService", () => {
    let service: PrismaService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = new PrismaService();
    });

    it("should connect on module init", async () => {
        await service.onModuleInit();
        expect(connectMock).toHaveBeenCalled();
    });

    it("should disconnect on module destroy", async () => {
        await service.onModuleDestroy();
        expect(disconnectMock).toHaveBeenCalled();
    });

    it("should expose delegated getters", () => {
        expect(service.beer).toBe(beerDelegate);
        expect(service.fridgeEvent).toBe(fridgeEventDelegate);

        service.$connect();
        expect(connectMock).toHaveBeenCalledTimes(1);

        service.$disconnect();
        expect(disconnectMock).toHaveBeenCalledTimes(1);
    });
});