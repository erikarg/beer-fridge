import winston from "winston";

describe("logger utility", () => {
    const ORIGINAL_ENV = process.env.NODE_ENV;

    afterEach(() => {
        process.env.NODE_ENV = ORIGINAL_ENV;
        jest.resetModules();
    });

    it("should include Console transport when not in production", () => {
        process.env.NODE_ENV = "development";
        jest.isolateModules(() => {
            const { logger } = require("../../src/common/utils/logger");
            const hasConsole = logger.transports.some(
                (t: winston.transport) => t instanceof winston.transports.Console,
            );
            expect(hasConsole).toBe(true);
        });
    });

    it("should NOT include Console transport when (if ever) in production", () => {
        process.env.NODE_ENV = "production";
        jest.isolateModules(() => {
            const { logger } = require("../../src/common/utils/logger");
            const hasConsole = logger.transports.some(
                (t: winston.transport) => t instanceof winston.transports.Console,
            );
            expect(hasConsole).toBe(false);
        });
    });
});