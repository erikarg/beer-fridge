import { OpenFridgeUseCase } from "../../src/modules/fridge/useCases/open-fridge.usecase";
import { PrismaBeerRepository } from "../../src/infra/database/prisma/prisma-beer.repository";
import { PrismaFridgeEventRepository } from "../../src/infra/database/prisma/prisma-fridge-event.repository";
import { EventType } from "@prisma/client";
import { ValidationException } from "../../src/common/exceptions/app.exception";

describe("OpenFridgeUseCase", () => {
    let useCase: OpenFridgeUseCase;
    let mockBeerRepo: jest.Mocked<PrismaBeerRepository>;
    let mockEventRepo: jest.Mocked<PrismaFridgeEventRepository>;

    beforeEach(() => {
        mockBeerRepo = {
            findAll: jest.fn(),
        } as any;

        mockEventRepo = {
            create: jest.fn(),
        } as any;

        useCase = new OpenFridgeUseCase(mockBeerRepo, mockEventRepo);
    });

    it("should log fridge open event and return beers", async () => {
        const mockBeers = [
            { id: 1, type: "IPA", brand: "Test", volumeML: 500, quantity: 12 },
        ];

        mockEventRepo.create.mockResolvedValue({} as any);
        mockBeerRepo.findAll.mockResolvedValue(mockBeers as any);

        const result = await useCase.execute({ userId: "user123" });

        expect(mockEventRepo.create).toHaveBeenCalledWith({
            type: EventType.OPENED,
            message: "Fridge opened by user user123",
            beerId: null,
        });
        expect(result).toEqual(mockBeers);
    });

    it("should reject a non-string userId without recording an event", async () => {
        await expect(
            useCase.execute({ userId: 42 } as any),
        ).rejects.toBeInstanceOf(ValidationException);
        expect(mockEventRepo.create).not.toHaveBeenCalled();
        expect(mockBeerRepo.findAll).not.toHaveBeenCalled();
    });
});
