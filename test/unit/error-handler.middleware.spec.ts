import { errorHandlerMiddleware } from "../../src/common/middleware/error-handler.middleware";
import { ValidationException } from "../../src/common/exceptions/app.exception";
import { logger } from "../../src/common/utils/logger";

describe("errorHandlerMiddleware", () => {
    const makeRes = () => {
        const res: any = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    const req: any = { path: "/test", method: "GET" };
    const next = jest.fn();

    let warnSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;

    beforeEach(() => {
        warnSpy = jest.spyOn(logger, "warn").mockImplementation(jest.fn());
        errorSpy = jest.spyOn(logger, "error").mockImplementation(jest.fn());
    });

    afterEach(() => {
        warnSpy.mockRestore();
        errorSpy.mockRestore();
    });

    it("should handle operational AppException correctly", () => {
        const res = makeRes();
        const err = new ValidationException("Invalid");

        errorHandlerMiddleware(err, req, res, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ success: false, message: "Invalid", statusCode: 400 }),
        );
        expect(warnSpy).toHaveBeenCalled();
        expect(errorSpy).not.toHaveBeenCalled();
    });

    it("should handle unknown errors as 500", () => {
        const res = makeRes();
        const err = new Error("Boom");

        errorHandlerMiddleware(err as any, req, res, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({ success: false, statusCode: 500 }),
        );
        expect(errorSpy).toHaveBeenCalled();
    });
});