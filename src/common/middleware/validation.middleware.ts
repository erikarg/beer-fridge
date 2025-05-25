import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { Request, Response, NextFunction } from "express";

import { ValidationException } from "../exceptions/app.exception";

export function validationMiddleware<T>(
    type: new () => T,
    skipMissingProperties = false,
): (req: Request, res: Response, next: NextFunction) => void {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const dto = plainToClass(type, req.body);
            const errors = await validate(dto as object, {
                skipMissingProperties,
            });

            if (errors.length > 0) {
                const message = errors
                    .map((error) => Object.values(error.constraints || {}))
                    .join(", ");
                throw new ValidationException(message);
            }

            req.body = dto;
            next();
        } catch (error) {
            next(error);
        }
    };
}
