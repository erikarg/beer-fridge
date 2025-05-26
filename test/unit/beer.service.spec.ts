import { BeerService } from "../../src/modules/beer/services/beer.service";
import { PrismaBeerRepository } from "../../src/infra/database/prisma/prisma-beer.repository";
import { CreateBeerDto } from "../../src/modules/beer/dtos/create-beer.dto";

describe("BeerService", () => {
    let beerService: BeerService;
    let mockBeerRepo: jest.Mocked<Omit<PrismaBeerRepository, 'prisma'>>;

    beforeEach(() => {
        mockBeerRepo = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        } as jest.Mocked<Omit<PrismaBeerRepository, 'prisma'>>;

        beerService = new BeerService(mockBeerRepo as Omit<PrismaBeerRepository, 'prisma'>);
        });

    describe("createBeer", () => {
        it("should create a beer with correct data transformation", async () => {
            const createDto: CreateBeerDto = {
                type: "IPA",
                brand: "Test Brewery",
                volumeML: 500,
                quantity: 12,
            };

            const expectedBeer = {
                id: 1,
                ...createDto,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockBeerRepo.create.mockResolvedValue(expectedBeer);

            const result = await beerService.createBeer(createDto);

            expect(mockBeerRepo.create).toHaveBeenCalledWith({
                type: createDto.type,
                brand: createDto.brand,
                volumeML: createDto.volumeML,
                quantity: createDto.quantity,
            });
            expect(result).toEqual(expectedBeer);
        });
    });

    describe("updateBeer", () => {
        it("should only update provided fields", async () => {
            const updateDto = { quantity: 8 };
            const expectedBeer = {
                id: 1,
                type: "IPA",
                brand: "Test Brewery",
                volumeML: 500,
                quantity: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            mockBeerRepo.update.mockResolvedValue(expectedBeer);

            await beerService.updateBeer(1, updateDto);

            expect(mockBeerRepo.update).toHaveBeenCalledWith(1, {
                quantity: 8,
            });
        });
    });
});