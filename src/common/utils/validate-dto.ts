import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "../exceptions/app.exception";

export async function validateDto<T>(
    dtoClass: new () => T,
    data: unknown,
): Promise<T> {
    const dto = plainToInstance(dtoClass, data);
    const errors = await validate(dto as object, {
        skipMissingProperties: false,
    });

    if (errors.length) {
        const message = errors
            .flatMap((e) => Object.values(e.constraints ?? {}))
            .join(", ");

        throw new ValidationException(message);
    }

    return dto;
}
