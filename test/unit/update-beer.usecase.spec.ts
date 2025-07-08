import { UpdateBeerUseCase } from "../../src/modules/beer/useCases/update-beer.usecase";
import { PrismaBeerRepository } from "../../src/infra/database/prisma/prisma-beer.repository";
import { ValidationException, NotFoundException } from "../../src/common/exceptions/app.exception";

function createMockRepo() {
    return {
        update: jest.fn(),
    } as unknown as jest.Mocked<PrismaBeerRepository>;
}

describe("UpdateBeerUseCase", () => {
    let useCase: UpdateBeerUseCase;
    let mockRepo: jest.Mocked<PrismaBeerRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockRepo = createMockRepo();
        useCase = new UpdateBeerUseCase(mockRepo);
    });

    it("should update only provided fields", async () => {
        const payload = { type: "Lager" } as any;
        const updatedBeer = {
            id: 1,
            type: "Lager",
            brand: "Test",
            volumeML: 500,
            quantity: 10,
        } as any;

        mockRepo.update.mockResolvedValue(updatedBeer);

        const result = await useCase.execute(1, payload);

        expect(mockRepo.update).toHaveBeenCalledWith(1, { type: "Lager" });
        expect(result).toEqual(updatedBeer);
    });

    it("should allow empty payload (no changes)", async () => {
        const updatedBeer = {
            id: 2,
            type: "IPA",
            brand: "Brand",
            volumeML: 330,
            quantity: 6,
        } as any;
        mockRepo.update.mockResolvedValue(updatedBeer);

        const result = await useCase.execute(2, {} as any);
        expect(mockRepo.update).toHaveBeenCalledWith(2, {});
        expect(result).toEqual(updatedBeer);
    });

    it("should throw ValidationException for invalid data", async () => {
        await expect(
            useCase.execute(1, { quantity: -5 } as any),
        ).rejects.toBeInstanceOf(ValidationException);
        expect(mockRepo.update).not.toHaveBeenCalled();
    });

    it("should propagate repository errors (e.g., NotFoundException)", async () => {
        const repoError = new NotFoundException();
        mockRepo.update.mockRejectedValue(repoError);

        await expect(useCase.execute(99, { type: "Pale Ale" } as any)).rejects.toBe(
            repoError,
        );
        expect(mockRepo.update).toHaveBeenCalledWith(99, { type: "Pale Ale" });
    });
});