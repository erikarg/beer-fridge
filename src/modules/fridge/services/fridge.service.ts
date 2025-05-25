import { injectable } from "@expressots/core";

@injectable()
export class FridgeService {
    async logOpenEvent(userId?: string): Promise<void> {
        console.log(`Fridge opened by user ${userId ?? "anonymous"}`);
    }
}
