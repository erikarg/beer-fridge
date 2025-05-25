import { injectable } from "@expressots/core";

@injectable()
export class AppUseCase {
    execute() {
        return "Hello from ExpressoTS!";
    }
}
