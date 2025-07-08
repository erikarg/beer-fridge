import {
    AppException,
    ValidationException,
    NotFoundException,
    ConflictException,
} from "../../src/common/exceptions/app.exception";

describe("AppException hierarchy", () => {
    it("should create a generic AppException with defaults", () => {
        const err = new AppException("Something went wrong");
        expect(err.message).toBe("Something went wrong");
        expect(err.statusCode).toBe(500);
        expect(err.isOperational).toBe(true);
        expect(err.stack).toBeDefined();
    });

    it("should set custom status code and operational flag", () => {
        const err = new AppException("Oops", 418, false);
        expect(err.statusCode).toBe(418);
        expect(err.isOperational).toBe(false);
    });

    it("ValidationException should default to 400", () => {
        const err = new ValidationException("Invalid");
        expect(err.statusCode).toBe(400);
        expect(err.message).toBe("Invalid");
    });

    it("NotFoundException should default to 404", () => {
        const err = new NotFoundException();
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe("Resource not found");
    });

    it("ConflictException should default to 409", () => {
        const err = new ConflictException("Exists");
        expect(err.statusCode).toBe(409);
        expect(err.message).toBe("Exists");
    });
});