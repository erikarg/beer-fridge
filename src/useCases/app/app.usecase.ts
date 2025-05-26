import { injectable } from "@expressots/core";

@injectable()
export class AppUseCase {
    execute() {
        return {
            status: "ok",
            message: "Beer Fridge API is running",
            timestamp: new Date().toISOString(),
            version: process.env.APP_VERSION || "1.0.0",
        };
    }
}
