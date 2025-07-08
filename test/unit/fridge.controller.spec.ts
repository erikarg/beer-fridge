import { FridgeController } from "../../src/modules/fridge/controllers/fridge.controller";
import { OpenFridgeUseCase } from "../../src/modules/fridge/useCases/open-fridge.usecase";

function buildController() {
    const mockUseCase: jest.Mocked<OpenFridgeUseCase> = {
        execute: jest.fn(),
    } as unknown as jest.Mocked<OpenFridgeUseCase>;
    const controller = new FridgeController(mockUseCase);
    return { controller, mockUseCase };
}

describe("FridgeController", () => {
    it("should open fridge and return beers", async () => {
        const { controller, mockUseCase } = buildController();
        const beers = [
            { id: 1, type: "IPA", brand: "Test", volumeML: 500, quantity: 12 },
        ];
        mockUseCase.execute.mockResolvedValue(beers as any);

        const result = await controller.openFridge({ userId: "user123" });

        expect(mockUseCase.execute).toHaveBeenCalledWith("user123");
        expect(result).toEqual(
            expect.objectContaining({
                success: true,
                message: "Fridge opened successfully",
                beers,
            }),
        );
    });

    it("should propagate errors from use case", async () => {
        const { controller, mockUseCase } = buildController();
        const err = new Error("DB down");
        mockUseCase.execute.mockRejectedValue(err);

        await expect(controller.openFridge({ userId: "user123" })).rejects.toBe(err);
    });
});