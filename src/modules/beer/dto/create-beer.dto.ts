import {
    IsString,
    IsInt,
    IsPositive,
    MinLength,
    MaxLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateBeerDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    type: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    brand: string;

    @IsInt()
    @IsPositive()
    @Transform(({ value }) => parseInt(value))
    volumeML: number;

    @IsInt()
    @IsPositive()
    @Transform(({ value }) => parseInt(value))
    quantity: number;
}
