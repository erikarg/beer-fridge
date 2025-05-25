import {
    IsString,
    IsInt,
    IsPositive,
    MinLength,
    MaxLength,
    IsOptional,
} from "class-validator";
import { Transform } from "class-transformer";

export class UpdateBeerDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    type?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    brand?: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Transform(({ value }) => parseInt(value))
    volumeML?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Transform(({ value }) => parseInt(value))
    quantity?: number;
}
